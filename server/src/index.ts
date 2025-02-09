import app from "@/app";
import { APP_PORT } from "@/utils/constants";
import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { db } from "./db";

const main = async () => {
  await migrate(db, {
    migrationsFolder: path.join(__dirname, "./db/migrations"),
  });

  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
};

main().catch((err) => console.log(err));
