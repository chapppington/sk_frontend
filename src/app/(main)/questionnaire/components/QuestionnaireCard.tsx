import MainButton from "@/components/ui/MainButton";

interface QuestionnaireCardProps {
  title: string;
  description: string;
  href: string;
}

export default function QuestionnaireCard({
  title,
  description,
  href,
}: QuestionnaireCardProps) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] flex flex-col">
      {/* Заголовок */}
      <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>

      {/* Описание */}
      <p className="text-white/60 text-sm mb-6 flex-grow">{description}</p>

      {/* Кнопка */}
      <div className="mt-auto">
        <MainButton text="Перейти к заполнению" href={href} fullWidth />
      </div>

      {/* Декоративный градиент */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

