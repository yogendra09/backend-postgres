import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendJwtToken from "../utils/SendJwtToken.js";

const currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id);
  res.json(user);
});

const register = catchAsyncErrors(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  sendJwtToken(user, 200, res);
});

const login = catchAsyncErrors(async (req, res, next) => {
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

const logout = catchAsyncErrors(async (req, res, next) => {
  const option = {
    exipres: new Date(),
    httpOnly: true,
    secure: true,
  };
  res.status(200).cookie("token", "", option).json({ message: "user logout!" });
});


export default { currentUser, register, login, logout };
