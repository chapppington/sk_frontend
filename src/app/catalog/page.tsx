import CatalogSection from "./CatalogSection";
import FirstScreen from "./FirstScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
import { Suspense } from "react";

export default function CatalogPage() {
  return (
    <main>
      <FirstScreen />
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogSection />
      </Suspense>
      <ContactUsScreen />
    </main>
  );
}
