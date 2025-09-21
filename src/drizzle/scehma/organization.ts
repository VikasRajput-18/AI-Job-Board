import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedtAt } from "../schemaHelper";

export const OrganizationTable = pgTable("organizations", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar(),
  createdAt,
  updatedtAt,
});
