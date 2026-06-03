import { useId } from 'react';

const toneClass = {
  blue: {
    ring: 'focus:ring-blue-500',
    active: 'text-blue-800',
    panel: 'border-blue-100 bg-gradient-to-br from-blue-50 to-white',
  },
  hcmut: {
    ring: 'focus:ring-blue-800',
    active: 'text-blue-800',
    panel: 'border-blue-100 bg-gradient-to-br from-blue-50 to-white',
  },
  emerald: {
    ring: 'focus:ring-emerald-600',
    active: 'text-emerald-800',
    panel: 'border-emerald-100 bg-gradient-to-br from-emerald-50 to-white',
  },
  indigo: {
    ring: 'focus:ring-indigo-600',
    active: 'text-indigo-800',
    panel: 'border-indigo-100 bg-gradient-to-br from-indigo-50 to-white',
  },
  red: {
    ring: 'focus:ring-red-500',
    active: 'text-red-800',
    panel: 'border-rose-100 bg-gradient-to-br from-rose-50 to-white',
  },
};

export const QuickScoreInput = ({
  title,
  description = 'Tổng điểm 3 môn trên thang 30.',
  value,
  onChange,
  disabled,
  max = 30,
  step = '0.01',
  placeholder = '0.00',
  tone = 'blue',
  className = '',
}) => {
  const inputId = useId();
  const descriptionId = `${inputId}-description`;
  const toneStyle = toneClass[tone] || toneClass.blue;
  const handleChange = (event) => {
    const { value } = event.target;
    if (value !== '') {
      if (value.toString().trim().startsWith('-')) {
        event.target.value = '0';
        onChange(event);
        return;
      }
      const number = parseFloat(value);
      const maxValue = parseFloat(max);
      if (!Number.isNaN(number)) {
        event.target.value = Math.min(Math.max(number, 0), maxValue).toString();
      }
    }
    onChange(event);
  };

  return (
    <div className={`rounded-[1.5rem] border p-4 shadow-sm ${toneStyle.panel} ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label htmlFor={inputId} className="mb-1 block text-sm font-bold text-slate-800">
            {title}
          </label>
          <p id={descriptionId} className="text-xs leading-6 text-slate-500">{description}</p>
        </div>
        <input
          id={inputId}
          type="number"
          min="0"
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-describedby={description ? descriptionId : undefined}
          className={`w-full rounded-2xl border px-4 py-3 text-right text-xl font-black tracking-tight shadow-sm focus:outline-none focus:ring-2 sm:w-44 ${toneStyle.ring} ${
            disabled
              ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500'
              : `border-white bg-white ${toneStyle.active}`
          }`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
