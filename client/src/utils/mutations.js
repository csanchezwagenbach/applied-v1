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
  mutation addApplication($job_title: String!, $lead_source: String!, $date_applied: String!) {
    addApplication(job_title: $job_title, lead_source: $lead_source, date_applied:$date_applied) {
      _id
      username
      email
      addApplication {
        _id
        job_title
        lead_source
        date_applied
      }
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
`;