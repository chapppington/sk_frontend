import Link from 'next/link';
import { FC, Fragment } from 'react';
import CustomContainer from './CustomContainer';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  disableContainer?: boolean;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className, disableContainer }) => {
  const content = (
    <div className="flex items-center space-x-2 text-white/80">
      {items.map((item, index) => (
        <Fragment key={index}>
          <Link 
            href={item.href}
            className={`${item.current ? 'text-white' : 'hover:text-white'}`}
          >
            {item.label}
          </Link>
          {index < items.length - 1 && (
            <span className="text-white/60">→</span>
          )}
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`pt-32 ${className || ''}`}>
      {disableContainer ? content : (
        <CustomContainer>
          {content}
        </CustomContainer>
      )}
    </div>
  );
};

export default Breadcrumbs;
