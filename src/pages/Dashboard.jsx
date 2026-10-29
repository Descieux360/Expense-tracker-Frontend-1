import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, INCOME_CATEGORIES } from '../categories';
import { money } from '../format';
import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Summary from '../components/Summary';

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl p-5 text-white shadow-sm ${accent}`}>
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/20">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-white/80">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

const TABS = [
  ['', 'All'],
  ['income', 'Income'],
  ['expense', 'Expenses'],
];

export default function Dashboard() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState({
    income: 0, spent: 0, balance: 0, grandTotal: 0, categories: [],
  });
  const [typeFilter, setTypeFilter] = useState('');
  const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.set('type', typeFilter);
      if (filter) params.set('category', filter);
      const qs = params.toString() ? `?${params}` : '';

      const [list, sum] = await Promise.all([
        api(`/expenses${qs}`),
        api('/expenses/summary'),
      ]);
      setEntries(list);
      setSummary(sum);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, [typeFilter, filter]);

  function changeTypeFilter(value) {
    setTypeFilter(value);
    setFilter(''); // category chips depend on the type, so reset them
  }

  async function handleDelete(id) {
    if (!confirm('Delete this entry?')) return;
    try {
      await api(`/expenses/${id}`, { method: 'DELETE' });
      if (editing && editing.id === id) setEditing(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSaved() {
    setEditing(null);
    load();
  }

  const chipCategories =
    typeFilter === 'income'
      ? Object.keys(INCOME_CATEGORIES)
      : typeFilter === 'expense'
      ? Object.keys(CATEGORIES)
      : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Hi, {user.name}</h1>
        <p className="mb-6 text-slate-500">Here's your money at a glance.</p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard icon={Wallet} label="Balance" value={money(summary.balance)}
            accent={
              summary.balance >= 0
                ? 'bg-gradient-to-br from-indigo-500 to-violet-600'
                : 'bg-gradient-to-br from-rose-500 to-red-600'
            } />
          <StatCard icon={TrendingUp} label="Income" value={money(summary.income)}
            accent="bg-gradient-to-br from-emerald-500 to-teal-600" />
          <StatCard icon={TrendingDown} label="Expenses" value={money(summary.spent)}
            accent="bg-gradient-to-br from-rose-500 to-orange-500" />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <ExpenseForm editing={editing} onSaved={handleSaved} onCancel={() => setEditing(null)} />
            <Summary summary={summary} />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-3 inline-flex rounded-lg bg-slate-200 p-1">
              {TABS.map(([value, label]) => (
                <button
                  key={label}
                  onClick={() => changeTypeFilter(value)}
                  className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
                    typeFilter === value
                      ? 'bg-white text-slate-900 shadow'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {chipCategories.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {['', ...chipCategories].map((c) => (
                  <button
                    key={c || 'all'}
                    onClick={() => setFilter(c)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                      filter === c
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {c || 'All'}
                  </button>
                ))}
              </div>
            )}

            <ExpenseList expenses={entries} onEdit={setEditing} onDelete={handleDelete} />
          </div>
        </div>
      </main>
    </div>
  );
}