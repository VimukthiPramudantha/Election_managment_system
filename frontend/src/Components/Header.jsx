import React from "react";
import "./Header.css";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo" style={{ marginBottom: '0px' }}><img src={Logo} alt="" /></div>
      <div className="page-name">Dashboard</div>
      <div className="user-name">User Name</div>
    </header>
  );
};

export default Header;