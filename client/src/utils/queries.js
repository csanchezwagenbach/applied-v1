import { gql } from '@apollo/client';
export const QUERY_ME = gql`
  query me {
  me {
    username
    applications {
      job_title
      company_name
      lead_source
      date_applied
    }
  }
}`;
export const FIND_APP = {gql}
`query application($applicationId: ID!) {
  application(applicationId: $applicationId) {
    job_title
    _id
    company_name
    lead_source
    description
    resume {
      _id
      url
    }
    cover_letter {
      _id
      url
    }
    notes
    follow_up
    date_applied
    daysEllapsed
  }
}`