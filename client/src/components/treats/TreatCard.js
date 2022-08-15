import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const TreatCard = (treat) => {

  return (
    <Card sx={{ minWidth: 270, maxWidth: 300 }} style={{ margin: "1rem", backgroundColor: "rgb(201, 199, 199)"}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          treat id #{treat.treat._id}
        </Typography>
        <Typography variant="h5" component="div">
          ₹{treat.treat.ammount}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          status {treat.treat.treatStatus}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          paymentId {treat.treat.paymentInfo._id}
        </Typography>
        <Typography variant="body2">well meaning and kindly.</Typography>
      </CardContent>
      <CardActions>{
        treat.treat.treatReport.number ? <Typography sx={{ mb: 1.5 }} color="text.secondary">
        for <Link to={`/report/${treat.treat.treatReport._id}`}style={{textDecoration: "none", color: "rgb(29, 120, 0)"}}>report number {treat.treat.treatReport.number}</Link>
    </Typography> : <Typography sx={{ mb: 1.5 }} color="text.secondary">
        From <b>{treat.treat.user.name}</b>
    </Typography>
        }
      </CardActions>
    </Card>
  );
};

export default TreatCard;
