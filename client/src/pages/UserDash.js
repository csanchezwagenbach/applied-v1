import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

// import { useQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';



import cologosm from '../assets/applied-logo-sm.png';

// import Auth from '../utils/auth';

const UserDash = () => {
  const { loading, data } = useQuery(QUERY_ME);


  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light appliedthemecolor">
        <Container>
          <span className="applieddashheader">{userData.username} here are the jobs that you have APPLIED for.</span>
        </Container>
      </Jumbotron>
      <Container className="containercolor">
        <span className="viewingsaved">
          {userData.applications?.length
            ? `Viewing ${userData.applications.length} saved ${
                userData.applications.length === 1 ? 'Application' : 'Job Applications'
              }:`
            : 'You have no saved applications!'}
        </span>
        <CardColumns>
          {userData.application?.map((application) => {
            return (
              <Card className="thecards" key={application._id} style={{ width: '18rem', marginTop: '40px' }} border="light">
                 
                  <Card.Img className="cardlogo"
                  alt="Applied logo"
                  src={cologosm}
                    variant="top"
                  />
                
                <Card.Body>
                  <Card.Title className="jobtitle">{application.job_title}</Card.Title>
                  <p className="small"> {application.company}</p>
                  <Card.Text className="jobtext">{application.lead_source}</Card.Text>
                  <Card.Text className="jobtext">{application.date_applied}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    // onClick={() => handlePreviewApp(application._id)}
                  >
                    View Entire Submission
                  </Button>
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