import { FC } from "react";
import JobItem from "../JobItem";
import { IJob } from "../JobItem/types";

interface JobListProps {
  jobs: IJob[];
}

const JobList: FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="space-y-16">
      {jobs.map((job, index) => (
        <JobItem key={`${job.title}-${index}`} job={job} index={index} />
      ))}
    </div>
  );
};

export default JobList;
