"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import MainButton from "@/components/ui/MainButton";

const QuestionnaireButtonsScreen = () => {
  return (
    <CustomContainer>
      <div className="w-full flex gap-4">
        <div className="w-1/2">
            <MainButton
            text="Заполнить опросный лист онлайн"
            href="/questionnaire"
            fullWidth
            />
        </div>
        <div className="w-1/2">
          <MainButton
          text="Кнопка действия"
          transparent
          fullWidth
          />
        </div>
      </div>
    </CustomContainer>
  );
};

export default QuestionnaireButtonsScreen;
