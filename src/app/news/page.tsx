import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
import FirstScreen from "./FirstScreen";
import NewsGrid from "./NewsGrid";

export const dynamic = "force-static";

export default function News() {
  return (
    <>
      <FirstScreen />
      <NewsGrid />
      <ContactUsScreen></ContactUsScreen>
    </>
  );
}
