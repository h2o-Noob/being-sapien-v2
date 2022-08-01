const reportSchema = require("../models/ReportModel");
const ErrorHandler = require("../utlis/errorHandler");

// create report
exports.createReport = async (req, res, next) => {
    try {
  
    //   req.body.user = req.User.id;
  
      const report = await reportSchema.create(req.body);
      
      res.status(200).json({
        message: "report created",
        report,
        success: true
      });
    } catch (error) {
      next(new ErrorHandler(error))
    }
  };

// get all reports
exports.getAllReports = async (req, res, next) => {
  try {
    
    const reports = await reportSchema.find();

    res.status(200).json({
      success: true,
      reports,
    });

  } catch (error) {
    next(new ErrorHandler(error))
  }
}

// get report details
exports.getReportDetails = async (req, res, next) => {
  try {
    
    const report = await reportSchema.findById(req.params.id);

    if (!report) {
      return next(new ErrorHandler("report not found", 404));
    }

    res.status(200).json({
      message: "report found",
      report,
    });
  } catch (error) {
    next(new ErrorHandler(error))
  }
}

// update report
exports.updateReport = async (req, res, next) => {

  try {
    
    report = await reportSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      message: "report updated",
      data: report,
      success: true
    });
  } catch (error) {
    next(new ErrorHandler(error))
  }
}

// delete report
exports.deleteReport = async (req, res, next) => {

  try {
    
    const report = await reportSchema.findByIdAndDelete(req.params.id);

    if (!report) {
      return next(new ErrorHandler("report not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "report deleted",
    });
  } catch (error) {
    next(new ErrorHandler(error))
  }
}