import { verifyAccessToken } from "@/middlewares/token";
import authRoutes from "@/routes/auth.routes";
import users from "@/routes/users.routes";
import express from "express";

const app = express();

app.use("/auth", authRoutes);

app.use("/users", verifyAccessToken, users);

export default app;
