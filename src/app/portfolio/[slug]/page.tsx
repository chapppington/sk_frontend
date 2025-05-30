import FirstScreen from "@/app/portfolio/[slug]/modules/FirstScreen";
import TasksScreen from "@/app/portfolio/[slug]/modules/TasksScreen/TasksScreen";
import SolutionScreen from "@/app/portfolio/[slug]/modules/SolutionScreen/SolutionScreen";
import ReviewScreen from "@/app/portfolio/[slug]/modules/ReviewScreen/ReviewScreen";
import MoreProjectsScreen from "@/app/portfolio/[slug]/modules/MoreProjectsScreen";

import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";

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
      <ContactUsScreen />
    </main>
  );
};

export default PortfolioPage;
