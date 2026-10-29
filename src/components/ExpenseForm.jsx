import { useEffect, useState } from 'react';
import { api } from '../api';
import { CATEGORIES, INCOME_CATEGORIES } from '../categories';

const today = () => new Date().toISOString().slice(0, 10);
const empty = () => ({ type: 'expense', title: '', amount: '', category: 'Food', date: today() });

const field =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none ' +
  'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';

export default function ExpenseForm({ editing, onSaved, onCancel }) {
  const [form, setForm] = useState(empty());
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(
      editing
        ? {
            type: editing.type,
            title: editing.title,
            amount: String(editing.amount),
            category: editing.category,
            date: editing.date,
          }
        : empty()
    );
    setError('');
  }, [editing]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const isIncome = form.type === 'income';
  const options = isIncome ? INCOME_CATEGORIES : CATEGORIES;

  // Switching type also resets the category to the first one of that type
  function changeType(type) {
    const first = Object.keys(type === 'income' ? INCOME_CATEGORIES : CATEGORIES)[0];
    setForm({ ...form, type, category: first });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editing) {
        await api(`/expenses/${editing.id}`, { method: 'PUT', body: form });
      } else {
        await api('/expenses', { method: 'POST', body: form });
      }
      setForm(empty());
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        {editing ? 'Edit entry' : 'Add entry'}
      </h2>

      <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
        {[['expense', 'Expense'], ['income', 'Income']].map(([value, label]) => (
          <button
            type="button"
            key={value}
            onClick={() => changeType(value)}
            className={`rounded-md py-1.5 text-sm font-semibold transition ${
              form.type === value
                ? value === 'income'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-rose-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="space-y-3">
        <input className={field}
          placeholder={isIncome ? 'Where did it come from?' : 'What did you spend on?'}
          value={form.title} onChange={set('title')} required />
        <div className="grid grid-cols-2 gap-3">
          <input className={field} type="number" min="0" step="any" placeholder="Amount"
            value={form.amount} onChange={set('amount')} required />
          <input className={field} type="date" value={form.date} onChange={set('date')} required />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {Object.entries(options).map(([name, info]) => {
            const Icon = info.icon;
            const selected = form.category === name;
            return (
              <button
                type="button"
                key={name}
                onClick={() => setForm({ ...form, category: name })}
                className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-2 text-xs font-medium transition ${
                  selected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} />
                <span className="w-full truncate text-center">{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          disabled={saving}
          className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 font-semibold text-white shadow hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60"
        >
          {saving ? 'Saving...' : editing ? 'Save changes' : isIncome ? 'Add income' : 'Add expense'}
        </button>
        {editing && (
          <button type="button" onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 font-medium text-slate-700 hover:bg-slate-100">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}