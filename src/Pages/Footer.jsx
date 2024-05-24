import React from "react";

const Footer = ({ version }) => {
  return (
    <footer
      className="bg-white fixed-bottom"
      style={{
        " z-index": 1030,
      }}
    >
      <div className="container text-center py-3">
        <span>Version: {version}</span>
      </div>
    </footer>
  );
};

export default Footer;
