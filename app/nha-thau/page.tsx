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
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
            <Header />

            <main className="flex-1 w-full h-full flex flex-col pt-20">

                <div className="glass-strong mx-4 md:mx-6 lg:mx-8 mt-6 mb-6 rounded-2xl shadow-xl border border-slate-200 px-4 py-4 animate-fadeIn">
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative flex-1 min-w-[200px]">
                            <input
                                type="text"
                                placeholder="Tìm tên nhà thầu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary rounded-xl focus:outline-none bg-white/95 transition-all duration-200 cursor-pointer"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="px-4 py-2.5 text-sm border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary rounded-xl focus:outline-none bg-white/95 transition-all duration-200 hover:shadow-md cursor-pointer"
                        >
                            <option value="">Khu vực: Tất cả</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>

                        <select
                            value={serviceFilter}
                            onChange={(e) => setServiceFilter(e.target.value)}
                            className="px-4 py-2.5 text-sm border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary rounded-xl focus:outline-none bg-white/95 transition-all duration-200 hover:shadow-md cursor-pointer"
                        >
                            <option value="">Dịch vụ: Tất cả</option>
                            {allServices.map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>

                        <select
                            value={minExp}
                            onChange={(e) => setMinExp(e.target.value === "" ? "" : Number(e.target.value))}
                            className="px-4 py-2.5 text-sm border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary rounded-xl focus:outline-none bg-white/95 transition-all duration-200 hover:shadow-md cursor-pointer"
                        >
                            <option value="">Kinh nghiệm: Bất kỳ</option>
                            <option value="5">Trên 5 năm</option>
                            <option value="10">Trên 10 năm</option>
                            <option value="15">Trên 15 năm</option>
                        </select>

                        <select
                            value={minSize}
                            onChange={(e) => setMinSize(e.target.value === "" ? "" : Number(e.target.value))}
                            className="px-4 py-2.5 text-sm border-2 border-slate-300 hover:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:border-primary rounded-xl focus:outline-none bg-white/95 transition-all duration-200 hover:shadow-md cursor-pointer"
                        >
                            <option value="">Quy mô: Bất kỳ</option>
                            <option value="10">Trên 10 người</option>
                            <option value="50">Trên 50 người</option>
                            <option value="100">Trên 100 người</option>
                        </select>

                        <button
                            className="ml-auto text-sm text-primary font-semibold hover:text-primary-hover hover:bg-primary/10 border border-primary/20 hover:border-primary/40 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer active:scale-95"
                            onClick={() => {
                                setSearchTerm("");
                                setLocationFilter("");
                                setServiceFilter("");
                                setMinExp("");
                                setMinSize("");
                            }}
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-280px)] mx-4 md:mx-6 lg:mx-8 mb-6 rounded-3xl overflow-hidden shadow-xl border border-white/40">

                    <div className="hidden lg:block lg:w-2/3 h-full relative z-0">
                        <ContractorMap contractors={filteredContractors} selectedContractorId={selectedContractorId} />
                    </div>

                    <div className={`lg:w-1/3 overflow-y-auto glass-strong p-6 custom-scrollbar border-l border-slate-200 ${filteredContractors.length === 0 ? "w-full" : ""}`}>
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="font-bold text-xl text-slate-900 font-display flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover text-white font-bold text-lg shadow-lg shadow-primary/30">
                                    {filteredContractors.length}
                                </div>
                                Nhà thầu uy tín
                            </h2>
                            <div className="text-sm font-medium px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg">Sắp xếp: Đề xuất</div>
                        </div>

                        {filteredContractors.length > 0 ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                {filteredContractors.map((contractor) => (
                                    <ContractorCard
                                        key={contractor.id}
                                        contractor={contractor}
                                        onCardClick={handleContractorClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 animate-fadeIn">
                                <div className="text-slate-300 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-display">Không tìm thấy kết quả</h3>
                                <p className="text-slate-500">Vui lòng thử thay đổi bộ lọc tìm kiếm.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <ContractorModal contractor={selectedContractorForModal} onClose={closeModal} />
        </div>
    );
}
