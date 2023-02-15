import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;
export const ADD_APPLICATION = gql`
mutation addApplication($job_title: String!, $company_name: String!, $lead_source: String!, $description: String!, $date_applied: String!) {
  addApplication(job_title: $job_title, company_name: $company_name, lead_source: $lead_source, description: $description, date_applied: $date_applied) {
    job_title
    _id
    company_name
  }
}
`;
export const DELETE_APP = gql`
  mutation deleteApplication($_id: ID!) {
    deleteApplication(_id: $applicationId) {
      _id
      username
      email
      addApplication {
        _id
      }
    }
  }
`
export const UPDATE_APP = gql`
mutation updateApplication($applicationId: ID!, $job_title: String, $company_name: String, $lead_source: String, $description: String, $resume: String, $cover_letter: String, $notes: String, $follow_up: String) {
  updateApplication(applicationId: $applicationId, job_title: $job_title, company_name: $company_name, lead_source: $lead_source, description: $description, resume: $resume, cover_letter: $cover_letter, notes: $notes, follow_up: $follow_up) {
    _id
  }
}
`;