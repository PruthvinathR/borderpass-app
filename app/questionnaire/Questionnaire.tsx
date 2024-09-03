'use client'

import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import QuestionnaireCard from "./components/QuestionnaireCard";
import QuestionnaireNavigation from "./components/QuestionnaireNavigation";
import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import Question from "./components/Question";
import { GET_QUESTIONS } from "../lib/graphql/queries/questionsQuery";
import { SUBMIT_ANSWERS } from "../lib/graphql/mutations/questionsMutation";


interface QuestionType {
  id: string;
  question: string;
  type: "text" | "email" | "textarea" | "dropdown" | "radiobutton" | "checkbox" | "datepicker" | "fileupload";
  options?: string[];
  required: boolean;
}


const Questionnaire = () => {
    const { loading: questionsLoading, error, data } = useQuery(GET_QUESTIONS);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);
    const [submitAnswers, { loading: isSubmitting, error: submitError }] = useMutation(SUBMIT_ANSWERS);
    

    if (questionsLoading || isSubmitting) {
        const message = questionsLoading ? "Loading questions..." : "Submitting answers...";
        return (
            <QuestionnaireCard>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="h6" align="center">{message}</Typography>
                    <CircularProgress style={{ marginTop: '20px' }} />
                </div>
            </QuestionnaireCard>
        );
    }
    if (error || submitError) return (
        <QuestionnaireCard>
            <Typography variant="h6" align="center">Error: {error ? error.message : submitError?.message}</Typography>
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

    const handleSubmit = async (answers: Record<string, any>) => {
        console.log("Submitted Answers: ", answers);
        const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer: answer instanceof File ? undefined : answer,
          file: answer instanceof File ? answer : undefined
        }));
        console.log("Formatted Answers: ", formattedAnswers);

        try {
          await submitAnswers({ variables: { answers: formattedAnswers } });
          setIsSubmitted(true);
          setSubmissionMessage("Thank you for submitting your answers!");
        } catch (error) {
          console.error("Error submitting answers:", error);
          setSubmissionMessage("An error occurred while submitting your answers. Please try again.");
        }
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
                    <div style={{ paddingTop: '20px', overflow: 'auto', maxHeight: '60vh' }}>
                        <div style = {{border: showError ? '1px solid red' : 'none', padding: '5px', borderRadius: '5px'}}>
                            <Question
                                question={questions[currentQuestionIndex]}
                                answer={answers[questions[currentQuestionIndex]?.id] || ''}
                                onAnswerChange={handleAnswerChange}
                            />
                        </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', marginTop: '10px' }}>
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