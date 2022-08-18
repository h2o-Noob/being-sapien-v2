import { Fragment, React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myReports } from "../../actions/ReportsActions";
import Loader from "../layout/loader/Loader";
import ReportCard from "./ReportCard";
import "./MyReports.css";

const MyReports = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myReports());
  }, []);

  const { reports, loading } = useSelector((state) => state.myReports);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {reports.length == 0 ? (
            <h2 className="reportsHeading">No reports found</h2>
          ) : (
            <h2 className="reportsHeading">reports</h2>
          )}
          <div className="reports">
            {reports &&
              reports.map((report) => (
                <ReportCard key={report._id} report={report} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyReports;
