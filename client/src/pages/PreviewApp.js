import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import docpic from "../assets/document.png";

import { useQuery } from "@apollo/client";
import { FIND_APP } from "../utils/queries";

const PreviewApp = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { loading, data } = useQuery(FIND_APP, {
    variables: { applicationId: applicationId },
    fetchPolicy: "network-only",
  });

  const application = data?.application || {};
  useEffect(() => {
    console.log(data);
  }, [data]);

  console.log(applicationId);

  const navigateToUpdate = () => {
    // navigate to /preview
    navigate(`/update/${application._id}`);
  };

  return (
    <Card className="prevCard" key={application._id}>
      <div className="prevHead">
        <Card.Header>Saved Application</Card.Header>
      </div>
      <Card.Body>
        <div className="prevCompany">
          <span className="prevCompanyLabel">COMPANY NAME</span>
          <Card.Title>{application.company_name}</Card.Title>
        </div>

        <div className="prevTitle">
          <span className="prevCompanyLabel">JOB TITLE</span>
          <Card.Text>{application.job_title}</Card.Text>
        </div>

        <div className="prevLead">
          <span className="prevCompanyLabel">LEAD SOURCE</span>
          <Card.Text>{application.lead_source}</Card.Text>
        </div>

        <div className="prevSummary">
          <span className="prevCompanyLabel">JOB DESCRIPTION</span>
          <Card.Text>{application.description}</Card.Text>
        </div>

        <div className="prevNotes">
          <span className="prevCompanyLabel">NOTES</span>
          <Card.Text>{application.notes}</Card.Text>
        </div>

        <div className="prevFollow">
          <span className="prevCompanyLabel">FOLLOW-UP EMAIL</span>
          <Card.Text>{application.follow_up}</Card.Text>
        </div>

        <div className="prevDate">
          <span className="prevCompanyLabel">DATE APPLIED</span>
          <Card.Text>{application.date_applied}</Card.Text>
        </div><br></br><br></br>

       

       

        <div className="documents">
          <div className="docpicbtn">
            
              <img alt="doc icon" src={docpic} />
              &nbsp;&nbsp;<Link target="_blank" to={application.resume}>RESUME USED
            </Link>
          </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <div className="docpicbtn">
            
              <img alt="doc icon" src={docpic} />
              &nbsp;&nbsp;<Link target="_blank" to={application.cover_letter}>COVER LETTER USED
            </Link>
          </div>
        </div><br></br>

        <button
          className="space-btn limegreen"
          role="button"
          onClick={navigateToUpdate}
        >
          Edit Application
        </button>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default PreviewApp;
