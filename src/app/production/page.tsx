import FirstScreen from "@/app/production/FirstScreen";
import ProductionStages from "@/app/production/ProductionStages";
import EquipmentGrid from "@/app/production/EquipmentGrid";
import { RecentUpdatesSection } from "./RecentUpdatesSection";
import CertificatesSection from "./CertificatesSection";
import ReadMore from "@/components/sections/ReadMore";
import ContactUsSection from "@/components/sections/ContactUsSection";

export default function Production() {
  return (
    <div>
      <FirstScreen />
      <ProductionStages />
      <EquipmentGrid />
      <RecentUpdatesSection />
      <CertificatesSection />
      <ReadMore />
      <ContactUsSection />
    </div>
  );
}
