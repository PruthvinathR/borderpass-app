import { gql } from "@apollo/client";

export const SUBMIT_ANSWERS = gql`
  mutation SubmitAnswers($answers: [AnswerInput!]!) {
    submitAnswers(answers: $answers)
  }
`;

