import QuestionDropdown from "../QuestionDropdown";
import { questionsConfig } from "../../config/questions";
import { QuestionnaireProps } from "./types";
import ContactForm from "@/components/ContactForm";

const Questionnaire = ({
  formState,
  handleStateChange,
  stageRefs,
}: QuestionnaireProps) => {
  return (
    <>
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
            popoverContent={question.popoverContent}
            type={question.type}
            textLabel={question.textLabel}
          />
        </div>
      ))}
      <div
        ref={(el) => {
          if (stageRefs.current) {
            stageRefs.current[questionsConfig.length] = el;
          }
        }}
      >
        <ContactForm variant="questionnaire" />
      </div>
    </>
  );
};

export default Questionnaire;
