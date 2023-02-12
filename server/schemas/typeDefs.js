const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    applications: [Application]
}

type Application {
    _id: ID!
    job_title: String!
    lead_source: String!
    resume: Resume
    cover_letter: CoverLetter
    notes: Text
    follow_up: Text
    date_applied: Date!
}

type Resume {
    _id: ID
    url: String!
}

type CoverLetter {
    _id: ID
    url: String!
}

type Auth {
    token: ID!
    user: User
  }

input ResumeInput {
    url: String!
}

input CoverLetterInput {
    url: String!
}

type Query {
    me: User
    applications(username: String): [Application]
    application(applicationID: ID!): Application
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addApplication(job_title: String!, lead_source: String!, date_applied:): Application
    deleteApplication(_id: ID!): Application
}
`

module.exports = typeDefs;