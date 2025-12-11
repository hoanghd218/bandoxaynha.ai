
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen max-h-screen bg-brand-gray-light text-brand-gray-neutral">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-accent-border shadow-sm">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Bản Đồ Xây Nhà AI"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-brand-blue tracking-tight">Bandoxaynha.ai</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/agents"
            className="px-4 py-2 text-sm font-semibold text-brand-blue hover:text-primary transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Tiện ích AI
          </Link>
          <button className="px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-lg hover:bg-green-50 transition-colors">
            Đăng nhập
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className=" flex-1 flex flex-col justify-center w-full max-w-5xl mx-auto p-4 items-center">

        {/* Centered Hero Section (Visual Center) */}
        <div className="flex flex-col items-center justify-center w-full max-w-3xl space-y-8">
          <div className="flex flex-col items-center text-center space-y-6 w-full">
            <div className="relative w-28 h-28 mb-2">
              <Image
                src="/logo.png"
                alt="Bản Đồ Xây Nhà AI Title Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue font-display px-4">
              Tôi có thể giúp gì cho ngôi nhà của bạn?
            </h2>

            {/* Input Area */}
            <div className="w-full relative max-w-2xl shadow-2xl rounded-2xl">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 015-5zm0 8a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full py-6 pl-16 pr-16 text-lg text-gray-700 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Hỏi bất cứ điều gì về xây dựng..."
              />
              <button className="absolute inset-y-2 right-2 flex items-center">
                <div className="p-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors cursor-pointer shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Suggested Prompts */}
        <div className=" mt-10 w-full max-w-4xl  pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <button className="p-4 bg-white border border-accent-border rounded-xl hover:border-primary hover:text-brand-blue transition-all shadow-sm hover:shadow-md text-left group h-full flex flex-col justify-between">
              <span className="font-semibold block mb-2 group-hover:text-primary transition-colors">Thiết kế nhà phố</span>
              <span className="text-gray-500 text-xs">Mẫu nhà 5x20m hiện đại</span>
            </button>
            <button className="p-4 bg-white border border-accent-border rounded-xl hover:border-primary hover:text-brand-blue transition-all shadow-sm hover:shadow-md text-left group h-full flex flex-col justify-between">
              <span className="font-semibold block mb-2 group-hover:text-primary transition-colors">Dự toán chi phí</span>
              <span className="text-gray-500 text-xs">Tính vật liệu xây thô</span>
            </button>
            <button className="p-4 bg-white border border-accent-border rounded-xl hover:border-primary hover:text-brand-blue transition-all shadow-sm hover:shadow-md text-left group h-full flex flex-col justify-between">
              <span className="font-semibold block mb-2 group-hover:text-primary transition-colors">Pháp lý xây dựng</span>
              <span className="text-gray-500 text-xs">Thủ tục xin giấy phép</span>
            </button>
            <button className="p-4 bg-white border border-accent-border rounded-xl hover:border-primary hover:text-brand-blue transition-all shadow-sm hover:shadow-md text-left group h-full flex flex-col justify-between">
              <span className="font-semibold block mb-2 group-hover:text-primary transition-colors">Phong thủy</span>
              <span className="text-gray-500 text-xs">Hướng bếp tuổi 1990</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6 mb-2">
            Bandoxaynha.ai có thể mắc lỗi. Hãy kiểm tra lại thông tin quan trọng.
          </p>
        </div>
      </main>

      {/* Footer removed as input is now in main */}
    </div>
  );
}

