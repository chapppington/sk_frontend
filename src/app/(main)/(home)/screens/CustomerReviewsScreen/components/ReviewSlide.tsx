import Image from "next/image";

interface ReviewSlideProps {
  title: string;
  jobTitle: string;
  image: string;
  contentPath: string;
  onClick: () => void;
}

const ReviewSlide = ({
  title,
  jobTitle,
  image,
  contentPath,
  onClick,
}: ReviewSlideProps) => {
  return (
    <div className="border border-white/20 p-10 backdrop-blur-sm h-full flex flex-col justify-around">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-gray-400/40 flex items-center justify-center rounded-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-white/60 text-sm">{jobTitle}</p>
        </div>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 text-sm"
        onClick={onClick}
      >
        Открыть отзыв
      </button>
    </div>
  );
};

export default ReviewSlide;
