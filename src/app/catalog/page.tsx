import CatalogSection from './CatalogSection';
import FirstScreen from './FirstScreen';
import ContactUsSection from '@/components/global/ContactUsSection';

export default function CatalogPage() {
  return (
    <main>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 top-0 left-0 right-0 bottom-0 z-[-1] fixed h-screen w-screen">
      </div>
      <FirstScreen />
      <CatalogSection />
      <ContactUsSection />
    </main>
  );
}
