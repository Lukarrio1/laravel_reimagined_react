import React from "react";
import Navbar from "./Navbar";

export default function Layout({ Component }) {
  return (
    <>
      <Navbar></Navbar>
      {Component}
    </>
  );
}
