"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Contractor } from "@/data/contractors";

interface ContractorModalProps {
    contractor: Contractor | null;
    onClose: () => void;
}

export default function ContractorModal({ contractor, onClose }: ContractorModalProps) {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");
    const [submittedReview, setSubmittedReview] = useState(false);

    if (!contractor) return null;

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would normally send to backend
        // For now, just show success message
        setSubmittedReview(true);
        setShowReviewForm(false);

        // Reset form
        setTimeout(() => {
            setAuthor("");
            setComment("");
            setRating(5);
            setSubmittedReview(false);
        }, 3000);
    };

    return (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 p-6 rounded-t-2xl z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-lg">
                                <Image
                                    src={contractor.avatar}
                                    alt={contractor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 font-display">{contractor.name}</h2>
                                <div className="flex items-center text-slate-500 mt-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    {contractor.location}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full p-2 transition-all duration-200 cursor-pointer hover:rotate-90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mt-4">
                        <div className="flex items-center text-yellow-500 font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-slate-900 text-lg ml-2">{contractor.rating}</span>
                            <span className="text-slate-400 font-normal ml-1 text-sm">({contractor.reviews.length} đánh giá)</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Giới thiệu</h3>
                        <p className="text-slate-600">{contractor.description}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <div className="text-sm text-slate-500 mb-1">Kinh nghiệm</div>
                            <div className="text-xl font-bold text-slate-800">{contractor.experienceYears} năm</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <div className="text-sm text-slate-500 mb-1">Quy mô</div>
                            <div className="text-xl font-bold text-slate-800">{contractor.companySize} nhân sự</div>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Dịch vụ</h3>
                        <div className="flex flex-wrap gap-2">
                            {contractor.services.map((service, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Thông tin liên hệ</h3>
                        <div className="space-y-2">
                            <div className="flex items-center text-slate-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 011.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <a href={`tel:${contractor.phone}`} className="hover:text-brand-blue">
                                    {contractor.phone}
                                </a>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${contractor.email}`} className="hover:text-brand-blue">
                                    {contractor.email}
                                </a>
                            </div>
                            {contractor.website && (
                                <div className="flex items-center text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9 9a9 9 0 01-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9m0 18c-1.657 0-3-4.03-3-9m-9 9a9 9 0 01-9-9m9 9c1.657 0-3-4.03-3-9" />
                                    </svg>
                                    <a href={contractor.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue">
                                        {contractor.website}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Projects */}
                    {contractor.projects && contractor.projects.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Dự án tiêu biểu</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {contractor.projects.map((project) => (
                                    <div key={project.id} className="border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="relative h-40">
                                            <Image
                                                src={project.imageUrl}
                                                alt={project.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-semibold text-slate-800">{project.name}</h4>
                                            <p className="text-sm text-slate-500 mt-1">{project.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews Section */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-slate-800">Đánh giá từ khách hàng</h3>
                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="text-sm font-semibold text-brand-blue hover:underline"
                            >
                                {showReviewForm ? "Ẩn form" : "Viết đánh giá"}
                            </button>
                        </div>

                        {/* Success Message */}
                        {submittedReview && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-green-800 text-sm font-medium">Cảm ơn bạn đã gửi đánh giá!</span>
                            </div>
                        )}

                        {/* Review Form */}
                        {showReviewForm && (
                            <form onSubmit={handleSubmitReview} className="mb-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                                {/* Star rating input */}
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transition-transform hover:scale-125 cursor-pointer"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-8 w-8 
                                                    ${star <= (hoveredRating || rating)
                                                            ? 'text-yellow-500 fill-current'
                                                            : 'text-slate-300 fill-none'
                                                        }`}
                                                viewBox="0 0 20 20"
                                                stroke={star <= (hoveredRating || rating) ? "currentColor" : "none"}
                                                strokeWidth="2"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                    <span className="ml-2 text-sm text-slate-600 self-center">
                                        {rating} sao
                                    </span>
                                </div>

                                {/* Author Name */}
                                <div>
                                    <label htmlFor="author" className="block text-sm font-semibold text-slate-900 mb-2">
                                        Tên của bạn
                                    </label>
                                    <input
                                        type="text"
                                        id="author"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all duration-200 bg-white cursor-pointer"
                                        placeholder="Nhập tên của bạn"
                                    />
                                </div>

                                {/* Comment */}
                                <div>
                                    <label htmlFor="comment" className="block text-sm font-semibold text-slate-900 mb-2">
                                        Nhận xét
                                    </label>
                                    <textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all duration-200 bg-white resize-none cursor-pointer"
                                        placeholder="Chia sẻ trải nghiệm của bạn với nhà thầu này..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-brand-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors"
                                    >
                                        Gửi đánh giá
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewForm(false)}
                                        className="px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Existing Reviews */}
                        {contractor.reviews && contractor.reviews.length > 0 && (
                            <div className="space-y-4">
                                {contractor.reviews.map((review) => (
                                    <div key={review.id} className="border border-slate-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-semibold text-slate-800">{review.author}</div>
                                            <div className="flex items-center text-yellow-500 text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                {review.rating}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm">{review.comment}</p>
                                        <div className="text-xs text-slate-400 mt-2">{new Date(review.date).toLocaleDateString('vi-VN')}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No reviews yet */}
                        {(!contractor.reviews || contractor.reviews.length === 0) && !showReviewForm && (
                            <p className="text-slate-500 text-sm text-center py-4">
                                Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 rounded-b-2xl">
                    <div className="flex gap-3">
                        <a
                            href={`tel:${contractor.phone}`}
                            className="flex-1 bg-brand-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors text-center"
                        >
                            Gọi điện
                        </a>
                        <a
                            href={`mailto:${contractor.email}`}
                            className="flex-1 bg-slate-100 text-slate-800 py-3 px-6 rounded-lg font-semibold hover:bg-slate-200 transition-colors text-center"
                        >
                            Gửi email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
