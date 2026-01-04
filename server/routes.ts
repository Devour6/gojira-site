import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === Portfolio ===
  app.get(api.portfolio.list.path, async (req, res) => {
    const items = await storage.getPortfolioItems();
    res.json(items);
  });

  // === Stats (Mock Data for MVP) ===
  
  app.get(api.stats.hero.path, (req, res) => {
    // Mock live data - normally would fetch from Solana RPC / Price API
    res.json({
      totalStakedUsd: 125000000,
      totalStakedSol: 850000,
      apy: 7.2,
      uptime30d: 99.98,
      solPrice: 147.50,
    });
  });

  app.get(api.stats.validator.path, (req, res) => {
    res.json({
      identity: "gojir4Wn8g...",
      voteAccount: "goJiRADN9x...",
      commission: 5,
      apy: 7.2,
      uptime30d: 99.98,
      status: "Active",
      totalStakeSol: 850000,
      version: "1.18.15",
      location: "Tokyo, JP",
    });
  });

  app.get(api.stats.staking.path, (req, res) => {
    const now = new Date();
    // Simulate next epoch ending in ~2 days
    const nextEpoch = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString();
    
    res.json({
      apy: 7.2,
      availableBalance: 0, // Would rely on wallet connection in real app
      nextEpoch,
      epochProgress: 45,
    });
  });

  // === Seed Data ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getPortfolioItems();
  if (existing.length === 0) {
    console.log("Seeding portfolio items...");
    await storage.createPortfolioItem({
      name: "Solana",
      description: "High-performance L1 blockchain infrastructure.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
      category: "L1",
      websiteUrl: "https://solana.com"
    });
    await storage.createPortfolioItem({
      name: "Jito",
      description: "MEV infrastructure for Solana validators.",
      imageUrl: "https://jito.wtf/logo.png", // Placeholder
      category: "Infrastructure",
      websiteUrl: "https://jito.wtf"
    });
    await storage.createPortfolioItem({
      name: "Pyth",
      description: "Real-time market data oracle.",
      imageUrl: "https://pyth.network/logo.png", // Placeholder
      category: "Oracle",
      websiteUrl: "https://pyth.network"
    });
     await storage.createPortfolioItem({
      name: "Jupiter",
      description: "The best swap aggregator on Solana.",
      imageUrl: "https://jup.ag/logo.png", // Placeholder
      category: "DeFi",
      websiteUrl: "https://jup.ag"
    });
  }
}
