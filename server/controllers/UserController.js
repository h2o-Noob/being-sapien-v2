const ErrorHandler = require("../utils/errorHandler");
const userSchema = require("../models/userModel");
const sendtoken = require("../utils/jwt");

// register user
exports.registerUser = async (req, res, next) => {
  try {
    
    const { name, email, password } = req.body;

    const User = await userSchema.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample id",
        url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      },
    });

    sendtoken(User, 201, res);
  } catch (err) {
    if (err.code === 11000) {
      let dup = Object.keys(err.keyValue)[0];
      return next(
        new ErrorHandler(`a user with that ${dup} already exists`, 400)
      );
    }

    let fault = Object.keys(err.errors)[0];
    return next(
      new ErrorHandler(`${fault} requires minimum 3 charecters`, 400)
    );
  }
};

// login function
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("please enter email and password", 400));
    }

    const User = await userSchema.findOne({ email }).select("+password");

    if (!User) {
      return next(
        new ErrorHandler("please enter correct email and password", 401)
      );
    }

    const isPasswordMatched = await User.comparePasswords(password);

    if (!isPasswordMatched) {
      return next(
        new ErrorHandler("please enter correct email and password", 401)
      );
    }

    sendtoken(User, 200, res);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// logout method
exports.logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
};
