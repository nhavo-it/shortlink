import { pgTable, text, timestamp, varchar, serial, integer } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  url: text("url").notNull(),
  title: varchar("title", { length: 255 }),
  owner_id: varchar("owner_id", { length: 255 }).notNull(), // Supabase user id
  created_at: timestamp("created_at").defaultNow().notNull(),
  clicks: integer("clicks").default(0).notNull(),
});
