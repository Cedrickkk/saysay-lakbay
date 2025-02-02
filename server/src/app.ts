import express from "express";
import users from "@/routes/users";

const app = express();

app.use(express.json());

app.use("/saysay-lakbay/users", users);

export default app;
