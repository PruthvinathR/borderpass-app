'use client'

import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import QuestionnaireCard from "./components/QuestionnaireCard";
import QuestionnaireNavigation from "./components/QuestionnaireNavigation";
import { CircularProgress, Divider, LinearProgress, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
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
    const [isReviewing, setIsReviewing] = useState(false);
    const [review, setReview] = useState(false);
    const [reviewData, setReviewData] = useState<{ question: string; answer: string }[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);
    const [submitAnswers, { loading: isSubmitting, error: submitError }] = useMutation(SUBMIT_ANSWERS);
    

    useEffect(() => {
        if ( data && currentQuestionIndex === questions.length - 1) {
            setReview(true);
        }
        else {
            setReview(false);
        }
    }, [currentQuestionIndex]);


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
        if (isReviewing) {
            setIsReviewing(false);
            setReview(true);
        } else if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleSubmit = async (answers: Record<string, any>) => {
        setIsReviewing(false);
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

    const handleReview = (answers: Record<string, any>) => {
        setIsReviewing(true);
        setReview(false);
        
        // Create an array to store all questions and answers
        const reviewData = questions.map((question) => ({
            question: question.question,
            answer: answers[question.id] || 'Not answered'
        }));
        console.log("Review Data: ", reviewData);
        // Set the review data in the state
        setReviewData(reviewData);
    };

    const renderReviewAnswers = (reviewData: { question: string; answer: string | string[] | File | null }[]): React.ReactElement => {
        const formatAnswer = (answer: string | string[] | File | null) => {
            if (typeof answer === 'object' && answer !== null) {
                if (Array.isArray(answer)) {
                    return answer.join(', ');
                } else if (answer instanceof File) {
                    return answer.name;
                } else {
                    return JSON.stringify(answer);
                }
            }
            return String(answer);
        };

        return (
            <Paper elevation={1} sx={{ maxHeight: '50vh', overflow: 'auto', padding: 2, marginBottom: '20px' }}>
                <Typography variant="h6" gutterBottom>Review Your Answers</Typography>
                <List>
                    {reviewData.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={<Typography variant="subtitle1" color="primary">{item.question}</Typography>}
                                    secondary={
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {formatAnswer(item.answer)}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {index < reviewData.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        );
    };

    return (
        <QuestionnaireCard>
            {isSubmitted ? (
                <Typography variant="h5" align="center" gutterBottom>
                    {submissionMessage}
                </Typography>
            ) : (
                <>
                    {isReviewing ? (
                        renderReviewAnswers(reviewData)
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
                                <div style={{border: showError ? '1px solid red' : 'none', padding: '5px', borderRadius: '5px'}}>
                                    <Question
                                        question={questions[currentQuestionIndex]}
                                        answer={answers[questions[currentQuestionIndex]?.id] || ''}
                                        onAnswerChange={handleAnswerChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}
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
                                    } else if(review) {
                                        handleReview(answers);
                                    } else {
                                        handleSubmit(answers);
                                    }
                                }
                            }}
                            backButtonText="← Back"
                            nextButtonText={
                                currentQuestionIndex < questions.length - 1 ? "Next →" : (review ? "Review" : "Submit")
                            }
                        />
                    </div>
                </>
            )}
        </QuestionnaireCard>
    );
}

export default Questionnaire;