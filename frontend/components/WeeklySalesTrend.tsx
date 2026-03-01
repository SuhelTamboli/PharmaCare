const salesData = [
  { day: "Fri, Oct 24", amount: "₹12,500", percentage: 60 },
  { day: "Sat, Oct 25", amount: "₹15,200", percentage: 75 },
  { day: "Sun, Oct 26", amount: "₹10,800", percentage: 50 },
  { day: "Mon, Oct 27", amount: "₹18,900", percentage: 90 },
  { day: "Tue, Oct 28", amount: "₹16,700", percentage: 80 },
  { day: "Wed, Oct 29", amount: "₹14,300", percentage: 70 },
  { day: "Thu, Oct 30", amount: "₹19,500", percentage: 100 },
];

export function WeeklySalesTrend() {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm h-96">
      {/* Fixed Header */}
      <div className="flex items-center gap-2 p-6 pb-4">
        <span className="text-blue-500">↗</span>
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
          Weekly Sales Trend
        </h3>
      </div>

      {/* Scrollable Data Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        <div className="space-y-5">
          {salesData.map((item) => (
            <div key={item.day} className="flex items-center gap-4">
              <span className="text-xs font-medium text-zinc-500 w-24">
                {item.day}
              </span>
              <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 w-16 text-right">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
