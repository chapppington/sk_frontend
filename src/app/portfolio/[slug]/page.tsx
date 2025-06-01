import FirstScreen from "@/app/portfolio/[slug]/modules/FirstScreen";
import dynamic from "next/dynamic";

const TasksScreen = dynamic(() => import("@/app/portfolio/[slug]/modules/TasksScreen"));
const SolutionScreen = dynamic(() => import("@/app/portfolio/[slug]/modules/SolutionScreen"));
const ReviewScreen = dynamic(() => import("@/app/portfolio/[slug]/modules/ReviewScreen"));
const MoreProjectsScreen = dynamic(() => import("@/app/portfolio/[slug]/modules/MoreProjectsScreen"));
const ContactUsScreen = dynamic(() => import("@/components/shared_screens/ContactUsScreen"));

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
