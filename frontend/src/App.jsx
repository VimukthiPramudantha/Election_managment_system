import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
