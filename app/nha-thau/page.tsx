"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ContractorCard from "@/components/ContractorCard";
import ContractorMap from "@/components/ContractorMap";
import ContractorModal from "@/components/ContractorModal";
import { contractors, Contractor } from "@/data/contractors";

export default function ContractorListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");
    const [minExp, setMinExp] = useState<number | "">("");
    const [minSize, setMinSize] = useState<number | "">("");
    const [selectedContractorId, setSelectedContractorId] = useState<string | null>(null);
    const [selectedContractorForModal, setSelectedContractorForModal] = useState<Contractor | null>(null);

    // Get unique locations and services for filter dropdowns
    const locations = Array.from(new Set(contractors.map((c) => c.location)));
    const allServices = Array.from(
        new Set(contractors.flatMap((c) => c.services))
    );

    const filteredContractors = contractors.filter((contractor) => {
        const matchesName = contractor.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesLocation =
            locationFilter === "" || contractor.location === locationFilter;
        const matchesService =
            serviceFilter === "" || contractor.services.includes(serviceFilter);
        const matchesExp =
            minExp === "" || contractor.experienceYears >= Number(minExp);
        const matchesSize =
            minSize === "" || contractor.companySize >= Number(minSize);

        return (
            matchesName &&
            matchesLocation &&
            matchesService &&
            matchesExp &&
            matchesSize
        );
    });

    const handleContractorClick = (contractorId: string) => {
        setSelectedContractorId(contractorId);
        const contractor = contractors.find((c) => c.id === contractorId);
        if (contractor) {
            setSelectedContractorForModal(contractor);
        }
    };

    const closeModal = () => {
        setSelectedContractorForModal(null);
    };

    return (
        <div className="min-h-screen flex flex-col bg-brand-gray-light">
            <Header />

            <main className="flex-1 w-full h-full flex flex-col">

                {/* Filters Section - Toolbar Style */}
                <div className="bg-white px-4 py-3 border-b border-gray-200 shadow-sm z-10">
                    <div className="flex flex-wrap gap-2 items-center">
                        {/* Search Name - Compact */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm tên nhà thầu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-blue w-48"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2.5 top-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Location Filter */}
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white"
                        >
                            <option value="">Khu vực: Tất cả</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>

                        {/* Service Filter */}
                        <select
                            value={serviceFilter}
                            onChange={(e) => setServiceFilter(e.target.value)}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white"
                        >
                            <option value="">Dịch vụ: Tất cả</option>
                            {allServices.map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>

                        {/* Experience Filter */}
                        <select
                            value={minExp}
                            onChange={(e) => setMinExp(e.target.value === "" ? "" : Number(e.target.value))}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white"
                        >
                            <option value="">Kinh nghiệm: Bất kỳ</option>
                            <option value="5">Trên 5 năm</option>
                            <option value="10">Trên 10 năm</option>
                            <option value="15">Trên 15 năm</option>
                        </select>

                        {/* Size Filter */}
                        <select
                            value={minSize}
                            onChange={(e) => setMinSize(e.target.value === "" ? "" : Number(e.target.value))}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white"
                        >
                            <option value="">Quy mô: Bất kỳ</option>
                            <option value="10">Trên 10 người</option>
                            <option value="50">Trên 50 người</option>
                            <option value="100">Trên 100 người</option>
                        </select>

                        <button className="ml-auto text-sm text-brand-blue font-semibold hover:underline" onClick={() => {
                            setSearchTerm("");
                            setLocationFilter("");
                            setServiceFilter("");
                            setMinExp("");
                            setMinSize("");
                        }}>
                            Xóa bộ lọc
                        </button>
                    </div>
                </div>

                {/* Main Content Area: Split View (Zillow Style) */}
                <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-180px)] min-h-[600px] border-t border-gray-200">

                    {/* Left: Map (Sticky/Fixed) - Takes more space */}
                    <div className="hidden lg:block lg:w-2/3 h-full relative z-0">
                        <ContractorMap contractors={filteredContractors} selectedContractorId={selectedContractorId} />
                    </div>

                    {/* Right: List (Scrollable) - Takes less space */}
                    <div className={`lg:w-1/3 overflow-y-auto bg-white p-4 custom-scrollbar border-l border-gray-200 ${filteredContractors.length === 0 ? "w-full" : ""}`}>
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="font-bold text-lg text-gray-800">
                                {filteredContractors.length} Nhà thầu uy tín
                            </h2>
                            <div className="text-sm text-gray-500">Sắp xếp: Đề xuất</div>
                        </div>

                        {filteredContractors.length > 0 ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {filteredContractors.map((contractor) => (
                                    <ContractorCard
                                        key={contractor.id}
                                        contractor={contractor}
                                        onCardClick={handleContractorClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Không tìm thấy kết quả</h3>
                                <p className="text-gray-500">Vui lòng thử thay đổi bộ lọc tìm kiếm.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Remove footer from inside flex-col min-h-screen if we want the split view to take up remaining height, 
          or keep it if we want standard scrolling page. 
          Given the split view design, it's better to keep the footer but maybe outside the split view or allow window scroll.
          For this implementation, let's keep simple scroll but restrict map height.
      */}
            {/* <footer className="w-full bg-white border-t border-accent-border py-8 mt-12">...</footer> */}
            {/* Modal */}
            <ContractorModal contractor={selectedContractorForModal} onClose={closeModal} />
        </div>
    );
}
