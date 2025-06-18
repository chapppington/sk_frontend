import ClientPage from "./ClientPage";

interface PortfolioPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PortfolioPage = async ({ params }: PortfolioPageProps) => {
  const { slug } = await params;

  
  return <ClientPage slug={slug} />;
};

export default PortfolioPage;
