import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from "react-datepicker";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Row,
} from "react-bootstrap";
import {FIND_APP} from "../utils/queries"
import { useMutation} from "@apollo/client";
import { UPDATE_APP } from "../utils/mutations";
// import Auth from "../utils/auth";

const UpdateApp = () => {
  
const {applicationId} = useParams();
const navigate = useNavigate();

    const { loading, data } = useQuery(FIND_APP, {
        variables: { applicationId: applicationId },
    });
    const application = data?.application || {};
useEffect(() =>{
    console.log(data);
}, [data])
  const [updateApplication, { error }] = useMutation(UPDATE_APP);
  const [appFormData, setAppFormData] = useState({
    applicationId: application._id,
    job_title: application.job_title,
    company_name: application.company_name,
    lead_source: application.lead_source,
    description: application.description,
    resume:application.resume,
    cover_letter: application.cover_letter,
    notes: application.notes,
    follow_up: application.follow_up,
    date_applied: application.date_applied
  })
  useEffect(() => {
    console.log(appFormData)
  }, [appFormData])
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppFormData({ ...appFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(appFormData)
    try {
      const { data } = await updateApplication({
        variables: { ...appFormData },
      });
      console.log(data);

    } catch (err) {
      console.error(err);
         // :point_down:️ navigate to /preview
    navigate(`/preview/${application._id}`);
    }
  }
  




  const uploadResume = (e) => {
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "di629rovn",
        uploadPreset: "u5n4cgbf",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setAppFormData({ ...appFormData, resume: result.info.url });
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    myWidget.open();
  };
  const uploadCoverLetter = (e) => {
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "di629rovn",
        uploadPreset: "u5n4cgbf",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setAppFormData({ ...appFormData, cover_letter: result.info.url });
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    myWidget.open();
  };

  // create function to handle saving a application to our database

  return (
    <>
      <Jumbotron fluid className="text-light appliedthemecolor">
        <Container>
          <span class="appinfo">Job Application Information</span>
          <Form onSubmit={handleFormSubmit}>

            <Form.Group as={Row}>
              <Form.Label>Job Title</Form.Label>
              <Form.Control id="transp"
                name="job_title"
                value={appFormData.job_title}
                onChange={handleInputChange}
                type="text"
                size="lg"
            
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Company Name</Form.Label>
              <Form.Control id="transp"
                name="company_name"
                value={appFormData.company_name}
                onChange={handleInputChange}
                type="text"
                size="lg"
                
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Date Applied</Form.Label>
              <Form.Control id="transp"
                name="date_applied"
                value={appFormData.date_applied}
                onChange={handleInputChange}
                type="text"
                size="lg"
              
              />
            </Form.Group>

            {/* <Form.Group as={Row}>
              <Form.Label>Date Applied</Form.Label>
                <DatePicker
                name="date_applied"
                value={appFormData.date_applied}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="MM/dd/yy"
                />
            </Form.Group> */}

            <Form.Group as={Row}>
              <Form.Label>Job Lead</Form.Label>
              <Form.Control id="transp"
                name="lead_source"
                value={appFormData.lead_source}
                onChange={handleInputChange}
                type="text"
                size="lg"
              
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Job Description</Form.Label>
              <Form.Control id="transp"
                as="textarea"
                style={{ height: '150px' }}
                name="description"
                value={appFormData.description}
                onChange={handleInputChange}
                type="text"
                size="lg"
                
                aria-describedby="passwordHelpBlock"
              />
            </Form.Group>

            <Form.Text id="passwordHelpBlock" muted>
              We suggest copying the job description from site that job was
              posted, since they tend to get taken down.
            </Form.Text><br></br>


            <Form.Group as={Row}>
              <Form.Label>Notes</Form.Label>
              <Form.Control id="transp"
                as="textarea"
                style={{ height: '150px' }}
                name="notes"
                value={appFormData.notes}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Important things to remember."
                aria-describedby="passwordHelpBlock"
              />
            </Form.Group>

            <Form.Text id="passwordHelpBlock" muted>
              Add any notes such as names, interview details, follow ups, recruiters you spoke to
              etc...
            </Form.Text><br></br>


            <Row>
              <Col></Col>


              <Col class="cntrbtns">
                {/* <Form.Label>Upload Resume</Form.Label> */}
                {/* <button id="upload_widget" class="button-85" role="button"  onClick={uploadResume}>Upload Resume</button> */}
                <button id="upload_widget" class="space-btn" onClick={uploadResume}>Upload Resume</button>
              </Col>

              <Col class="cntrbtns">
                {/* <Form.Label>Upload CV/Cover Letter</Form.Label> */}
                {/* <button id="upload_widget" class="button-85" role="button" onClick={uploadCoverLetter}>Upload Cover Letter </button> */}
                <button id="upload_widget" class="space-btn" onClick={uploadCoverLetter}>Upload CV</button>
              </Col>
            </Row><br></br>

            <Form.Group as={Row} className="mt-3">
              <Col>
                {/* <Button type="submit" variant="success" size="sm">Save Application</Button> */}
                <button type="submit" class="spacer-btn"  >Update Application</button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};
export default UpdateApp;