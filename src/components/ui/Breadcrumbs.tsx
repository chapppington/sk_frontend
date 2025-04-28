import Link from 'next/link';
import { FC, Fragment } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="relative pt-32">
      <div className="container mx-auto px-4 lg:px-16 2xl:px-24">
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
      </div>
    </div>
  );
};

export default Breadcrumbs;
