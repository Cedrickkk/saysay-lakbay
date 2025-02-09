import { configurePassport } from "@/config/passport";
import auth from "@/routes/auth.routes";
import routes from "@/routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

configurePassport();

app.use("/auth", auth);

app.use("/api", routes);

export default app;
