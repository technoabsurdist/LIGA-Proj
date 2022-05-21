import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import harris from "../imgs/harris.jpg";
import undergrad from "../imgs/undergrad.jpg";
import midway from "../imgs/midway.png";
// import law from "../imgs/law.png";
import liga from "../imgs/liga-logos_white.png"
import dao from "../imgs/dao.png";
// import ssd from "../imgs/ssd.jpg";
import boothchain from "../imgs/boothchain.png";
// import booth from "../imgs/booth.png";
import block from "../imgs/block.png";
import info from "../imgs/info.png";
import Selector from "./Selector";
import { CSVLink } from "react-csv";
// import "./Dashboard.css";

const type = [
  "Generalist",
  "Product Manager",
  "Business Development", 
  "Science and Engineering", 
  "Legal & Regulatory", 
  "Trading", 
  "Analyst", 
  "Technical writing", 
  "Software Engineering --frontend", 
  "Software Engineering --backend", 
  "Software Engineering --other", 
  "Data Science", 
  "Marketing", 
  "Communications / Content Creation"
]; 

const affiliations = [
  "Chemistry Society", 
  "Chicago Economics Forum", 
  "OEconomica", 
  "UCBG", 
  "Engineering Society", 
  "Derivatives Group", 
  "CS Student Activities Council", 
  "AKPsi", 
  "CompileHer"
]; 

const work_type = [
  "Full-time post-grad",
  "Summer internship",
  "Part-time internship",
]

const exp_level = [
  "Just getting started and ready to learn!", 
  "Strong experience (6 - 12 months)", 
  "Extremely experienced --have developed various projects (1yr+)", 
]; 

