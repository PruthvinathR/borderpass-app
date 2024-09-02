import React from "react";
import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import Dropdown from "../../ui/Dropdown";
import RadioButtonGroup from "../../ui/RadioButtonGroup";
import CheckboxGroup from "../../ui/CheckboxGroup";
import DatePicker from "../../ui/DatePicker";
import FileUpload from "../../ui/FileUpload";
import EmailInput from "../../ui/EmailInput";

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
        const commonProps = {
          label: question.question,
          value: answer || "",
          required: question.required,
          options: question.options || [],
          onChange: (value: any) => onAnswerChange(question.id, value)
        };
          
        const componentMap = {
          text: TextInput,
          email: EmailInput,
          textarea: TextArea,
          dropdown: Dropdown,
          radiobutton: RadioButtonGroup,
          checkbox: CheckboxGroup,
          datepicker: DatePicker,
          fileupload: FileUpload
        };

        const Component = componentMap[question.type as keyof typeof componentMap];
        
        if (!Component) {
          return null;
        }
        
        return <Component {...commonProps} />;


    };
    
    return <div>{renderQuestionComponent()}</div>;
}

export default Question;