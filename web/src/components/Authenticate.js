import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Auth = ({ authenticate }) => {
  const [pwInput, setInput] = useState("");
  const [nameInput ] = useState("");
  const [emailInput ] = useState("");
  const [entityInput ] = useState("");

  const [message, setMessage] = useState("Enter your password below");

  const navigate = useNavigate();

  //auth button handler
  const onClick = () => {
    const headers = {
      "x-api-key": "LPyXKkSkv53MyAKdwfc5q7i6figQHpa56xHBViEz",
    };
    if (pwInput === "") {
      setMessage("Please enter your password.");
      return;
    }
    setMessage("Loading...");
    axios({
      method: "get",
      url:
        "https://7oa3sx7syi.execute-api.us-east-1.amazonaws.com/default/pw" + 
        // "https://ivonb4slv2.execute-api.us-east-1.amazonaws.com/default/pw?pw=" +
        pwInput +
        "&name=" +
        nameInput +
        "&email=" +
        emailInput +
        "&entity=" +
        entityInput,
      headers: headers,
    })
      .then((response) => {
        console.log(response.data);

        if (response.data === 1) {
          setMessage("Loading...");

          authenticate(response.data);
          navigate("dashboard");
        } else {
          setMessage("Incorrect Password");
        }
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  return (
    <div className="main">
      <div className="landingImageDiv">
        <div id="fade" className="linkDiv">
          <div>
            <Link to="/" className="popupLink">
              <span className="hover">[Home]</span>
            </Link>
          </div>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/vKzq5M9n56oKKV5DA"
              className="popupLink"
            >
              <span className="hover">[Request Access]</span>
            </a>
          </div>
        </div>
        <br />
        <div
          className="rowGen"
          style={{ display: "flex", justifyContent: "center", marginTop: "1rem"}}
        >
          <div className=" flexCol ">
            <div className="flexCol centerCol input">
              <i
                style={{
                  color: "white",
                  transition: "all 1s",
                  fontSize: "13px",
                  opacity: "0.7",
                  marginBottom: "8px",
                  wordBreak: " break-word",
                }}
              >
                {message}
              </i>{" "}
              <input
                value={pwInput}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Your Password"
                className="input"
              />
              <button className="button" onClick={onClick}>
                View Network
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="landing" id="fade">
        <div style={{ zIndex: 10, position: "relative" }}></div>
      </div>
    </div>
  );
};

export default Auth;
