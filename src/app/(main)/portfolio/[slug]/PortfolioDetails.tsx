"use client";

import { useQuery } from "@tanstack/react-query";
import FirstScreen from "@/app/(main)/portfolio/[slug]/screens/FirstScreen";
import dynamic from "next/dynamic";
import portfolioService from "@/services/portfolio.service";
import { IPortfolioItem } from "@/shared/types/portfolio.types";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import CustomContainer from "@/components/ui/CustomContainer";

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

interface Props {
  slug: string;
}

const PortfolioSkeleton = () => {
  return (
    <main className="min-h-screen pt-32">
      {/* FirstScreen Skeleton */}
      <section className="pb-12">
        <CustomContainer>
          {/* Breadcrumbs skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-32 mb-2 bg-white/20" />
            <Skeleton className="h-4 w-24 bg-white/20" />
          </div>

          {/* Headings and Description skeleton */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 my-12">
            <div className="flex-1">
              <Skeleton className="h-12 w-3/4 mb-2 bg-white/20" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-20 w-full bg-white/20" />
            </div>
          </div>

          {/* Image/Video Preview skeleton */}
          <div className="w-full aspect-[2.8/1] rounded-2xl overflow-hidden">
            <Skeleton className="w-full h-full bg-white/20" />
          </div>
        </CustomContainer>
      </section>

      {/* TasksScreen Skeleton */}
      <section className="bg-transparent py-24 relative">
        <CustomContainer>
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar skeleton */}
            <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
              <Skeleton className="h-6 w-20 mb-8 bg-white/20" />
            </div>

            {/* Main Content skeleton */}
            <div className="flex-1">
              <Skeleton className="h-10 w-2/3 mb-6 bg-white/20" />
              <Skeleton className="h-32 w-full bg-white/20" />
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* SolutionScreen Skeleton */}
      <section className="py-24 relative">
        <CustomContainer>
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar skeleton */}
            <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
              <Skeleton className="h-6 w-20 mb-8 bg-white/20" />
            </div>

            {/* Main Content skeleton */}
            <div className="flex-1">
              <Skeleton className="h-10 w-2/3 mb-6 bg-white/20" />
              <Skeleton className="h-32 w-full bg-white/20" />
            </div>
          </div>

          {/* Three-column section skeleton */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-0 items-stretch mt-12">
            {/* Left image skeleton */}
            <div className="flex-[1.3] min-w-0">
              <Skeleton className="w-full h-[400px] bg-white/20" />
            </div>
            {/* Center card skeleton */}
            <div className="flex-1 min-w-0 flex flex-col justify-center p-8">
              <Skeleton className="h-8 w-3/4 mb-6 bg-white/20" />
              <Skeleton className="h-24 w-full bg-white/20" />
            </div>
            {/* Right image skeleton */}
            <div className="flex-[0.7] min-w-0">
              <Skeleton className="w-full h-[400px] bg-white/20" />
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* MoreProjectsScreen Skeleton */}
      <section className="py-24">
        <CustomContainer>
          <Skeleton className="h-12 w-1/3 mx-auto mb-12 bg-white/20" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full bg-white/20" />
            ))}
          </div>
        </CustomContainer>
      </section>

      {/* ContactUsScreen Skeleton */}
      <section className="py-24">
        <CustomContainer>
          <Skeleton className="h-12 w-1/2 mx-auto mb-8 bg-white/20" />
          <Skeleton className="h-32 w-full max-w-2xl mx-auto bg-white/20" />
        </CustomContainer>
      </section>
    </main>
  );
};

const PortfolioDetails = ({ slug }: Props) => {
  const { data: portfolio, isLoading } = useQuery<IPortfolioItem>({
    queryKey: ["portfolio", slug],
    queryFn: async () => {
      const { data } = await portfolioService.fetchOne(slug);
      return data;
    },
  });

  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  return (
    <main>
      <FirstScreen portfolio={portfolio} />
      <TasksScreen portfolio={portfolio} />
      <SolutionScreen portfolio={portfolio} />
      {portfolio.hasReview && <ReviewScreen portfolio={portfolio} />}
      <MoreProjectsScreen />
      <ContactUsScreen />
    </main>
  );
};

export default PortfolioDetails;
