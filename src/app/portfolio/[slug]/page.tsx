import FirstScreen from "./FirstScreen";
import TasksScreen from "./TasksScreen";
import SolutionScreen from "./SolutionScreen";
import ReviewScreen from "./ReviewScreen";
import MoreProjectsScreen from "./MoreProjectsScreen";
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
      <MoreProjectsScreen />
      <ContactUsSection />
    </main>
  );
};

export default PortfolioPage;
