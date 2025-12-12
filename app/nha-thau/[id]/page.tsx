import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { contractors, Contractor } from "@/data/contractors";
import { notFound } from "next/navigation";

// In Next.js 15, params is a Promise. 
// However, for compatibility with typical usage in 13/14, we can try to use it directly 
// or if it's 15, we await it.
// To be safe and since this is a server component, we can access params.

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ContractorDetailPage({ params }: PageProps) {
    const { id } = await params;
    const contractor = contractors.find((c) => c.id === id);

    if (!contractor) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-brand-gray-light">
            <Header />

            <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">

                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/nha-thau" className="hover:text-brand-blue">Danh sách nhà thầu</Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">{contractor.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar: Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-blue mb-4">
                                <Image
                                    src={contractor.avatar}
                                    alt={contractor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{contractor.name}</h1>
                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {contractor.location}
                            </div>

                            <div className="flex items-center justify-center gap-1 mb-6">
                                <span className="text-yellow-500 font-bold text-lg">{contractor.rating}</span>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(contractor.rating) ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm ml-1">({contractor.reviews.length} đánh giá)</span>
                            </div>

                            <div className="w-full flex gap-3">
                                <button className="flex-1 bg-brand-blue text-white py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-sm">
                                    Liên hệ
                                </button>
                                <button className="flex-1 bg-white border border-brand-blue text-brand-blue py-2.5 rounded-lg font-semibold hover:bg-brand-blue hover:text-white transition-colors">
                                    Nhắn tin
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">Thông tin chi tiết</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                    <span className="text-gray-500">Kinh nghiệm</span>
                                    <span className="font-medium text-gray-800">{contractor.experienceYears} năm</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                    <span className="text-gray-500">Quy mô</span>
                                    <span className="font-medium text-gray-800">{contractor.companySize} nhân sự</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                    <span className="text-gray-500">Dự án hoàn thành</span>
                                    <span className="font-medium text-gray-800">{contractor.projects.length}+ dự án</span>
                                </div>
                                <div className="flex flex-col gap-2 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                    <span className="text-gray-500">Dịch vụ cung cấp</span>
                                    <div className="flex flex-wrap gap-2">
                                        {contractor.services.map((s, i) => (
                                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: Description, Projects, Reviews */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-brand-blue text-xl mb-4 relative inline-block">
                                Giới thiệu
                                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-blue/20 rounded-full"></span>
                            </h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {contractor.description}
                            </p>
                        </div>

                        {/* Projects */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-brand-blue text-xl mb-6 relative inline-block">
                                Dự án tiêu biểu
                                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-blue/20 rounded-full"></span>
                            </h3>

                            {contractor.projects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {contractor.projects.map((project) => (
                                        <div key={project.id} className="group cursor-pointer">
                                            <div className="relative h-48 w-full rounded-lg overflow-hidden mb-3">
                                                <Image
                                                    src={project.imageUrl}
                                                    alt={project.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                            </div>
                                            <h4 className="font-bold text-gray-800 group-hover:text-brand-blue transition-colors">
                                                {project.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Đang cập nhật...</p>
                            )}
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-brand-blue text-xl mb-6 relative inline-block">
                                Đánh giá từ khách hàng
                                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-blue/20 rounded-full"></span>
                            </h3>

                            {contractor.reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {contractor.reviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                                                        {review.author.charAt(0)}
                                                    </div>
                                                    <span className="font-bold text-gray-800">{review.author}</span>
                                                </div>
                                                <span className="text-xs text-gray-400">{review.date}</span>
                                            </div>
                                            <div className="flex text-yellow-400 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(review.rating) ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-gray-600 text-sm">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
                            )}
                        </div>

                    </div>
                </div>
            </main>

            <footer className="w-full bg-white border-t border-accent-border py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
                    <p>© 2025 Bandoxaynha.ai. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
