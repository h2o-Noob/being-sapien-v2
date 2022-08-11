import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React, useEffect } from "react";
import Home from './components/home/Home';
import Header from './components/layout/header/Header';
import LoginSignup from './components/user/LoginSignup';
import Profile from './components/user/Profile';
import { useSelector } from 'react-redux';
import UserOptions from './components/layout/header/UserOptions';
import Reports from './components/reports/Reports';
import store from "./store"
import { loadUser } from './actions/UserActions';
import ReportDetails from './components/reports/ReportDetails';
import WebFont from "webfontloader";


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
    <Header/>
    {isAuthenticated && user && <UserOptions user={user} />}
      <Routes>
        <Route exact path = "/" element={<Home/>} />
        <Route exact path = "/Login" element={<LoginSignup/>} />
        <Route exact path = "/account" element={<Profile/>} />
        <Route exact path = "/reports" element={<Reports/>} />
        <Route exact path = "/report/:id" element={<ReportDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
