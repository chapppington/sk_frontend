"use client";

import PortfolioCards from "./components/Cards";
import { cardsData } from "./mock_data";
import "./styles.css";

const PortfolioCardsScreen = () => {
  return <PortfolioCards cards={cardsData}></PortfolioCards>;
};

export default PortfolioCardsScreen;
