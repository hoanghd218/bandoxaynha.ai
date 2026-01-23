
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <Header />

      <main className="flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto px-4 py-20 md:py-12 items-center">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl space-y-10 animate-fadeInUp">
          <div className="flex flex-col items-center text-center space-y-8 w-full">
            <div className="relative w-32 h-32 mb-4 animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-hover rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-white to-slate-50 shadow-2xl shadow-primary/10 p-4 border border-white/50">
                <Image
                  src="/logo.png"
                  alt="Bản Đồ Xây Nhà AI Title Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                AI hỗ trợ xây dựng nhà thông minh
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-display leading-tight px-4">
                Tôi có thể giúp gì cho ngôi nhà của bạn?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                Thiết kế nội thất, tìm kiếm nhà thầu, dự toán chi phí và nhiều hơn thế
              </p>
            </div>

            <div className="w-full relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 015-5zm0 8a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full py-5 pl-14 pr-32 text-lg text-slate-700 bg-white/95 backdrop-blur-md border-2 border-slate-300 hover:border-primary/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 shadow-xl shadow-slate-300/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-0.5 cursor-pointer"
                placeholder="Hỏi bất cứ điều gì về xây dựng..."
              />
              <div className="absolute inset-y-2 right-2 flex items-center">
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-brand-blue-dark text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer">
                  <span>Gửi</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl mt-16 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <p className="text-center text-sm font-medium text-slate-500 mb-6">
            Gợi ý cho bạn
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/thiet-ke-noi-that" className="group glass-strong p-5 rounded-2xl hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1.5 hover:border-primary/40 transition-all duration-300 cursor-pointer border border-slate-200 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">Thiết kế nội thất</h3>
              <p className="text-sm text-slate-500">Tạo thiết kế 3D bằng AI</p>
            </Link>

            <button className="group glass-strong p-5 rounded-2xl hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1.5 hover:border-primary/40 transition-all duration-300 cursor-pointer border border-slate-200 text-left animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-accent transition-colors">Dự toán chi phí</h3>
              <p className="text-sm text-slate-500">Tính vật liệu xây thô</p>
            </button>

            <button className="group glass-strong p-5 rounded-2xl hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1.5 hover:border-primary/40 transition-all duration-300 cursor-pointer border border-slate-200 text-left animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-brand-blue transition-colors">Pháp lý xây dựng</h3>
              <p className="text-sm text-slate-500">Thủ tục xin giấy phép</p>
            </button>

            <Link href="/agents/ai-phong-thuy" className="group glass-strong p-5 rounded-2xl hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1.5 hover:border-primary/40 transition-all duration-300 cursor-pointer border border-slate-200 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-green/10 to-brand-green/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-brand-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-brand-green transition-colors">Phong thủy</h3>
              <p className="text-sm text-slate-500">Hướng bếp, hướng nhà</p>
            </Link>
          </div>

          <p className="text-center text-xs text-slate-400 mt-8 max-w-md mx-auto leading-relaxed">
            Bandoxaynha.ai có thể mắc lỗi. Hãy kiểm tra lại thông tin quan trọng.
          </p>
        </div>
      </main>
    </div>
  );
}
 
