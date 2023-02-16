import React, { useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";
import green from "../assets/greenlight.png";
import red from "../assets/redlight.png";

import cologosm from "../assets/applied-logo-sm.png";

const UserDash = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me || {};
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light appliedthemecolor">
        <Container>
          <span className="applieddashheader">
            {userData.username} here are the jobs that you have APPLIED for.
          </span>
        </Container>
      </Jumbotron>
      <Container className="containercolor">
        <span className="viewingsaved">
          {userData.applications?.length ? (
            `Viewing ${userData.applications.length} Saved ${
              userData.applications.length === 1
                ? "Application"
                : "Job Applications"
            }:`
          ) : (
            <p>
              <span className="quote">You have no saved applications!</span>
              <br></br>
              <span className="quotes">
                'Remember, you miss 100% of the shots you don't take.'
              </span>
              <br></br>
              <span className="quotess">
                — Michael Scott, Dunder Mifflin; actually Wayne Gretzky
              </span>
            </p>
          )}
        </span>
        <CardColumns>
          {userData.applications?.map((application) => {
            return (
              <Card className="thecards" key={application._id} border="light">
                <Card.Img
                  className="cardlogo"
                  alt="Applied logo"
                  src={cologosm}
                  variant="top"
                />

                <Card.Body>
                  <Card.Title className="jobtitle">
                    {application.job_title}
                  </Card.Title>
                  <p className="small"> {application.company_name}</p>
                  <Card.Text className="jobtext">
                    {application.lead_source}
                  </Card.Text>
                  <Card.Text className="jobtext">
                    {application.date_applied}
                  </Card.Text>
                  <Card.Text className="dayselap">
                    Days Since Applied: {application.daysEllapsed}
                  </Card.Text>
                  <div className="xlite">
                    <Link to={`/preview/${application._id}`}>
                      <button className="noselect">VIEW</button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default UserDash;
