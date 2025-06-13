import { FC, RefObject } from "react";

interface CharacteristicItem {
  title: string;
  description: string;
}

interface CharacteristicsGridProps {
  items: CharacteristicItem[];
  listItemsRef: RefObject<(HTMLLIElement | HTMLDivElement)[]>;
  rightContentRef: RefObject<HTMLDivElement | null>;
}

const CharacteristicsGrid: FC<CharacteristicsGridProps> = ({
  items,
  listItemsRef,
  rightContentRef,
}) => {
  return (
    <div ref={rightContentRef} className="grid grid-cols-1 gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) listItemsRef.current[index] = el;
            }}
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-white/70">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacteristicsGrid;
