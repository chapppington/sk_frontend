import { FC } from 'react';

interface CustomContainerProps {
  children: React.ReactNode;
}

const CustomContainer: FC<CustomContainerProps> = ({ children }) => {
  return (
    <div
      className="container mx-auto px-4 lg:px-16 2xl:px-24 flex flex-col justify-between"
      style={{ height: 'calc(100vh - 180px)' }}
    >
      {children}
    </div>
  );
};

export default CustomContainer;
