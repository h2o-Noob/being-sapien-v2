import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReports, clearError } from "../../actions/ReportsActions";
import "./Reports.css";
import Loader from "../layout/loader/Loader";
import Typography from '@mui/material/Typography';
import ReportCard from "./ReportCard"
import { useParams } from "react-router-dom";

const Reports = () => {

  // const categories = [
  //   "Laptop",
  //   "Footwear",
  //   "Bottom",
  //   "Tops",
  //   "Attire",
  //   "Camera",
  //   "SmartPhones",
  //   "sport",
  // ];
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const [price, setPrice] = useState([0, 25000]);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;

  const { Reports, loading, error, resultPerPage, reportsCount } =
    useSelector((state) => state.reports);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(getReports(keyword, currentPage, category));
  }, [dispatch, error, keyword, currentPage, category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="reportsHeading">reports</h2>
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
          <div className="filterBox">
            <Typography>Price</Typography>
            <Typography>Categories</Typography>
            {/* <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul> */}
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
            </fieldset>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Reports;
