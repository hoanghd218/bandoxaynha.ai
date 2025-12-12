import Image from "next/image";
import { Contractor } from "@/data/contractors";

interface ContractorCardProps {
    contractor: Contractor;
    onCardClick?: (contractorId: string) => void;
}

export default function ContractorCard({ contractor, onCardClick }: ContractorCardProps) {
    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-brand-blue/30 transition-all cursor-pointer h-full flex flex-col"
            onClick={() => onCardClick?.(contractor.id)}
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                    <Image
                        src={contractor.avatar}
                        alt={contractor.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
                        {contractor.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-gray-400"
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

                    {/* Recommended Badge */}
                    {contractor.recommended && (
                        <div className="mt-2 inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Recommended by Bản đồ xây nhà
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2 mb-4 flex-1">
                <div className="text-sm">
                    <span className="font-medium text-gray-700">Dịch vụ: </span>
                    <span className="text-gray-600">
                        {contractor.services.slice(0, 3).join(", ")}
                        {contractor.services.length > 3 && "..."}
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <div>
                        <span className="font-medium text-gray-700">Kinh nghiệm: </span>
                        <span className="text-gray-600">{contractor.experienceYears} năm</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Quy mô: </span>
                        <span className="text-gray-600">{contractor.companySize} NS</span>
                    </div>
                </div>
            </div>

            {/* Featured Projects */}
            {contractor.projects && contractor.projects.length > 0 && (
                <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                        {contractor.projects.slice(0, 2).map((project) => (
                            <div key={project.id} className="relative h-24 rounded-lg overflow-hidden border border-gray-100">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.name}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                    {contractor.projects.length > 2 && (
                        <div className="text-xs text-gray-400 mt-1 text-right">
                            +{contractor.projects.length - 2} dự án khác
                        </div>
                    )}
                </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-yellow-500 font-semibold text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {contractor.rating}
                    <span className="text-gray-400 font-normal ml-1">({contractor.reviews.length})</span>
                </div>
                <span className="text-brand-blue text-sm font-semibold hover:underline">
                    Xem chi tiết
                </span>
            </div>
        </div>
    );
}
