const express = require("express");
const router = express.Router();
const { crud_category } = require("../service/crud");
const { category, subCategroy, product } = require("../models/catgegory");

router.post("/", (req, res) => {
  res.send("~~~~~~hello from the API ~~~~~~~~~~");
});


router.post("/category-add",crud_category.notExist, crud_category.add ,async(req, res, next) => {
    const {name}=req.body;
    const added=await category.findOne({name})
    res.json({
        success:true,
        result:added
    })
});


router.post("/category-get",crud_category.exist,async(req, res, next) => {
    const {name}=req.body;
    const added=await category.findOne({name})
    res.json({
        success:true,
        result:added
    })
});

router.post("/category-delete", crud_category.exist, crud_category.delete, (req, res, next)=>{
    const {name}=req.body;
    res.json({
        success:true,
        result:name+", category has been deleted"
    })
})


router.post("/category-update", crud_category.exist, crud_category.update, async(req, res, next)=>{
    const {name, toName}=req.body;
    const updated=await category.findOne({toName})
    res.json({
        success:true,
        result:updated
    })
})
module.exports = router;
