import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link, useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import docpic from '../assets/document.png';



// import { useQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { FIND_APP } from '../utils/queries';

const PreviewApp = () => {
  const {applicationId} = useParams();
  const navigate = useNavigate();
    const { loading, data } = useQuery(FIND_APP, {
        variables: { applicationId: applicationId },
        fetchPolicy: 'network-only'
    });

  const application = data?.application || {};
  useEffect(() => {
    console.log(data);
}, [data])

console.log(applicationId)

  const navigateToUpdate = () => {
    // :point_down:️ navigate to /preview
    navigate(`/update/${application._id}`);
  }

  const handleDocument = (url) => {
    window.open(url);
  }

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
        
        <Card.Text className="text-muted prevDays">Days gone by since applied: {application.daysEllapsed}</Card.Text>

        <div className="documents">
            
            <div className="docicon" ><Link target="_blank" to={application.resume}><img alt="doc icon"
              src={docpic}
            /></Link> Resume Used</div>

            <div className="docicon"><Link target="_blank" to={application.cover_letter}><img alt="doc icon"
              src={docpic}
            /></Link> COVER LETTER USED</div>
            </div>

          <button className="space-btn limegreen"   role="button" onClick={navigateToUpdate}>Edit Application</button>


        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
      
    );
  }
  
  export default PreviewApp;
