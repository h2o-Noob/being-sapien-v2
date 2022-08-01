const express = require("express");
const { createReport, getAllReports, getReportDetails, updateReport, deleteReport } = require("../controllers/ReportControllers");

const router = express.Router()

router
.route("/reports")
.post(createReport)
.get(getAllReports)

router
.route("/report/:id")
.get(getReportDetails)
.put(updateReport)
.delete(deleteReport)

module.exports = router;