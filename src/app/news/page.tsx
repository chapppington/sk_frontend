import FirstScreen from "@/app/news/screens/FirstScreen";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NewsGrid = dynamic(() => import("@/app/news/screens/NewsGridScreen"));
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

export default function News() {
  return (
    <>
      <FirstScreen />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <NewsGrid />
      </Suspense>
      <ContactUsScreen />
    </>
  );
}
