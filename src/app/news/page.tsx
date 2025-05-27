import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
import FirstScreen from "@/app/news/modules/FirstScreen";
import NewsGrid from "@/app/news/modules/NewsGridScreen";

export default function News() {
  return (
    <>
      <FirstScreen />
      <NewsGrid />
      <ContactUsScreen />
    </>
  );
}
