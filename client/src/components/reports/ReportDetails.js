import React, { Fragment, useEffect, useState } from "react";
import "./ReportDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, reportDetails } from "../../actions/ReportsActions";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Carousel from "react-bootstrap/Carousel";
import { reportTreats } from "../../actions/TreatActions";
import Paper from "@mui/material/Paper";
import TreatCard from "../treats/TreatCard";
import "./ReportDetails.css";
import CreateTreat from "../treats/CreateTreat";

const ReportDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [open, setOpen] = useState(false);

  const { report, loading, error } = useSelector(
    (state) => state.reportDetails
  );

  const { treats } = useSelector((state) => state.reportTreats);

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {

    dispatch(reportDetails(params.id));
    dispatch(reportTreats(params.id));
  }, [dispatch, params.id, error, alert]);

  const submitReviewToggle = () => {
    if (isAuthenticated === false) {
      navigate("/login");
      return alert.error("you need to login");
    }

    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <Carousel.Item>
              {report && report.images ? (
                <img
                  className="CarouselImage"
                  src={report.images[0].url}
                  alt="First slide"
                />
              ) : null}
            </Carousel.Item>
            <div>
              <div className="detailsBlock-1">
                {report ? <h4>Report no. {report.number}</h4> : null}
                {report ? <p>Report # {report._id}</p> : null}
              </div>
              {report ? (
                <div className="detailsBlock-2">
                  <span className="detailsBlock-2-span">
                    {" "}
                    ({report.numberOfAnimals} {report.animal}
                    {report.numberOfAnimals > 1 ? "s" : null})
                  </span>
                </div>
              ) : null}
              <br />

              {report ? <div className="detailsBlock-3">
                {report.location ? (
                  <h3>{`${report.location.adress}`}</h3>
                ) : null}
                {report.location ? <h3>{`${report.location.city}`}</h3> : null}
                {report.location ? <h3>{`${report.location.state}`}</h3> : null}
              </div> : null}
              <br />

              {report ? <div className="detailsBlock-4">
                Description{report ? <p>{report.description}</p> : null}
                <br />
                <h3>Uploaded by:</h3>
                {report.user ? <h5>{report.user.name}</h5> : null}
                {report.user ? <h5>{report.user.email}</h5> : null}
              </div>: null}
              <button onClick={submitReviewToggle} className="submitReview">
                treat
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            {report ? <CreateTreat treat={report._id} /> : null}
            <DialogContent className="submitDialog"></DialogContent>
          </Dialog>
          {treats && !treats.length == 0 ? (
            <h3 className="reviewsHeading">Treats</h3>
          ) : null}
          {treats && treats[0] ? (
            <div className="reviews">
              {treats &&
                treats.map((treat) => (
                  <TreatCard className="reviewCard" treat={treat} />
                ))}
            </div>
          ) : (
            <h3 className="reviewsHeading">No Treats Yet</h3>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReportDetails;
