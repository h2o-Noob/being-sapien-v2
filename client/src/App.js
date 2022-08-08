import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React } from "react";
import Home from './components/home/Home';
import Header from './components/layout/header/Header';
import LoginSignup from './components/user/LoginSignup';
import Profile from './components/user/Profile';
import { useSelector } from 'react-redux';
import UserOptions from './components/layout/header/UserOptions';
import Reports from './components/reports/Reports';


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
    <Header/>
    {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path = "/" element={<Home/>} />
        <Route exact path = "/Login" element={<LoginSignup/>} />
        <Route exact path = "/account" element={<Profile/>} />
        <Route exact path = "/reports" element={<Reports/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
