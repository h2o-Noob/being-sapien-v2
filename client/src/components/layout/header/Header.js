import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo from '../../../images/logo.png'
import {FaUser} from 'react-icons/fa'
import "./Header.css"

const options = {
    burgerColorHover: "rgb(29, 100, 0)",
    burgerColor: "white",
    logo,
    logoWidth: "20vmax",
    navColor1: "rgba(131, 131, 131, 0.98)",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Reports",
    link3Text: "Contact",
    link4Text: "New report",
    link1Url: "/",
    link2Url: "/reports",
    link3Url: "/contact",
    link4Url: "/reports/new",
    link1Size: "1.7vmax",
    link1Color: "rgb(20, 100, 0)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgb(20, 100, 0)",
    searchIconColor: "rgb(20, 100, 0)",
    profileIcon: true,
    ProfileIconElement: FaUser,
    profileIconSize: "1.8vmax",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
  };

const Header = () => {
  return <ReactNavbar className="NavBar" {...options}/>
}

export default Header