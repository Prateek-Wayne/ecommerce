import Brand from "../model/Brand.js";

export const createBrandCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    const brandExists = await Brand.findOne({ name });
    if (brandExists) {
      throw new Error("Category already exists...");
    }
    const newBrand = await Brand.create({
      name,
      user: req.userAuthId,
    });
    return res.status(200).json({
      success: true,
      msg: "Brand Created Successfully 🫡🚀",
      newBrand,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getBrandCtrl = async (req, res) => {
  try {
    const singleBrand = await Brand.findById(req.params.id);
    if (!singleBrand) {
      return res.status(500).json({
        success: false,
        msg: "Brand does not exist...",
      });
    }
    return res.status(200).json({
      success: true,
      singleBrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getBrandsCtrl = async (req, res) => {
  try {
    const Brands = await Brand.find();
    res.status(201).json({
      success: true,
      Brands,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateBrandCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedBrands = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      { new: true },
    );
    if (!updatedBrands) {
      return res.status(500).json({
        success: false,
        msg: "brands not found",
      });
    }
    return res.status(200).json({
      success: true,
      updatedBrands,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteBrandCtrl = async (req, res) => {
  try {
    const deleted = await Brand.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(200).json({
        success: false,
        msg: "Brands Not found 😔",
      });
    }
    return res.status(200).json({
      success: true,
      deleted,
      msg: "Brands Successfuly deleted Category ❌",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
