import React, { Fragment, useEffect, useState } from "react";
import "./ReportDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, reportDetails } from "../../actions/ReportsActions";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Carousel from "react-bootstrap/Carousel";

const ReportDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [open, setOpen] = useState(false);

  const { report, loading, error } = useSelector(
    (state) => state.reportDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  console.log(params.id);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(reportDetails(params.id));
  }, [dispatch, params.id, error, alert]);

  const submitReviewToggle = () => {
    if (isAuthenticated === false) {
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
                <img
                  className="CarouselImage"
                  src={report.images[0].url}
                  alt="First slide"
                />
              </Carousel.Item>
            <div>
              <div className="detailsBlock-1">
                <h4>Report no. {report.number}</h4>
                <p>Report # {report._id}</p>
              </div>
              <div className="detailsBlock-2">
                <span className="detailsBlock-2-span">
                  {" "}
                  ({report.numberOfAnimals} {report.animal}
                  {report.numberOfAnimals > 1 ? "s" : null})
                </span>
              </div>
              <br />
              <div className="detailsBlock-3">
                <h3>{`${report.location.adress}`}</h3>
                <h3>{`${report.location.city}`}</h3>
                <h3>{`${report.location.state}`}</h3>
              </div>
              <br />
              <div className="detailsBlock-4">
                Description : <p>{report.description}</p>
                <br />
                <h3>Uploaded by:</h3>
                <h5>{report.user.name}</h5>
                <h5>{report.user.email}</h5>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                submit review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">Treats</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog"></DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReportDetails;
