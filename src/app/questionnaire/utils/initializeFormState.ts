import { questionsConfig } from "../config/questions";

// Define the possible types of answers in our form
type Answer = string | number | string[];

// Form state is a record of question IDs to their answers
export interface IFormState {
  [questionId: number]: Answer;
}

/**
 * Creates an initial form state where:
 * - Questions with multiple options start with an empty array []
 * - Questions with single answers start with an empty string ""
 */
export const initializeFormState = (): IFormState => {
  // Create initial state by mapping each question to its default value
  const initialState = questionsConfig.map((question) => ({
    questionId: question.id,
    defaultValue: Array.isArray(question.options) ? [] : "",
  }));

  // Convert the array of question states into a single object
  return initialState.reduce(
    (formState, { questionId, defaultValue }) => ({
      ...formState,
      [questionId]: defaultValue,
    }),
    {}
  );
};
