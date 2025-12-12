export interface Project {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Contractor {
    id: string;
    name: string;
    avatar: string;
    location: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    services: string[]; // e.g., "Designing", "Construction", "Renovation"
    experienceYears: number;
    companySize: number; // number of employees
    description: string;
    phone: string;
    email: string;
    website?: string;
    rating: number;
    recommended?: boolean; // Recommended by Bản đồ xây nhà
    projects: Project[];
    reviews: Review[];
}

export const contractors: Contractor[] = [
    {
        id: "1",
        name: "BOXHOME",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        location: "Hà Nội",
        coordinates: { lat: 21.0295, lng: 105.8535 }, // Near Hồ Gươm
        services: ["Thiết kế", "Thi công trọn gói"],
        experienceYears: 10,
        companySize: 50,
        description: "Chuyên thiết kế và thi công nhà phố, biệt thự chuyên nghiệp tại Hà Nội.",
        phone: "0901234567",
        email: "contact@kientao.vn",
        rating: 5.0,
        recommended: true,
        projects: [
            {
                id: "p1",
                name: "Biệt thự Ecopark",
                description: "Thiết kế và thi công biệt thự vườn Ecopark",
                imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
            },
            {
                id: "p2",
                name: "Nhà phố Cầu Giấy",
                description: "Nhà phố 5 tầng phong cách hiện đại",
                imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            },
        ],
        reviews: [
            {
                id: "r1",
                author: "Nguyễn Văn A",
                rating: 5,
                comment: "Làm việc chuyên nghiệp, đúng tiến độ.",
                date: "2023-10-15",
            },
            {
                id: "r2",
                author: "Trần Thị B",
                rating: 4.5,
                comment: "Tư vấn nhiệt tình, giá cả hợp lý.",
                date: "2023-09-20",
            },
        ],
    },
    {
        id: "2",
        name: "Kisato",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        location: "TP. Hồ Chí Minh",
        coordinates: { lat: 21.0275, lng: 105.8510 }, // Near Hồ Gươm
        services: ["Thiết kế nội thất", "Cải tạo"],
        experienceYears: 5,
        companySize: 15,
        description: "Đội ngũ kiến trúc sư trẻ, sáng tạo, chuyên nội thất hiện đại.",
        phone: "0987654321",
        email: "info@suviet.com",
        rating: 4.5,
        projects: [
            {
                id: "p3",
                name: "Căn hộ Vinhomes Grand Park",
                description: "Thiết kế nội thất căn hộ 2PN",
                imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
        ],
        reviews: [
            {
                id: "r3",
                author: "Lê Văn C",
                rating: 5,
                comment: "Thiết kế rất đẹp, tôi rất ưng ý.",
                date: "2023-11-05",
            },
        ],
    },
    {
        id: "3",
        name: "Ecogreen",
        avatar: "https://randomuser.me/api/portraits/men/85.jpg",
        location: "Đà Nẵng",
        coordinates: { lat: 21.0300, lng: 105.8515 }, // Near Hồ Gươm
        services: ["Xây thô", "Hoàn thiện"],
        experienceYears: 15,
        companySize: 100,
        description: "Nhà thầu uy tín hàng đầu tại Đà Nẵng, chuyên các công trình dân dụng.",
        phone: "0912345678",
        email: "lienhe@binhan.dn.vn",
        rating: 4.2,
        projects: [
            {
                id: "p4",
                name: "Khách sạn ven biển",
                description: "Thi công phần thô khách sạn 7 tầng",
                imageUrl: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=2664&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
        ],
        reviews: [
            {
                id: "r4",
                author: "Phạm Văn D",
                rating: 4,
                comment: "Chất lượng tốt nhưng tiến độ hơi chậm một chút.",
                date: "2023-08-12",
            },
        ],
    },
    {
        id: "4",
        name: "Hava",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        location: "Hà Nội",
        coordinates: { lat: 21.0270, lng: 105.8530 }, // Near Hồ Gươm
        services: ["Thiết kế nội thất", "Thi công nội thất"],
        experienceYears: 8,
        companySize: 30,
        description: "Biến ngôi nhà của bạn thành tác phẩm nghệ thuật.",
        phone: "0369852147",
        email: "sale@noithatxinh.com",
        rating: 4.7,
        projects: [],
        reviews: [],
    },
    {
        id: "5",
        name: "Hoang Constructor",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        location: "TP. Hồ Chí Minh",
        coordinates: { lat: 21.0290, lng: 105.8545 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Xây thô", "Cơ điện"],
        experienceYears: 20,
        companySize: 500,
        description: "Tập đoàn xây dựng hàng đầu Việt Nam.",
        phone: "02838383838",
        email: "info@delta.com",
        rating: 4.9,
        projects: [],
        reviews: [],
    },
    {
        id: "6",
        name: "Coteccons",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        location: "Hà Nội",
        coordinates: { lat: 21.0310, lng: 105.8525 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Xây dựng dân dụng", "Công trình công nghiệp"],
        experienceYears: 28,
        companySize: 2000,
        description: "Công ty Cổ phần Xây dựng Coteccons - Top 1 nhà thầu xây dựng tại Việt Nam.",
        phone: "0283822-2222",
        email: "contact@coteccons.vn",
        rating: 4.9,
        recommended: true,
        projects: [],
        reviews: [],
    },
    {
        id: "7",
        name: "Hòa Bình",
        avatar: "https://randomuser.me/api/portraits/women/55.jpg",
        location: "Hà Nội",
        coordinates: { lat: 21.0265, lng: 105.8515 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Thiết kế kiến trúc", "Quản lý dự án"],
        experienceYears: 25,
        companySize: 1800,
        description: "Tập đoàn Hòa Bình - Đơn vị thi công uy tín với nhiều công trình cao tầng.",
        phone: "0243974-7979",
        email: "info@hoaphat.com.vn",
        rating: 4.8,
        recommended: true,
        projects: [],
        reviews: [],
    },
    {
        id: "8",
        name: "Ricons",
        avatar: "https://randomuser.me/api/portraits/men/60.jpg",
        location: "TP. Hồ Chí Minh",
        coordinates: { lat: 21.0320, lng: 105.8540 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Xây dựng hạ tầng", "Bất động sản"],
        experienceYears: 22,
        companySize: 1500,
        description: "Công ty Đầu tư Xây dựng Ricons - Chuyên các dự án quy mô lớn.",
        phone: "0283822-3333",
        email: "info@ricons.com.vn",
        rating: 4.7,
        projects: [],
        reviews: [],
    },
    {
        id: "9",
        name: "Vinaconex",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg",
        location: "Hà Nội",
        coordinates: { lat: 21.0260, lng: 105.8500 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Giao thông", "Cầu đường"],
        experienceYears: 35,
        companySize: 3000,
        description: "Tổng Công ty Cổ phần Xuất nhập khẩu và Xây dựng Việt Nam.",
        phone: "0243976-1616",
        email: "contact@vinaconex.com.vn",
        rating: 4.6,
        projects: [],
        reviews: [],
    },
    {
        id: "10",
        name: "AA Corporation",
        avatar: "https://randomuser.me/api/portraits/women/40.jpg",
        location: "Hà Nội",
        coordinates: { lat: 21.0305, lng: 105.8505 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Thiết kế nội thất", "Bất động sản"],
        experienceYears: 18,
        companySize: 800,
        description: "AA Corporation - Chuyên phát triển và thi công các dự án nhà ở cao cấp.",
        phone: "0243974-8888",
        email: "info@aacorporation.com",
        rating: 4.7,
        projects: [],
        reviews: [],
    },
    {
        id: "11",
        name: "Newtecons",
        avatar: "https://randomuser.me/api/portraits/men/50.jpg",
        location: "TP. Hồ Chí Minh",
        coordinates: { lat: 21.0280, lng: 105.8550 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Xây dựng công nghiệp", "M&E"],
        experienceYears: 24,
        companySize: 1200,
        description: "Tổng Công ty Xây dựng Công nghiệp - TNHH MTV.",
        phone: "0283822-4444",
        email: "contact@newtecons.vn",
        rating: 4.8,
        projects: [],
        reviews: [],
    },
    {
        id: "12",
        name: "Phúc Khang",
        avatar: "https://randomuser.me/api/portraits/women/48.jpg",
        location: "TP. Hồ Chí Minh",
        coordinates: { lat: 21.0315, lng: 105.8550 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Thiết kế kiến trúc", "Xây dựng dân dụng"],
        experienceYears: 19,
        companySize: 900,
        description: "Tập đoàn Phúc Khang - Phát triển các dự án bất động sản cao cấp.",
        phone: "0283822-5555",
        email: "info@phuckhang.vn",
        rating: 4.6,
        projects: [],
        reviews: [],
    },
    {
        id: "13",
        name: "Hưng Thịnh",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        location: "TP. Hồ Chí Minh",
        coordinates: { lat: 21.0255, lng: 105.8525 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Đầu tư BĐS", "Phát triển dự án"],
        experienceYears: 21,
        companySize: 1600,
        description: "Tập đoàn Hưng Thịnh - Chủ đầu tư và thi công uy tín hàng đầu.",
        phone: "0283822-6666",
        email: "contact@hungthinhcorp.com.vn",
        rating: 4.9,
        recommended: true,
        projects: [],
        reviews: [],
    },
    {
        id: "14",
        name: "Unicons",
        avatar: "https://randomuser.me/api/portraits/women/52.jpg",
        location: "Hà Nội",
        coordinates: { lat: 21.0325, lng: 105.8520 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Xây dựng hạ tầng", "Công trình công nghiệp"],
        experienceYears: 26,
        companySize: 1400,
        description: "Tổng Công ty Đầu tư và Xây dựng số 10 - CTCP.",
        phone: "0243974-1010",
        email: "info@unicons10.com.vn",
        rating: 4.7,
        projects: [],
        reviews: [],
    },
    {
        id: "15",
        name: "Song Đà",
        avatar: "https://randomuser.me/api/portraits/men/58.jpg",
        location: "Hà Nội",
        coordinates: { lat: 21.0250, lng: 105.8540 }, // Near Hồ Gươm
        services: ["Thi công trọn gói", "Thủy điện", "Giao thông"],
        experienceYears: 30,
        companySize: 2500,
        description: "Tổng Công ty Sông Đà - Đơn vị thi công các công trình lớn quốc gia.",
        phone: "0243974-2020",
        email: "contact@songda.com.vn",
        rating: 4.8,
        projects: [],
        reviews: [],
    },
];
