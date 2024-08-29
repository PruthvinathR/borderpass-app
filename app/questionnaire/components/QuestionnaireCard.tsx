
import React from 'react';
import { Card, CardContent } from '@mui/material';

interface QuestionCardProps {
  children: React.ReactNode;
}

const QuestionnaireCard = ({ children }: QuestionCardProps) => {
  return (
    <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        maxWidth: '600px',
        width: '90%', 
        height: 'auto',
        minHeight: '60vh',
        maxHeight: '90vh', 
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
      }}> 
      
      <CardContent>
          <img src="/borderpass.svg" alt="BorderPass Logo" style={{ width: '150px', marginBottom: '10px' }} />
          <hr style={{ border: 'none', height: '1px', backgroundColor: '#ccc', margin: '20px 0' }} />
          {children}
      </CardContent>
      </Card>
  )
}

export default QuestionnaireCard