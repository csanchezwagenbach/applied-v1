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
}
`;