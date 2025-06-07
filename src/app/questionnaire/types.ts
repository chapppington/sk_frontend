export interface QuestionProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export interface Stage {
  id: number;
  title: string;
  description: string;
}

export interface IQuestionnaireState {
  selectedKtpType: string;
  selectedImplementation: string;
  selectedTransformerCount: string;
  selectedTransformerType: string;
  selectedTransformerPower: string;
  selectedWindingGroup: string;
  selectedVoltageClass: string;
  selectedSwitchgear: string;
  selectedCellPurpose: string;
  selectedSection10: string;
  selectedSection11: string;
  selectedSection12: string;
  selectedSection13: string;
  selectedSection14: string;
  selectedSection15: string;
  selectedSection16: string;
  selectedSection17: string;
  selectedSection18: string;
  selectedSection19: string;
  selectedSection20: string;
  selectedSection21: string;
  selectedSection22: string;
  selectedSection23: string;
  selectedSection24: string;
  selectedSection25: string[];
  name: string;
  phone: string;
  email: string;
  comments: string;
}
