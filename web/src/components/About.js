import { Link } from "react-router-dom";
import logoUChicago from "../imgs/uchicago-logo2.png"; 
import ligaLogo from "../imgs/liga-logos_black.png"; 

function About(props) {
  return (
    <div className="main altBackgroundColor">
      <div className="mainSubPage">
        <div className="topBar">
          <Link to="/" className="popupLink" style={{ color: "black" }}>
            <span className="hover">[Home]</span>
          </Link>
          <p className="topBarText">ABOUT</p>
        </div>
        <div className="contentMain">
          <div className="rowGen">
            <div className="leftCol60">
              <p className="bottomMargin">
                <br /> 
                <span className="genTitle">The Problem</span>
              </p>
              <p className="noMargin" style={{fontSize: "13px"}}>
              LIGA spurred from the need at UChicago to have a portal that directly connects recruiters to specific RSOs (Recognized Student Organizations). In its current state, UChicago has many “elite” RSOs which have direct “informal” connections with employers that serve as a fundamental pipeline between the members and the employers. Unfortunately, in its current state, this pipeline is restricted to the top 1% of RSOs (evaluating by acceptance rates and popularity). Groups that have been around for years and have secured funding from the university and external resources, such as Eckhart, Blue Chips, AKPsi, and Maroon Capital. But what if we could give an easy way of establishing a career pipeline to any RSO on campus? This is exactly where LIGA comes into play. 
              </p>
              <br />
              <p className="bottomMargin">
                <span className="genTitle">
                  Solution
                </span>
              </p>
              <p className="noMargin" style={{fontSize: "13px"}}>
              Create an extremely easy tool to create a resume book that showcases every RSO's member's skills, interests, and experiences and make it intuitive and easy to share it with potential employers. The only thing the RSO has to do is have their members fill out a google forms with their information that will automatically add their profile to their resume book. When this step is done, RSO gets a key to share their “resume book” with any potential employer, which showcases each member alongside a highlighted project, resume, interests, and experience. In this resume book, recruiters can filter for specific criteria for the specific skillset and roles they're looking for. Imagine a future where the recently established Astronomy RSO can showcase their talent to SpaceX and NASA recruiters with a compiled version of their available talent, or the newly created BioTech group could access employers from Ginko Bioworks and Pfizer. LIGA is the way to do this and much more. 
              </p>
              <br />
            <p className="leftCol60"> 
                <span className="genTitle">
                  Links  
                </span> 
                <p className="noMargin" style={{fontSize: "13px", fontWeight: "600"}}> 
                  <a href="https://forms.gle/bwNKohZNPkdr3PFD9">[Apply to Talent Network]</a> 
                    <br /> 
                  {/* <a href="mailto: andere@uchicago.edu">[Request access to Talent Networks]</a>  */}
                    {/* <br />  */}
                  <a href="https://forms.gle/e2CjL33UTqjCW1cQ6">[Create Talent Network for RSO]</a> 
                    <br /> 
                  <a href="mailto: andere@uchicago.edu">[Email us]</a>
                </p> 
              </p>
            </div>
              <br /> 
              
            <div> 
            </div> 
            <div className="rightCol40" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <p className="bottomMargin">
                  <br /> 
                  <br /> 
                  <img src={logoUChicago} alt="logo uchicago" id="logoUChicago" width="370px" style={{marginTop: "4rem", marginLeft: "5rem" }}/> 
                  <img src={ligaLogo} alt="logo liga" id="logoLiga" width="370px" 
                    style={{
                      marginTop: "-2rem",
                      marginLeft: "5rem"
                    }}/> 
              </p>

              <br /> 
              <p className="noMargin">
              </p> 
              <br />
            </div>
          </div>
        </div>
      <footer style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: "11px",
        marginTop: "-1.5rem", 
      }}>
        Bugs and suggestions at [andere, simonm] [at] uchicago.edu
      </footer>
      </div>
    </div>
  );
}

export default About;
