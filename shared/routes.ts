import { z } from 'zod';
import { portfolioItems, insertPortfolioItemSchema } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  portfolio: {
    list: {
      method: 'GET' as const,
      path: '/api/portfolio',
      responses: {
        200: z.array(z.custom<typeof portfolioItems.$inferSelect>()),
      },
    },
  },
  stats: {
    hero: {
      method: 'GET' as const,
      path: '/api/stats/hero',
      responses: {
        200: z.object({
          totalStakedUsd: z.number(),
          totalStakedSol: z.number(),
          apy: z.number(),
          uptime30d: z.number(),
          solPrice: z.number(),
        }),
      },
    },
    validator: {
      method: 'GET' as const,
      path: '/api/stats/validator',
      responses: {
        200: z.object({
          identity: z.string(),
          voteAccount: z.string(),
          commission: z.number(),
          apy: z.number(),
          uptime30d: z.number(),
          status: z.enum(['Active', 'Inactive', 'Delinquent']),
          totalStakeSol: z.number(),
          version: z.string(),
          location: z.string(),
        }),
      },
    },
    staking: {
      method: 'GET' as const,
      path: '/api/stats/staking',
      responses: {
        200: z.object({
          apy: z.number(),
          availableBalance: z.number(),
          nextEpoch: z.string(),
          epochProgress: z.number(),
        }),
      },
    }
  },
};

// ============================================
// HELPER
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPES
// ============================================
export type PortfolioListResponse = z.infer<typeof api.portfolio.list.responses[200]>;
export type HeroStatsResponse = z.infer<typeof api.stats.hero.responses[200]>;
export type ValidatorStatsResponse = z.infer<typeof api.stats.validator.responses[200]>;
export type StakingStatsResponse = z.infer<typeof api.stats.staking.responses[200]>;
