import { FC } from "react";
import FirstScreen from "@/app/about/modules/FirstScreen";
import HistoryScreen from "@/app/about/modules/HistoryScreen";
import ReadMoreScreen from "@/components/shared_screens/ReadMoreScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
import { OwnerCommentScreen } from "@/app/about/modules/OwnerCommentScreen"; // TODO MAKE ALL IMPORTS NOT EXPORT DEFAULT
import ReviewScreen from "@/app/about/modules/ReviewsScreen";
import TeamScreen from "@/app/about/modules/TeamScreen";
import LogoGridScreen from "@/app/about/modules/LogoGridScreen";

const AboutPage: FC = () => {
  return (
    <main>
      <FirstScreen />
      <HistoryScreen />
      <OwnerCommentScreen />
      <TeamScreen />
      <ReviewScreen />
      <LogoGridScreen />
      <ReadMoreScreen />
      <ContactUsScreen />
    </main>
  );
};

export default AboutPage;
