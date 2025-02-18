import {
  insertUserEmailSchema,
  insertUserGoogleSchema,
  selectUsersSchema,
} from "@/db/schema";
import { z } from "zod";

export type User = z.infer<typeof selectUsersSchema>;
export type NewEmailUser = z.infer<typeof insertUserEmailSchema>;
export type NewGoogleUser = z.infer<typeof insertUserGoogleSchema>;
