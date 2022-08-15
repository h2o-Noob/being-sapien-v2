import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getReports,
  clearError,
  reportDetails,
} from "../../actions/ReportsActions";
import "./Reports.css";
import Loader from "../layout/loader/Loader";
import Typography from "@mui/material/Typography";
import ReportCard from "./ReportCard";
import { myTreats } from "../../actions/TreatActions";

const Reports = () => {
  const cities = [
    "north delhi",
    "east delhi",
    "south delhi",
    "west delhi",
    "new delhi",
    "faridabad",
    "gugaon",
    "noida",
  ];
  const [city, setCity] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const dispatch = useDispatch();

  const { Reports, loading, error, resultPerPage, reportsCount } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(reportDetails("62f15c9e9cd9ff4765601532"));
    dispatch(myTreats);
    dispatch(getReports(city));
  }, [error, city, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div style={{ backgroundColor: "#232222" }}>
            <div className="main">
              {Reports.length == 0 ? (
                <h2 className="reportsHeading">No reports in this area</h2>
              ) : (
                <h2 className="reportsHeading">Reports</h2>
              )}
              <div className="reports">
                {Reports &&
                  Reports.map((report) => (
                    <ReportCard key={report._id} report={report} />
                  ))}
              </div>
              {resultPerPage < reportsCount && (
                <div className="paginationBox">
                  {/* <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={reportsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            /> */}
                </div>
              )}
            </div>
            <div className="filterBox">
              <Typography className="filterHeading" style={{ color: "rgb(29, 180, 0)" }}>
                Cities
              </Typography>
              <ul className="categoryBox">
                {cities.map((city) => (
                  <li
                    className="category-link"
                    key={city}
                    onClick={() => setCity(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Reports;
