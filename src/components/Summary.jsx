import { categoryInfo } from '../categories';
import { money } from '../format';

export default function Summary({ summary }) {
  const { grandTotal, categories } = summary;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Spending by category</h2>

      {categories.length === 0 ? (
        <p className="text-sm text-slate-500">Nothing to show yet.</p>
      ) : (
        <div className="space-y-4">
          {categories.map((c) => {
            const info = categoryInfo(c.category);
            const Icon = info.icon;
            const percent = grandTotal ? (c.total / grandTotal) * 100 : 0;
            return (
              <div key={c.category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <Icon size={16} className="text-slate-500" /> {c.category}
                  </span>
                  <span className="text-slate-500">
                    {money(c.total)} · {percent.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${info.bar}`} style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}