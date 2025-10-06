import Image from "next/image";
import { ITeamMemberCardProps } from "@/app/(main)/about/screens/TeamScreen/types";
import { UPLOADS_URL } from "@/constants";

export const TeamMemberCard = ({
  name,
  position,
  image,
}: ITeamMemberCardProps) => (
  <div className="flex flex-col items-start w-full">
    <div
      className="relative w-full aspect-square mb-4"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
      }}
    >
      <Image src={`${UPLOADS_URL}${image}`} alt={name} fill className="object-cover" />
    </div>
    <div className="text-white text-2xl md:text-2xl font-normal mt-2 mb-1">
      {name}
    </div>
    <div className="text-white/40 text-lg md:text-xl font-light">
      {position}
    </div>
  </div>
);
