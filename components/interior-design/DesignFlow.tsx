"use client";

import React, { useState, useRef } from 'react';
import { DesignStyle, BudgetRange, Lead, STYLES, BUDGETS } from '@/data/interior-design';
import { generateInteriorDesigns, editInteriorDesign } from '@/services/gemini-interior';
import LeadForm from './LeadForm';

interface DesignFlowProps {
    onComplete: (lead: Lead) => void;
}

interface UserInfo {
    name: string;
    phone: string;
    email: string;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const SparklesIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
);

const EditIcon = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
    </svg>
);

const XIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

const WandIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="M17.8 11.8 19 13" /><path d="M15 9h.01" /><path d="M17.8 6.2 19 5" /><path d="m3 21 9-9" /><path d="M12.2 6.2 11 5" />
    </svg>
);

const ArrowRightIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
);

const CheckCircleIcon = ({ size = 18, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
);

const getStyleIcon = (iconName: string) => {
    switch (iconName) {
        case 'LayoutDashboard':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
            );
        case 'Square':
            return <div className="w-5 h-5 border-2 border-current rounded-sm" />;
        case 'Leaf':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
            );
        case 'Snowflake':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" x2="22" y1="12" y2="12" /><line x1="12" x2="12" y1="2" y2="22" /><path d="m20 16-4-4 4-4" /><path d="m4 8 4 4-4 4" /><path d="m16 4-4 4-4-4" /><path d="m8 20 4-4 4 4" />
                </svg>
            );
        case 'Gem':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12l4 6-10 13L2 9Z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" />
                </svg>
            );
        case 'Flower':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" /><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 0 1 1-4.5 4.5" /><path d="M12 7.5V9" /><path d="M7.5 12H9" /><path d="M16.5 12H15" /><path d="M12 16.5V15" />
                </svg>
            );
        default:
            return null;
    }
};

