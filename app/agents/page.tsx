import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

const agents = [
    {
        title: "AI Hợp Đồng",
        description: "Soạn thảo và rà soát hợp đồng xây dựng chuyên nghiệp, đảm bảo pháp lý.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        gradient: "from-blue-500 to-cyan-500",
        href: "/agents/ai-hop-dong",
    },
    {
        title: "AI Chi Phí",
        description: "Dự toán chi phí xây dựng chi tiết, tối ưu ngân sách và giảm thiểu phát sinh.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        gradient: "from-green-500 to-emerald-500",
        href: "/agents/ai-chi-phi",
    },
    {
        title: "AI Mẫu Nhà",
        description: "Tạo ý tưởng thiết kế, gợi ý mẫu nhà phù hợp với diện tích và sở thích.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        gradient: "from-purple-500 to-pink-500",
        href: "/agents/ai-mau-nha",
    },
    {
        title: "AI Thiết Kế",
        description: "Tạo bản vẽ thiết kế 2D/3D, render hình ảnh chân thực cho ngôi nhà mơ ước.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
        gradient: "from-rose-500 to-red-500",
        href: "/agents/ai-thiet-ke",
    },
    {
        title: "AI Phong Thuỷ",
        description: "Tư vấn phong thuỷ nhà ở, hướng hợp tuổi và bố trí nội thất hài hoà.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        ),
        gradient: "from-amber-500 to-orange-500",
        href: "/agents/ai-phong-thuy",
    },
    {
        title: "AI Vật Liệu",
        description: "Đề xuất vật liệu xây dựng chất lượng, giá tốt và phù hợp với công trình.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        gradient: "from-teal-500 to-cyan-500",
        href: "/agents/ai-vat-lieu",
    },
    {
        title: "Thước Lỗ Ban",
        description: "Công cụ đo lường phong thuỷ theo thước Lỗ Ban, giúp chọn kích thước chuẩn phong thuỷ.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
        ),
        gradient: "from-indigo-500 to-purple-500",
        href: "/agents/thuoc-lo-ban",
    },
    {
        title: "Đơn Giá M2",
        description: "Tra cứu đơn giá xây dựng theo m2, cập nhật mới nhất cho từng hạng mục công trình.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        gradient: "from-emerald-500 to-teal-500",
        href: "/agents/don-gia-m2",
    },
    {
        title: "Chọn Ngày Đẹp",
        description: "Tư vấn chọn ngày giờ tốt để khởi công, động thổ theo phong thuỷ và âm lịch.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        gradient: "from-yellow-500 to-orange-500",
        href: "/agents/chon-ngay-dep",
    },
];

export default function AgentsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-brand-gray-light">
            {/* Header */}
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
                <div className="text-center mb-12 mt-8 animate-fadeInUp">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-2 text-sm text-primary font-semibold mb-6 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Đội ngũ AI chuyên nghiệp
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-display mb-4 tracking-tight">
                        Đội Ngũ Trợ Lý AI Chuyên Nghiệp
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Khám phá các giải pháp AI chuyên sâu giúp bạn tối ưu hóa mọi công đoạn trong quá trình xây dựng tổ ấm.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1.5 hover:border-primary/40 transition-all duration-300 relative overflow-hidden cursor-pointer animate-slide-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${agent.gradient} opacity-10 rounded-bl-full transform group-hover:scale-125 group-hover:opacity-15 transition-all duration-500`}></div>

                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-110 transition-all duration-300`}>
                                {agent.icon}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-200">
                                {agent.title}
                            </h3>

                            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                                {agent.description}
                            </p>

                            {agent.href ? (
                                <Link href={agent.href} className="inline-flex items-center font-semibold text-sm text-brand-blue group-hover:text-primary transition-colors duration-200 group-hover:translate-x-1 cursor-pointer">
                                    Khám phá ngay
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            ) : (
                                <button className="flex items-center font-semibold text-sm text-brand-blue group-hover:text-primary transition-colors">
                                    Khám phá ngay
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
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
