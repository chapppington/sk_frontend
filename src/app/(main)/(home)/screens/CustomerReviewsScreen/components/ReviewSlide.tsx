import Image from "next/image";

interface ReviewSlideProps {
  company: string;
  title: string;
  jobTitle: string;
  text: string;
}

const ReviewSlide = ({ company, title, jobTitle, text }: ReviewSlideProps) => {
  return (
    <div className="border border-white/20 p-10 backdrop-blur-sm h-full flex flex-col justify-around">
      <div className="flex items-center gap-4">
        <Image
          src={company}
          alt="Company Logo"
          className="h-5 opacity-80"
          width={80}
          height={20}
        />
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-white/60 text-sm">{jobTitle}</p>
        </div>
      </div>
      <p className="text-white/60 text-sm mt-6">{text}</p>
    </div>
  );
};

export default ReviewSlide;
