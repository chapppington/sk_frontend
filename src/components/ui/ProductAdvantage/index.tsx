import IconRenderer from "@/shared/utils/iconRenderer";

interface ProductAdvantageProps {
  label: string;
  icon: string;
  description: string;
  image?: string;
  className?: string;
}

export default function ProductAdvantage({
  label,
  icon,
  description,
  image,
  className = "",
}: ProductAdvantageProps) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg border ${className}`}
    >
      <div className="flex-shrink-0">
        <IconRenderer
          iconName={icon}
          className="w-6 h-6 text-primary"
          fallback={<div className="w-6 h-6 bg-gray-200 rounded" />}
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2">{label}</h3>
        <p className="text-gray-600">{description}</p>

        {image && (
          <div className="mt-3">
            <img
              src={image}
              alt={label}
              className="w-full max-w-xs rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
