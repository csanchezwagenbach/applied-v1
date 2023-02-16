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
        company_name: String!
        lead_source: String!
        description: String!
        resume: String
        cover_letter: String
        notes: String
        follow_up: String
        date_applied: String!
        daysEllapsed: String
    }

type Auth {
    token: ID!
    user: User
  }


type Query {
    me: User
    applications(username: String): [Application]
    application(applicationId: ID!): Application
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addApplication(job_title: String!, resume: String, cover_letter: String, company_name: String!, lead_source: String!, description: String!, date_applied: String!): Application
    updateApplication(applicationId: ID!, job_title: String, company_name: String, lead_source: String, description: String, resume: String, cover_letter: String, notes: String, follow_up: String): Application
    deleteApplication(_id: ID!): Application
}
`;

module.exports = typeDefs;