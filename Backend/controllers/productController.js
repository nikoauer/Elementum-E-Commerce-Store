import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { brand, name, description, price, category, quantity, image } =
      req.body;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !image:
        return res.json({ error: "Image is required" });
    }

    const product = new Product({
      brand,
      name,
      description,
      price,
      category,
      quantity,
      image,
    });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { brand, name, description, price, category, quantity, image } =
      req.body;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !image:
        return res.json({ error: "Image is required" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { brand, name, description, price, category, quantity, image },
      { new: true }
    );

    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    res.json(deleteProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while trying to delete" });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 9;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Problem while trying to retrieve all products" });
  }
});

const fetchProductById = asyncHandler(async(req, res) => {
    try {

        const product = await Product. findById(req.params.id)

        if(product) {
            return res.json(product)
        } else {
            res.status(404)
            throw new Error("Product could not be found")
        }
        
    } catch (error) {
        console.error(error);
        res
          .status(404)
          .json({ error: "Product could not be found" });
    }
})

export { addProduct, updateProductDetails, deleteProduct, getAllProducts, fetchProductById };
