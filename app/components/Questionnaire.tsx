'use client'

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_QUESTIONS = gql`
  query GetQuestions {
    getQuestions {
      id
      question
      type
      options
      required
    }
  }
`;

interface Question {
  id: string;
  question: string;
  type: "text" | "email" | "textarea" | "dropdown" | "radiobutton" | "checkbox" | "datepicker" | "fileupload";
  options?: string[];
  required: boolean;
}


const Questionnaire = () => {
    const { loading, error, data } = useQuery(GET_QUESTIONS);
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <div>Questionnaire</div>
            )}
        </>
    )       
}

export default Questionnaire