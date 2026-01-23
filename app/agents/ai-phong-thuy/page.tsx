"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { analyzeFengShui } from '@/services/gemini-fengshui';
import DirectionSelector from './components/DirectionSelector';
import {
    FengShuiInput,
    FengShuiAnalysis,
    Gender,
    Direction,
    Menh,
    UserInfo,
    DIRECTIONS,
    ELEMENT_CONFIG,
    calculateMenh,
    calculateCungPhi,
} from '@/data/fengshui';

// Icon components (inline SVGs)
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const CompassIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 7.76 14.12 1.24 7.76 7.76" />
    </svg>
);

const SparklesIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

const CheckCircleIcon = ({ size = 16, className = "", style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
);

const ArrowRightIcon = ({ size = 16 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ReloadIcon = ({ size = 16 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
    </svg>
);

export default function AIPhongThuyPage() {
    // State
    const [input, setInput] = useState<FengShuiInput>({
        birthDate: '1992-08-08',
        gender: 'Nam',
        houseDirection: 'Nam',
    });
    const [analysis, setAnalysis] = useState<FengShuiAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    // Refs
    const resultsRef = useRef<HTMLDivElement>(null);

    // Handle input changes
    const handleInputChange = (field: keyof FengShuiInput, value: string | Gender | Direction) => {
        setInput(prev => ({ ...prev, [field]: value }));
        setError(null);
    };

    // Validate input
    const validateInput = (): boolean => {
        if (!input.birthDate) {
            setError('Vui lòng chọn ngày sinh của gia chủ');
            return false;
        }
        return true;
    };

    // Analyze Feng Shui
    const handleAnalyze = async () => {
        if (!validateInput()) return;

        setIsAnalyzing(true);
        setError(null);

        // Scroll to loading section
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        try {
            const result = await analyzeFengShui(input);
            setAnalysis(result);
        } catch (err) {
            console.error('Feng Shui analysis error:', err);
            setError('Không thể phân tích phong thủy. Vui lòng thử lại sau.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Continue searching (keep current inputs)
    const handleContinue = () => {
        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Focus on first input for better UX
        const birthDateInput = document.getElementById('birthDate') as HTMLInputElement;
        birthDateInput?.focus();
    };

    // Reset analysis
    const handleReset = () => {
        setAnalysis(null);
        setInput({
            birthDate: '1992-08-08',
            gender: 'Nam',
            houseDirection: 'Nam',
        });
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Render loading state
    const renderLoading = () => (
        <div className="py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center mx-auto mb-8 animate-gentle-pulse">
                <SparklesIcon size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 font-display mb-3">AI Đang Phân Tích Phong Thuỷ...</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
                Tính toán ngũ hành, bát trạch & tìm giải pháp tối ưu cho tổ ấm của bạn
            </p>

            {/* Skeleton Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 opacity-50">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
                ))}
            </div>
        </div>
    );

    // Render results
    const renderResults = () => {
        if (!analysis) return null;
        const elementConfig = ELEMENT_CONFIG[analysis.menh];

        return (
            <div className="max-w-5xl mx-auto py-12 px-4 section-reveal">
                {/* Quick Overview Bar */}
                <div className="glass-fengshui rounded-2xl p-6 mb-12 flex flex-wrap items-center justify-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{elementConfig.icon}</span>
                        <div>
                            <p className="text-sm text-gray-500">Mệnh</p>
                            <p className="text-xl font-bold" style={{ color: elementConfig.color }}>{analysis.menh}</p>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🧭</span>
                        <div>
                            <p className="text-sm text-gray-500">Cung Phi</p>
                            <p className="text-xl font-bold text-brand-blue">{analysis.cungPhi}</p>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⬇️</span>
                        <div>
                            <p className="text-sm text-gray-500">Hướng nhà</p>
                            <p className="text-xl font-bold text-brand-blue">{input.houseDirection}</p>
                        </div>
                    </div>
                </div>

                {/* Timeline Sections */}
                <div className="space-y-12">
                    {/* Section 1: Overview */}
                    <div className="relative">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-primary to-primary-hover shadow-lg shadow-primary/30">
                                1
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900">Tổng Quan Phong Thuỷ</h3>
                        </div>

                        <div className="">
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className={`p-6 rounded-2xl border-2 ${elementConfig.bgColor}`} style={{ borderColor: elementConfig.color }}>
                                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: elementConfig.color }}>
                                        <span className="text-2xl">{elementConfig.icon}</span>
                                        Mệnh {analysis.menh}
                                    </h4>
                                    <p className="text-gray-700 mb-4">{elementConfig.description}</p>
                                    <div>
                                        <p className="font-semibold text-sm mb-2" style={{ color: elementConfig.color }}>✅ Màu sắc hợp:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {elementConfig.compatibleColors.map((color, i) => (
                                                <span key={i} className="text-sm px-3 py-1 rounded-full bg-white shadow-sm">{color}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-blue-light/20 to-primary/10 border border-brand-blue-light/30">
                                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-brand-blue">
                                        <span>🧭</span>
                                        Cung Phi {analysis.cungPhi}
                                    </h4>
                                    <p className="text-gray-700">
                                        Gia chủ thuộc cung {analysis.cungPhi} với những đặc điểm nổi bật: năng lực lãnh đạo, tầm nhìn chiến lược và khả năng đưa ra quyết định nhanh chóng.
                                    </p>
                                </div>
                            </div>

                            <div className="glass-fengshui rounded-2xl p-8">
                                <h4 className="font-bold text-lg mb-4 text-brand-blue flex items-center gap-2">
                                    <SparklesIcon />
                                    Phân Tích Từ AI
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-lg font-light">
                                    {analysis.summary}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Materials */}
                    <div className="relative section-reveal">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-harmonyGreen to-emerald-600 shadow-lg shadow-emerald-500/30" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                                2
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900">Giải Pháp Vật Liệu</h3>
                        </div>

                        <div className=" w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                <MaterialCard
                                    icon="🎨"
                                    title="Màu sắc"
                                    items={analysis.materials.colors}
                                    color="#EF4444"
                                />
                                <MaterialCard
                                    icon="🪵"
                                    title="Sàn nhà"
                                    items={analysis.materials.floors}
                                    color="#D97706"
                                />
                                <MaterialCard
                                    icon="🧱"
                                    title="Tường"
                                    items={analysis.materials.walls}
                                    color="#6B7280"
                                />
                                <MaterialCard
                                    icon="🪴"
                                    title="Trang trí"
                                    items={analysis.materials.decor}
                                    color="#22C55E"
                                />
                                <MaterialCard
                                    icon="💡"
                                    title="Ánh sáng"
                                    items={analysis.materials.light}
                                    color="#F59E0B"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Layout */}
                    <div className="relative section-reveal">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-harmonyPurple to-violet-600 shadow-lg shadow-purple-500/30" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}>
                                3
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900">Khuyến Nghị Sắp Đặt</h3>
                        </div>

                        <div className=" w-full">
                            <div className="glass-fengshui rounded-2xl p-6 space-y-4 w-full">
                                <div className="flex items-start gap-3">
                                    <CheckCircleIcon size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Bếp</p>
                                        <p className="text-gray-600">{analysis.layout.kitchen}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircleIcon size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Phòng ngủ</p>
                                        <p className="text-gray-600">{analysis.layout.bedroom}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircleIcon size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Cửa chính</p>
                                        <p className="text-gray-600">{analysis.layout.mainDoor}</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <span>⚠️</span>
                                        Cần tránh:
                                    </p>
                                    <ul className="space-y-2">
                                        {analysis.layout.avoid.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600">
                                                <span className="text-red-500 mt-1">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Favorable Years */}
                    <div className="relative section-reveal">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-harmonyGold to-amber-600 shadow-lg shadow-amber-500/30" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
                                4
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900">Tuổi Động Thổ</h3>
                        </div>

                        <div className=" w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {analysis.favorableYears.map((year) => (
                                    <div key={year.year} className={`p-5 rounded-2xl border-2 ${year.rating === 'Rất tốt' ? 'bg-emerald-50 border-emerald-200' :
                                        year.rating === 'Tốt' ? 'bg-green-50 border-green-200' :
                                            year.rating === 'Khá' ? 'bg-yellow-50 border-yellow-200' :
                                                'bg-gray-50 border-gray-200'
                                        }`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-2xl">🗓️</span>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold ${
                                                year.rating === 'Rất tốt' ? 'bg-emerald-500 text-white' :
                                                year.rating === 'Tốt' ? 'bg-green-500 text-white' :
                                                year.rating === 'Khá' ? 'bg-yellow-500 text-white' :
                                                'bg-gray-400 text-white'
                                            }">
                                                {year.rating}
                                            </span>
                                        </div>
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{year.year}</p>
                                        <p className="text-sm text-gray-600">{year.reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-primary to-primary-hover rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                        <div className="relative z-10 flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold font-display">Tư Vấn Thêm Từ Chuyên Gia</h3>
                            </div>
                            <p className="text-green-100 text-lg max-w-xl font-light">
                                Để nhận tư vấn chi tiết về thiết kế, vật liệu phù hợp với phong thủy của bạn, hãy kết nối với kiến trúc sư của chúng tôi.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://zalo.me/g/yooqhx505"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-primary hover:bg-green-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-3 whitespace-nowrap group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                </svg>
                                Tư vấn qua Zalo
                            </a>
                            <button
                                onClick={handleReset}
                                className="bg-white/20 hover:bg-white/30 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-3 whitespace-nowrap"
                            >
                                <ReloadIcon />
                                Phân tích lại
                            </button>
                        </div>
                    </div>

                    {/* New: Join Zalo Group CTA */}
                    <div className="mt-12">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-white shadow-2xl relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                            {/* Left: Icon + Heading */}
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 p-4 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16.049 15.5a5.5 5.5 0 0 0-5.5-5.5h-9.5a5.5 5.5 0 0 0-5.5 5.5h-9.5a5.5 5.5 0 0 0-5.5 5.5h-9.5zm-6.5 2.5h9.5a3 3 0 0 1 1 3h-9.5a3 3 0 0 1 1-3zm-3.5 4h9.5a1.5 1.5 0 0 1 1 1.5h-9.5a1.5 1.5 0 0 1 1-1.5zm3.5 4h6.5a1 1 0 0 1 1 1h-6.5a1 1 0 0 1 1-1z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold font-display">Tham Gia Cộng Đồng Zalo</h3>
                                    <p className="text-emerald-100 text-sm mt-1">Nhận tư vấn từ chuyên gia phong thuỷ</p>
                                </div>
                            </div>

                            {/* Right: Description + Button */}
                            <div className="relative z-10 flex-1 text-center md:text-left">
                                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                                    Bạn hãy vào nhóm Zalo để chuyên gia phong thuỷ tư vấn miễn phí cho bạn nhé.
                                </p>
                                <a
                                    href="https://zalo.me/g/tasxmm621"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-50 transition-all transform hover:scale-105 group w-full md:w-auto justify-center md:justify-start"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                    </svg>
                                    Tham Gia Ngay Zalo Group
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Subcomponent: Material Card
    const MaterialCard = ({ icon, title, items, color }: { icon: string; title: string; items: string[]; color: string }) => (
        <div className="glass-fengshui rounded-2xl p-5 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}15` }}>
                <span className="text-2xl">{icon}</span>
            </div>
            <h4 className="font-semibold text-lg mb-3 text-gray-900">{title}</h4>
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircleIcon size={14} className="flex-shrink-0 mt-0.5" style={{ color }} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-brand-gray-light">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-accent-border shadow-sm sticky top-0 z-10">
                <Link href="/agents" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="relative w-8 h-8">
                        <Image src="/logo.png" alt="Bản Đồ Xây Nhà AI" fill className="object-contain" />
                    </div>
                    <h1 className="text-xl font-bold text-brand-blue tracking-tight">AI Phong Thuỷ</h1>
                </Link>
                <Link href="/agents" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors">
                    ← Quay lại
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12">
                {!analysis ? (
                    /* Input Form */
                    <div className="animate-fadeInUp">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                                AI phân tích phong thủy chuyên nghiệp
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-4 font-display">
                                Phân Tích Phong Thuỷ <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand-blue">
                                    Tối Ưu Cho Tổ Ấm Của Bạn
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                                Nhập thông tin gia chủ và để AI tạo giải pháp phong thủy hài hòa, mang lại sự bình an và thịnh vượng cho gia đình.
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto glass-fengshui rounded-3xl p-8 md:p-10 shadow-xl">
                            {/* Birth Date */}
                            <div className="mb-8">
                                <label htmlFor="birthDate" className="block text-sm font-semibold mb-3 text-gray-900">
                                    Ngày sinh gia chủ <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                                        <CalendarIcon />
                                    </div>
                                    <input
                                        id="birthDate"
                                        type="date"
                                        value={input.birthDate}
                                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                        className="w-full py-4 pl-14 pr-4 text-lg text-gray-700 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold mb-3 text-gray-900">
                                    Giới tính <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Nam', 'Nữ'].map((gender) => (
                                        <button
                                            key={gender}
                                            onClick={() => handleInputChange('gender', gender as Gender)}
                                            className={`
                                                py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center gap-3
                                                ${input.gender === gender
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary/50'
                                                }
                                            `}
                                        >
                                            {gender === 'Nam' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="10" cy="10" r="7" /><line x1="21" x2="16.65" y1="17" y2="12.65" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M7.5 12h9" /><path d="M7.5 15h9" />
                                                </svg>
                                            )}
                                            {gender}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* House Direction */}
                            <div className="mb-8">
                                <label htmlFor="houseDirection" className="block text-sm font-semibold mb-3 text-gray-900">
                                    Hướng nhà <span className="text-red-500">*</span>
                                </label>
                                <DirectionSelector
                                    selected={input.houseDirection}
                                    onSelect={(dir) => handleInputChange('houseDirection', dir)}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                                        <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleAnalyze}
                                disabled={!input.birthDate || isAnalyzing}
                                className={`
                                    w-full py-5 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3
                                    ${!input.birthDate || isAnalyzing
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-primary to-primary-hover text-white hover:shadow-2xl hover:scale-[1.02]'
                                    }
                                `}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Đang phân tích...
                                    </>
                                ) : (
                                    <>
                                        <SparklesIcon size={24} />
                                        Phân Tích Phong Thuỷ
                                    </>
                                )}
                            </button>

                            {/* Continue Searching Button */}
                            <button
                                onClick={handleContinue}
                                className="w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-primary/50 text-gray-700"
                            >
                                <ReloadIcon size={20} />
                                Tiếp Tục Tra Cứu
                            </button>
                            <p className="text-xs text-gray-500 text-center mt-2">
                                Phân tích cùng hướng nhà khác hoặc thử với thông tin khác
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Results */
                    renderResults()
                )}
            </main>

            {/* Loading Section */}
            {isAnalyzing && !analysis && (
                <div ref={resultsRef} className="scroll-mt-24">
                    {renderLoading()}
                </div>
            )}

            {/* Footer */}
            <footer className="w-full bg-white border-t border-accent-border py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
                    <p>© 2025 Bandoxaynha.ai. All rights reserved.</p>
                    <p className="mt-2 text-xs">Thông tin phong thủy được cung cấp mang tính tham khảo.</p>
                </div>
            </footer>
        </div>
    );
}
