import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUsersData = async () => {
  const result = await db.select().from(users);
  return result;
};

export const getUserByIdData = async (id: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  return user;
};
