const Products = require("../models/products");

var mongoose = require("mongoose");

const findById = async (id) => {
  const products = await Products.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "prices",
        localField: "_id",
        foreignField: "product",
        as: "prices",
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "item",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        category: { $arrayElemAt: ["$category", 0] },
        item: { $arrayElemAt: ["$item", 0] },
        user: { $arrayElemAt: ["$user", 0] },
      },
    },
    {
      $project: {
        "user.password": 0,
      },
    },
  ]);
  return products;
};

// const findAll = async () => {
//   const products = await Products.aggregate([
//     {
//       $lookup: {
//         from: "prices",
//         localField: "_id",
//         foreignField: "product",
//         as: "prices"
//       }
//     }
//   ])

//   if (!products?.length)
//     return []

//   return products
// }
const findAll = async () => {
  const products = await Products.aggregate([
    {
      $lookup: {
        from: "prices",
        localField: "_id",
        foreignField: "product",
        as: "prices",
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "item",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        category: { $arrayElemAt: ["$category", 0] },
        item: { $arrayElemAt: ["$item", 0] },
        user: { $arrayElemAt: ["$user", 0] },
      },
    },
    {
      $project: {
        "user.password": 0,
      },
    },
  ]);
  return products;
};

const create = async (newProduct) => {
  const createdProduct = await Products.create(newProduct);
  return createdProduct;
};

const update = async (updateProduct) => {
  // to do
  const { _id, title, category, item, user, imageUrl, desc } = updateProduct;
  const result = await Products.findByIdAndUpdate(_id, {
    title,
    category,
    item,
    user,
    imageUrl,
    desc,
  });
  if (!result) {
    return {
      success: false,
      error: "category does not exist" + updateProduct,
    };
  }
  return {
    updateProduct,
  };
};

const remove = async (id) => {
  const result = await Products.findByIdAndDelete(id);

  if (!result) {
    return {
      success: false,
      erro: id + " not found",
    };
  }
  return {
    success: true,
    result: id + ",deleted",
  };
};

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create,
};
