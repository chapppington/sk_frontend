
import dynamic from "next/dynamic";

import FirstScreen from "@/app/production/screens/FirstScreen";

const ProductionStagesScreen = dynamic(() => import("@/app/production/screens/ProductionStagesScreen"));
const EquipmentGridScreen = dynamic(() => import("@/app/production/screens/EquipmentGridScreen"));
const RecentUpdatesScreen = dynamic(() => import("@/app/production/screens/RecentUpdatesScreen"));
const CertificatesScreen = dynamic(() => import("@/app/production/screens/CertificatesScreen"));
const ReadMoreScreen = dynamic(() => import("@/components/shared_screens/ReadMoreScreen"));
const ContactUsScreen = dynamic(() => import("@/components/shared_screens/ContactUsScreen"));

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