const Dashboard = (props) => {
  const [rawData, setRawData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [popupOpen, setPopup] = useState(false);
  const [popupPerson, setPopupPerson] = useState({});
  const [selections, setSelections] = useState({
    builder_type: type,  
    affiliations: affiliations, 
    work_type: work_type, 
    exp_level_raw: exp_level, 
  });

  // const [loading, setLoading] = useState(true);
  const exp = ["●", "●●", "●●●"];
  const checkArr = (array1, array2) => {
    for (var i = 0; i < array2.length; i++) {
      if (array1.includes(array2[i])) {
        return true;
      }
    }
    return false;
  };
  const setPopupContent = (state, person) => {
    setPopupPerson(person);
    setPopup(state);
  };
  const alphaSort = (property) => {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };

  const refreshContent = (selectionsData) => {
    var out = [];
    console.log(rawData.length, selectionsData);
    for (var i = 0; i < rawData.length; i++) {
      if (checkArr(rawData[i].builder_type, selectionsData.builder_type)) {
        if (
          checkArr(rawData[i].web3_subfields, selectionsData.web3_subfields)
        ) {
          if (checkArr(rawData[i].affiliation, selectionsData.affiliation)) {
            if (checkArr(rawData[i].school, selectionsData.school)) {
              if (
                checkArr(rawData[i].exp_level_raw, selectionsData.exp_level_raw)
              ) {
                if (checkArr(rawData[i].work_type, selectionsData.work_type)) {
                  out.push(rawData[i]);
                }
              }
            }
          }
        }
      }
    }
    console.log(out);
    out = out.sort(alphaSort("name"));
    setDisplayedData(out);
  };
  const updateCurrentSelections = (listOfSelections, index) => {
    var temp = JSON.parse(JSON.stringify(selections));
    console.log(listOfSelections, index, temp[index]);
    temp[index] = listOfSelections;
    console.log("after", temp[index]);
    refreshContent(temp);
    setSelections(temp);
  };

  useEffect(() => {
    const getData = () => {
      const headers = {
        "x-api-key": "fPQT9amred2PvTRvLxz1U2FbkOXJPwJz6UePTBa9",
      };
      // setLoading(true);

      axios({
        method: "get",
        url: "https://dfx9l7qckf.execute-api.us-east-1.amazonaws.com/default/getResumes?owner=" + props.owner,
        headers: headers,
      })
        .then((response) => {
          var out = JSON.parse(JSON.stringify(response.data));
          for (var i = 0; i < out.length; i++) {
            //SCHOOL
            out[i]["school_path"] = undergrad; 
            // if (out[i].school === "Undergraduate") {
            //   out[i]["school_path"] = undergrad;
            // }

            // if (out[i].school === "Law School") {
            //   out[i]["school_path"] = law;
            // }
            // if (out[i].school === "Harris School of Public Policy") {
            //   out[i]["school_path"] = harris;
            // }
            // if (out[i].school === "Booth School of Business") {
            //   out[i]["school_path"] = booth;
            // }
            // if (out[i].school === "Social Sciences Division") {
            //   out[i]["school_path"] = ssd;
            // }

            //BUILDER TYPE

            out[i]["builder_type"] = out[i]["builder_type"].replaceAll(
              "Software Engineering--",
              "SWE - "
            );
            out[i]["builder_type"] = out[i]["builder_type"].replaceAll(
              "Communications/Content Creation/Developer Relations",
              "Communications/Marketing"
            );

            out[i]["builder_type"] = out[i]["builder_type"].replaceAll(
              "Business Development/Operations",
              "Business Operations"
            );

            //AFFILIATION
            var tempArr = out[i].affiliation.split(",");
            var tempAff = [];
            for (var j = 0; j < tempArr.length; j++) {
              if (tempArr[j] === "ChicagoDAO Core Team") {
                tempAff.push(dao);
              }
              if (tempArr[j] === "Boothchain") {
                tempAff.push(boothchain);
              }
              if (tempArr[j] === "Blockchain Chicago") {
                tempAff.push(block);
              }
              if (tempArr[j] === "Midway Ventures") {
                tempAff.push(midway);
              }
              // All TEMP because I don't want to look for logos
              if (tempArr[i] === "Chemistry Society") {
                tempAff.push(liga); 
              }
              if (tempArr[i] === "Chicago Economics Forum") {
                tempAff.push(liga); 
              }
              if (tempArr[i] === "OEconomica") {
                tempAff.push(liga); 
              }
              if (tempArr[i] === "UCBG") {
                tempAff.push(liga); 
              }
              if (tempArr[i] === "Engineering Society") {
                tempAff.push(liga); 
              }
              if (tempArr[i] === "Derivatives Group") {
                tempAff.push(liga); 
              }
              if (tempArr[i] === "CS Student Activities Council") {
                tempAff.push(liga); 
              }
              if (tempArr[i] === "AKPsi") {
                tempAff.push(liga)
              }
              if (tempArr[i] === "CompileHer") {
                tempAff.push(liga); 
              }
            }
            out[i]["affiliation_path"] = tempAff;
          }

          out = out.sort(alphaSort("name"));

          setRawData(out);
          setDisplayedData(out);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // setLoading(false);
        });
    };

    getData();
  }, []);

  return (
    <div className="main mainDash">
      <div
        className="popup"
        style={{
          visibility: popupOpen ? "visible" : "hidden",
          opacity: popupOpen ? 1 : 0,
          transition: "all 0.4s",
        }}
      >
        <div className="popupBackground" onClick={() => setPopup(!popupOpen)} />

        <div className="innerPersonPopup">
          <div onClick={() => setPopup(!popupOpen)} className="closePopup">
            <p className="closePopupPersonText">✕</p>
          </div>

          <div className="innerPersonInnerPopup">
            <p className="popupTitlePerson blackText ">{popupPerson.name}</p>
            <div className="modalOuterDiv">
              {popupPerson.builder_type?.split(", ")?.map((builder_type, i) => (
                <p key={i} className="popupModal">
                  {builder_type}
                </p>
              ))}
            </div>
            <hr />
            <div className="row">
              <div className="popupRowLeft">
                <p className="blackText smallText">
                  <b>Email</b>: {popupPerson.email} <br />
                  <b>School</b>: {popupPerson.school} <br />
                  <b>Job Type</b>: {popupPerson.work_type} <br />
                  <b>One Liner</b>: {popupPerson.one_liner} <br />
                  <b>Experience</b>: {popupPerson.exp_level_raw} <br />
                  <b>Affiliated Org.</b>: {popupPerson.affiliation}
                </p>
              </div>
              <div className="popupRowRight">
                <p className="blackText smallText">
                  <b>Links</b>: <br />
                  {popupPerson.resume_link?.length > 0 ? (
                    <a
                      href={popupPerson.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popupGeneralLink"
                    >
                      [Resume]
                      <br />
                    </a>
                  ) : null}
                  {popupPerson.project_info?.length > 0 ? (
                    <a
                      href={popupPerson.project_info}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popupGeneralLink"
                    >
                      [Highlighted Project]
                      <br />
                    </a>
                  ) : null}
                  {popupPerson.twitter?.length > 0 ? (
                    <a
                      href={popupPerson.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popupGeneralLink"
                    >
                      [Twitter]
                      <br />
                    </a>
                  ) : null}
                  {popupPerson.linkedin?.length > 0 ? (
                    <a
                      href={popupPerson.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popupGeneralLink"
                    >
                      [LinkedIn]
                      <br />
                    </a>
                  ) : null}
                  {popupPerson.website?.length > 0 ? (
                    <a
                      href={popupPerson.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popupGeneralLink"
                    >
                      [Website]{" "}
                    </a>
                  ) : null}
                  {/* <div className="resumeButton">
                  <a
                    href={popupPerson.resume_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resumeButtonLink"
                  >
                    <span>See Resume</span>
                  </a>
                </div> */}
                </p>
              </div>
            </div>
            <hr />
            <b className="smallText">Interests</b>:{" "}
            <div className="modalOuterDiv">
              {popupPerson.web3_subfields?.split(", ")?.map((interest, i) => (
                <p key={i} className="popupModal2">
                  {interest}
                </p>
              ))}
            </div>
            <br />
          </div>
        </div>
      </div>
      <div className="dashboardTitleDiv">
        <div className="row width100 centerDiv" style={{ marginTop: "60px" }}>
          <Link to="/" className="popupLink" style={{ color: "black" }}>
            <span className="hover">[Home]</span>
          </Link>{" "}
          <Link to="/about" className="popupLink" style={{ color: "black" }}>
            <span className="hover">[About]</span>
          </Link>{" "}
        </div>
        <p className="dashboardMainTitle"><strong>{props.owner}</strong> Dashboard</p>
        <i className="dashboardMainSubTitle">Powered by LIGA</i>
        <p className="mobileView">
          <b className="noMargin">
            <u className="noMargin">
              Please view this page on a larger screen for better usability.
            </u>{" "}
          </b>
        </p>
        <br /> <br /> <br />
        <i>Use the dropdown selectors below to filter by attributes.</i>
        <br /> 
        <div className="toolDiv">
          <Selector
            options={type}
            title={"Tags"}
            internalTitle={"builder_type"}
            setVal={updateCurrentSelections}
          />
          <Selector
            options={exp_level}
            title={"Experience"}
            internalTitle={"exp_level_raw"}
            setVal={updateCurrentSelections}
          />
          {/* <Selector
            options={[
              "The College",
              "Booth School of Business",
              "Law School",
              "Social Sciences Division",
              "Harris School of Public Policy",
            ]}
            title={"School"}
            internalTitle={"school"}
            setVal={updateCurrentSelections}
          /> */}
          {/* <Selector
            options={[
              "Asian Policy Forum",
              "Chemistry Society",
              "Chess Club",
              "Chicago Economics Forum",
              "Blockchain Chicago",
              "CS Students Activities Council",
              "Engineering Society",
              "UCB Group",
              "Derivatives Group",
            ]}
            title={"Organization Affiliation"}
            internalTitle={"affiliation"}
            setVal={updateCurrentSelections}
          /> */}
          <Selector
            options={work_type}
            title={"Type of work desired"}
            internalTitle={"work_type"}
            setVal={updateCurrentSelections}
          />
        </div>
        <br />
        <CSVLink
          data={rawData}
          filename={"rso-talent.csv"}
          className="popupLink"
          style={{ color: "black" }}
        >
          [Download raw csv]
        </CSVLink>

        <br /> <br />
        <div style={{ width: "100%", textAlign: "left" }}>
          <i style={{ fontSize: "10px", marginLeft: "4px" }}>
            {displayedData.length} results
          </i>
        </div>
        <div className="tableDiv">
          {displayedData.length <= 1 ? (
            rawData.length <= 1 ? (
              <p>Loading...</p>
            ) : (
              <p>Nothing here. Adjust your search.</p>
            )
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th><strong>Name</strong></th>
                  <th><strong>School</strong></th>
                  <th>           </th>

                  <th><strong>Short Description</strong></th>
                  <th><strong>Experience</strong></th>
                  <th><strong>More</strong></th>
                </tr>
              </thead>
              <tbody style={{ width: "100%" }}>
                {displayedData.map((person, i) => {
                  return (
                    <tr key={i}>
                      <td style={{ width: "10%" }} className="cell">
                        {person.name}
                      </td>
                      <td style={{ width: "5%" }} className="cell ">
                        <div className="centerCell">
                          <div className="tooltip">
                            <img
                              src={person.school_path}
                              className="schoolImg"
                              alt={person.school}
                            />
                            <span className="tooltiptext">{person.school}</span>
                          </div>{" "}
                        </div>
                      </td>
                      <td style={{ width: "3%" }} className="cell">
                        <div className="centerCell">
                          <div className="affDiv">
                            {/* {person.affiliation_path.length === 0 ? (
                              <i>None</i>
                            ) : (
                              person.affiliation_path.map((affiliation, i) => (
                                <div key={i} className="tooltip">
                                  <img
                                    src={affiliation}
                                    className="schoolImg"
                                    alt={person.school}
                                  ></img>
                                  <span className="tooltiptext">
                                    {person.affiliation.split(",")[i]}
                                  </span>
                                </div>
                              ))
                            )} */}
                          </div>
                        </div>
                      </td>

                      <td width="50%" className="cell">
                        {person.one_liner}
                      </td>
                      <td
                        style={{ width: "5%", textAlign: "center" }}
                        className="cell"
                      >
                        {exp?.[parseInt(person.exp_level) - 1]}
                      </td>
                      <td
                        style={{ width: "3%" }}
                        className="cell "
                        onClick={() => setPopupContent(true, person)}
                      >
                        <img
                          src={info}
                          className="infoImg"
                          alt={person.school}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="settingsDiv"></div>
      </div>
    </div>
  );
};

export default Dashboard;
