import FirstScreen from "@/app/production/modules/FirstScreen";
import dynamic from "next/dynamic";

const ProductionStagesScreen = dynamic(
  () => import("@/app/production/modules/ProductionStagesScreen")
);
const EquipmentGridScreen = dynamic(
  () => import("@/app/production/modules/EquipmentGridScreen")
);
const RecentUpdatesScreen = dynamic(
  () => import("@/app/production/modules/RecentUpdatesScreen")
);
const CertificatesScreen = dynamic(
  () => import("@/app/production/modules/CertificatesScreen")
);
const ReadMoreScreen = dynamic(
  () => import("@/components/shared_screens/ReadMoreScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

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
