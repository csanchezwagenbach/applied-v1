// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';


// import { useQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { FIND_APP } from '../utils/queries';

const PreviewApp = () => {
  //url is /update/:applicationId
  const { applicationId } = useParams();

  const { loading, data } = useQuery(FIND_APP, {
    variables: { applicationId: applicationId },
  });

  const application = data?.application || {};
  useEffect(() => {
    console.log(data);
  }, [data])
  console.log(applicationId)
  // const navigate = useNavigate();
  //   const navigateToUpdate = () => {
  //     // :point_down:️ navigate to /preview
  //     navigate('/update');
  //   }


    return (
      <Card className="prevCard" key={application._id}>
        <div className="prevHead"><Card.Header>Saved Application</Card.Header></div>
        <Card.Body>
          <div className="prevCompany"><span className="prevCompanyLabel">COMPANY NAME</span>
          <Card.Title>{application.company_name}
            </Card.Title></div>

          <div className="prevTitle"><span className="prevCompanyLabel">JOB TITLE</span><Card.Text>
          {application.job_title}
        </Card.Text></div>

          <div className="prevLead"><span className="prevCompanyLabel">LEAD SOURCE</span><Card.Text>
          {application.lead_source}
        </Card.Text></div>

          <div className="prevSummary"><span className="prevCompanyLabel">JOB DESCRIPTION</span><Card.Text>
          {application.description}
          </Card.Text></div>

          <div className="prevNotes"><span className="prevCompanyLabel">NOTES</span><Card.Text>
          {application.notes}
        </Card.Text></div>

          <div className="prevFollow"><span className="prevCompanyLabel">FOLLOW-UP EMAIL</span><Card.Text>
          {application.follow_up}
          </Card.Text></div>

          <div className="prevDate"><span className="prevCompanyLabel">DATE APPLIED</span><Card.Text>
          {application.date_applied}
        </Card.Text></div>

        <div className="prevFollow"><Card.Text>
          {application.follow_up}
        </Card.Text></div>



          




          <button className="space-btn limegreen"  role="button">Edit Application</button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      
    );
  }
  
  export default PreviewApp;
