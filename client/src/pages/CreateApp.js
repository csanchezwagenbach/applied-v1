import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Jumbotron, Container, Col, Form, Row } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { ADD_APPLICATION } from "../utils/mutations";

const CreateApp = () => {
  const navigate = useNavigate();
  const [addApplication, { error }] = useMutation(ADD_APPLICATION);
  const [appFormData, setAppFormData] = useState({
    job_title: "",
    company_name: "",
    lead_source: "",
    description: "",
    resume: '',
    cover_letter: '',
    notes: '',
    follow_up: '',
    date_applied: "",
  });
  useEffect(() => {
    console.log(appFormData);
  }, [appFormData]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppFormData({ ...appFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    console.log(appFormData);
    try {
      const { data } = await addApplication({
        variables: { ...appFormData },
      });
      console.log(data);
      navigate(`/preview/${data.addApplication._id}`);
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <>
      <Jumbotron fluid className="text-light appliedthemecolor mx-2">
        <Container>
          <span class="appinfo">Job Application Information</span>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group as={Row}>
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                id="transp"
                name="job_title"
                value={appFormData.job_title}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Job Title"
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                id="transp"
                name="company_name"
                value={appFormData.company_name}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Name of the Company"
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Date Applied</Form.Label>
              <Form.Control
                id="transp"
                name="date_applied"
                value={appFormData.date_applied}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Date Applied"
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Job Lead</Form.Label>
              <Form.Control
                id="transp"
                name="lead_source"
                value={appFormData.lead_source}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Where did you find the job?"
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                id="transp"
                as="textarea"
                style={{ height: "150px" }}
                name="description"
                value={appFormData.description}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Summarize job description."
                aria-describedby="passwordHelpBlock"
              />

              <Form.Text id="passwordHelpBlock" muted>
                We suggest copying the job description from site that job was
                posted, since they tend to get taken down.
              </Form.Text>
              <br></br>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Follow Up</Form.Label>
              <Form.Control
                id="transp"
                as="textarea"
                style={{ height: "150px" }}
                name="follow_up"
                value={appFormData.follow_up}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Follow Up"
                aria-describedby="passwordHelpBlock"
              />
            </Form.Group>

            <Form.Text id="passwordHelpBlock" muted>
              We suggest adding your post interview follow up email.
            </Form.Text>
            <br></br>

            <Form.Group as={Row}>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                id="transp"
                as="textarea"
                style={{ height: "150px" }}
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
              Add any notes such as names, interview details, follow ups,
              recruiters you spoke to etc...
            </Form.Text>
            <br></br>

            <Row>
              <Col>Upload your documents here:</Col>

              <Col class="cntrbtns">
                <button
                  id="upload_widget"
                  class="space-btn"
                  onClick={uploadResume}
                >
                  Resume
                </button>
              </Col>

              <Col class="cntrbtns">
                <button
                  id="upload_widget"
                  class="space-btn"
                  onClick={uploadCoverLetter}
                >
                  Cover Letter
                </button>
              </Col>
            </Row>
            <br></br>

            <Form.Group as={Row} className="mt-3">
              <Col>
                <button className="space-btn limegreen" type="submit">
                  Save Application
                </button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};

export default CreateApp;
