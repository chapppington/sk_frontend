import QuestionDropdown from "../QuestionDropdown";
import { QuestionnaireProps } from "./types";
import ContactForm from "@/components/ContactForm";

const Questionnaire = ({
  formState,
  handleStateChange,
  stageRefs,
  onSuccess,
  questions,
}: QuestionnaireProps) => {
  // Filter visible questions and create a mapping of original IDs to new sequential numbers
  const visibleQuestions = questions.filter(
    (question) => !question.showIf || question.showIf(formState)
  );

  const questionNumberMap = visibleQuestions.reduce((acc, question, index) => {
    acc[question.id] = index + 1;
    return acc;
  }, {} as Record<number, number>);

  // Создаем функцию-обертку для обработки успеха с данными опросника
  const handleSuccessWithQuestionnaire = () => {
    // Здесь можно добавить логику сохранения данных опросника
    console.log("Questionnaire data:", formState);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      {questions.map((question, index) => {
        // Skip questions that don't meet their showIf condition
        if (question.showIf && !question.showIf(formState)) {
          return null;
        }

        // Get the new question number
        const newNumber = questionNumberMap[question.id];
        // Replace the old number with the new one in the title
        const newTitle = question.title.replace(/^\d+/, newNumber.toString());

        return (
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
              title={newTitle}
              options={question.options}
              value={formState[question.id]}
              onChange={(value) => handleStateChange(question.id, value)}
              questionId={question.id}
              popoverContent={question.popoverContent}
              type={question.type}
              textLabel={question.textLabel}
              numberOfSections={
                question.id === 17 ? (formState[4] as number) : undefined
              }
            />
          </div>
        );
      })}
      <div
        ref={(el) => {
          if (stageRefs.current) {
            stageRefs.current[questions.length] = el;
          }
        }}
      >
        <ContactForm
          variant="questionnaire"
          onSuccess={handleSuccessWithQuestionnaire}
          meta={{ questionnaireData: formState }}
        />
      </div>
    </>
  );
};

export default Questionnaire;
