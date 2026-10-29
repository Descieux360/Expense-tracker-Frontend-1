import { Pencil, Trash2, Receipt } from 'lucide-react';
import { categoryInfo } from '../categories';
import { money, prettyDate } from '../format';

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-300 py-14 text-center">
        <Receipt className="mx-auto text-slate-400" size={40} />
        <p className="mt-2 font-medium text-slate-700">Nothing here yet</p>
        <p className="text-sm text-slate-500">Add your first entry using the form.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      {expenses.map((e) => {
        const info = categoryInfo(e.category);
        const Icon = info.icon;
        const isIncome = e.type === 'income';
        return (
          <li key={e.id} className="flex items-center gap-3 px-4 py-3">
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${info.chip}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-900">{e.title}</p>
              <p className="text-sm text-slate-500">
                {e.category} · {prettyDate(e.date)}
              </p>
            </div>
            <p className={`font-semibold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isIncome ? '+' : '-'}{money(e.amount)}
            </p>
            <div className="flex gap-1">
              <button onClick={() => onEdit(e)} title="Edit"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600">
                <Pencil size={16} />
              </button>
              <button onClick={() => onDelete(e.id)} title="Delete"
                className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}