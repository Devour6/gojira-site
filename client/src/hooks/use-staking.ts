import { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  PublicKey,
  Transaction,
  StakeProgram,
  LAMPORTS_PER_SOL,
  Keypair,
  Authorized,
  Lockup,
} from '@solana/web3.js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { VALIDATOR_ADDRESS } from '@/lib/constants'
import { useToast } from '@/hooks/use-toast'

const MINIMUM_STAKE_AMOUNT = 0.01 // Minimum stake in SOL

export interface StakeAccountInfo {
  pubkey: PublicKey
  lamports: number
  isActive: boolean
  withdrawer?: PublicKey
  deactivationEpoch?: string | number
}

export function useStaking() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const validatorPubkey = new PublicKey(VALIDATOR_ADDRESS)

  // Fetch user's stake accounts for this validator
  const { data: stakeAccounts, ...stakeAccountsQuery } = useQuery({
    queryKey: [
      'stake-accounts',
      wallet.publicKey?.toString(),
      VALIDATOR_ADDRESS,
    ],
    queryFn: async (): Promise<StakeAccountInfo[]> => {
      if (!wallet.publicKey) return []

      try {
        // Get all stake accounts for this wallet owner
        // Note: We'll filter by validator delegation after fetching
        const stakeAccounts = await connection.getParsedProgramAccounts(
          StakeProgram.programId,
          {
            filters: [
              {
                memcmp: {
                  offset: 12, // Stake account authorized staker offset
                  bytes: wallet.publicKey.toBytes().toString(),
                },
              },
            ],
          }
        )

        const stakeAccountInfos: StakeAccountInfo[] = []

        for (const account of stakeAccounts) {
          const accountData = account.account.data
          if (
            !accountData ||
            typeof accountData === 'string' ||
            !('parsed' in accountData)
          )
            continue
          const parsed = accountData.parsed as any
          if (!parsed || !parsed.info) continue

          // Check if this stake account is delegated to our validator
          const delegation = parsed.delegation
          if (delegation?.voter) {
            const voterPubkey = new PublicKey(delegation.voter)
            if (voterPubkey.equals(validatorPubkey)) {
              const stakeAccountPubkey = new PublicKey(account.pubkey)
              const accountInfo = await connection.getAccountInfo(
                stakeAccountPubkey
              )
              const stakeAccountData = await connection.getStakeActivation(
                stakeAccountPubkey
              )

              stakeAccountInfos.push({
                pubkey: stakeAccountPubkey,
                lamports: accountInfo?.lamports ?? 0,
                isActive: stakeAccountData.state === 'active',
                withdrawer: parsed.withdrawer
                  ? new PublicKey(parsed.withdrawer)
                  : undefined,
                deactivationEpoch: delegation?.deactivationEpoch,
              })
            }
          }
        }

        return stakeAccountInfos
      } catch (error) {
        console.error('Error fetching stake accounts:', error)
        return []
      }
    },
    enabled: !!wallet.publicKey,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Calculate total staked amount
  const totalStaked =
    stakeAccounts?.reduce(
      (sum, acc) => sum + acc.lamports / LAMPORTS_PER_SOL,
      0
    ) ?? 0

  const stake = async (amount: number): Promise<string | null> => {
    if (!wallet.publicKey || !wallet.sendTransaction) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to stake SOL.',
        variant: 'destructive',
      })
      return null
    }

    // Validate amount
    if (amount < MINIMUM_STAKE_AMOUNT) {
      toast({
        title: 'Invalid amount',
        description: `Minimum stake amount is ${MINIMUM_STAKE_AMOUNT} SOL.`,
        variant: 'destructive',
      })
      return null
    }

    const walletBalance = await connection.getBalance(wallet.publicKey)
    const walletBalanceSol = walletBalance / LAMPORTS_PER_SOL

    // Check if user has enough balance (including rent for new stake account)
    const requiredBalance = amount
    if (walletBalanceSol < requiredBalance) {
      toast({
        title: 'Insufficient balance',
        description: `You need at least ${requiredBalance.toFixed(
          2
        )} SOL (including rent).`,
        variant: 'destructive',
      })
      return null
    }

    setIsStaking(true)

    try {
      const transaction = new Transaction()
      const stakeAccountKeypair = Keypair.generate()
      const stakeAccountPubkey = stakeAccountKeypair.publicKey

      // Calculate rent exemption
      const rentExemption = await connection.getMinimumBalanceForRentExemption(
        StakeProgram.space
      )

      // Create stake account
      transaction.add(
        StakeProgram.createAccount({
          fromPubkey: wallet.publicKey,
          stakePubkey: stakeAccountPubkey,
          authorized: new Authorized(wallet.publicKey, wallet.publicKey),
          lamports: rentExemption + amount * LAMPORTS_PER_SOL,
          lockup: new Lockup(0, 0, wallet.publicKey),
        })
      )

      // Delegate to validator
      transaction.add(
        StakeProgram.delegate({
          stakePubkey: stakeAccountPubkey,
          authorizedPubkey: wallet.publicKey,
          votePubkey: validatorPubkey,
        })
      )

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash('finalized')
      transaction.recentBlockhash = blockhash
      transaction.feePayer = wallet.publicKey

      // Sign and send transaction
      transaction.partialSign(stakeAccountKeypair)
      const signature = await wallet.sendTransaction(transaction, connection, {
        skipPreflight: false,
      })

      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed')

      toast({
        title: 'Staking successful!',
        description: `Successfully staked ${amount} SOL. Transaction: ${signature.slice(
          0,
          8
        )}...`,
      })

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['stake-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })

      return signature
    } catch (error: any) {
      console.error('Staking error:', error)
      toast({
        title: 'Staking failed',
        description: error.message || 'Failed to stake SOL. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsStaking(false)
    }
  }

  const unstake = async (
    stakeAccountPubkey: PublicKey
  ): Promise<string | null> => {
    if (!wallet.publicKey || !wallet.sendTransaction) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to unstake SOL.',
        variant: 'destructive',
      })
      return null
    }

    setIsUnstaking(true)

    try {
      // Get stake account info
      const stakeAccountInfo = await connection.getAccountInfo(
        stakeAccountPubkey
      )
      if (!stakeAccountInfo) {
        throw new Error('Stake account not found')
      }

      // Get parsed stake account data to check deactivationEpoch
      const stakeAccountData = await connection.getParsedAccountInfo(
        stakeAccountPubkey
      )
      let deactivationEpoch: string | number | undefined

      if (
        stakeAccountData.value?.data &&
        'parsed' in stakeAccountData.value.data
      ) {
        const parsed = stakeAccountData.value.data.parsed as any
        const delegation = parsed?.info?.delegation
        deactivationEpoch = delegation?.deactivationEpoch
      } else {
        // Fallback: check if stake account is active using stake activation
        const stakeActivation = await connection.getStakeActivation(
          stakeAccountPubkey
        )
        // If active, we'll treat it as needing deactivation
        deactivationEpoch =
          stakeActivation.state === 'active'
            ? '18446744073709551615'
            : undefined
      }

      const transaction = new Transaction()

      // If stake account is still active (deactivationEpoch == "18446744073709551615"), deactivate it
      const deactivationEpochStr = deactivationEpoch
        ? String(deactivationEpoch)
        : ''
      const isActive = deactivationEpochStr === '18446744073709551615'
      if (isActive) {
        const deactivateIx = StakeProgram.deactivate({
          stakePubkey: stakeAccountPubkey,
          authorizedPubkey: wallet.publicKey,
        }).instructions.filter((t) =>
          t.programId.equals(StakeProgram.programId)
        )[0]
        transaction.add(deactivateIx)
      }

      // Withdraw from stake account
      const withdrawIx = StakeProgram.withdraw({
        stakePubkey: stakeAccountPubkey,
        authorizedPubkey: wallet.publicKey,
        toPubkey: wallet.publicKey,
        lamports: stakeAccountInfo.lamports,
      }).instructions.filter((t) =>
        t.programId.equals(StakeProgram.programId)
      )[0]
      transaction.add(withdrawIx)

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash('confirmed')
      transaction.recentBlockhash = blockhash
      transaction.feePayer = wallet.publicKey

      // Send transaction
      const signature = await wallet.sendTransaction(transaction, connection, {
        skipPreflight: false,
      })

      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed')

      toast({
        title: 'Unstaking successful!',
        description: `Successfully unstaked and withdrew SOL. Transaction: ${signature.slice(
          0,
          8
        )}...`,
      })

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['stake-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })

      return signature
    } catch (error: any) {
      console.error('Unstaking error:', error)
      toast({
        title: 'Unstaking failed',
        description:
          error.message || 'Failed to unstake SOL. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsUnstaking(false)
    }
  }

  const withdraw = async (
    stakeAccountPubkey: PublicKey
  ): Promise<string | null> => {
    if (!wallet.publicKey || !wallet.sendTransaction) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to withdraw SOL.',
        variant: 'destructive',
      })
      return null
    }

    setIsUnstaking(true)

    try {
      const transaction = new Transaction()

      // Get stake account info
      const stakeAccountInfo = await connection.getAccountInfo(
        stakeAccountPubkey
      )
      if (!stakeAccountInfo) {
        throw new Error('Stake account not found')
      }

      // Withdraw from stake account
      transaction.add(
        StakeProgram.withdraw({
          stakePubkey: stakeAccountPubkey,
          authorizedPubkey: wallet.publicKey,
          toPubkey: wallet.publicKey,
          lamports: stakeAccountInfo.lamports,
        })
      )

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash('finalized')
      transaction.recentBlockhash = blockhash
      transaction.feePayer = wallet.publicKey

      // Send transaction
      const signature = await wallet.sendTransaction(transaction, connection, {
        skipPreflight: false,
      })

      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed')

      toast({
        title: 'Withdrawal successful!',
        description: `Successfully withdrew SOL from stake account. Transaction: ${signature.slice(
          0,
          8
        )}...`,
      })

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['stake-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })

      return signature
    } catch (error: any) {
      console.error('Withdrawal error:', error)
      toast({
        title: 'Withdrawal failed',
        description:
          error.message || 'Failed to withdraw SOL. Please try again.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsUnstaking(false)
    }
  }

  return {
    stakeAccounts: stakeAccounts ?? [],
    totalStaked,
    isLoadingStakeAccounts: stakeAccountsQuery.isLoading,
    stake,
    unstake,
    withdraw,
    isStaking,
    isUnstaking,
    refetchStakeAccounts: () =>
      queryClient.invalidateQueries({ queryKey: ['stake-accounts'] }),
  }
}
