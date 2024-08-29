'use client'

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import QuestionnaireCard from "./QuestionnaireCard";
import QuestionnaireNavigation from "./QuestionnaireNavigation";
import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import Question from "./Question";

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

interface QuestionType {
  id: string;
  question: string;
  type: "text" | "email" | "textarea" | "dropdown" | "radiobutton" | "checkbox" | "datepicker" | "fileupload";
  options?: string[];
  required: boolean;
}


const Questionnaire = () => {
    const { loading, error, data } = useQuery(GET_QUESTIONS);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    if (loading) return (
        <QuestionnaireCard>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h6" align="center">Loading...</Typography>
            <CircularProgress style={{ marginTop: '20px' }} />
          </div>
          
        </QuestionnaireCard>
    );
    if (error) return (
        <QuestionnaireCard>
            <Typography variant="h6" align="center">Error: {error.message}</Typography>
        </QuestionnaireCard>
    );

    const questions: QuestionType[] = data.getQuestions;

    const handleAnswerChange = (questionId: string, value: any) => {
        setAnswers({ ...answers, [questionId]: value });
        const currentQuestion = questions.find(q => q.id === questionId);
        if (currentQuestion && currentQuestion.required) {
          if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
            setShowError(true);
          } else {
            setShowError(false);
          }
        }
    };

    const validateRequiredFields = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const answer = answers[currentQuestion.id];
        if (currentQuestion.required) {
          if (answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0)) {
            return false;
          }
        }
        
        if (currentQuestion.type === "email") {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(answer)) {
            return false;
          }
        }
        return true;
    };

    const handleNext = () => {
    if (!validateRequiredFields()) {
        alert("Please answer the required question before proceeding.");
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
        handleSubmit(answers);
    }
    };

    const handleBack = () => {
        setShowError(false);
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex - 1);
        }
    };

    const handleSubmit = (answers: Record<string, any>) => {
        console.log("Submitted Answers: ", answers);
        setIsSubmitted(true);
        setSubmissionMessage("Thank you for submitting your answers!");
    };

    return (
        <QuestionnaireCard>
            {isSubmitted ? (
                <Typography variant="h5" align="center" gutterBottom>
                    {submissionMessage}
                </Typography>
            ) : (
                <>
                    <LinearProgress
                        variant="determinate"
                        value={((currentQuestionIndex + 1) / questions.length) * 100}
                        sx={{ 
                            marginBottom: '20px',
                            backgroundColor: 'lightgrey',
                        }}
                    />
                    <div style={{ border: showError ? '1px solid red' : 'none', padding: '0px' }}>
                        <Question
                            question={questions[currentQuestionIndex]}
                            answer={answers[questions[currentQuestionIndex]?.id] || ''}
                            onAnswerChange={handleAnswerChange}
                        />
                    </div>
                    {/* {reviewMode && (
                        <ReviewAnswers answers={answers} questions={questions} />
                    )} */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                        <QuestionnaireNavigation
                            hasPrevious={currentQuestionIndex > 0}
                            hasNext={currentQuestionIndex < questions.length - 1}
                            onPrevious={handleBack}
                            onNext={() => {
                                if (!validateRequiredFields()) {
                                    setShowError(true);
                                } else {
                                    setShowError(false);
                                    if (currentQuestionIndex < questions.length - 1) {
                                        handleNext();
                                    } else {
                                        handleSubmit(answers);
                                    }
                                }
                            }}
                            buttonText={
                                currentQuestionIndex < questions.length - 1 ? "Next →" : "Submit"
                            }
                        />
                    </div>
                </>
            )}
        </QuestionnaireCard>
    )       
}

export default Questionnaire