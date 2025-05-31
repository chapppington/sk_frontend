type IBreadcrumbItem = {
  label: string;
  href: string;
  current?: boolean;
}

export interface IBreadcrumbsProps {
  items: IBreadcrumbItem[];
  className?: string;
  disableContainer?: boolean;
}
