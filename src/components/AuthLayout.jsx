import { Wallet } from 'lucide-react';

export const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none ' +
  'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';

export const primaryBtn =
  'w-full rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 font-semibold ' +
  'text-white shadow hover:from-indigo-700 hover:to-violet-700 transition disabled:opacity-60';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-12 text-white">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10" />
        <div className="absolute bottom-0 -left-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-2 text-2xl font-bold">
          <Wallet size={28} /> SpendWise
        </div>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">Know where your money goes.</h2>
          <p className="mt-4 max-w-md text-indigo-100">
            Track expenses, see spending by category, and stay in control, all in one place.
          </p>
        </div>
        <p className="relative text-sm text-indigo-200">Full-stack demo · React + Express</p>
      </div>

      <div className="flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 mb-6 text-slate-500">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}