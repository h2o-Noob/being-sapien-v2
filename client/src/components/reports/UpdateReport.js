import React, { Fragment, useEffect, useState } from "react";
import "./UpdateReport.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  createReport,
  reportDetails,
  updateReport,
} from "../../actions/ReportsActions";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import DescriptionIcon from "@mui/icons-material/Description";
// import StorageIcon from "@mui/icons-material/Storage";
// import SpellcheckIcon from "@mui/icons-material/Spellcheck";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { UPDATE_REPORT_RESET } from "../../constants/ReportConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateReport = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.report);
  const { report } = useSelector((state) => state.reportDetails);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [animal, setAnimal] = useState("");
  const [numberOfAnimals, setnumberOfAnimals] = useState(0);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [aid, setAid] = useState("");
  const [adress, setAdress] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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
  const states = ["Delhi", "Haryana", "UP", "Punjab", "Rajasthan"];

  useEffect(() => {
    dispatch(reportDetails(params.id));
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if(report.location)
     {setAnimal(report.animal);
      setnumberOfAnimals(report.numberOfAnimals);
      setDescription(report.description);
      setCity(report.location.city);
      setState(report.location.state);
      setAid(report.aid);
      setAdress(report.location.adress);}
    if (success) {
      alert.success("Report Updates Successfully");
      navigate("/me/reports");
      dispatch({ type: UPDATE_REPORT_RESET });
    }

    if (isAuthenticated == false) {
      navigate("/login");
    }
  }, [dispatch, alert, error, navigate, success]);

  const createReportSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("animal", animal);
    myForm.set("numberOfAnimals", numberOfAnimals);
    myForm.set("description", description);
    myForm.set("area", city);
    myForm.set("aid", aid);
    myForm.set("location.adress", adress);
    myForm.set("location.city", city);
    myForm.set("location.state", state);
    myForm.set("images.0.public_id", "sampleid");
    myForm.set(
      "images.0.url",
      "https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-iaplhkvj3gupbjcps0nrhkhhh7-20200209053728.Medi.jpeg"
    );

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });

    dispatch(updateReport(params.id, myForm));
  };

  //   const createProductImagesChange = (e) => {
  //     const files = Array.from(e.target.files);

  //     setImages([]);
  //     setImagesPreview([]);

  //     files.forEach((file) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         if (reader.readyState === 2) {
  //           setImagesPreview((old) => [...old, reader.result]);
  //           setImages((old) => [...old, reader.result]);
  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     });
  //   };

  return (
    <Fragment>
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createReportSubmitHandler}
          >
            <h1>Update Report</h1>

            <div>
              {/* <SpellcheckIcon /> */}
              <input
                type="text"
                placeholder="Animal(eg: dog, cow, etc..)"
                required
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
              />
            </div>
            <div>
              {/* <AttachMoneyIcon /> */}
              <input
                type="number"
                placeholder="Number Of Animals"
                required
                value={numberOfAnimals}
                onChange={(e) => setnumberOfAnimals(e.target.value)}
              />
            </div>

            <div>
              {/* <DescriptionIcon /> */}

              <textarea
                placeholder="Report Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              {/* <StorageIcon /> */}
              <input
                type="text"
                placeholder="address/landmark nearby"
                value={adress}
                required
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>
            <div>
              {/* <AccountTreeIcon /> */}
              {report.location ? (
                <select onChange={(e) => setCity(e.target.value)}>
                  <option value={report.location.city}>
                    {report.location.city}
                  </option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              ) : null}
              {report.location ? (
                <select onChange={(e) => setState(e.target.value)}>
                  <option value={report.location.state}>
                    {report.location.state}
                  </option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>

            <div>
              {/* <StorageIcon /> */}
              <input
                type="text"
                placeholder="aid needed"
                value={aid}
                required
                onChange={(e) => setAid(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                // onChange={createProductImagesChange}
                multiple
              />
            </div>

            {/* <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> */}

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateReport;
