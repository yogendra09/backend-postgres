const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/user.model");
const {sendJwtToken} = require("../utils/SendJwtToken");

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id);
  res.json(user);
});

 exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("please enter name email and password", 400));
  }

  // const userExist = await User.findOne({ email });
  // if (userExist) {
  //   return next(new ErrorHandler("user already exist", 400));
  // }

  const user = new User({
    name,
    email,
    password,
  });
  await user.save();
  sendJwtToken(user, 200, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("user not exist", 401));
  const isMatch = user.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("invalid credential"), 403);
  sendJwtToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  const option = {
    exipres: new Date(),
    httpOnly: true,
    secure: true,
  };
  res.status(200).cookie("token", "", option).json({ message: "user logout!" });
});

