import Image from "next/image";
import { FC } from "react";
import MainButton from "@/components/ui/MainButton";
import Badge from "@/components/ui/Badge";

interface ProjectSlideProps {
  id: string | number;
  title: string;
  image: string;
  year: string;
}

const ProjectSlide: FC<ProjectSlideProps> = ({ id, title, image, year }) => {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        priority
        className="brightness-[0.85]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
        <div className="flex items-center">
          <Badge>Что реализовали</Badge>
          <Badge className="ml-2">{year}</Badge>
        </div>

        <div className="w-full">
          <h3 className="text-3xl text-white max-w-[66.67%]">{title}</h3>
          <MainButton text="Узнать подробнее" href={`/portfolio/${id}`} />
        </div>
      </div>
    </div>
  );
};

export default ProjectSlide;
