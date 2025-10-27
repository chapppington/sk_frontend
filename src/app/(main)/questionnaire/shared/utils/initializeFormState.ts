import { IFormState, IQuestion } from "@/app/(main)/questionnaire/shared/types";

/**
 * Creates an initial form state where:
 * - Questions with multiple options start with an empty array []
 * - Questions with single answers start with an empty string ""
 */
export const initializeFormState = (questions: IQuestion[]): IFormState => {
  // Create initial state by mapping each question to its default value
  const initialState = questions.map((question) => ({
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

