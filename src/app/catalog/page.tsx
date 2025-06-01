
import dynamic from "next/dynamic";

import FirstScreen from "@/app/catalog/modules/FirstScreen";
const CatalogSection = dynamic(() => import("@/app/catalog/modules/CatalogScreen"));
const ContactUsScreen = dynamic(() => import("@/components/shared_screens/ContactUsScreen"));

export default function CatalogPage() {
  return (
    <main>
      <FirstScreen />
      <CatalogSection />
      <ContactUsScreen />
    </main>
  );
}
