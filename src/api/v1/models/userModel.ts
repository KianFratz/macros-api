import bcrypt from "bcryptjs";
import pool, { prisma } from "../../../config/db.js";
import type { User } from "../interfaces/types/user.js";
import { existingUser } from "../utils/existingUser.js";


export const getAllUsersService = async () =>   {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const createUserService = async (
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> => {

  const user = await prisma.user.create({
    data: { name, email, password, role}, 
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  })
  
  return user;
};

export const updateUserService = async (
  id: number,
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> => {

  // check user if does exist for efficient error handling
  const user = await existingUser(id);

  if (!user) {
    throw new Error("User does not exist");
  }

  const updateUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      password,
      role
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }  
  })

  return updateUser;

  
};

export const deleteUserService = async (id: number) => {

  // check user if does exist for efficient error handling
  const user = await existingUser(id);

  if (!user) {
    throw new Error("User does not exist");
  }

  return await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  })
};
