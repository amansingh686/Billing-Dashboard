const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, companyName ,address, password,city,state,country,dob,lastName} =
    req.body;
    
  const user = await User.create({
    name,
    email,
    phone,
    address,
    password,
    companyName,
    city,
    state,
    country,
    dob,
    lastName,
  });

  sendToken(user, 201, res)

});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user has provided both email and password
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  // Find user by email
  const user = await User.findOne({ email }).select("+password");

  // If user not found, return error
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  // Check if provided password matches user's stored password
  const isPasswordMatched = await user.comparePassword(password);

  // If passwords don't match, return error
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  // If passwords match, send token
  sendToken(user, 200, res);
});


// Get all Users
exports.getAllUser = catchAsyncError(async (req, res) => {
  const userCount = await User.countDocuments();

  const user = await User.find({});

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
    userCount,
  });
});

// Update User
exports.updateUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// get User details find By Id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User --> Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new ErrorHander("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User Delete Successful",
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});