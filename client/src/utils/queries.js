import { gql } from '@apollo/client';
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      applications {
       _id
       job_title
        lead_source
        resume
        cover_letter
        notes
        follow_up
        date_applied
      }
    }
  }
`;