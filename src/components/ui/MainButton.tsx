import Link from 'next/link';
import { FC } from 'react';

interface MainButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const MainButton: FC<MainButtonProps> = ({ 
  text, 
  onClick,
  className = ''
}) => {
  return (
    <Link 
      href="#" 
      onClick={onClick}
      className={`mt-6 inline-flex bg-white relative w-fit ${className}`}
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
        borderRadius: '10px'
      }}
    >
      <div className="flex items-center pl-6 pr-[2px] py-[2px]">
        <span className="text-black text-base whitespace-nowrap">{text}</span>
        <div 
          className="w-14 h-14 bg-black flex items-center justify-center ml-6"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 21px), calc(100% - 21px) 100%, 0 100%)',
            borderRadius: '8px'
          }}
        >
          <svg 
            className="w-7 h-7 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.5 19.5l15-15 M19.5 19.5v-15 M4.5 4.5h15"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default MainButton;
