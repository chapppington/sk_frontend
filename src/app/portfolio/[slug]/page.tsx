import FirstScreen from "./FirstScreen";
import TasksScreen from "./TasksScreen";
import SolutionScreen from "./SolutionScreen";
import ReviewScreen from "./ReviewScreen";
import ContactUsSection from "@/components/sections/ContactUsSection";

interface PortfolioPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PortfolioPage = async ({ params }: PortfolioPageProps) => {
  const { slug } = await params;
  console.log(slug);

  return (
    <main>
      <FirstScreen />
      <TasksScreen />
      <SolutionScreen />
      <ReviewScreen />
      <ContactUsSection />
    </main>
  );
};

export default PortfolioPage;
