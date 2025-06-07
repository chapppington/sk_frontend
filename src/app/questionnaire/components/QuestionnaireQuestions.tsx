import { IQuestionnaireState } from "../types";
import KtpTypeQuestion from "./questions/KtpTypeQuestion";
import ImplementationQuestion from "./questions/ImplementationQuestion";
import TransformerCountQuestion from "./questions/TransformerCountQuestion";
import TransformerTypeQuestion from "./questions/TransformerTypeQuestion";
import TransformerPowerQuestion from "./questions/TransformerPowerQuestion";
import WindingGroupQuestion from "./questions/WindingGroupQuestion";
import VoltageClassQuestion from "./questions/VoltageClassQuestion";
import SwitchgearQuestion from "./questions/SwitchgearQuestion";
import CellPurposeQuestion from "./questions/CellPurposeQuestion";
import Section10Question from "./questions/Section10Question";
import Section11Question from "./questions/Section11Question";
import Section12Question from "./questions/Section12Question";
import Section13Question from "./questions/Section13Question";
import Section14Question from "./questions/Section14Question";
import Section15Question from "./questions/Section15Question";
import Section16Question from "./questions/Section16Question";
import Section17Question from "./questions/Section17Question";
import Section18Question from "./questions/Section18Question";
import Section19Question from "./questions/Section19Question";
import Section20Question from "./questions/Section20Question";
import Section21Question from "./questions/Section21Question";
import Section22Question from "./questions/Section22Question";
import Section23Question from "./questions/Section23Question";
import Section24Question from "./questions/Section24Question";
import Section25Question from "./questions/Section25Question";

interface QuestionnaireQuestionsProps {
  formState: IQuestionnaireState;
  handleStateChange: (key: keyof IQuestionnaireState, value: any) => void;
}

export default function QuestionnaireQuestions({
  formState,
  handleStateChange,
}: QuestionnaireQuestionsProps) {
  return (
    <>
      <KtpTypeQuestion
        value={formState.selectedKtpType}
        onChange={(value) => handleStateChange("selectedKtpType", value)}
      />

      <ImplementationQuestion
        value={formState.selectedImplementation}
        onChange={(value) => handleStateChange("selectedImplementation", value)}
      />

      <TransformerCountQuestion
        value={formState.selectedTransformerCount}
        onChange={(value) =>
          handleStateChange("selectedTransformerCount", value)
        }
      />

      <TransformerTypeQuestion
        value={formState.selectedTransformerType}
        onChange={(value) =>
          handleStateChange("selectedTransformerType", value)
        }
      />

      <TransformerPowerQuestion
        value={formState.selectedTransformerPower}
        onChange={(value) =>
          handleStateChange("selectedTransformerPower", value)
        }
      />

      <WindingGroupQuestion
        value={formState.selectedWindingGroup}
        onChange={(value) => handleStateChange("selectedWindingGroup", value)}
      />

      <VoltageClassQuestion
        value={formState.selectedVoltageClass}
        onChange={(value) => handleStateChange("selectedVoltageClass", value)}
      />

      <SwitchgearQuestion
        value={formState.selectedSwitchgear}
        onChange={(value) => handleStateChange("selectedSwitchgear", value)}
      />

      <CellPurposeQuestion
        value={formState.selectedCellPurpose}
        onChange={(value) => handleStateChange("selectedCellPurpose", value)}
      />

      <Section10Question
        value={formState.selectedSection10}
        onChange={(value) => handleStateChange("selectedSection10", value)}
      />

      <Section11Question
        value={formState.selectedSection11}
        onChange={(value) => handleStateChange("selectedSection11", value)}
      />

      <Section12Question
        value={formState.selectedSection12}
        onChange={(value) => handleStateChange("selectedSection12", value)}
      />

      <Section13Question
        value={formState.selectedSection13}
        onChange={(value) => handleStateChange("selectedSection13", value)}
      />

      <Section14Question
        value={formState.selectedSection14}
        onChange={(value) => handleStateChange("selectedSection14", value)}
      />

      <Section15Question
        value={formState.selectedSection15}
        onChange={(value) => handleStateChange("selectedSection15", value)}
      />

      <Section16Question
        value={formState.selectedSection16}
        onChange={(value) => handleStateChange("selectedSection16", value)}
      />

      <Section17Question
        value={formState.selectedSection17}
        onChange={(value) => handleStateChange("selectedSection17", value)}
      />

      <Section18Question
        value={formState.selectedSection18}
        onChange={(value) => handleStateChange("selectedSection18", value)}
      />

      <Section19Question
        value={formState.selectedSection19}
        onChange={(value) => handleStateChange("selectedSection19", value)}
      />

      <Section20Question
        value={formState.selectedSection20}
        onChange={(value) => handleStateChange("selectedSection20", value)}
      />

      <Section21Question
        value={formState.selectedSection21}
        onChange={(value) => handleStateChange("selectedSection21", value)}
      />

      <Section22Question
        value={formState.selectedSection22}
        onChange={(value) => handleStateChange("selectedSection22", value)}
      />

      <Section23Question
        value={formState.selectedSection23}
        onChange={(value) => handleStateChange("selectedSection23", value)}
      />

      <Section24Question
        value={formState.selectedSection24}
        onChange={(value) => handleStateChange("selectedSection24", value)}
      />

      <Section25Question
        value={formState.selectedSection25}
        onChange={(value) => handleStateChange("selectedSection25", value)}
      />
    </>
  );
}
