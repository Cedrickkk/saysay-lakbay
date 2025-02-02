import app from "@/app";
import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { db } from "./db";

const PORT = process.env.PORT || 8787;

const main = async () => {
  await migrate(db, {
    migrationsFolder: path.join(__dirname, "./db/migrations"),
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main().catch((err) => console.log(err));
