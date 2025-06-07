import QuestionDropdown from "../QuestionDropdown";
import { questionsConfig } from "../../config/questions";
import { QuestionnaireProps } from "./types";

const Questionnaire = ({
  formState,
  handleStateChange,
  stageRefs,
}: QuestionnaireProps) => {
  return (
    <div className="space-y-4">
      {questionsConfig.map((question, index) => (
        <div
          key={question.id}
          ref={(el) => {
            if (stageRefs.current) {
              stageRefs.current[index] = el;
            }
          }}
          className="scroll-mt-32"
        >
          <QuestionDropdown
            title={question.title}
            options={question.options}
            value={formState[question.id]}
            onChange={(value) => handleStateChange(question.id, value)}
            questionId={question.id}
          />
        </div>
      ))}
    </div>
  );
};

export default Questionnaire;
