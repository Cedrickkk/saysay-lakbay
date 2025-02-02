import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  verbose: true,
  strict: true,
  dbCredentials: {
    // TODO: Fix `process` not being read properly.
    url: process.env.DATABASE_URL!,
  },
});
