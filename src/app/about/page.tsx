import React from "react";
import FirstScreen from "./FirstScreen";
import History from "./History";
import ReadMore from "@/components/sections/ReadMore";
import LogoGrid from "@/app/about/LogoGrid";
import ContactUsSection from "@/components/sections/ContactUsSection";
import OwnerComment from "@/app/about/OwnerComment";

const AboutPage: React.FC = () => {
  return (
    <main>
      <FirstScreen />
      <History />
      <OwnerComment />
      <LogoGrid />
      <ReadMore />
      <ContactUsSection />
    </main>
  );
};

export default AboutPage;