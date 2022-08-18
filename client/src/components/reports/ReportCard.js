import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import "./ReportCard.css";
import { Button } from "@mui/material";
import { deleteReport } from "../../actions/ReportsActions";
import { DELETE_REPORT_RESET } from "../../constants/ReportConstants";


const ReportCard = ({ report }) => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isDeleted } = useSelector((state) => state.report);


  const HandleDelete = ()=> {
    dispatch(deleteReport(report._id))
  }

  useEffect(() => {
    if (isDeleted) {
      dispatch({ type: DELETE_REPORT_RESET });
      alert.success("Report Deleted Successfully");
      navigate("/account");
    }

  }, [dispatch, alert, useNavigate, isDeleted])
  


  return (
    <Fragment>
      {report && (
        <Card style={{ margin: "1rem", backgroundColor: "rgb(201, 199, 199)" }}>
          <CardHeader
            avatar={
              report && report.user.avatar ? (
                <Avatar
                  sx={{ bgcolor: green[500] }}
                  aria-label="recipe"
                  src={report.user.avatar.url}
                />
              ) : null
            }
            title={report.user.name}
            subheader={Date(report.createdAt).substring(0, 15)}
          />
          <CardMedia
            component="img"
            height="194"
            image={report.images[0].url}
            alt="Paella dish"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {report.animal} ({report.numberOfAnimals})
            </Typography>
            <Typography variant="body2">{report.area}</Typography>
            <Typography variant="body2" color="text.secondary">
              {report.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing style={{display: "flex", justifyContent: "space-between"}}>
            {report.user.avatar ? (
              <Link
                to={isAuthenticated ? `/report/${report._id}` : "/login"}
                style={{
                  textDecoration: "none",
                  fontFamily: "cursive",
                  color: "green",
                }}
              >
                Learn More
              </Link>
            ) : (
              <Link
                to={`/reports/update/${report._id}`}
                style={{
                  textDecoration: "none",
                  fontFamily: "cursive",
                  color: "green",
                }}
              >
                UPDATE
              </Link>
            )}
            {!report.user.avatar ? (
              <Button style={{
                textDecoration: "none",
                fontFamily: "cursive",
                color: "green",
              }}
              onClick={HandleDelete}>
                Delete
              </Button>
            ) : null}
          </CardActions>
        </Card>
      )}
    </Fragment>
  );
};

export default ReportCard;
