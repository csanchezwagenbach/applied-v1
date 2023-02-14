// import React, { useState, useEffect } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom'


// import { useQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_APP } from '../utils/queries';

const PreviewApp = () => {
    const { loading, data } = useQuery(QUERY_APP);

    const userData = data?.me || {};
}

const navigate = useNavigate();
  const navigateToUpdate = () => {
    // :point_down:️ navigate to /preview
    navigate('/update');
  }

function PreviewApp() {
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

          <button className="spacer-Btn" type="submit" role="button" onClick={navigateToUpdate}>Edit Application</button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      
    );
  }
  
  export default PreviewApp;