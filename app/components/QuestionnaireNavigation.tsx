import React from "react";
import { Button } from "@mui/material";

interface QuestionNavigationProps {
    hasPrevious: boolean;
    hasNext: boolean;
    buttonText: string;
    onPrevious: () => void;
    onNext: () => void;
  }

const QuestionnaireNavigation = ({ hasPrevious, hasNext, buttonText, onPrevious, onNext }: QuestionNavigationProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onPrevious} disabled={!hasPrevious} style={{ marginRight: '10px' }}>
        ← Back
        </Button>
        <Button onClick={onNext}>
        {buttonText}
        </Button>
  </div>
  )
}

export default QuestionnaireNavigation