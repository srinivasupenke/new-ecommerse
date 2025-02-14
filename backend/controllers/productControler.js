import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//function for add product
const addProduct = async (req, res) => {
  try {
    const { name, category, old_price, new_price } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      category,
      old_price: Number(old_price),
      new_price: Number(new_price),
      image: imageUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added" });
    console.log("product added");
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for list all products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    console.log(products);

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID required" });
    }

    await productModel.findByIdAndDelete(req.body.id);
    console.log(req.body);
    console.log(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId);
    const product = await productModel.findById(productId);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
