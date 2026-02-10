import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { success } from "better-auth/*";

const createCategory = async (req: Request, res: Response) => {
  try{
    console.log("HIT: POST /category")
    console.log("Request Body: ",req.body)

    const result = await CategoryService.createCategory(req.body);

    console.log("Result: ", result)

  res.status(201).json({
    success: true,
    message: "Category created Successfully",
    data: result,
  });
  }catch(error: any){
    res.status(500).json({
      success: false,
      message:  error.message
    })
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();

  res.status(200).json({
    success: true,
    data: result,
  });
};

const getSingleCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CategoryService.getSingleCategory(id as string);

  res.status(200).json({
    success: true,
    data: result,
  });
};

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CategoryService.updateCategory(id as string, req.body);

  res.status(200).json({
    success: true,
    message: "Category updated Successfully",
    data: result,
  });
};

const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params;

  const result = await CategoryService.deleteCategory(id as any);

  res.status(200).json({
    success: true,
    message: "Category deleted Successfully",
    data: result,
  });
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
