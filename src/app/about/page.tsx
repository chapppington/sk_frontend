import { FC } from "react";
import dynamic from "next/dynamic";
import FirstScreen from "@/app/about/modules/FirstScreen";

const HistoryScreen = dynamic(() => import("@/app/about/modules/HistoryScreen"));
const ReadMoreScreen = dynamic(() => import("@/components/shared_screens/ReadMoreScreen"));
const ContactUsScreen = dynamic(() => import("@/components/shared_screens/ContactUsScreen"));
const OwnerCommentScreen = dynamic(() => import("@/app/about/modules/OwnerCommentScreen"));
const ReviewScreen = dynamic(() => import("@/app/about/modules/ReviewsScreen"));
const TeamScreen = dynamic(() => import("@/app/about/modules/TeamScreen"));
const LogoGridScreen = dynamic(() => import("@/app/about/modules/LogoGridScreen"));

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
