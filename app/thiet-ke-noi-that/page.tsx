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
                    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-brand-gray-light text-center">
                        <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mb-6 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Đăng ký thành công!</h2>
                        <p className="text-lg text-gray-500 max-w-lg mb-8">
                            Cảm ơn <strong>{lastSubmittedLead.name}</strong>. Chúng tôi đã nhận được yêu cầu thiết kế của bạn.
                            File thiết kế gốc và bảng dự toán sẽ được gửi qua email <strong>{lastSubmittedLead.email}</strong> trong giây lát.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleReset}
                                className="px-6 py-4 bg-white border border-gray-300 rounded-xl font-bold text-gray-900 hover:bg-gray-50 transition-colors order-2 sm:order-1"
                            >
                                Về trang chủ
                            </button>
                            <a
                                href="https://zalo.me/g/yooqhx505"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 transform hover:scale-105 animate-bounce-subtle order-1 sm:order-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                </svg>
                                Tư vấn miễn phí với KTS (Zalo)
                            </a>
                        </div>
                        <button
                            onClick={handleReset}
                            className="mt-8 text-sm text-gray-400 hover:text-primary transition-colors underline"
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
