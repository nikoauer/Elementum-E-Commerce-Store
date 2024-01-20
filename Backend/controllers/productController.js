import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {

    try {
      const { brand, name, description, price, category, quantity, image } = req.body;
  
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
          return res.json({ error: "Image is required" })
      }
  
      const product = new Product({ brand, name, description, price, category, quantity, image });
      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

export { addProduct };
