import Link from "next/link";
import Image from "next/image";

export default function AIThietKePage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-md sticky top-0 z-50">
                <Link href="/agents" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group">
                    <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-200">
                        <Image
                            src="/logo.png"
                            alt="Bản Đồ Xây Nhà AI"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 font-display tracking-tight">AI Thiết Kế</h1>
                </Link>
                <Link
                    href="/agents"
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-brand-blue hover:bg-slate-100 rounded-lg transition-all duration-200 cursor-pointer"
                >
                    ← Quay lại
                </Link>
            </header>

            {/* Iframe Content */}
            <main className="flex-1 w-full">
                <div className="relative w-full h-screen">
                    {/* Loading overlay */}
                    <div id="loading-overlay" className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center z-10 transition-opacity duration-500">
                        <div className="text-center animate-fadeIn">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600 font-medium">Đang tải AI Thiết Kế...</p>
                        </div>
                    </div>
                    <iframe
                        src="https://app.hoangaixaydung.academy/"
                        className="w-full h-full border-0"
                        title="AI Thiết Kế - Hoang AI Xây Dựng"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => {
                            const overlay = document.getElementById('loading-overlay');
                            if (overlay) {
                                overlay.style.opacity = '0';
                                setTimeout(() => overlay.remove(), 500);
                            }
                        }}
                    />
                </div>
            </main>
        </div>
    );
}
