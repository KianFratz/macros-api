import pool, { prisma } from "../../../config/db.js";


export const getAllCategoriesService = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};


export const getCategoryByIdService = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
  }); 

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};


export const createCategoryService = async (name: string) => {
  const category = await prisma.category.create({
    data : { name }, 
    select: {
      id: true,
      name: true,
      createdAt: true
    }
  }
  );

  return category;
};


export const deleteCategoryService = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const deleteCategory = await prisma.category.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      createdAt: true
    }
  });

  return deleteCategory;
};

export const updateCategoryService = async (id: number, name: string) => {

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  
  const updatedCategory = await prisma.category.update( {
    where : { id },
    data : {
      name
    },
    select : {
      id: true,
      name: true,
      createdAt: true
    }
  });

  return updatedCategory;
};
