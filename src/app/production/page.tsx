import FirstScreen from "@/app/production/FirstScreen";
import ProductionStages from "@/app/production/ProductionStagesScreen/ProductionStages";
import EquipmentGrid from "@/app/production/EquipmentGrid";
import { RecentUpdatesSection } from "./RecentUpdatesSection";
import CertificatesScreen from "@/app/production/CertificatesScreen";
import ReadMore from "@/components/sections/ReadMore";
import ContactUsSection from "@/components/sections/ContactUsSection";

export default function Production() {
  return (
    <div>
      <FirstScreen />
      <ProductionStages />
      <EquipmentGrid />
      <RecentUpdatesSection />
      <CertificatesScreen />
      <ReadMore />
      <ContactUsSection />
    </div>
  );
}
