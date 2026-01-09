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

// Icon components (inline to avoid lucide-react dependency issues)
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

// Style icons based on iconName
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
                    <circle cx="12" cy="12" r="3" /><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" /><path d="M12 7.5V9" /><path d="M7.5 12H9" /><path d="M16.5 12H15" /><path d="M12 16.5V15" />
                </svg>
            );
        default:
            return null;
    }
};

const DesignFlow: React.FC<DesignFlowProps> = ({ onComplete }) => {
    // Gatekeeper state: User must fill info to unlock the app
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

    // Core generation logic
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

    // Render sections
    const renderLoading = () => (
        <div className="py-20 text-center animate-pulse">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 mx-auto">
                <SparklesIcon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 font-display mb-2">AI đang phân tích & thiết kế...</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">Hệ thống đang xử lý dữ liệu không gian để tạo ra 3 phương án tối ưu nhất.</p>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 opacity-50">
                {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-4/3 bg-gray-200 rounded-2xl"></div>
                ))}
            </div>
        </div>
    );

    const renderResults = () => (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-8 text-center">
                <span className="text-primary">3 Phương án</span> dành cho bạn
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {generatedImages.map((imgUrl, idx) => (
                    <div key={idx} className="flex flex-col group">
                        <div
                            className="aspect-4/3 bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-md border border-gray-100 relative cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1"
                            onClick={() => enterEditMode(idx)}
                        >
                            <img src={imgUrl} alt={`Plan ${idx + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <button className="bg-white text-gray-900 px-5 py-2.5 rounded-full font-bold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                    <EditIcon size={16} /> Chọn & Chỉnh sửa
                                </button>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg text-gray-900 font-display">Phương án {idx + 1}</h3>
                            <p className="text-sm text-gray-500 mb-3">{selectedStyles.join(', ')}</p>
                            <a
                                href="https://zalo.me/g/yooqhx505"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover border border-primary/20 hover:border-primary/50 px-3 py-1.5 rounded-full transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                </svg>
                                Tư vấn KTS về mẫu này
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center border-t border-gray-100 pt-8">
                <p className="text-gray-500 mb-4">Chưa ưng ý? Hãy thử thay đổi phong cách ở trên và tạo lại.</p>
            </div>
        </div>
    );

    const renderEditor = () => {
        if (selectedImageIndex === null) return null;
        return (
            <div className="max-w-6xl mx-auto py-12 px-4" ref={editAreaRef}>
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-100 p-4 flex items-center justify-between bg-gray-50/50">
                        <h3 className="font-bold text-lg text-gray-900 font-display flex items-center gap-2">
                            <EditIcon size={18} />
                            Chỉnh sửa Phương án {selectedImageIndex + 1}
                        </h3>
                        <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-900">
                            <XIcon size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        {/* Image Stage */}
                        <div className="flex-1 bg-gray-100 relative min-h-[400px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
                            <img
                                src={generatedImages[selectedImageIndex]}
                                alt="Editing"
                                className="w-full h-full object-contain absolute inset-0 transition-opacity duration-300"
                                style={{ opacity: isProcessingEdit ? 0.5 : 1 }}
                            />
                            {isProcessingEdit && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-[2px]">
                                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <div className="bg-white/90 px-4 py-2 rounded-full font-bold text-primary shadow-lg animate-pulse">
                                        AI đang chỉnh sửa...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="w-full lg:w-96 p-8 bg-white border-l border-gray-100 flex flex-col">
                            <div className="flex-1 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Yêu cầu chỉnh sửa AI</label>
                                    <p className="text-xs text-gray-500 mb-3">Mô tả chi tiết để AI tối ưu lại không gian.</p>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Ví dụ: Đổi màu sofa sang màu kem, thêm thảm trải sàn, thay đèn trần..."
                                        className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-sm bg-gray-50 disabled:bg-gray-100"
                                        disabled={isProcessingEdit}
                                    ></textarea>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {['Tông màu sáng hơn', 'Thêm cây xanh', 'Sàn gỗ sồi', 'Đèn vàng ấm'].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPrompt(p)}
                                            disabled={isProcessingEdit}
                                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleEdit}
                                    disabled={!prompt.trim() || isProcessingEdit}
                                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {isProcessingEdit ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <WandIcon size={18} />
                                    )}
                                    {isProcessingEdit ? 'Đang thực hiện...' : 'AI Chỉnh sửa'}
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 text-center">
                                    <h4 className="font-bold text-primary mb-2">Đã ưng ý với thiết kế này?</h4>
                                    <button
                                        onClick={handleFinalSubmit}
                                        className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 mt-3"
                                    >
                                        Nhận hồ sơ thiết kế
                                        <ArrowRightIcon size={18} />
                                    </button>

                                    <div className="mt-4 pt-4 border-t border-primary/10">
                                        <p className="text-xs text-gray-500 mb-2">Cần tư vấn thêm về thi công & vật liệu?</p>
                                        <a
                                            href="https://zalo.me/g/yooqhx505"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:underline"
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
        <section className="bg-brand-gray-light min-h-screen pt-4 pb-20 relative">

            {/* HERO */}
            <div className="text-center py-10 md:py-16 max-w-4xl mx-auto px-4">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                    Ứng dụng công nghệ AI vào thiết kế kiến trúc nội thất
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6 font-display">
                    Thiết kế nội thất bằng AI <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-brand-blue">
                        Chuẩn phong cách Việt
                    </span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 font-light">
                    Tải ảnh phòng hiện tại, chọn phong cách và để AI kiến tạo 3 phương án thiết kế thông minh cho ngôi nhà của bạn.
                </p>
            </div>

            {/* TOOL INTERFACE */}
            <div className="container mx-auto px-4 mb-12">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-primary/5 border border-gray-200 overflow-hidden flex flex-col lg:flex-row">

                    {/* Left Column: Image Upload */}
                    <div className="w-full lg:w-7/12 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-brand-gray-light">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 font-display flex items-center gap-2">
                            1. Ảnh hiện trạng
                        </h3>

                        <label className={`
              flex flex-col items-center justify-center w-full aspect-video md:aspect-4/3 lg:h-[500px] 
              border-2 border-dashed rounded-2xl cursor-pointer transition-all relative group overflow-hidden bg-white
              ${image ? 'border-primary ring-4 ring-primary/10' : 'border-gray-300 hover:border-primary/50 hover:bg-primary/5'}
            `}>
                            {image ? (
                                <>
                                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button onClick={(e) => { e.preventDefault(); }} className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium shadow-lg hover:bg-gray-100">Thay ảnh</button>
                                        <button onClick={removeImage} className="p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"><TrashIcon /></button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-6 text-center">
                                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                        <UploadIcon />
                                    </div>
                                    <p className="text-lg text-gray-900 font-bold mb-2">Nhấn để tải ảnh lên</p>
                                    <p className="text-sm text-gray-500 max-w-xs">Hỗ trợ ảnh JPG, PNG. Chụp rõ góc phòng để AI nhận diện tốt nhất.</p>
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>

                    {/* Right Column: Controls */}
                    <div className="w-full lg:w-5/12 p-6 md:p-10 bg-white flex flex-col h-full">

                        {/* Styles */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-900 font-display">2. Chọn phong cách</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${selectedStyles.length > 0 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    {selectedStyles.length}/3
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {STYLES.map((style) => (
                                    <div
                                        key={style.id}
                                        onClick={() => toggleStyle(style.id)}
                                        className={`
                      cursor-pointer rounded-xl p-3 border transition-all duration-200 flex flex-col gap-2 relative group
                      ${selectedStyles.includes(style.id)
                                                ? 'border-primary bg-primary/5 shadow-sm'
                                                : 'border-gray-100 bg-white hover:border-primary/30 hover:bg-gray-50'
                                            }
                    `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className={`${selectedStyles.includes(style.id) ? 'text-primary' : 'text-gray-400 group-hover:text-primary/70'}`}>
                                                {getStyleIcon(style.iconName)}
                                            </div>
                                            {selectedStyles.includes(style.id) && <CheckCircleIcon size={18} className="text-brand-blue fill-white" />}
                                        </div>
                                        <div className={`font-semibold text-sm ${selectedStyles.includes(style.id) ? 'text-primary' : 'text-gray-900'}`}>{style.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">3. Ngân sách</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {BUDGETS.map((budget) => (
                                    <div
                                        key={budget}
                                        onClick={() => setSelectedBudget(budget)}
                                        className={`
                      px-3 py-3 rounded-lg border cursor-pointer font-medium text-sm text-center transition-all
                      ${selectedBudget === budget
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                                            }
                    `}
                                    >
                                        {budget}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-auto pt-6 border-t border-gray-100">
                            <button
                                onClick={handleGenerateClick}
                                disabled={!image || selectedStyles.length === 0 || !selectedBudget || isGenerating}
                                className={`
                  w-full py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2
                  ${(!image || selectedStyles.length === 0 || !selectedBudget || isGenerating)
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-primary text-white hover:bg-primary-hover hover:scale-[1.02]'
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
                                        <SparklesIcon size={20} />
                                        Thiết kế ngay với AI
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* DYNAMIC RESULTS AREA */}
            <div ref={resultsRef} className="scroll-mt-24">
                {isGenerating && renderLoading()}
                {!isGenerating && isEditing && renderEditor()}
                {!isGenerating && !isEditing && hasResults && renderResults()}
            </div>

            {/* FOOTER INFO */}
            <div className="container px-4 mx-auto pb-12 pt-12 border-t border-gray-200 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 font-display">Giữ nguyên cấu trúc</h3>
                        <p className="text-gray-500 text-sm">AI tự động nhận diện sàn, trần, tường để giữ lại layout thực tế của căn nhà.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                        <div className="h-12 w-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-4">
                            <CheckCircleIcon size={24} />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 font-display">Dự toán thông minh</h3>
                        <p className="text-gray-500 text-sm">Đề xuất vật liệu và đồ nội thất tối ưu với ngân sách bạn đã chọn.</p>
                    </div>
                    <a
                        href="https://zalo.me/g/yooqhx505"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary transition-all group"
                    >
                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 font-display">Kết nối chuyên gia</h3>
                        <p className="text-gray-500 text-sm mb-3">Nhận tư vấn chi tiết từ KTS thật dựa trên ý tưởng AI đã tạo ra.</p>
                        <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:underline">
                            Tư vấn miễn phí qua Zalo
                            <ArrowRightIcon size={14} />
                        </span>
                    </a>
                </div>

                {/* Zalo Community CTA */}
                <div className="bg-linear-to-r from-primary to-primary-hover rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl shadow-primary/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold font-display">Cộng đồng Bản đồ xây nhà</h3>
                        </div>
                        <p className="text-green-100 text-lg max-w-xl font-light">
                            Tham gia nhóm Zalo để được Kiến trúc sư tư vấn miễn phí, chia sẻ kinh nghiệm xây nhà và nhận ưu đãi độc quyền.
                        </p>
                    </div>

                    <a
                        href="https://zalo.me/g/yooqhx505"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 bg-white text-primary hover:bg-green-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-3 whitespace-nowrap group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                        Tham gia Zalo ngay
                    </a>
                </div>
            </div>

            {/* REGISTRATION MODAL */}
            {showRegisterModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <button
                            onClick={() => setShowRegisterModal(false)}
                            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                        >
                            <XIcon size={20} />
                        </button>

                        <div className="bg-primary h-2 w-full"></div>
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
