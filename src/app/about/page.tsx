import { FC } from "react";
import dynamic from "next/dynamic";
import FirstScreen from "@/app/about/modules/FirstScreen";

const HistoryScreen = dynamic(
  () => import("@/app/about/modules/HistoryScreen"),
  { ssr: true }
);
const ReadMoreScreen = dynamic(
  () => import("@/components/shared_screens/ReadMoreScreen"),
  { ssr: true }
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen"),
  { ssr: true }
);
const OwnerCommentScreen = dynamic(
  () => import("@/app/about/modules/OwnerCommentScreen"),
  { ssr: true }
);
const ReviewScreen = dynamic(
  () => import("@/app/about/modules/ReviewsScreen"),
  { ssr: true }
);
const TeamScreen = dynamic(() => import("@/app/about/modules/TeamScreen"), {
  ssr: true,
});
const LogoGridScreen = dynamic(
  () => import("@/app/about/modules/LogoGridScreen"),
  { ssr: true }
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
