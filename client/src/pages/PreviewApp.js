import {useNavigate} from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function PreviewApp() {
   const navigate = useNavigate();
  const navigateToUpdate = () => {
    // 👇️ navigate to /preview
    navigate('/update');
  }
    return (
      <Card className="prevCard">
        <div className="prevHead"><Card.Header>Saved Application</Card.Header></div>
        <Card.Body>
          <div className="prevCompany"><Card.Title>American Honda Motor Corp.
            </Card.Title></div>

          <div className="prevTitle"><Card.Text>
            Jr. Software Developer
          </Card.Text></div>

          <div className="prevLead"><Card.Text>
            Indeed
          </Card.Text></div>

          <div className="prevSummary"><Card.Text>
          Summary

Role and Responsibilities<br></br>

As a Software Engineer at CAE you are part of the program team which strives to, not only meet, but exceed our customers’ expectations. Software Engineers support computational systems architecture and system software for real-time simulation applications; create new and modified simulation models using established modeling techniques; and work closely with other engineering disciplines.
<br></br><br></br>
Essential Duties And Responsibilities
<br></br>
Reasonable accommodations may be made to enable individuals with disabilities to perform the essential functions.
<br></br>
Ability to apply sound engineering principles and develop innovative solutions<br></br>
Demonstrated ability to design, develop, document, test and debug simulation software and systems that contain logical and mathematical solutions<br></br>
Experience implementing functional requirements for computer software
<br></br><br></br>
Qualifications And Education Requirements
<br></br>
BS Software Engineering, Computer Science or equivalent experience required<br></br>
Software languages – Ada, C/C++, FORTRAN, C#<br></br>
Excellent communication skills including oral, written, interpersonal, and listening<br></br>
Proven success in a fast-paced development environment and possess a willingness to take ownership, accept accountability, and thrive under pressure<br></br>
Ability to provide and receive constructive criticism<br></br>
Strong problem solving, troubleshooting and analytical skills<br></br>
Ability to obtain a Secret DOD security clearance<br></br>
Flexibility to support occasional overtime, weekend work, shift work and site travel (CONUS)<br></br>
General computer skills including use of Microsoft Office products<br></br><br></br>

Preferred Skills<br></br>

MS Windows Linux, Unix, OO Design, Qt, DDS experience<br></br>
Experience with Digital Content Creation tools (i.e. MODO, Maya, 3DSMAX), texturing tools (i.e. Photoshop, MARI, Substance Painter/Designer), game engines (i.e. Unreal Engine 4, Unity)<br></br>
Familiarity with aircraft avionics 1553 protocol and simulator experience<br></br>
Knowledge of different testing methodologies (e.g., White/Gray/Black box testing)<br></br>

          </Card.Text></div>

          <div className="prevNotes"><Card.Text>
            I spoke with Jim Brown, he is the hiring manager, and will meet me in the lobby prior to interview. Sarah Jackson and Gerald Smith will be performing the interview. Interview date and time is 4/25 at 3pm.
          </Card.Text></div>

          <div className="prevDate"><Card.Text>
            Applied on 03/16/23
          </Card.Text></div>

          <div className="prevFollow"><Card.Text>
            Follow up email here.
          </Card.Text></div>

          <button className="spacer-Btn" type="submit" role="button" onClick={navigateToUpdate}>Edit Application</button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      
    );
  }
  
  export default PreviewApp;