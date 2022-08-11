import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ReportCard = ({ report }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      {report && (
        <Card sx={{ maxWidth: 345 }} style={{ margin: "1rem" }}>
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
              to={`/report/${report._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button onClick={navigate(`/report/${report._id}`)} size="small">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
      )}
    </Fragment>
  );
};

export default ReportCard;
