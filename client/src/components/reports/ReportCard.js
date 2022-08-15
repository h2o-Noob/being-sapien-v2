import React, { Fragment } from "react";
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
import { useSelector } from "react-redux";
import "./ReportCard.css"

const ReportCard = ({ report }) => {

  const { isAuthenticated } = useSelector((state) => state.user);

  const windowWidth = ()=>{
    return window.innerWidth
  }

  console.log(windowWidth())

  return (
    <Fragment>
      {report && (
        <Card style={{ margin: "1rem", backgroundColor: "rgb(201, 199, 199)"}}>
          <CardHeader
            avatar={
              report ? (
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
          <CardActions disableSpacing>
            <Link
              to={isAuthenticated ? `/report/${report._id}` : "/login"}
              style={{ textDecoration: "none", fontFamily: "cursive", color: "green"}}
            >
              Learn More
            </Link>
          </CardActions>
        </Card>
      )}
    </Fragment>
  );
};

export default ReportCard;
