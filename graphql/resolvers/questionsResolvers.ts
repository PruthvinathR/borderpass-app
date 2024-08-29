

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
    submitAnswers: (parent: any, { answers }: { answers: string[] }) => {
      console.log('Received answers:', answers);
      return 'Answers submitted successfully!';
    },
  },
};

export default resolvers;