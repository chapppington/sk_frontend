import { FC, ReactNode } from "react";

interface NoResultsPlaceholderProps {
  icon: ReactNode;
  title: string;
  description: string;
  onReset?: () => void;
  resetButtonText?: string;
}

const NoResultsPlaceholder: FC<NoResultsPlaceholderProps> = ({
  icon,
  title,
  description,
  onReset,
  resetButtonText = "Сбросить фильтры",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-white text-xl mb-2">{title}</h3>
      <p className="text-white/60 max-w-md mb-6">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-white transition-colors"
        >
          {resetButtonText}
        </button>
      )}
    </div>
  );
};

export default NoResultsPlaceholder;
