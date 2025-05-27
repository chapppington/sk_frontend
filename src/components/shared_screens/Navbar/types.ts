export interface IMenuItem {
  href: string;
  label: string;
};

export type ContactSection = {
  title: string;
  phone: string;
  email: string;
};

export interface IMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
};
