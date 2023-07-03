var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
var router = express.Router();
const categoryService = require('../services/category');

router.get('/id/:id', auth.ensureSignedIn, async function (req, res) {
  const { id } = req.params;
  const result=await categoryService.findById(id);
  res.json(result);
})


// Categorized items
router.get('/categorized-items', async (req, res) => {
  const result = await categoryService.findCategorizedItems()
  res.json(result);
})


router.post('/create', auth.ensureSignedIn, async (req, res, next) => {
  console.log("req.body::"+req.body);
  const { name, desc, imageUrl } = req.body;
  const result = await categoryService.create({ name, desc, imageUrl })
  res.json(result);
})

// all categories
router.get('/all', async(req, res) => {
  const result=await categoryService.findAll()
  res.json(result);
})

router.post('/update', auth.ensureSignedIn, async (req, res, next) => {
  const {_id, name, desc, imageUrl}=req.body;

  const result=await categoryService.update({_id, name, desc, imageUrl})
  res.json(result);
})



router.post('/delete/:id', auth.ensureSignedIn, async (req, res, next) => {
  const {id}=req.params;
  const result=await categoryService.remove(id)
  res.json(result);
})

module.exports = router