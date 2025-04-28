import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/30" style={{ backdropFilter: 'blur(20px)' }}>
      <div className="container mx-auto flex justify-between items-center h-[72px] divide-x divide-white/30 2xl:px-24">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.svg" alt="СИБКОМПЛЕКТ" className="h-8" />
        </a>

        {/* Menu Items */}
        <div className="hidden lg:flex items-center space-x-12 px-12 h-full">
          <a href="#" className="text-white text-sm hover:text-white/80">
            Каталог
          </a>
          <a href="#" className="text-white text-sm hover:text-white/80">
            Проекты
          </a>
          <a href="#" className="text-white text-sm hover:text-white/80">
            О нас
          </a>
          <a href="#" className="text-white text-sm hover:text-white/80">
            Контакты
          </a>
        </div>

        {/* Contact Info and Offer Button */}
        <div className="hidden lg:flex items-center h-full divide-x divide-white/30">
          <div className="flex items-center h-full divide-x divide-white/30">
            <span className="text-white text-sm px-8 flex items-center h-full">
              +7 (800) 600-39-89
            </span>
            <span className="text-white text-sm px-8 flex items-center h-full">
              info@sibkomplekt.ru
            </span>
          </div>
          <button className="h-full px-8 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-colors">
            Кнопка на оффер
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
