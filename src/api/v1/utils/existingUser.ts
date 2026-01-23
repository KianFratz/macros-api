import { prisma } from "../lib/prisma";

export const existingUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
