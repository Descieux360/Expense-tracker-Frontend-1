import {
  Utensils, Bus, House, HeartPulse,
  Clapperboard, ShoppingBag, GraduationCap, Package,
  Briefcase, Laptop, Gift, TrendingUp, Coins,
} from 'lucide-react';

export const CATEGORIES = {
  Food: { icon: Utensils, bar: 'bg-orange-500', chip: 'bg-orange-100 text-orange-600' },
  Transport: { icon: Bus, bar: 'bg-sky-500', chip: 'bg-sky-100 text-sky-600' },
  Housing: { icon: House, bar: 'bg-emerald-500', chip: 'bg-emerald-100 text-emerald-600' },
  Health: { icon: HeartPulse, bar: 'bg-rose-500', chip: 'bg-rose-100 text-rose-600' },
  Entertainment: { icon: Clapperboard, bar: 'bg-fuchsia-500', chip: 'bg-fuchsia-100 text-fuchsia-600' },
  Shopping: { icon: ShoppingBag, bar: 'bg-amber-500', chip: 'bg-amber-100 text-amber-600' },
  Education: { icon: GraduationCap, bar: 'bg-indigo-500', chip: 'bg-indigo-100 text-indigo-600' },
  Other: { icon: Package, bar: 'bg-slate-500', chip: 'bg-slate-100 text-slate-600' },
};

export const INCOME_CATEGORIES = {
  Salary: { icon: Briefcase, bar: 'bg-emerald-500', chip: 'bg-emerald-100 text-emerald-600' },
  Freelance: { icon: Laptop, bar: 'bg-teal-500', chip: 'bg-teal-100 text-teal-600' },
  Gift: { icon: Gift, bar: 'bg-pink-500', chip: 'bg-pink-100 text-pink-600' },
  Investment: { icon: TrendingUp, bar: 'bg-cyan-500', chip: 'bg-cyan-100 text-cyan-600' },
  'Other income': { icon: Coins, bar: 'bg-lime-500', chip: 'bg-lime-100 text-lime-700' },
};

export const categoryInfo = (name) =>
  CATEGORIES[name] || INCOME_CATEGORIES[name] || CATEGORIES.Other;