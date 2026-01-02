export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  selectedOptions: string[]; // Array of selected options strings
  otherText: string; // If "Other" is selected, this holds the custom input
}

export interface LogoStyle {
  id: string;
  name: string;
  description: string;
  prompt: string; // Logo prompt
  heroPrompt: string; // Landing page background prompt
  imageUrl?: string; // Logo URL
  heroImageUrl?: string; // Landing page hero URL
  selected: boolean;
}

export interface FormState {
  questions: Question[];
  logoStyles: LogoStyle[];
  additionalNotes: string;
}
