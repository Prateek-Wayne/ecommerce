import Category from "../model/Category.js";

export const createCategoryCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      throw new Error("Category already exists...");
    }
    const newCategory = await Category.create({
      name,
      user: req.userAuthId,
      image: req.file.path,
    });
    return res.status(201).json({
      success: true,
      msg: "Category Created Successfully",
      newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCategoryCtrl = async (req, res) => {
  try {
    const singleCategory = await Category.findById(req.params.id);
    if (!singleCategory) {
      return res.status(204).json({
        success: false,
        msg: "Category does not exist...",
      });
    }
    return res.status(200).json({
      success: true,
      singleCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCategoriesCtrl = async (req, res) => {
  try {
    const Categories = await Category.find();
    res.status(200).json({
      success: true,
      Categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateCategoryCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      { new: true },
    );
    if (!updatedCategory) {
      return res.status(204).json({
        success: false,
        msg: "categories not found",
      });
    }
    return res.status(200).json({
      success: true,
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const deleteCategoryCtrl = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(204).json({
        success: false,
        msg: "Category Not found 😔",
      });
    }
    return res.status(200).json({
      success: true,
      deleted,
      msg: "Category Successfuly deleted Category ❌",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
