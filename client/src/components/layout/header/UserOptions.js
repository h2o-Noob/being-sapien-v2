import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/UserActions";
import PetsIcon from '@mui/icons-material/Pets';
import SpeedDial from "@mui/material/SpeedDial";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Header.css";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const options = [
    { icon: <AccountBoxIcon/>, name: "Profile", func: account },
    { icon: <LogoutIcon/>, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function account() {
    navigate("/account");
  }
  function logoutUser() {
    navigate("/login");
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
