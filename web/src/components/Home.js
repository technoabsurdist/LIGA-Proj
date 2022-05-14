import React from "react";
import daologo from "../oo.png";
import { Link } from "react-router-dom";
import ligaLogo from "../imgs/liga-logos_white.png"
function Home() {
  return (
    <div className="main">
    
      <div className="landingImageDiv">
        <img src={ligaLogo} alt="uchisvg" className="landingImage" />
        <div id="fade" className="linkDiv topMargin5">
          
          <div>
            <Link to="/about" className="popupLink">
              <span className="hover">[About]</span>
            </Link>
          </div>

          <div>
            {/* <p className="popupLink">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://forms.gle/yzkUG3K3QhYVfR646"
                className="regLinkNoBorder"
              >
                [Request Talent]
              </a>
            </p> */}
            <Link to="/auth" className="popupLink">
              <span className="hover">[Talent Network]</span>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="landing" id="fade">
        <div style={{ zIndex: 10, position: "relative" }}></div>
      </div> */}
    </div>
  );
}

export default Home;
