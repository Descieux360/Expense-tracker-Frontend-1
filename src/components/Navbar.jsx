import { Wallet, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
            <Wallet size={20} />
          </div>
          <span className="text-lg font-bold text-slate-900">SpendWise</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-sm text-slate-600 sm:flex">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 font-semibold text-white">
              {user.name[0].toUpperCase()}
            </div>
            {user.name}
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </div>
    </header>
  );
}