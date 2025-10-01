interface IMockup {
  id: number;
  name: string;
  description: string;
  modelPath: string;
}

export const mockup: IMockup[] = [
  {
    id: 1,
    name: "ПАРН",
    description: "Пункт автоматического регулирования напряжения (ПАРН)",
    modelPath: "/Scene/parn.glb",
  },
  {
    id: 2,
    name: "КТП",
    description: "Комплектная трансформаторная подстанция (КТП)",
    modelPath: "/Scene/parn2.glb",
  },
  {
    id: 3,
    name: "КТПМ",
    description: "Комплектная трансформаторная подстанция мачтового типа(КТПМ)",
    modelPath: "/Scene/ktpStolb.glb",
  },
  {
    id: 4,
    name: "2КТПБУ",
    description: "Двухтрансформаторная подстанция в блочно-модульном исполнении, утепленная.",
    modelPath: "/Scene/ktpbu.glb",
  },
];
