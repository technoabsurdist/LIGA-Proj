import React from "react";
// import daologo from "../oo.png";
import { Link } from "react-router-dom";
import ligaLogo from "../imgs/liga-logos_white.png"
import sheet from "../server-forms.js" 


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
          <p> 
          
          </p> 
          <div>
            <Link to="/auth" className="popupLink">
              <span className="hover">[Talent Network]</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
