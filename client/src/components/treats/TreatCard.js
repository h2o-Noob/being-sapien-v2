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
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {treat.treat.treatedAt.slice(0, 10)}
        </Typography>
        <Typography variant="h5" component="div">
          ₹{treat.treat.ammount}
        </Typography>
        {treat.treat.comments ? <Typography variant="body2">{treat.treat.comments}</Typography> : <Typography variant="body2">NO COMMENTS</Typography>}
      </CardContent>
      {treat.treat.treatReport ? <CardActions>{
        treat.treat.treatReport.number ? <Typography sx={{ mb: 1.5 }} color="text.secondary">
        for <Link to={`/report/${treat.treat.treatReport._id}`}style={{textDecoration: "none", color: "rgb(29, 120, 0)"}} target="_blank">report number {treat.treat.treatReport.number}</Link>
    </Typography> : <Typography sx={{ mb: 1.5 }} color="text.secondary">
        From <b>{treat.treat.user.name}</b>
    </Typography>
        }
      </CardActions> : <h2>Report was deleted</h2>}
    </Card>
  );
};

export default TreatCard;
