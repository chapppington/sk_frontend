import CatalogSection from "@/app/catalog/modules/CatalogScreen";
import FirstScreen from "@/app/catalog/modules/FirstScreen";
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
