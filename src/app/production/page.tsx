import FirstScreen from "@/app/production/modules/FirstScreen";
import ProductionStagesScreen from "@/app/production/modules/ProductionStagesScreen";
import EquipmentGridScreen from "@/app/production/modules/EquipmentGridScreen";
import RecentUpdatesScreen from "@/app/production/modules/RecentUpdatesScreen";
import CertificatesScreen from "@/app/production/modules/CertificatesScreen";

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
