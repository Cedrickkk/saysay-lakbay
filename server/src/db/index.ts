import "dotenv/config";
import * as schema from "@/db/schema/index";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
