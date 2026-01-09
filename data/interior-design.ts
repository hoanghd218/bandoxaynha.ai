// Types and constants for interior design feature

export type DesignStyle =
    | 'Hiện đại'
    | 'Tối giản'
    | 'Japandi'
    | 'Scandinavian'
    | 'Luxury'
    | 'Indochine';

export type BudgetRange =
    | 'Dưới 300 triệu'
    | '300 – 600 triệu'
    | '600 triệu – 1 tỷ'
    | 'Trên 1 tỷ';

export interface DesignRequest {
    originalImage: string; // Base64
    styles: DesignStyle[];
    budget: BudgetRange;
}

export interface GeneratedDesign {
    id: string;
    imageUrl: string; // Base64 or URL
    name: string;
    description: string;
}

export interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    designRequest: DesignRequest;
    selectedDesignId?: string;
    createdAt: number;
}

export enum FlowStep {
    INPUT = 0, // Combined Upload & Config
    GENERATING = 1,
    RESULTS = 2,
    EDITING = 3,
    LEAD_FORM = 4,
    SUCCESS = 5,
}

// Style options with icons and descriptions
export interface StyleOption {
    id: DesignStyle;
    label: string;
    iconName: string;
    description: string;
}

export const STYLES: StyleOption[] = [
    {
        id: 'Hiện đại',
        label: 'Hiện đại',
        iconName: 'LayoutDashboard',
        description: 'Đường nét sắc sảo, bảng màu đơn giản và sử dụng các vật liệu hiện đại.'
    },
    {
        id: 'Tối giản',
        label: 'Tối giản',
        iconName: 'Square',
        description: 'Ít hơn là nhiều. Tập trung vào không gian trống và ánh sáng.'
    },
    {
        id: 'Japandi',
        label: 'Japandi',
        iconName: 'Leaf',
        description: 'Sự kết hợp tinh tế giữa phong cách Nhật Bản và Scandinavian.'
    },
    {
        id: 'Scandinavian',
        label: 'Bắc Âu',
        iconName: 'Snowflake',
        description: 'Ấm cúng, thoải mái với vật liệu gỗ và tông màu trắng sáng.'
    },
    {
        id: 'Luxury',
        label: 'Sang trọng',
        iconName: 'Gem',
        description: 'Vật liệu cao cấp, chi tiết tinh xảo và vẻ đẹp lộng lẫy.'
    },
    {
        id: 'Indochine',
        label: 'Đông Dương',
        iconName: 'Flower',
        description: 'Nét hoài cổ Á Đông kết hợp với sự lãng mạn kiến trúc Pháp.'
    },
];

export const BUDGETS: BudgetRange[] = [
    'Dưới 300 triệu',
    '300 – 600 triệu',
    '600 triệu – 1 tỷ',
    'Trên 1 tỷ',
];
