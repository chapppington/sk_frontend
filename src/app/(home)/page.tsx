import FirstScreen from "./FirstScreen";
import Mission from "./Mission";
import ProductsSlider from "./ProductsSlider";
import ScrollingTextSection from "./ScrollingTextSection";
import PortfolioSection from "./PortfolioSection";
import CustomerReviews from "./CustomerReviews";
import ContactUsSection from "@/components/sections/ContactUsSection";

export default function Home() {
  return (
    <main className="pointer-events-none">
      <FirstScreen />
      <ScrollingTextSection />
      <Mission />
      <ProductsSlider />
      <PortfolioSection />  
      <CustomerReviews />
      <ContactUsSection />
    </main>
  );
}
