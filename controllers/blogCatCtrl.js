const BCategory = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodb");

const createBCategory = asyncHandler(async (req, res) => {
  try {
    const newBCategory = await BCategory.create(req.body);
    res.json(newBCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedBCategory = await BCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const deletedBCategory = await BCategory.findByIdAndDelete(id);
    res.json("deleted ");
  } catch (error) {
    throw new Error(error);
  }
});

const getBCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaBCategory = await BCategory.findById(id);
    res.json(getaBCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBCategories = asyncHandler(async (req, res) => {
  try {
    const getCategories = await BCategory.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBCategory,
  updateBCategory,
  deleteBCategory,
  getBCategory,
  getAllBCategories,
};
