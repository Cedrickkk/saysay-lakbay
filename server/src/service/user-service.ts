import { getUserByIdData, getUsersData } from "@/data/user-data";
import { NotFoundError } from "@/utils/errors";

export const getUsersService = async () => {
  return await getUsersData();
};

export const getUserByIdService = async (id: number) => {
  const user = await getUserByIdData(id);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  return user;
};
