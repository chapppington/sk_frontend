import CatalogSection from "./modules/CatalogScreen";
import FirstScreen from "./modules/FirstScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";

export default function CatalogPage() {
  return (
    <main>
      <FirstScreen />
      <CatalogSection />
      <ContactUsScreen />
    </main>
  );
}
