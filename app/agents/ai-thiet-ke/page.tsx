import Link from "next/link";
import Image from "next/image";

export default function AIThietKePage() {
    return (
        <div className="min-h-screen flex flex-col bg-brand-gray-light">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-accent-border shadow-sm sticky top-0 z-10">
                <Link href="/agents" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="relative w-8 h-8">
                        <Image
                            src="/logo.png"
                            alt="Bản Đồ Xây Nhà AI"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-xl font-bold text-brand-blue tracking-tight">AI Thiết Kế</h1>
                </Link>
                <Link
                    href="/agents"
                    className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors"
                >
                    ← Quay lại
                </Link>
            </header>

            {/* Iframe Content */}
            <main className="flex-1 w-full">
                <iframe
                    src="https://app.hoangaixaydung.academy/"
                    className="w-full h-screen border-0"
                    title="AI Thiết Kế - Hoang AI Xây Dựng"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </main>
        </div>
    );
}
