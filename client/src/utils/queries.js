import { gql } from '@apollo/client';
export const QUERY_ME = gql`
  query me {
  me {
    username
    applications {
      _id
      job_title
      company_name
      lead_source
      date_applied
    }
  }
}
`;

export const FIND_APP = gql`
query application($applicationId: ID!) {
  application(applicationId: $applicationId) {
    job_title
    _id
    company_name
    lead_source
    description
    resume 
    cover_letter 
    notes
    follow_up
    date_applied
    daysEllapsed
  }
}`