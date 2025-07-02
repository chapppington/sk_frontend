import { FC } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import FirstScreen from "@/app/(main)/about/screens/FirstScreen";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

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

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/about");
  return {
    title: seo?.title || "О компании | СибКомплект",
    description: seo?.description || "Описание компании СибКомплект...",
    keywords: seo?.keywords,
    openGraph:
      seo?.ogTitle || seo?.ogDescription || seo?.ogImage
        ? {
            title: seo.ogTitle,
            description: seo.ogDescription,
            images: seo.ogImage ? [seo.ogImage] : undefined,
          }
        : undefined,
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
  };
}

const AboutPage: FC = () => {
  return (
    <main>
      <FirstScreen />
      {/* <HistoryScreen /> */}
      {/* <OwnerCommentScreen /> */}
      {/* <TeamScreen /> */}
      {/* <ReviewScreen /> */}
      {/* <LogoGridScreen /> */}
      <ReadMoreScreen />
      <ContactUsScreen />
    </main>
  );
};

export default AboutPage;
