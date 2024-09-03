import React from "react";
import { Button } from "@mui/material";

interface QuestionNavigationProps {
    hasPrevious: boolean;
    hasNext: boolean;
    backButtonText: string;
    nextButtonText: string;
    onPrevious: () => void;
    onNext: () => void;
  }

const QuestionnaireNavigation = ({ hasPrevious, hasNext, backButtonText, nextButtonText, onPrevious, onNext }: QuestionNavigationProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onPrevious} disabled={!hasPrevious} style={{ marginRight: '10px' }}>
        {backButtonText}
        </Button>
        <Button onClick={onNext}>
        {nextButtonText}
        </Button>
  </div>
  )
}

export default QuestionnaireNavigation