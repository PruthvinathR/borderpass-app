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

  scalar Upload

  input AnswerInput {
    questionId: ID!
    answer: [String!]
    file: Upload
  }

  type Mutation {
    submitAnswers(answers: [AnswerInput!]!): Boolean!
  }
`;


export default typeDefs;