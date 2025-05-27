import FirstScreen from "@/app/production/FirstScreen";
import ProductionStagesScreen from "@/app/production/ProductionStagesScreen";
import EquipmentGridScreen from "@/app/production/EquipmentGridScreen";
import RecentUpdatesScreen from "@/app/production/RecentUpdatesScreen";
import CertificatesScreen from "@/app/production/CertificatesScreen";

import ReadMoreScreen from "@/components/shared_screens/ReadMoreScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";

export default function ProductionPage() {
  return (
    <main>
      <FirstScreen />
      <ProductionStagesScreen />
      <EquipmentGridScreen />
      <RecentUpdatesScreen />
      <CertificatesScreen />
      <ReadMoreScreen />
      <ContactUsScreen />
    </main>
  );
}
