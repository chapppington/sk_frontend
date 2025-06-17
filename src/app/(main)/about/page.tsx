import { FC } from "react";
import dynamic from "next/dynamic";
import FirstScreen from "@/app/(main)/about/screens/FirstScreen";

const HistoryScreen = dynamic(
  () => import("@/app/(main)/about/screens/HistoryScreen")
);
const ReadMoreScreen = dynamic(
  () => import("@/components/shared_screens/ReadMoreScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);
const OwnerCommentScreen = dynamic(
  () => import("@/app/(main)/about/screens/OwnerCommentScreen")
);
const ReviewScreen = dynamic(
  () => import("@/app/(main)/about/screens/ReviewsScreen")
);
const TeamScreen = dynamic(
  () => import("@/app/(main)/about/screens/TeamScreen")
);
const LogoGridScreen = dynamic(
  () => import("@/app/(main)/about/screens/LogoGridScreen")
);

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
