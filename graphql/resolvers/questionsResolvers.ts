

interface Question {
  id: string;
  question: string;
  type: "text" | "email" | "textarea" | "datepicker" | "checkbox" | "radiobutton" | "fileupload" | "dropdown";
  options?: string[];
  required: boolean;
}

const questions: Question[] = [
  { id: "1", question: "Please enter your name", type: "text", required: true },
  { id: "2", question: "Email address", type: "email", required: true },
  { id: "3", question: "Tell us about yourself", type: "textarea", required: false },
  { id: "4", question: "What is your date of birth?", type: "datepicker", required: true },
  { id: "5", question: "Select your favorite programming languages", type: "checkbox", options: ["JavaScript", "Python", "C", "java"], required: false },
  { id: "6", question: "Choose your gender", type: "radiobutton", options: ["Male", "Female", "Non-binary", "Prefer not to say"], required: true },
  { id: "7", question: "Upload your resume", type: "fileupload", required: true },
  { id: "8", question: "Select your country", type: "dropdown", options: ["USA", "Canada", "UK", "Australia", "Other"], required: true }
];

// Resolvers
const resolvers = {
  Query: {
    getQuestions: () => questions,
  },
  Mutation: {
    submitAnswers: async (_: any, { answers }: { answers: { questionId: string; answer?: string | string[]; file?: File }[] }) => {      
      // Validate answers
      for (const { questionId, answer, file } of answers) {
        const question = questions.find(q => q.id === questionId);
        if (!question) {
          throw new Error(`Question with id ${questionId} not found`);
        }
        
        if (question.required && (
          (answer === undefined && file === undefined) || 
          answer === '' || 
          (Array.isArray(answer) && answer.length === 0)
        )) {
          throw new Error(`Question "${question.question}" is required`);
        }
        
        if (question.type === 'email' && answer !== undefined) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(answer as string)) {
            throw new Error(`Invalid email format for question "${question.question}"`);
          }
        }

        if (question.type === 'fileupload' && file === undefined) {
          throw new Error(`File upload is required for question "${question.question}"`);
        }
      }

      // Save to database
      try {
        // Simulating database operation with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        answers.forEach(({ questionId, answer, file }) => {
          const question = questions.find(q => q.id === questionId);
          if (question) {
            console.log(`Question: ${question.question}`);
            if (file) {
              console.log(`File: ${file.name}`);
              console.log(`File size: ${file.size}`);
            } else {
              console.log(`Answer: ${typeof answer === 'object' ? JSON.stringify(answer) : answer}`);
            }
          }
        });
        
        return true;
      } catch (error) {
        console.error('Error processing answers:', error);
        throw new Error('Failed to submit answers. Please try again.');
      }
    },
  }
};  

export default resolvers;