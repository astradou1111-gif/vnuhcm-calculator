import { useId } from 'react';

export const CardSection = ({ title, icon: Icon, children }) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 shadow-[0_24px_80px_-36px_rgba(13,59,102,0.18)] backdrop-blur"
    >
      <div className="flex items-center gap-3 border-b border-[#0d3b66]/10 bg-gradient-to-r from-[#0d3b66]/5 to-white px-5 py-4 sm:px-6">
        {Icon && (
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0d3b66] text-white shadow-sm ring-1 ring-[#0d3b66]/10">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d3b66]">
            HCMUT Panel
          </p>
          <h2 id={titleId} className="text-lg font-black tracking-tight text-slate-950">
            {title}
          </h2>
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
};
