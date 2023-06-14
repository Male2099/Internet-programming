const { category, subCategory, product, shop } = require("../models/catgegory");

module.exports = () => {
  const newShop = new shop({
    name: "shop1",
    price: 100,
  });

  newShop
    .save()
    .then(() => console.log("New shop created"))
    .catch((err) => console.error(err));

  const newProduct = new product({
    name: "product1",
    shops: [newShop],
  });

  newProduct
    .save()
    .then(() => console.log("New product created"))
    .catch((err) => console.error(err));

  const newSubCategory = new subCategory({
    name: "subcategory1",
    products: [newProduct],
  });

  newSubCategory
    .save()
    .then(() => console.log("New sub category created"))
    .catch((err) => console.error(err));

  const newCategory = new category({
    name: "category1",
    subCategories: [newSubCategory],
  });


  newCategory
    .save()
    .then(() => console.log("New category created"))
    .catch((err) => console.error(err));
};

