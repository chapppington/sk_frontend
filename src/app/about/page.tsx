import React from "react";
import FirstScreen from "./FirstScreen";
import History from "./History";
import ReadMore from "@/components/sections/ReadMore";
import LogoGrid from "@/app/about/LogoGrid";
import ContactUsSection from "@/components/sections/ContactUsSection";
import OwnerComment from "@/app/about/OwnerComment";
import ReviewScreen from "@/app/about/ReviewScreen";
import TeamScreen from "@/app/about/TeamScreen";

const AboutPage: React.FC = () => {
  return (
    <main>
      <FirstScreen />
      <History />
      <OwnerComment />
      <TeamScreen />
      <ReviewScreen />
      <LogoGrid />
      <ReadMore />
      <ContactUsSection />
    </main>
  );
};

export default AboutPage;