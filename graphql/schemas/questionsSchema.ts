import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Question {
    id: ID!
    question: String!
    type: String!
    options: [String]
    required: Boolean!
  }

  type Query {
    getQuestions: [Question!]!
  }

  type Mutation {
    submitAnswers(answers: [String!]!): String
  }
`;


export default typeDefs;