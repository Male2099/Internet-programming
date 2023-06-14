const { category, subCategroy, product } = require("../models/catgegory");

const crud_category = {
  notExist: async (req, res, next) => {
    const { name } = req.body;
    if (await category.findOne({ name })) {
      return res.json({
        success: false,
        error: name + ",category existed",
      });
    }
    next();
  },
  exist: async (req, res, next) => {
    const { name } = req.body;

    if (!(await category.findOne({ name }))) {
      return res.json({
        success: false,
        error: name + ",category does not exist",
      });
    }
    next();
  },
  add: async (req, res, next) => {
    const { name } = req.body;
    try {
      const newCategory = new category({
        name,
      });
      await newCategory.save();
      next();
    } catch (e) {
      return res.json({
        success: false,
        error: name + ", failded to add category" + e,
      });
    }
  },
  delete: async (req, res, next) => {
    const { name } = req.body;
    try {
      await category.deleteOne({ name });
      next();
    } catch (e) {
      res.json({
        success: false,
        error: name + ", false to delete category" + e,
      });
    }
  },
  update: async (req, res, next) => {
    const { name, to_name } = req.body;

    try {
      await category.updateOne({ name }, { name: to_name });
      next();
    } catch (e) {
      res.json({
        success: false,
        error: name + ", false to update category" + e,
      });
    }
  },
};



const crud_subcategory = {
  notExist: async (req, res, next) => {
    const { name } = req.body;
    if (await subCategroy.findOne({ name })) {
      return res.json({
        success: false,
        error: name + ",category existed",
      });
    }
    next();
  },
  exist: async (req, res, next) => {
    const { name } = req.body;

    if (!(await subCategroy.findOne({ name }))) {
      return res.json({
        success: false,
        error: name + ",category does not exist",
      });
    }
    next();
  },
  add:async(req, res, next)=>{
    const {category_name, subCategroy_name}=req.body;
    const getCategory=category.findOne({name:category_name});
    getCategory.subCategroy
  }
};

module.exports = {
  crud_category,
  crud_subcategory
};
