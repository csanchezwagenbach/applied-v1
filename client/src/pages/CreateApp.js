import React, { useState, useQuery } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { QUERY_ME } from '../utils/queries';
// import DatePicker from "react-datepicker";
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

import { useMutation } from "@apollo/client";
import { ADD_APPLICATION } from "../utils/mutations";
// import { saveBookIds, getSavedBookIds } from "../utils/localStorage";

import Auth from "../utils/auth";

const CreateApp = () => {
  const [addApplication, { error }] = useMutation(ADD_APPLICATION);
const [selectedDate, setSelectedDate] = useState(null)
const [appFormData, setAppFormData] = useState({
    job_title: '',
    company_name: '',
    lead_source: '',
    resume: '',
    cover_letter: '',
    notes: '',
    follow_up: '',
    date_applied: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppFormData({ ...appFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  // create function that accepts the book's mongo _id value as param and deletes the book from the database

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // check if form has everything (as per react-bootstrap docs)
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
console.log(appFormData)
    try {
      const { data } = await addApplication({
        variables: { ...appFormData },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    // setAppFormData({
    //   job_title: "",
    //   lead_source: "",
    //   company_name: "",
    //   resume: "",
    //   cover_letter: "",
    //   notes: "",
    //   follow_up: "",
    //   date_applied: "",
    // });
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
                placeholder="Job Title"
              />
              </Form.Group>

              <Form.Group as={Row}>
              <Form.Label>Company Name</Form.Label>
              <Form.Control  id="transp"
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
              <Form.Control  id="transp"
                name="date_applied"
                value={appFormData.data_applied}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Date Applied"
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
              <Form.Control  id="transp"
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
              <Form.Control  id="transp" 
                as= "textarea"
                style={{height: '150px'}}
                name="description"
                value={appFormData.description}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Summarize job description."
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
              as= "textarea"
              style={{height: '150px'}}
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


            <Col  class="cntrbtns">
              {/* <Form.Label>Upload Resume</Form.Label> */}
              {/* <button id="upload_widget" class="button-85" role="button"  onClick={uploadResume}>Upload Resume</button> */}
              <button id="upload_widget" class="space-btn" onClick={uploadResume}>Upload Resume</button>
            </Col>

            <Col  class="cntrbtns">
              {/* <Form.Label>Upload CV/Cover Letter</Form.Label> */}
              {/* <button id="upload_widget" class="button-85" role="button" onClick={uploadCoverLetter}>Upload Cover Letter </button> */}
              <button id="upload_widget" class="space-btn" onClick={uploadCoverLetter}>Upload CV</button>
            </Col>
            </Row><br></br>

            <Form.Group as={Row} className="mt-3">
              <Col>
                {/* <Button type="submit" variant="success" size="sm">Save Application</Button> */}
                <button type="submit" class="space-btn" role="button" >Save Application</button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};

export default CreateApp;

// // To set two dates to two variables
// var date1 = new Date("06/30/2019");
// var date2 = new Date("07/30/2019");

// // To calculate the time difference of two dates
// var Difference_In_Time = date2.getTime() - date1.getTime();

// // To calculate the no. of days between two dates
// var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

// //To display the final no. of days (result)
// console.log("Total number of days between dates  <br>"
//            + date1 + "<br> and <br>"
//            + date2 + " is: <br> "
//            + Difference_In_Days);
