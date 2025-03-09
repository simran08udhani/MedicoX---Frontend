import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import logo from "../assets/logo1.png"; // Import your logo image

const partners = [
  { name: "Khechraay Arkaay", linkedin: "https://www.linkedin.com/in/khechraay-arkaay-aba2a726a/" },
  { name: "Koopar Vijay", linkedin: "https://www.linkedin.com/in/koopar-vijay-9372ba289/" },
  { name: "Ujjwal Tak", linkedin: "https://www.linkedin.com/in/ujjwal-tak-5a2576227/" },
  { name: "Simran Udhani", linkedin: "https://www.linkedin.com/in/simranudhani/" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Side - Company Info (50% width) */}
        <div className="footer-left">
          <img src={logo} alt="Medico-X Logo" className="footer-logo" />
          <p>
            This project endeavors to develop an AI-driven system capable of diagnosing diseases
            from medical images, including X-rays, MRIs, and CT scans, through the application of deep learning methodologies.
          </p>
        </div>

        {/* Right Side - Partners Section (Remaining Space) */}
        <div className="footer-right">
          <h3>Partners</h3>
          <div className="hr-container">
            <div className="gradient-line"></div>
          </div>
          <ul>
            {partners.map((partner, index) => (
              <li key={index}>
                <a href={partner.linkedin} target="_blank" rel="noopener noreferrer">
                  {partner.name} <FaLinkedinIn data-tooltip-id="my-tooltip-2" className="linkedin-icon" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright section */}
      <div className="footer-bottom">
        <p>© 2021-25 MedicoX. All rights reserved.</p>
      </div>
      <ReactTooltip id="my-tooltip-2" place="bottom" variant="info" content="LinkedIn" />
    </footer>
  );
};

export default Footer;
