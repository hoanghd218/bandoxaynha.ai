import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-accent-border shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                    <div className="relative w-8 h-8">
                        <Image
                            src="/logo.png"
                            alt="Bản Đồ Xây Nhà AI"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-xl font-bold text-brand-blue tracking-tight">
                        Bandoxaynha.ai
                    </h1>
                </Link>

                <nav className="hidden md:flex items-center gap-6 ml-4 border-l pl-6 border-gray-200 h-6">
                    <Link
                        href="/agents"
                        className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Tiện ích AI
                    </Link>
                    <Link
                        href="/nha-thau"
                        className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Danh sách nhà thầu
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                {/* Mobile menu button could go here */}
                <button className="px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-lg hover:bg-green-50 transition-colors">
                    Đăng nhập
                </button>
            </div>
        </header>
    );
}
