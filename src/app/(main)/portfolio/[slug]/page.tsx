import PortfolioDetails from "./PortfolioDetails";

interface PortfolioPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PortfolioPage = async ({ params }: PortfolioPageProps) => {
  const { slug } = await params;


  return <PortfolioDetails slug={slug} />;
};

export default PortfolioPage;
