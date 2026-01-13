import type { Express } from 'express'
import type { Server } from 'http'
import { storage } from './storage'
import { api } from '@shared/routes'
import { z } from 'zod'

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === Portfolio ===
  app.get(api.portfolio.list.path, async (req, res) => {
    const items = await storage.getPortfolioItems()
    res.json(items)
  })

  // === Stats ===

  const VALIDATOR_ADDRESSES = [
    'goJiRADNdmfnJ4iWEyft7KaYMPTVsRba2Ee1akDEBXb',
    'dedxrPfNqPKBRmUyP9LDkaitpQzU6PD44jA6GP9Ndhk',
    'nebu1WnZBrFZz5X7sfPWuEqyb8LBSsrXpxaesnK9CRE',
    'fuyugZxM5S4NyV3ZYoc6ebs3fmRTrZ3X27MKCFvHpVD',
  ]

  const LAMPORTS_PER_SOL = 1_000_000_000

  app.get(api.stats.hero.path, async (req, res) => {
    try {
      // Fetch validator data from StakeWiz API for all validators in parallel
      const validatorPromises = VALIDATOR_ADDRESSES.map(async (address) => {
        try {
          const response = await fetch(
            `https://api.stakewiz.com/validator/${address}`
          )
          if (!response.ok) {
            console.error(
              `Failed to fetch validator ${address}: ${response.statusText}`
            )
            return null
          }
          return await response.json()
        } catch (error) {
          console.error(`Error fetching validator ${address}:`, error)
          return null
        }
      })

      // Fetch SOL price from CoinGecko API
      const pricePromise = fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
      )
        .then(async (response) => {
          if (!response.ok) {
            console.error(`Failed to fetch SOL price: ${response.statusText}`)
            return null
          }
          return await response.json()
        })
        .catch((error) => {
          console.error('Error fetching SOL price:', error)
          return null
        })

      // Wait for all requests to complete
      const [validators, priceData] = await Promise.all([
        Promise.all(validatorPromises),
        pricePromise,
      ])

      console.log('validators', validators)
      console.log('priceData', priceData)

      // Process validator data
      let totalStakedSol = 0
      const apyValues: number[] = []
      const uptimeValues: number[] = []

      for (const validator of validators) {
        if (validator && validator.activated_stake !== undefined) {
          // Convert lamports to SOL
          totalStakedSol += validator.activated_stake

          console.info('validator.activated_stake', validator.activated_stake)

          // Collect APY values
          if (validator.apy !== undefined) {
            const apy =
              typeof validator.apy === 'number'
                ? validator.apy
                : parseFloat(validator.apy)
            if (!isNaN(apy)) apyValues.push(apy)
          }

          // Collect uptime values
          if (validator.uptime !== undefined) {
            const uptime =
              typeof validator.uptime === 'number'
                ? validator.uptime
                : parseFloat(validator.uptime)
            if (!isNaN(uptime)) uptimeValues.push(uptime)
          }
        }
      }

      // Calculate average APY and uptime, or use fallback
      const apy =
        apyValues.length > 0
          ? apyValues.reduce((sum, val) => sum + val, 0) / apyValues.length
          : 7.2
      const uptime30d =
        uptimeValues.length > 0
          ? uptimeValues.reduce((sum, val) => sum + val, 0) /
            uptimeValues.length
          : 99.98

      // Extract SOL price from CoinGecko response
      let solPrice = 147.5 // Fallback price
      if (priceData && priceData.solana && priceData.solana.usd) {
        solPrice = priceData.solana.usd
      }

      // Calculate total staked USD
      const totalStakedUsd = totalStakedSol * solPrice

      console.log('totalStakedUsd', totalStakedUsd)
      console.log('totalStakedSol', totalStakedSol)
      console.log('apy', apy)
      console.log('uptime30d', uptime30d)
      console.log('solPrice', solPrice)

      res.json({
        totalStakedUsd,
        totalStakedSol,
        apy,
        uptime30d,
        solPrice,
      })
    } catch (error) {
      console.error('Error fetching hero stats:', error)
      // Fallback to mock data if everything fails
      res.json({
        totalStakedUsd: 125000000,
        totalStakedSol: 850000,
        apy: 7.2,
        uptime30d: 99.98,
        solPrice: 147.5,
      })
    }
  })

  app.get(api.stats.validator.path, (req, res) => {
    res.json({
      identity: 'gojir4WnhS7VS1JdbnanJMzaMfr4UD7KeX1ixWAHEmw',
      voteAccount: 'goJiRADNdmfnJ4iWEyft7KaYMPTVsRba2Ee1akDEBXb',
      commission: 5,
      apy: 7.2,
      uptime30d: 99.98,
      status: 'Active',
      totalStakeSol: 850000,
      version: '1.18.15',
      location: 'Tokyo, JP',
    })
  })

  app.get(api.stats.staking.path, (req, res) => {
    const now = new Date()
    // Simulate next epoch ending in ~2 days
    const nextEpoch = new Date(
      now.getTime() + 48 * 60 * 60 * 1000
    ).toISOString()

    res.json({
      apy: 7.2,
      availableBalance: 0, // Would rely on wallet connection in real app
      nextEpoch,
      epochProgress: 45,
    })
  })

  // === Seed Data ===
  await seedDatabase()

  return httpServer
}

async function seedDatabase() {
  const existing = await storage.getPortfolioItems()
  if (existing.length === 0) {
    console.log('Seeding portfolio items...')
    await storage.createPortfolioItem({
      name: 'Solana',
      description: 'High-performance L1 blockchain infrastructure.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
      category: 'L1',
      websiteUrl: 'https://solana.com',
    })
    await storage.createPortfolioItem({
      name: 'Jito',
      description: 'MEV infrastructure for Solana validators.',
      imageUrl: 'https://jito.wtf/logo.png', // Placeholder
      category: 'Infrastructure',
      websiteUrl: 'https://jito.wtf',
    })
    await storage.createPortfolioItem({
      name: 'Pyth',
      description: 'Real-time market data oracle.',
      imageUrl: 'https://pyth.network/logo.png', // Placeholder
      category: 'Oracle',
      websiteUrl: 'https://pyth.network',
    })
    await storage.createPortfolioItem({
      name: 'Jupiter',
      description: 'The best swap aggregator on Solana.',
      imageUrl: 'https://jup.ag/logo.png', // Placeholder
      category: 'DeFi',
      websiteUrl: 'https://jup.ag',
    })
  }
}
