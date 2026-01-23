import Link from "next/link";
import Image from "next/image";

export default function AIMauNhaPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-md sticky top-0 z-10 backdrop-blur-md bg-white/95">
                <Link href="/agents" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group">
                    <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-200">
                        <Image src="/logo.png" alt="Bản Đồ Xây Nhà AI" fill className="object-contain" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 font-display tracking-tight">AI Mẫu Nhà</h1>
                </Link>
                <Link href="/agents" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-brand-blue hover:bg-slate-100 rounded-lg transition-all duration-200 cursor-pointer hover:-translate-x-1">
                    ← Quay lại
                </Link>
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto p-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 animate-fadeIn">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white shadow-lg shadow-primary/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 font-display gradient-text-hero">AI Mẫu Nhà</h2>
                            <p className="text-slate-500 mt-1">
                                Công cụ AI tạo ý tưởng thiết kế, gợi ý mẫu nhà phù hợp với diện tích và sở thích.
                            </p>
                        </div>
                    </div>
                    <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-dashed border-slate-300">
                        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <p className="text-lg font-semibold text-slate-700 mb-2">Tính năng đang được phát triển</p>
                        <p className="text-slate-500">Chúng tôi sẽ sớm ra mắt công cụ này!</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