const DesignFlow: React.FC<DesignFlowProps> = ({ onComplete }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [hasResults, setHasResults] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isProcessingEdit, setIsProcessingEdit] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [selectedStyles, setSelectedStyles] = useState<DesignStyle[]>([]);
    const [selectedBudget, setSelectedBudget] = useState<BudgetRange | null>(null);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [prompt, setPrompt] = useState('');

    const resultsRef = useRef<HTMLDivElement>(null);
    const editAreaRef = useRef<HTMLDivElement>(null);

    const executeGeneration = async (currentUserInfo: UserInfo) => {
        if (!image || selectedStyles.length === 0 || !selectedBudget) return;

        setIsGenerating(true);
        setHasResults(false);
        setIsEditing(false);

        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        try {
            const results = await generateInteriorDesigns(image, selectedStyles, selectedBudget);
            setGeneratedImages(results);
            if (results.length > 0) {
                setHasResults(true);
            } else {
                alert("Không thể tạo hình ảnh. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            alert("Đã xảy ra lỗi khi kết nối với AI.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleUserRegister = (name: string, phone: string, email: string) => {
        const newUser = { name, phone, email };
        setUserInfo(newUser);
        setShowRegisterModal(false);
        executeGeneration(newUser);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setImage(ev.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImage(null);
        setHasResults(false);
    };

    const toggleStyle = (style: DesignStyle) => {
        if (selectedStyles.includes(style)) {
            setSelectedStyles(selectedStyles.filter(s => s !== style));
        } else {
            if (selectedStyles.length >= 3) {
                alert("Bạn chỉ được chọn tối đa 3 phong cách để AI phối hợp tốt nhất.");
                return;
            }
            setSelectedStyles([...selectedStyles, style]);
        }
    };

    const handleGenerateClick = () => {
        if (!image || selectedStyles.length === 0 || !selectedBudget) return;

        if (!userInfo) {
            setShowRegisterModal(true);
            return;
        }

        executeGeneration(userInfo);
    };

    const handleEdit = async () => {
        if (selectedImageIndex === null || !prompt.trim()) return;
        const currentImage = generatedImages[selectedImageIndex];

        setIsProcessingEdit(true);
        try {
            const newImage = await editInteriorDesign(currentImage, prompt.trim());
            if (newImage) {
                const newImages = [...generatedImages];
                newImages[selectedImageIndex] = newImage;
                setGeneratedImages(newImages);
                setPrompt('');
            } else {
                alert("Không thể chỉnh sửa ảnh. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi khi chỉnh sửa.");
        } finally {
            setIsProcessingEdit(false);
        }
    };

    const handleFinalSubmit = () => {
        if (!image || !selectedBudget || !userInfo) return;

        const newLead: Lead = {
            id: crypto.randomUUID(),
            name: userInfo.name,
            phone: userInfo.phone,
            email: userInfo.email,
            designRequest: {
                originalImage: image,
                styles: selectedStyles,
                budget: selectedBudget,
            },
            selectedDesignId: selectedImageIndex !== null ? selectedImageIndex.toString() : undefined,
            createdAt: Date.now(),
        };
        onComplete(newLead);
    };

    const enterEditMode = (idx: number) => {
        setSelectedImageIndex(idx);
        setIsEditing(true);
        setTimeout(() => {
            editAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const renderLoading = () => (
        <div className="py-20 text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary flex items-center justify-center mb-8 mx-auto shadow-xl shadow-primary/10 animate-pulse">
                <SparklesIcon size={40} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 font-display mb-3">AI đang phân tích & thiết kế...</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-10">Hệ thống đang xử lý dữ liệu không gian để tạo ra 3 phương án tối ưu nhất.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 opacity-40">
                {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-4/3 bg-slate-200 rounded-2xl animate-pulse"></div>
                ))}
            </div>
        </div>
    );

    const renderResults = () => (
        <div className="max-w-6xl mx-auto py-12 px-4 animate-fadeIn">
            <h2 className="text-4xl font-bold text-slate-900 font-display mb-8 text-center">
                <span className="gradient-text-hero">3 Phương án</span> dành cho bạn
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {generatedImages.map((imgUrl, idx) => (
                    <div key={idx} className="flex flex-col group animate-scaleIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div
                            className="aspect-4/3 bg-slate-100 rounded-2xl overflow-hidden mb-5 shadow-lg border border-slate-100 relative cursor-pointer group-hover:shadow-2xl group-hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                            onClick={() => enterEditMode(idx)}
                        >
                            <img src={imgUrl} alt={`Plan ${idx + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-300 flex items-center justify-center">
                                <button className="bg-white/95 backdrop-blur-sm text-slate-900 px-6 py-3 rounded-xl font-bold shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95">
                                    <EditIcon size={18} /> Chọn & Chỉnh sửa
                                </button>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-xl text-slate-900 font-display mb-2">Phương án {idx + 1}</h3>
                            <p className="text-sm text-slate-500 mb-4">{selectedStyles.join(', ')}</p>
                            <a
                                href="https://zalo.me/g/yooqhx505"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover border border-primary/20 hover:border-primary/50 px-4 py-2 rounded-full transition-all hover:shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                </svg>
                                Tư vấn KTS về mẫu này
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center border-t border-slate-100 pt-8">
                <p className="text-slate-500 mb-4">Chưa ưng ý? Hãy thử thay đổi phong cách ở trên và tạo lại.</p>
            </div>
        </div>
    );

    const renderEditor = () => {
        if (selectedImageIndex === null) return null;
        return (
            <div className="max-w-6xl mx-auto py-12 px-4" ref={editAreaRef}>
                <div className="glass-strong rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
                    <div className="border-b border-slate-100 p-5 flex items-center justify-between bg-white/50">
                        <h3 className="font-bold text-xl text-slate-900 font-display flex items-center gap-2">
                            <EditIcon size={20} />
                            Chỉnh sửa Phương án {selectedImageIndex + 1}
                        </h3>
                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                            <XIcon size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 relative min-h-[400px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
                            <img
                                src={generatedImages[selectedImageIndex]}
                                alt="Editing"
                                className="w-full h-full object-contain absolute inset-0 transition-opacity duration-300"
                                style={{ opacity: isProcessingEdit ? 0.5 : 1 }}
                            />
                            {isProcessingEdit && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-sm bg-white/30">
                                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <div className="bg-white/95 px-6 py-3 rounded-full font-bold text-primary shadow-xl animate-pulse">
                                        AI đang chỉnh sửa...
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full lg:w-96 p-8 bg-white border-l border-slate-100 flex flex-col">
                            <div className="flex-1 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 mb-2">Yêu cầu chỉnh sửa AI</label>
                                    <p className="text-sm text-slate-500 mb-3">Mô tả chi tiết để AI tối ưu lại không gian.</p>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Ví dụ: Đổi màu sofa sang màu kem, thêm thảm trải sàn, thay đèn trần..."
                                        className="w-full h-32 px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none resize-none text-sm bg-slate-50 focus:bg-white disabled:bg-slate-100 disabled:opacity-50 transition-all"
                                        disabled={isProcessingEdit}
                                    ></textarea>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {['Tông màu sáng hơn', 'Thêm cây xanh', 'Sàn gỗ sồi', 'Đèn vàng ấm'].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPrompt(p)}
                                            disabled={isProcessingEdit}
                                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-full transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleEdit}
                                    disabled={!prompt.trim() || isProcessingEdit}
                                    className="w-full py-4 bg-gradient-to-r from-primary to-primary-hover text-white rounded-xl font-bold shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    {isProcessingEdit ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <WandIcon size={18} />
                                    )}
                                    {isProcessingEdit ? 'Đang thực hiện...' : 'AI Chỉnh sửa'}
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20 text-center">
                                    <h4 className="font-bold text-primary mb-2">Đã ưng ý với thiết kế này?</h4>
                                    <button
                                        onClick={handleFinalSubmit}
                                        className="w-full py-3 bg-gradient-to-r from-primary to-primary-hover text-white rounded-xl font-bold shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2 mt-4 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Nhận hồ sơ thiết kế
                                        <ArrowRightIcon size={18} />
                                    </button>

                                    <div className="mt-4 pt-4 border-t border-primary/10">
                                        <p className="text-xs text-slate-500 mb-2">Cần tư vấn thêm về thi công & vật liệu?</p>
                                        <a
                                            href="https://zalo.me/g/yooqhx505"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                            </svg>
                                            Chat với Kiến trúc sư
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="min-h-screen pt-24 pb-20 relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">

            <div className="text-center py-12 md:py-16 max-w-4xl mx-auto px-4 animate-fadeInUp">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-2 text-sm text-primary font-semibold mb-6 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Ứng dụng công nghệ AI vào thiết kế kiến trúc nội thất
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 font-display">
                    Thiết kế nội thất bằng AI <br className="hidden md:block" />
                    <span className="gradient-text-hero">
                        Chuẩn phong cách Việt
                    </span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 font-light">
                    Tải ảnh phòng hiện tại, chọn phong cách và để AI kiến tạo 3 phương án thiết kế thông minh cho ngôi nhà của bạn.
                </p>
            </div>

            <div className="container mx-auto px-4 mb-12">
                <div className="max-w-6xl mx-auto glass-strong rounded-3xl shadow-2xl shadow-primary/5 border border-white/40 overflow-hidden flex flex-col lg:flex-row animate-fadeIn" style={{ animationDelay: '0.2s' }}>

                    <div className="w-full lg:w-7/12 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100/50">
                        <h3 className="text-xl font-bold text-slate-900 mb-5 font-display flex items-center gap-2">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold">1</span>
                            Ảnh hiện trạng
                        </h3>

                        <label className={`
                            flex flex-col items-center justify-center w-full aspect-video md:aspect-4/3 lg:h-[500px]
                            border-2 border-dashed rounded-2xl cursor-pointer transition-all relative group overflow-hidden bg-white/50
                            ${image ? 'border-primary ring-4 ring-primary/10' : 'border-slate-300 hover:border-primary/50 hover:bg-primary/5'}
                        `}>
                            {image ? (
                                <>
                                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all duration-300 flex items-center justify-center gap-4">
                                        <button onClick={(e) => { e.preventDefault(); }} className="px-5 py-3 bg-white text-slate-900 rounded-xl font-semibold shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all">Thay ảnh</button>
                                        <button onClick={removeImage} className="p-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 hover:scale-105 active:scale-95 transition-all"><TrashIcon /></button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-6 text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                                        <UploadIcon />
                                    </div>
                                    <p className="text-lg text-slate-900 font-semibold mb-2">Nhấn để tải ảnh lên</p>
                                    <p className="text-sm text-slate-500 max-w-xs">Hỗ trợ ảnh JPG, PNG. Chụp rõ góc phòng để AI nhận diện tốt nhất.</p>
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>

                    <div className="w-full lg:w-5/12 p-6 md:p-10 bg-white flex flex-col h-full">

                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold">2</span>
                                    Chọn phong cách
                                </h3>
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${selectedStyles.length > 0 ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                                    {selectedStyles.length}/3
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {STYLES.map((style) => (
                                    <div
                                        key={style.id}
                                        onClick={() => toggleStyle(style.id)}
                                        className={`
                                            cursor-pointer rounded-xl p-4 border transition-all duration-200 flex flex-col gap-2 relative group hover:scale-[1.02] active:scale-[0.98]
                                            ${selectedStyles.includes(style.id)
                                                ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg shadow-primary/10'
                                                : 'border-slate-100 bg-white hover:border-primary/30 hover:bg-slate-50'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className={`${selectedStyles.includes(style.id) ? 'text-primary' : 'text-slate-400 group-hover:text-primary/70'}`}>
                                                {getStyleIcon(style.iconName)}
                                            </div>
                                            {selectedStyles.includes(style.id) && <CheckCircleIcon size={18} className="text-primary fill-white" />}
                                        </div>
                                        <div className={`font-semibold text-sm ${selectedStyles.includes(style.id) ? 'text-primary' : 'text-slate-700'}`}>{style.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-5 font-display flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold">3</span>
                                Ngân sách
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {BUDGETS.map((budget) => (
                                    <div
                                        key={budget}
                                        onClick={() => setSelectedBudget(budget)}
                                        className={`
                                            px-4 py-3 rounded-xl border cursor-pointer font-medium text-sm text-center transition-all hover:scale-[1.02] active:scale-[0.98]
                                            ${selectedBudget === budget
                                                ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 text-primary font-semibold'
                                                : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                            }
                                        `}
                                    >
                                        {budget}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100">
                            <button
                                onClick={handleGenerateClick}
                                disabled={!image || selectedStyles.length === 0 || !selectedBudget || isGenerating}
                                className={`
                                    w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2
                                    ${(!image || selectedStyles.length === 0 || !selectedBudget || isGenerating)
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0'
                                    }
                                `}
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        AI Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <SparklesIcon size={22} />
                                        Thiết kế ngay với AI
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div ref={resultsRef} className="scroll-mt-32">
                {isGenerating && renderLoading()}
                {!isGenerating && isEditing && renderEditor()}
                {!isGenerating && !isEditing && hasResults && renderResults()}
            </div>

            <div className="container px-4 mx-auto pb-12 pt-12 border-t border-slate-100 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                    <div className="glass-strong p-6 rounded-2xl border border-white/40 shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="h-14 w-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary mb-5 mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-xl mb-3 font-display text-slate-900">Giữ nguyên cấu trúc</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">AI tự động nhận diện sàn, trần, tường để giữ lại layout thực tế của căn nhà.</p>
                    </div>
                    <div className="glass-strong p-6 rounded-2xl border border-white/40 shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="h-14 w-14 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mb-5 mx-auto">
                            <CheckCircleIcon size={28} className="text-brand-blue" />
                        </div>
                        <h3 className="font-bold text-xl mb-3 font-display text-slate-900">Dự toán thông minh</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">Đề xuất vật liệu và đồ nội thất tối ưu với ngân sách bạn đã chọn.</p>
                    </div>
                    <a
                        href="https://zalo.me/g/yooqhx505"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-strong p-6 rounded-2xl border border-white/40 shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <div className="h-14 w-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary mb-5 mx-auto group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-xl mb-3 font-display text-slate-900">Kết nối chuyên gia</h3>
                        <p className="text-slate-500 text-sm mb-4 leading-relaxed">Nhận tư vấn chi tiết từ KTS thật dựa trên ý tưởng AI đã tạo ra.</p>
                        <span className="text-primary font-bold text-sm flex items-center justify-center gap-2 group-hover:underline">
                            Tư vấn miễn phí qua Zalo
                            <ArrowRightIcon size={16} />
                        </span>
                    </a>
                </div>

                <div className="bg-gradient-to-r from-primary to-primary-hover rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl shadow-primary/30 relative overflow-hidden animate-fadeIn">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold font-display">Cộng đồng Bản đồ xây nhà</h3>
                        </div>
                        <p className="text-white/90 text-lg max-w-xl font-light leading-relaxed">
                            Tham gia nhóm Zalo để được Kiến trúc sư tư vấn miễn phí, chia sẻ kinh nghiệm xây nhà và nhận ưu đãi độc quyền.
                        </p>
                    </div>

                    <a
                        href="https://zalo.me/g/yooqhx505"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 whitespace-nowrap group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                        Tham gia Zalo ngay
                    </a>
                </div>
            </div>

            {showRegisterModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="relative w-full max-w-md glass-strong rounded-3xl shadow-2xl overflow-hidden border border-white/40">
                        <button
                            onClick={() => setShowRegisterModal(false)}
                            className="absolute top-5 right-5 z-10 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors"
                        >
                            <XIcon size={20} />
                        </button>

                        <div className="bg-gradient-to-r from-primary to-primary-hover h-1 w-full"></div>
                        <div className="pt-2">
                            <LeadForm
                                onSubmit={handleUserRegister}
                                isLoading={false}
                                title="Thông tin liên hệ"
                                description="Vui lòng nhập thông tin để hệ thống gửi file thiết kế 3D chất lượng cao cho bạn."
                                buttonText="Hoàn tất & Dùng AI"
                            />
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default DesignFlow;
