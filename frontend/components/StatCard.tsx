interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  icon: React.ReactNode;
  borderColor: string; // Must be a full class like "border-emerald-500"
  textColor: string;
  iconBg: string;
}

const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  borderColor,
  textColor,
  iconBg,
}: StatCardProps) => {
  return (
    /* Apply the borderColor variable directly here */
    <div
      className={`flex items-center justify-between p-5 rounded-xl border-l-4 shadow-sm transition-all
      bg-white dark:bg-zinc-900 ${borderColor}`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm  font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <h3 className={`text-2xl font-bold tracking-tight ${textColor}`}>
            {value}
          </h3>
          {trend && (
            <span className="text-xs font-medium text-emerald-500 flex items-center">
              <span className="mr-0.5">↑</span>
              {trend}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">{subtitle}</p>
      </div>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
