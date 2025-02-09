import app from "@/app";
import routes from "@/routes/index";
import { APP_PORT } from "@/utils/constants";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import express from "express";
import path from "path";
import { configurePassport } from "@/config/passport";
import { db } from "./db";

const main = async () => {
  await migrate(db, {
    migrationsFolder: path.join(__dirname, "./db/migrations"),
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());

  configurePassport();

  app.use("/api", routes);

  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
};

main().catch((err) => console.log(err));
