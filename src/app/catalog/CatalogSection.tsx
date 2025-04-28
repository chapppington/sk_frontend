import React from 'react';
import Image from 'next/image';

const CatalogSection: React.FC = () => {
  return (
    <section id="catalog_section" className="bg-transparent py-24">
      <div className="container mx-auto px-4 lg:px-16 2xl:px-24">
        {/* Top Navigation and Search */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <div className="relative flex flex-col items-start group">
              <button className="text-white text-xl pb-4 transition-colors duration-300 hover:text-white/80">
                Продукция
              </button>
              <div className="w-[240px] h-[2px] bg-white transition-all duration-300 transform origin-left group-hover:scale-95 group-hover:bg-white/80"></div>
            </div>
            <div className="relative flex flex-col items-start group">
              <button className="text-white/60 text-xl pb-4 transition-colors duration-300 hover:text-white">
                Услуги
              </button>
              <div className="w-[240px] h-[2px] bg-white/60 transition-all duration-300 transform origin-left group-hover:scale-95 group-hover:bg-white"></div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск по каталогу"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white/20"
            />
            <svg
              className="w-5 h-5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Navigation */}
          <div className="md:w-[400px] flex flex-col gap-2">
            <button className="w-fit inline-block text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/10">
              Вся продукция
            </button>
            <button className="w-fit inline-block text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/10">
              Комплектные трансформаторные подстанции
            </button>
            <button className="w-fit inline-block text-left px-4 py-3 rounded-lg text-white bg-white/10 border border-white/20">
              Низковольтные комплектные устройства
            </button>
            <button className="w-fit inline-block text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/10">
              Улучшение качества электроэнергии
            </button>
            <button className="w-fit inline-block text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/10">
              Пункты коммерческого учёта и секционирования воздушных линий электропередач
            </button>
            <button className="w-fit inline-block text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/10">
              Электростанции и установки
            </button>
            <button className="w-fit inline-block text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/10">
              Комплектные распределительные устройства
            </button>
          </div>

          {/* Catalog Grid Section */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex flex-col">
                  <div className="bg-white rounded-xl overflow-hidden mb-4">
                    <Image
                      width={300}
                      height={300}
                      src="/transformer.png"
                      alt="2КТПт 25..250 кВА"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-white text-lg mb-3">2КТПт 25..250 кВА</h3>
                  <a href="#" className="inline-flex items-center group">
                    <div className="w-14 h-14 rounded-full border border-white/30 group-hover:border-white flex items-center justify-center mr-3 transition-colors">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15 M19.5 19.5v-15 M4.5 4.5h15"
                        />
                      </svg>
                    </div>
                    <span className="text-white/60 group-hover:text-white border-b border-white/30 group-hover:border-white transition-colors">
                      Подробнее
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection; 