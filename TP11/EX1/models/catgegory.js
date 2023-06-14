const mongoose = require("mongoose");

const shopScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shops: [shopScema],
});

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [productSchema],
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCategories: [subCategorySchema],
});

const shop=mongoose.model("shop", shopScema)
const product = mongoose.model("product", productSchema);
const subCategory = mongoose.model("subcategory", subCategorySchema);
const category = mongoose.model("category", categorySchema);

module.exports = { category, subCategory, product, shop };
