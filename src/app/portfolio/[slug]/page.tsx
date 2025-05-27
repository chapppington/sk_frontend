import FirstScreen from "@/app/portfolio/[slug]/FirstScreen";
import TasksScreen from "@/app/portfolio/[slug]/TasksScreen";
import SolutionScreen from "@/app/portfolio/[slug]/SolutionScreen";
import ReviewScreen from "@/app/portfolio/[slug]/ReviewScreen";
import MoreProjectsScreen from "@/app/portfolio/[slug]/MoreProjectsScreen";
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
