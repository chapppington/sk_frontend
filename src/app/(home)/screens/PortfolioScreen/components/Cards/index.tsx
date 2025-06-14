import { FC } from "react";
import Card from "../Card";
import { useCardPinning } from "../../hooks/useCardPinning";
import { CardsProps } from "./types";

const Cards: FC<CardsProps> = ({ cards }) => {
  useCardPinning();

  return (
    <section className="section cards">
      {cards.map((card, index) => (
        <Card
          key={index}
          {...card}
          isIntroCard={index === 0}
          isLastCard={index === cards.length - 1}
          totalCards={cards.length}
        />
      ))}
    </section>
  );
};

export default Cards;
