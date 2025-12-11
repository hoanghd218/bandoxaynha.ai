import Link from "next/link";
import Image from "next/image";

export default function AIMauNhaPage() {
    return (
        <div className="min-h-screen flex flex-col bg-brand-gray-light">
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-accent-border shadow-sm sticky top-0 z-10">
                <Link href="/agents" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="relative w-8 h-8">
                        <Image src="/logo.png" alt="Bản Đồ Xây Nhà AI" fill className="object-contain" />
                    </div>
                    <h1 className="text-xl font-bold text-brand-blue tracking-tight">AI Mẫu Nhà</h1>
                </Link>
                <Link href="/agents" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors">
                    ← Quay lại
                </Link>
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto p-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-blue mb-4">AI Mẫu Nhà</h2>
                    <p className="text-gray-600 mb-6">
                        Công cụ AI tạo ý tưởng thiết kế, gợi ý mẫu nhà phù hợp với diện tích và sở thích.
                    </p>
                    <div className="text-center py-12 text-gray-400">
                        <p>Tính năng đang được phát triển...</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
