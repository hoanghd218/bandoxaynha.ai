"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="fixed top-4 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-8 z-50 animate-fadeIn">
            <div className="max-w-7xl mx-auto">
                <div className="glass-strong rounded-2xl shadow-xl shadow-primary/5 px-4 md:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
                        >
                            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-hover p-0.5 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 cursor-pointer">
                                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                                    <Image
                                        src="/logo.png"
                                        alt="Bản Đồ Xây Nhà AI"
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold text-slate-900 tracking-tight font-display">
                                    Bandoxaynha<span className="text-primary">.ai</span>
                                </h1>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href="/thiet-ke-noi-that"
                                className={`
                                    text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer
                                    ${isActive("/thiet-ke-noi-that")
                                        ? "text-white bg-gradient-to-r from-primary to-primary-hover shadow-lg shadow-primary/30 border border-primary/40"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:border-slate-200 border border-transparent"
                                    }
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                </svg>
                                Thiết kế nội thất
                            </Link>
                            <Link
                                href="/agents"
                                className={`
                                    text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer
                                    ${isActive("/agents") || pathname.startsWith("/agents/")
                                        ? "text-white bg-gradient-to-r from-primary to-primary-hover shadow-lg shadow-primary/30 border border-primary/40"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:border-slate-200 border border-transparent"
                                    }
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Tiện ích AI
                            </Link>
                            <Link
                                href="/nha-thau"
                                className={`
                                    text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer
                                    ${isActive("/nha-thau") || pathname.startsWith("/nha-thau/")
                                        ? "text-white bg-gradient-to-r from-primary to-primary-hover shadow-lg shadow-primary/30 border border-primary/40"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:border-slate-200 border border-transparent"
                                    }
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Danh sách nhà thầu
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 text-sm font-semibold text-primary bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 border border-primary/30 hover:border-primary/50 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-primary/20 hover:scale-105 active:scale-95 cursor-pointer">
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
