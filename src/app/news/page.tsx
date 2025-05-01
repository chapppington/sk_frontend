import ContactUsSection from "@/components/sections/ContactUsSection";
import FirstScreen from "./FirstScreen";
import NewsGrid from "./NewsGrid";

export default function News() {
  return (
    <>
      <FirstScreen />
      <NewsGrid />
      <ContactUsSection></ContactUsSection>
    </>
  );
}
