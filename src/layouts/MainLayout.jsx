import React from "react";
import NavBar from "../components/NavBar";

function MainLayout(props) {
  const { children } = props;
  return (
    <>
      <NavBar />
      <main style={{ padding: "10px" }}>{children}</main>
    </>
  );
}

export default MainLayout;
