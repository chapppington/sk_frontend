import CatalogSection from "./CatalogSection";
import FirstScreen from "./FirstScreen";
import ContactUsSection from "@/components/sections/ContactUsSection";

export default function CatalogPage() {
  return (
    <main>
      <FirstScreen />
      <CatalogSection />
      <ContactUsSection />
    </main>
  );
}
