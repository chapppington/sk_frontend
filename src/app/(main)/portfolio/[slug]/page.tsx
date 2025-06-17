import FirstScreen from "@/app/(main)/portfolio/[slug]/screens/FirstScreen";
import dynamic from "next/dynamic";

const TasksScreen = dynamic(
  () => import("@/app/(main)/portfolio/[slug]/screens/TasksScreen")
);
const SolutionScreen = dynamic(
  () => import("@/app/(main)/portfolio/[slug]/screens/SolutionScreen")
);
const ReviewScreen = dynamic(
  () => import("@/app/(main)/portfolio/[slug]/screens/ReviewScreen")
);
const MoreProjectsScreen = dynamic(
  () => import("@/app/(main)/portfolio/[slug]/screens/MoreProjectsScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

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
