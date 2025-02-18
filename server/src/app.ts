import { configurePassport } from "@/config/passport";
import auth from "@/routes/auth.routes";
import routes from "@/routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { errorHandlerMiddleware } from "./middlewares/error";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("tiny"));

configurePassport();

app.use(passport.initialize());

app.use("/auth", auth);

app.use("/api", routes);

app.use(errorHandlerMiddleware);

export default app;
