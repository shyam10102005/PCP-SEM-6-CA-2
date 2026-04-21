import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <NavLink to="/orders" style={{ marginRight: "15px" }}>Orders</NavLink>
      <NavLink to="/filter" style={{ marginRight: "15px" }}>Filter</NavLink>
      <NavLink to="/stats" style={{ marginRight: "15px" }}>Stats</NavLink>
    </nav>
  );
};

export default NavBar;
