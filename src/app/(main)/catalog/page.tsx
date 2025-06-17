import dynamic from "next/dynamic";

import FirstScreen from "@/app/(main)/catalog/screens/FirstScreen";
const CatalogSection = dynamic(
  () => import("@/app/(main)/catalog/screens/CatalogScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

export default function CatalogPage() {
  return (
    <main>
      <FirstScreen />
      <CatalogSection />
      <ContactUsScreen />
    </main>
  );
}
