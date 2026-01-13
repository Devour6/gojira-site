import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import {
  SOLANA_RPC_URL,
  STAKEWIZ_API_URL,
  VALIDATOR_ADDRESS,
} from '@/lib/constants'

export interface ValidatorData {
  totalStaked: number
  nextEpoch: Date
  uptime: number
  apy: number
}

const INITIAL_DATA: ValidatorData = {
  totalStaked: 0,
  nextEpoch: new Date(),
  uptime: 0,
  apy: 0,
}

// Solana connection
const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

const useValidator = (validatorAddress: string = VALIDATOR_ADDRESS) => {
  const queryClient = useQueryClient()

  const { data, ...rest } = useQuery<ValidatorData>({
    queryKey: ['validator', validatorAddress],
    queryFn: async () => {
      try {
        // Fetch epoch info
        const epochInfo = await connection.getEpochInfo()

        // Calculate next epoch (epochs are approximately 2-3 days)
        const epochDuration = 432000 // ~2.5 days in seconds
        const remainingSecs =
          epochDuration - (epochInfo.slotIndex % epochDuration)
        const nextEpoch = new Date(Date.now() + 1000 * remainingSecs)

        // Fetch validator data from StakeWiz API
        let uptime = 0
        let apy_estimate = 6 // Default fallback
        let totalStaked = 0

        try {
          const stakewizResponse = await fetch(STAKEWIZ_API_URL)
          console.log('stakewizResponse', stakewizResponse)
          if (stakewizResponse.ok) {
            const stakewizValidator = await stakewizResponse.json()

            if (stakewizValidator) {
              // Extract uptime from vote_success (percentage)
              if (stakewizValidator.uptime !== undefined) {
                uptime =
                  typeof stakewizValidator.uptime === 'number'
                    ? stakewizValidator.uptime
                    : parseFloat(stakewizValidator.uptime) || 0
              }

              // Extract APY - check for direct APY field or calculate from commission
              if (stakewizValidator.apy !== undefined) {
                apy_estimate =
                  typeof stakewizValidator.apy === 'number'
                    ? stakewizValidator.apy
                    : parseFloat(stakewizValidator.apy) || 6.2
              } else if (stakewizValidator.commission !== undefined) {
                // Calculate APY from commission if direct APY not available
                // Base network APY ~7%, subtract commission
                const baseAPY = 7.0
                const commission =
                  typeof stakewizValidator.commission === 'number'
                    ? stakewizValidator.commission
                    : parseFloat(stakewizValidator.commission) || 0
                apy_estimate = baseAPY * (1 - commission / 100)
              }

              console.log('activatedStake', stakewizValidator.activated_stake)

              // Convert activated_stake from lamports to SOL
              const activatedStakeLamports =
                typeof stakewizValidator.activated_stake === 'number'
                  ? stakewizValidator.activated_stake
                  : parseFloat(stakewizValidator.activated_stake) || 0

              totalStaked = activatedStakeLamports / LAMPORTS_PER_SOL
            }
          }
        } catch (stakewizError) {
          console.error('Error fetching StakeWiz data:', stakewizError)
          // Continue with default values if StakeWiz API fails
        }

        return {
          totalStaked,
          nextEpoch,
          apy: apy_estimate,
          uptime,
        }
      } catch (error) {
        console.error('Error fetching validator data:', error)
        throw new Error('Failed to fetch validator data')
      }
    },
    refetchInterval: 60_000,
  })

  return {
    ...rest,
    data: data ?? INITIAL_DATA,
    invalidate: () =>
      queryClient.invalidateQueries({
        queryKey: ['validator', validatorAddress],
      }),
  }
}

export default useValidator
