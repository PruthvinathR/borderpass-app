import React from "react";
import TextInput from "./QuestionTypes/TextInput";
import TextArea from "./QuestionTypes/TextArea";
import Dropdown from "./QuestionTypes/Dropdown";
import RadioButtonGroup from "./QuestionTypes/RadioButtonGroup";
import CheckboxGroup from "./QuestionTypes/CheckboxGroup";
import DatePicker from "./QuestionTypes/DatePicker";
import FileUpload from "./QuestionTypes/FileUpload";
import EmailInput from "./QuestionTypes/EmailInput";

interface Question {
  id: string;
  question: string;
  type: string;
  options?: string[];
  required: boolean;
}

interface QuestionProps {
    question: Question;
    answer: any;
    onAnswerChange: (id: string, answer: any) => void;
}
  

const Question = ({ question, answer, onAnswerChange }: QuestionProps) => {
    const renderQuestionComponent = () => {
        switch (question.type) {
          case "text":
            return (
              <TextInput
                label={question.question}
                value={answer || ""}
                required={question.required}
                onChange={(value) => onAnswerChange(question.id, value)}
              />
            );
          case "email":
            return (
              <EmailInput
                label={question.question}
                value={answer || ""}
                required={question.required}
                onChange={(value) => onAnswerChange(question.id, value)}
              />
            );
          case "textarea":
            return (
              <TextArea
                label={question.question}
                value={answer || ""}
                required={question.required}
                onChange={(value) => onAnswerChange(question.id, value)}
              />
            );
          case "dropdown":
            return (
              <Dropdown
                label={question.question}
                value={answer || ""}
                options={question.options || []}
                required={question.required}
                onChange={(value) => onAnswerChange(question.id, value)}
              />
            );
          case "radiobutton":
            return (
              <RadioButtonGroup
                label={question.question}
                value={answer || ""}
                options={question.options || []}
                required={question.required}
                onChange={(value) => onAnswerChange(question.id, value)}
              />
            );
          case "checkbox":
            return (
              <CheckboxGroup
                label={question.question}
                value={answer || []}
                options={question.options || []}
                required={question.required}
                onChange={(value) => onAnswerChange(question.id, value)}
              />
            );
          case "datepicker":
            return (
              <DatePicker
                label={question.question}
                value={answer || ""}
                required={question.required}
                onChange={(value) => onAnswerChange(question.id, value)}
              />
            );
          case "fileupload":
            return (
              <FileUpload
                label={question.question}
                required={question.required}
                onChange={(value) => onAnswerChange(question.id, value)}
                value={answer || null}
              />
            );
          default:
            return null;
        }
      };
    
      return <div>{renderQuestionComponent()}</div>;
}

export default Question;