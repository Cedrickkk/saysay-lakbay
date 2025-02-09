import { getUserById, getUsers } from "@/controllers/user-controller";
import { Router } from "express";

const router = Router();

router.route("/").get(getUsers);

router.route("/:id").get(getUserById);

export default router;
