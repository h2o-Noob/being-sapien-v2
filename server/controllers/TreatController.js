const treatSchema = require("../models/TreatModels");
const reportSchema = require("../models/ReportModels");
const ErrorHandler = require("../utils/errorHandler");

// create new treat
exports.createNewTreat = async (req, res, next) => {
  try {
    const { treatReport, paymentInfo, ammount } = req.body;

    const treat = await treatSchema.create({
      treatReport,
      paymentInfo,
      ammount,
      paidAt: Date.now(),
      user: req.User._id,
    });

    res.status(201).json({
      success: true,
      message: "treat made successfullly",
      treat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// get single treat
exports.getSingleTreat = async (req, res, next) => {
  try {
    const treat = await treatSchema
      .findById(req.params.id)
      .populate("user", "name email");

    if (!treat) {
      next(new ErrorHandler("treat not found", 400));
    }

    res.status(200).json({
      success: true,
      treat,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// user treats
exports.myTreats = async (req, res, next) => {
  try {
    const treats = await treatSchema.find({ user: req.User._id });

    res.status(200).json({
      success: true,
      treats,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
};

// get all treats
exports.allTreats = async (req, res, next) => {
  try {
    const treats = await treatSchema.find();

    let totalPrice = 0;

    treats.forEach((treat) => {
      totalPrice += treat.totalPrice;
    });

    res.status(200).json({
      success: true,
      treatCollection: totalPrice,
      treats,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//update treat status
exports.updateTreat = async (req, res, next) => {
  try {
    const treat = await treatSchema.findById(req.params.id);

    if (treat.treatStatus === "Fed") {
      return next(new ErrorHandler("this treat is fed", 404));
    }

    treat.treatStatus = req.body.status;

    if (req.body.status === "Fed") {
      treat.fedAt = Date.now();
    }

    await treat.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: treat,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// delete treat
exports.deletTreat = async (req, res, next) => {
  try {
    const treat = await treatSchema.findById(req.params.id);

    if (!treat) {
      next(new ErrorHandler("treat not found"));
    }

    treat.remove();

    res.status(200).json({
      success: true,
      message: "treat deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};