import React from "react";
import FirstScreen from "./FirstScreen";
import History from "./History";
import ReadMore from "@/components/shared_screens/ReadMoreScreen";
import LogoGrid from "@/app/about/LogoGrid";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
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
      <ContactUsScreen />
    </main>
  );
};

export default AboutPage;
