"use client";

import React, { useState } from 'react';

interface LeadFormProps {
    onSubmit: (name: string, phone: string, email: string) => void;
    isLoading: boolean;
    title?: string;
    description?: string;
    buttonText?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({
    onSubmit,
    isLoading,
    title = "Hoàn tất hồ sơ",
    description = "Để lại thông tin để nhận file thiết kế gốc chất lượng cao và bảng dự toán chi phí chi tiết.",
    buttonText = "Nhận hồ sơ thiết kế"
}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && phone && email) {
            onSubmit(name, phone, email);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">{title}</h2>
                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                    {description}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Họ và tên</label>
                    <input
                        type="text"
                        required
                        className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all duration-200 bg-white cursor-pointer"
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Số điện thoại</label>
                    <input
                        type="tel"
                        required
                        className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all duration-200 bg-white cursor-pointer"
                        placeholder="0912 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all duration-200 bg-white cursor-pointer"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-13 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-brand-blue-dark text-white font-semibold rounded-xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 mt-8 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer active:scale-95"
                >
                    {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                <path d="m21.854 2.147-10.94 10.939" />
                            </svg>
                            {buttonText}
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                    Thông tin của bạn được bảo mật tuyệt đối.
                </p>
            </form>
        </div>
    );
};

export default LeadForm;
