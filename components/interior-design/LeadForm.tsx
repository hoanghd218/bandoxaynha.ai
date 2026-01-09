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
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-display">{title}</h2>
                <p className="text-gray-500 mt-2 text-sm">
                    {description}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Họ và tên</label>
                    <input
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-brand-gray-light"
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Số điện thoại</label>
                    <input
                        type="tel"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-brand-gray-light"
                        placeholder="0912 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-brand-gray-light"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
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
