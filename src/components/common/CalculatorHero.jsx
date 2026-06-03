import { Link } from 'react-router-dom';
import { ChevronLeft, ExternalLink } from 'lucide-react';

const toneClass = {
  blue: {
    badge: 'border-blue-200/80 bg-blue-50 text-blue-800',
    icon: 'bg-blue-600/10 text-blue-700 ring-1 ring-blue-200/70',
    panel: 'from-blue-600/12 via-white to-sky-500/10',
    button: 'border-blue-200 bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'text-blue-700',
  },
  indigo: {
    badge: 'border-indigo-200/80 bg-indigo-50 text-indigo-800',
    icon: 'bg-indigo-600/10 text-indigo-700 ring-1 ring-indigo-200/70',
    panel: 'from-indigo-600/12 via-white to-violet-500/10',
    button: 'border-indigo-200 bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'text-indigo-700',
  },
  emerald: {
    badge: 'border-emerald-200/80 bg-emerald-50 text-emerald-800',
    icon: 'bg-emerald-600/10 text-emerald-700 ring-1 ring-emerald-200/70',
    panel: 'from-emerald-600/12 via-white to-teal-500/10',
    button: 'border-emerald-200 bg-emerald-600 text-white hover:bg-emerald-700',
    secondary: 'text-emerald-700',
  },
  red: {
    badge: 'border-rose-200/80 bg-rose-50 text-rose-800',
    icon: 'bg-rose-600/10 text-rose-700 ring-1 ring-rose-200/70',
    panel: 'from-rose-600/12 via-white to-orange-500/10',
    button: 'border-rose-200 bg-rose-600 text-white hover:bg-rose-700',
    secondary: 'text-rose-700',
  },
};

export const CalculatorHero = ({
  title,
  description,
  icon: Icon,
  tone = 'blue',
  ctaLabel,
  ctaHref,
}) => {
  const styles = toneClass[tone] || toneClass.blue;

  return (
    <section className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br ${styles.panel} px-5 py-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)] backdrop-blur sm:px-8 sm:py-8`}>
      <div className="absolute inset-y-0 right-0 hidden w-40 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.9),_transparent_68%)] lg:block" />
      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Trang chủ
          </Link>
          <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] ${styles.badge}`}>
            Bo cong cu tinh diem
          </span>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${styles.icon}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-[2.6rem]">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {description}
            </p>
          </div>

          {ctaHref && ctaLabel && (
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm transition ${styles.button}`}
            >
              {ctaLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
