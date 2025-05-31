import FirstScreen from "@/app/catalog/modules/FirstScreen";
import dynamic from "next/dynamic";

const CatalogSection = dynamic(
  () => import("@/app/catalog/modules/CatalogScreen")
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
