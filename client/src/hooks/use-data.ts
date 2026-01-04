import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Portfolio
export function usePortfolio() {
  return useQuery({
    queryKey: [api.portfolio.list.path],
    queryFn: async () => {
      const res = await fetch(api.portfolio.list.path);
      if (!res.ok) throw new Error("Failed to fetch portfolio");
      return api.portfolio.list.responses[200].parse(await res.json());
    },
  });
}

// Hero Stats
export function useHeroStats() {
  return useQuery({
    queryKey: [api.stats.hero.path],
    queryFn: async () => {
      const res = await fetch(api.stats.hero.path);
      if (!res.ok) throw new Error("Failed to fetch hero stats");
      return api.stats.hero.responses[200].parse(await res.json());
    },
    refetchInterval: 10000, // Live ticker feel
  });
}

// Validator Stats
export function useValidatorStats() {
  return useQuery({
    queryKey: [api.stats.validator.path],
    queryFn: async () => {
      const res = await fetch(api.stats.validator.path);
      if (!res.ok) throw new Error("Failed to fetch validator stats");
      return api.stats.validator.responses[200].parse(await res.json());
    },
  });
}

// Staking Stats
export function useStakingStats() {
  return useQuery({
    queryKey: [api.stats.staking.path],
    queryFn: async () => {
      const res = await fetch(api.stats.staking.path);
      if (!res.ok) throw new Error("Failed to fetch staking stats");
      return api.stats.staking.responses[200].parse(await res.json());
    },
  });
}
