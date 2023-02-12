const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    savedApplications: [Application]
}

type Application {
    _id: ID
    job_title: String!
    lead_source: String!
    resume: Resume
    cover_letter: CoverLetter
    notes: Text
    follow_up: Text
    date_applied: Date!
}

type Auth {
    token: ID!
    user: User
  }
`