"use client";

import { IProduct } from "@/shared/types/product.types";
import CustomContainer from "@/components/ui/CustomContainer";
import MainButton from "@/components/ui/MainButton";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuestionnaireButtonsScreenProps {
  product: IProduct;
}

const QuestionnaireButtonsScreen = ({
  product,
}: QuestionnaireButtonsScreenProps) => {
  const isMobile = useIsMobile();

  return (
    <CustomContainer>
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <MainButton
            text={
              isMobile
                ? "Заполнить опросный лист"
                : "Заполнить опросный лист онлайн"
            }
            href="/questionnaire"
            fullWidth
          />
        </div>
        <div className="w-full sm:w-1/2">
          <MainButton
            text="Отправить заявку"
            transparent
            fullWidth
            href="#contact_us_section"
          />
        </div>
      </div>
    </CustomContainer>
  );
};

export default QuestionnaireButtonsScreen;
