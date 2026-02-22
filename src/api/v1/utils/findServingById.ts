import { prisma } from "../../../config/db.js";

export const findServingById = async (serving_id: number) => {
  const serving = await prisma.serving.findUnique({
    where: { id: serving_id },
  });
  return serving ?? null;
};

export default findServingById;
