const Prices = require("../models/prices");

const findAll = async () => {
  return await Prices.find()
}

const create = async (newPrice) => {
  // to do
  const createdPrice = await Prices.create(newPrice);
  return createdPrice;
}

const update = async (newPrice) => {
  const {id, price, source}=newPrice;
  const result=await Prices.findByIdAndUpdate({_id:id}, {price, source});
  if(!result){
    return{
      success:false,
      error: "false to update price " + id
    }
  }
  return{
    success:true,
    result
  }
}

const remove = async (id) => {
  const result=await Prices.findOneAndDelete({_id:id})
  if(!result){
    return{
      success:false,
      error: "false to to delete price " + id
    }
  }
  return{
    success:true,
    result
  }
}

const findById=async (id)=>{
  const result=await Prices.findById({_id:id})
  if(!result){
    return{
      success:false,
      error: "Not found " + id
    }
  }
  return{
    success:true,
    result
  }
}
module.exports = {
  update,
  remove,
  findAll,
  create,
  findById
}