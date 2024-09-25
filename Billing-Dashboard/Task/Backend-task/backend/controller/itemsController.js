const Items = require("../model/itemsModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// create Items
exports.createItems = catchAsyncError(async (req, res, next) => {
  const items = await Items.create(req.body);

  res.status(201).json({
    success: true,
    items,
  });
});

// Get all Items
exports.getAllItems = catchAsyncError(async (req, res) => {

  const itemsCount = await Items.countDocuments();

  const apiFeature = new ApiFeatures(Items.find(), req.query)
  const items = await apiFeature.query;

  res.status(200).json({
    success: true,
    items,
    itemsCount,
  });
});

// get Items details Find By Id
exports.getItemsDetails = catchAsyncError(async (req, res, next) => {
  const items = await Items.findById(req.params.id);

  if (!items) {
    return next(new ErrorHander("Items not found", 404));
  }

  res.status(200).json({
    success: true,
    items,
  });
});

// Update Items by Id
exports.updateItems = catchAsyncError(async (req, res, next) => {
  let items = await Items.findById(req.params.id);

  if (!items) {
    return next(new ErrorHander("Items not found", 404));
  }

  items = await Items.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    items,
  });
});

// delete Item by Id
exports.deleteItems = async (req, res, next) => {
  try {
    const items = await Items.findByIdAndDelete(req.params.id);

    if (!items) {
      return next(new ErrorHander("Items not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Items Delete Successful",
    });
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};