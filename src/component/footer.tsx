import React from "react";
import ACES from "./ACES.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-dark text-center py-3 border-top">
      <div className="container">
        <img src={ACES} alt="ACES Logo" className="footer-logo mb-2" />
        <p className="mb-1">Created by Name from MAWD-12 S.Y 2024-25</p>
        <p className="fw-bold">ACES - Articulate Club of English Speakers</p>
      </div>
    </footer>
  );
};

export default Footer;
