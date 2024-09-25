const Customers = require("../model/customersModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// create Customers
exports.createCustomers = catchAsyncError(async (req, res, next) => {
  const customers = await Customers.create(req.body);

  res.status(201).json({
    success: true,
    customers,
  });
});

// Get all Customers
exports.getAllCustomers = catchAsyncError(async (req, res) => {

  const customersCount = await Customers.countDocuments();

  const apiFeature = new ApiFeatures(Customers.find(), req.query)
  const customers = await apiFeature.query;

  res.status(200).json({
    success: true,
    customers,
    customersCount,
  });
});

// get Customers details Find By Id
exports.getCustomersDetails = catchAsyncError(async (req, res, next) => {
  const customers = await Customers.findById(req.params.id);

  if (!customers) {
    return next(new ErrorHander("Customers not found", 404));
  }

  res.status(200).json({
    success: true,
    customers,
  });
});

// Update Customers
exports.updateCustomers = catchAsyncError(async (req, res, next) => {
  let customers = await Customers.findById(req.params.id);

  if (!customers) {
    return next(new ErrorHander("Customers not found", 404));
  }

  customers = await Customers.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    customers,
  });
});

// Customers details delete by id 
exports.deleteCustomers = async (req, res, next) => {
  try {
    const customers = await Customers.findByIdAndDelete(req.params.id);

    if (!customers) {
      return next(new ErrorHander("Customers not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Customers delete successful",
    });
  } catch (error) {
    console.error("Error deleting customers:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};