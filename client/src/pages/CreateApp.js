import React, { useState, useEffect } from "react";
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

const [appFormData, setAppFormData] = useState({
    job_title: '',
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

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addApplication({
        variables: { ...appFormData },
      });
      console.log(data);
    
    } catch (err) {
      console.error(err);
    }

    setAppFormData({
        job_title: '',
        lead_source: '',
        resume: '',
        cover_letter: '',
        notes: '',
        follow_up: '',
        date_applied: ''
      })
  };

  const uploadResume =(e)=>{
    e.preventDefault()
    var myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'di629rovn', 
        uploadPreset: 'u5n4cgbf'}, (error, result) => { 
          if (!error && result && result.event === "success") {
            
            setAppFormData({...appFormData, resume:result.info.url})
            console.log('Done! Here is the image info: ', result.info); 
          }
        }
      )
      myWidget.open();
  }
const uploadCoverLetter =(e)=>{
  e.preventDefault()
    var myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'di629rovn', 
        uploadPreset: 'u5n4cgbf'}, (error, result) => { 
          if (!error && result && result.event === "success") {
            
            setAppFormData({...appFormData, cover_letter:result.info.url})
            console.log('Done! Here is the image info: ', result.info); 
          }
        }
      )
      myWidget.open();
  }




    // const [image, setImage ] = useState("");
    // const [ url, setUrl ] = useState("");

    // const uploadImage = () => {
    // const data = new FormData()
    // data.append("file", image)
    // data.append("upload_preset", "u5n4cgbf")
    // fetch("  https://api.cloudinary.com/v1_1/di629rovn/image/upload",{
    // method:"post",
    // body: data
    // })
    // .then(resp => resp.json())
    // .then(data => {
    // setUrl(data.url)
    // })
    // .catch(err => console.log(err))
    // }



  // create function to handle saving a application to our database

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Job Application Information</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group as={Row}>
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                name="job_title"
                value={appFormData.job_title}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Job Title"
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>Date Applied</Form.Label>
              <Form.Control
                name="date_applied"
                value={appFormData.data_applied}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="MM/DD/YY"
              />
              {/* <ControlLabel>Label</ControlLabel>
              <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
              <HelpBlock>Help</HelpBlock> */}
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Job Lead</Form.Label>
              <Form.Control
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
              <Form.Text id="passwordHelpBlock" muted>
                We suggest copying the job description from site that job was
                posted, since they tend to get taken down.
              </Form.Text>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Notes</Form.Label>
              <Form.Control
              as= "textarea"
              style={{height: '150px'}}
                name="notes"
                value={appFormData.notes}
                onChange={handleInputChange}
                type="text"
                size="lg"
                placeholder="Summarize job description."
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Add any notes such as follow up emails, recruiters you spoke to
                etc...
              </Form.Text>
            </Form.Group>
            <Row>
            <Col>
              <Form.Label>Upload Resume</Form.Label>
              
              <button id="upload_widget" class="cloudinary-button" onClick={uploadResume}>Upload Resume</button>
            </Col>
            <Col>
              <Form.Label>Upload CV/Cover Letter</Form.Label>
              
      
              <button id="upload_widget" class="cloudinary-button" onClick={uploadCoverLetter}>Upload Cover Letter</button>
            </Col>
            </Row>

            <Form.Group as={Row} className="mt-3">
              <Col>
                <Button as ={Col} type="submit" variant="success" size="lg">Submit</Button>
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

 
