import { FC } from "react";
import MainButton from "@/components/ui/MainButton";
import { JobItemProps } from "./types";

const JobItem: FC<JobItemProps> = ({ job, index }) => {
  return (
    <div
      key={`${job.title}-${index}`}
      className="job-item border-t border-white/10 pt-16"
    >
      <h2 className="job-title text-4xl text-white font-light mb-6 order-1">
        {job.title}
      </h2>
      <ul className="requirements-list text-white/70 mb-8 max-w-3xl order-3 list-disc pl-5">
        {job.requirements.map((req, reqIndex) => (
          <li key={reqIndex}>{req}</li>
        ))}
      </ul>
      <div className="job-details flex flex-wrap items-end justify-between gap-6 order-2">
        <div className="flex flex-wrap gap-4 w-full md:w-auto mb-4 md:mb-0">
          {job.experience.map((exp, expIndex) => (
            <span
              key={expIndex}
              className="px-6 py-3 bg-transparent border border-white/50 text-white font-light"
            >
              {exp}
            </span>
          ))}
        </div>
        <div className="flex items-end gap-8 w-full md:w-auto">
          <div className="text-white">
            <span className="text-white/60 text-sm">от</span>
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light ml-2">
              {job.salary.toLocaleString("ru-RU")}
            </span>
            <span className="text-sm sm:text-base">₽/мес</span>
          </div>

          <MainButton text="Подробнее" />
        </div>
      </div>
    </div>
  );
};

export default JobItem;
