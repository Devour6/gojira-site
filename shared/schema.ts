import { pgTable, text, serial, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Portfolio items for the "Our Investments" section
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(), // URL to logo
  websiteUrl: text("website_url"),
  category: text("category"), // e.g., "DeFi", "Infrastructure"
});

// === SCHEMAS ===
export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({ id: true });

// === TYPES ===
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;

// === API CONTRACT TYPES ===

// Stats for Hero and Staking Widget (Live Data Structure)
export interface HeroStats {
  totalStakedUsd: number;
  totalStakedSol: number;
  apy: number;
  uptime30d: number;
  solPrice: number;
}

// Validator Details for /validator page
export interface ValidatorDetails {
  identity: string;
  voteAccount: string;
  commission: number;
  apy: number;
  uptime30d: number;
  status: 'Active' | 'Inactive' | 'Delinquent';
  totalStakeSol: number;
  version: string;
  location: string;
}

// Staking Widget Data
export interface StakingData {
  apy: number;
  availableBalance: number; // For simulation
  nextEpoch: string; // ISO date string
  epochProgress: number; // 0-100
}
