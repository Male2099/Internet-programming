const Categories = require("../models/categories");

const findById = async (id) => {
  const result = await Categories.findById(id);
  if (!result) {
    return {
      success: false,
      error: id + " not found!",
    };
  }
  return result;
};

const findAll = async () => {
  return await Categories.find();
};

const findCategorizedItems = async () => {
  return await Categories.aggregate([
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "category",
        as: "items",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        desc: 1,
        imageUrl: 1,
        items: {
          _id: 1,
          name: 1,
          category: 1,
          desc: 1,
        },
      },
    },
  ]);
};

const create = async (newCategory) => {
  // to do
  if (await Categories.findOne({ name: newCategory.name })) {
    return {
      success: false,
      error: newCategory.name + " exited",
    };
  }
  const createdCate = await Categories.create(newCategory);
  return createdCate;
};

const update = async (updateCategory) => {
  const {_id, name, desc, imageUrl}=updateCategory;
  const result=await Categories.findByIdAndUpdate(_id, {name, desc, imageUrl})
  if(!result){
    return {
      success:false,
      error: "category does not exist"+updateCategory
    }
  }
  return {
    updateCategory
  }
};

const remove = async (id) => {
  // to do
  const result=await Categories.findByIdAndDelete(id);
  console.log(id);
  if(!result){
    console.log(result);
    return {
      success:false,
      erro: id+" not found"
    }
  }
  return {
    success:true,
    result: id+ ",deleted"
  }

};

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create,
  findCategorizedItems,
};
