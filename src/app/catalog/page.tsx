import CatalogSection from "./CatalogSection";
import FirstScreen from "./FirstScreen";
import ContactUsSection from "@/components/sections/ContactUsSection";
import { Suspense } from "react";

export default function CatalogPage() {
  return (
    <main>
      <FirstScreen />
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogSection />
      </Suspense>
      <ContactUsSection />
    </main>
  );
}
