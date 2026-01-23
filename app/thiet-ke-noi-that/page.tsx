"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DesignFlow from "@/components/interior-design/DesignFlow";
import { Lead } from "@/data/interior-design";

export default function InteriorDesignPage() {
    const [lastSubmittedLead, setLastSubmittedLead] = useState<Lead | null>(null);

    const handleLeadComplete = (lead: Lead) => {
        setLastSubmittedLead(lead);
    };

    const handleReset = () => {
        setLastSubmittedLead(null);
    };

    return (
        <div className="min-h-screen flex flex-col bg-brand-gray-light">
            <Header />

            <main className="flex-1">
                {lastSubmittedLead ? (
                    // Success View
                    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center text-primary mb-8 shadow-xl shadow-primary/20 animate-scale-in">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6 font-display gradient-text-hero">Đăng ký thành công!</h2>
                        <p className="text-lg text-slate-600 max-w-lg mb-10 leading-relaxed">
                            Cảm ơn <strong>{lastSubmittedLead.name}</strong>. Chúng tôi đã nhận được yêu cầu thiết kế của bạn.
                            File thiết kế gốc và bảng dự toán sẽ được gửi qua email <strong>{lastSubmittedLead.email}</strong> trong giây lát.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleReset}
                                className="order-2 sm:order-1 px-6 py-4 bg-white border-2 border-slate-200 hover:border-primary/50 hover:bg-slate-50 rounded-xl font-bold text-slate-700 transition-all duration-200 hover:shadow-md cursor-pointer active:scale-95"
                            >
                                Về trang chủ
                            </button>
                            <a
                                href="https://zalo.me/g/yooqhx505"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="order-1 sm:order-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-brand-blue-dark text-white rounded-xl font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                </svg>
                                Tư vấn miễn phí với KTS (Zalo)
                            </a>
                        </div>
                        <button
                            onClick={handleReset}
                            className="mt-8 text-sm text-slate-400 hover:text-primary transition-colors underline cursor-pointer"
                        >
                            Tạo thiết kế mới
                        </button>
                    </div>
                ) : (
                    <DesignFlow onComplete={handleLeadComplete} />
                )}
            </main>

            {/* Footer */}
            <footer className="w-full bg-white border-t border-accent-border py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    <p>© 2024 Bandoxaynha.ai - Nền tảng AI hỗ trợ xây dựng nhà thông minh</p>
                </div>
            </footer>
        </div>
    );
}
