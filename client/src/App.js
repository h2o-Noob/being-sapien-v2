import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React } from "react";
import Home from './components/home/Home';
import Header from './components/layout/Header';


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route exact path = "/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
