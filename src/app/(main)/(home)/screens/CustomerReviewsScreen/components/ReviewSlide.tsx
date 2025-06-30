import Image from "next/image";

interface ReviewSlideProps {
  company: string;
  title: string;
  jobTitle: string;
  image: string;
  onClick: () => void;
}

const ReviewSlide = ({
  company,
  title,
  jobTitle,
  image,
  onClick,
}: ReviewSlideProps) => {
  return (
    <div className="border border-white/20 p-10 backdrop-blur-sm h-full flex flex-col justify-around">
      <div className="flex items-center gap-4">
        <div className="h-12 w-20 bg-gray-400/40 flex items-center justify-center rounded text-xs text-white/60">
          Лого
        </div>
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-white/60 text-sm">{jobTitle}</p>
        </div>
      </div>
      <button className="mt-6 px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 text-sm">
        Открыть отзыв
      </button>
    </div>
  );
};

export default ReviewSlide;
