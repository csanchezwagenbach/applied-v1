import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';


// import { useQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { FIND_APP } from '../utils/queries';

const PreviewApp = () => {

const {applicationId} = useParams();
const navigate = useNavigate();

    const { loading, data } = useQuery(FIND_APP, {
        variables: { applicationId: applicationId },
    });

    const application = data?.application || {};
useEffect(() =>{
    console.log(data);
}, [data])

console.log(applicationId)

  const navigateToUpdate = () => {
    // :point_down:️ navigate to /preview
    navigate(`/update/${application._id}`);
  }


    return (
      <Card className="prevCard" key={application._id}>
        <div className="prevHead"><Card.Header>Saved Application</Card.Header></div>
        <Card.Body>
          <div className="prevCompany"><Card.Title>{application.company_name}
            </Card.Title></div>

          <div className="prevTitle"><Card.Text>
          {application.job_title}
          </Card.Text></div>

          <div className="prevLead"><Card.Text>
          {application.lead_source}
          </Card.Text></div>

          <div className="prevSummary"><Card.Text>
          {application.description}
        </Card.Text></div>

          <div className="prevNotes"><Card.Text>
          {application.notes}
          </Card.Text></div>

          <div className="prevDate"><Card.Text>
          {application.date_applied}
          </Card.Text></div>

          <div className="prevFollow"><Card.Text>
          {application.follow_up}
          </Card.Text></div>

          <button className="spacer-btn"  role="button" onClick={navigateToUpdate}>Edit Application</button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      
    );
  }
  
  export default PreviewApp;