import { Link } from 'react-router-dom';
import { SCHOOLS } from '../constants/common';
import { ChevronRight } from 'lucide-react';

export const Home = () => {
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <section className="surface-card hcmut-grid overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.9fr)] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0d3b66]/10 bg-[#0d3b66]/5 px-4 py-1.5 text-sm font-semibold text-[#0d3b66]">
              Giao diện mới theo cảm hứng HCMUT
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              <span className="block">Web tính điểm</span>
              <span className="block bg-gradient-to-r from-[#0d3b66] via-[#15558f] to-[#f7b500] bg-clip-text text-transparent">
                phong cách HCMUT
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Toàn bộ giao diện được làm lại theo tông xanh navy, vàng nhấn và bố cục
              gọn, rõ, kỹ thuật hơn để tạo cảm giác đồng nhất với tinh thần Bách khoa.
            </p>
            <div className="mt-8 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[#0d3b66]/10 bg-white/85 p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Nhận diện HCMUT</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Nhập điểm chi tiết hoặc tổng điểm tùy dữ liệu bạn đang có.</p>
              </div>
              <div className="rounded-[1.5rem] border border-[#0d3b66]/10 bg-white/85 p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Bố cục kỹ thuật</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Giữ lại toàn bộ thông tin trên trình duyệt để tiếp tục ngay lần sau.</p>
              </div>
              <div className="rounded-[1.5rem] border border-[#0d3b66]/10 bg-white/85 p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Nhấn mạnh kết quả</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Thao tác mượt trên chuột, bàn phím lẫn cảm ứng.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#0d3b66]/10 bg-gradient-to-br from-[#0d3b66] via-[#124677] to-[#0b2744] p-6 text-white shadow-[0_30px_80px_-36px_rgba(15,23,42,0.8)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
              Điểm nhấn giao diện
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight">
              Tông màu Bách khoa cho toàn bộ trải nghiệm tính điểm
            </h2>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Header và footer đồng bộ</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Dùng nền navy đậm, điểm nhấn vàng và typography rõ khối hơn.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Các thẻ kết quả nổi bật hơn</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Những vùng tương tác chính được tinh chỉnh để tập trung vào việc nhập và đọc điểm.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="section-title">Danh sách công cụ</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Chọn trường bạn muốn tính điểm
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SCHOOLS.map((school) => {
          const Icon = school.icon;
          const cardClass = "group relative flex min-h-[17rem] flex-col justify-between rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_-36px_rgba(13,59,102,0.2)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#0d3b66]/20 hover:shadow-[0_28px_70px_-32px_rgba(13,59,102,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";
          const content = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className={`inline-flex rounded-[1.25rem] p-4 ${school.bg} ${school.color} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="rounded-full border border-[#0d3b66]/10 bg-[#0d3b66]/5 p-2 text-[#0d3b66] transition group-hover:bg-[#0d3b66] group-hover:text-white">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-black text-slate-950 leading-tight">
                  {school.acronym}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {school.name}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full bg-[#0d3b66] px-3 py-1 text-xs font-semibold text-white">
                  Mở máy tính
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                  HCMUT UI
                </span>
              </div>
            </>
          );

          return (
            <Link
              key={school.id}
              to={`/${school.slug}`}
              className={cardClass}
            >
              {content}
            </Link>
          );
        })}
        </div>
      </section>
    </div>
  );
};
