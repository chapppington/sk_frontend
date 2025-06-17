import { FC, RefObject } from "react";

interface DescriptionItem {
  text: string;
}

interface DescriptionListProps {
  items: DescriptionItem[];
  listItemsRef: RefObject<(HTMLLIElement | HTMLDivElement)[]>;
  rightContentRef: RefObject<HTMLDivElement | null>;
}

const DescriptionList: FC<DescriptionListProps> = ({
  items,
  listItemsRef,
  rightContentRef,
}) => {
  return (
    <div ref={rightContentRef}>
      <ul className="space-y-8">
        {items.map((item, index) => (
          <li
            key={index}
            ref={(el) => {
              if (el) listItemsRef.current[index] = el;
            }}
            className="flex items-start gap-4"
          >
            <span className="text-white/70 text-3xl leading-none">•</span>
            <p className="text-white/70">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DescriptionList;
