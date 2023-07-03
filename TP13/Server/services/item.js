const { default: mongoose } = require("mongoose");
const Items = require("../models/items");

const findById = async (id) => {
  const items_id = mongoose.Types.ObjectId(id);
  return await Items.aggregate([
    { $match: { _id: items_id } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "item",
        as: "products",
        pipeline: [
          {
            $lookup: {
              from: "prices",
              localField: "_id",
              foreignField: "product",
              as: "prices",
            },
          },
        ],
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
      $addFields: {
        category: { $arrayElemAt: ["$category", 0] },
      },
    },
  ]);
};
const findAll = async () => {
  return await Items.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "item",
        as: "products",
        pipeline: [
          {
            $lookup: {
              from: "prices",
              localField: "_id",
              foreignField: "product",
              as: "prices",
            },
          },
        ],
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
      $addFields: {
        category: { $arrayElemAt: ["$category", 0] },
      },
    },
  ]);
};

const create = async (newItem) => {
  // to do
  const createdItem = await Items.create(newItem);
  return createdItem;
};

const update = async (updateItem) => {
  // to do
  const { _id, name, desc, category } = updateItem;
  const result = await Items.findByIdAndUpdate(_id, { name, desc, category });
  if (!result) {
    return {
      success: false,
      error: "items does not exist" + updateItem,
    };
  }
  return {
    updateItem,
  };
};

const remove = async (id) => {
  // to do
  const result = await Items.findByIdAndDelete(id);
  if (!result) {
    return {
      success: false,
      error: id + " not found",
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
