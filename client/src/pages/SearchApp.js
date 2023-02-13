import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
// import { SAVE_BOOK } from '../utils/mutations';
// import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

import Auth from '../utils/auth';

const SearchApps = () => {
  // create state for holding returned google api data
  const [searchedApps, setSearchedApps] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
//   const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

//   const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
//   useEffect(() => {
//     return () => saveBookIds(savedBookIds);
   };

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await useQuery(
        query(QUERY_ME)=`${searchInput}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const appData = items.map((application) => ({
        application: applications.job_title,
        application: applications.company_name,
        application: applications.lead_source,
        application: applications.date_applied,
      }));

      setSearchedApps(appData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark searchbox">
        <Container>
          <h1>Search your job applications!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder=""
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedApps.length
            ? `Viewing ${searchedApps.length} results:`
            : 'Search for a application to begin'}
        </h2>
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

export default SearchApps;