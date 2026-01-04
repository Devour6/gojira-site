import { db } from "./db";
import { portfolioItems, type PortfolioItem, type InsertPortfolioItem } from "@shared/schema";

export interface IStorage {
  // Portfolio
  getPortfolioItems(): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  // No DB methods needed for stats as they are mocked/live-fetched in routes for now
}

export class DatabaseStorage implements IStorage {
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems);
  }

  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const [newItem] = await db.insert(portfolioItems).values(item).returning();
    return newItem;
  }
}

export const storage = new DatabaseStorage();
