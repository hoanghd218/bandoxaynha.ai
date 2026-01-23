// Feng Shui Types and Constants

export type Gender = 'Nam' | 'Nữ';

export type Direction = 
  | 'Đông' 
  | 'Đông Nam' 
  | 'Nam' 
  | 'Tây Nam' 
  | 'Tây' 
  | 'Tây Bắc' 
  | 'Bắc' 
  | 'Đông Bắc';

export type CungPhi = 
  | 'Càn' 
  | 'Khảm' 
  | 'Cấn' 
  | 'Chấn' 
  | 'Tốn' 
  | 'Ly' 
  | 'Khôn' 
  | 'Đoài';

export type Menh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface FengShuiInput {
  birthDate: string;
  gender: Gender;
  houseDirection: Direction;
}

export interface FengShuiAnalysis {
  summary: string;
  cungPhi: CungPhi;
  menh: Menh;
  recommendations: string[];
  materials: {
    colors: string[];
    floors: string[];
    walls: string[];
    decor: string[];
    light: string[];
  };
  layout: {
    kitchen: string;
    bedroom: string;
    mainDoor: string;
    avoid: string[];
  };
  favorableYears: Array<{
    year: number;
    rating: 'Rất tốt' | 'Tốt' | 'Trung bình' | 'Khá';
    reason: string;
  }>;
}

export interface UserInfo {
  name: string;
  phone: string;
  email: string;
}

// Direction Options with Colors
export const DIRECTIONS: Array<{
  label: Direction;
  angle: number;
  color: string;
}> = [
  { label: 'Đông', angle: 0, color: '#22C55E' },
  { label: 'Đông Nam', angle: 45, color: '#10B981' },
  { label: 'Nam', angle: 90, color: '#2563EB' },
  { label: 'Tây Nam', angle: 135, color: '#F59E0B' },
  { label: 'Tây', angle: 180, color: '#EF4444' },
  { label: 'Tây Bắc', angle: 225, color: '#8B5CF6' },
  { label: 'Bắc', angle: 270, color: '#3B82F6' },
  { label: 'Đông Bắc', angle: 315, color: '#14B8A6' },
];

// Element (Mệnh) Configuration
export const ELEMENT_CONFIG: Record<Menh, {
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  compatibleColors: string[];
  incompatibleColors: string[];
  materials: string[];
}> = {
  Kim: {
    icon: '💎',
    color: '#94A3B8',
    bgColor: '#F1F5F9',
    description: 'Người mệnh Kim thường kiên định, nguyên tắc và có tầm nhìn xa. Mệnh Kim đại diện cho sự vững chãi và tinh thần trách nhiệm.',
    compatibleColors: ['Trắng', 'Bạc', 'Xám', 'Vàng nhạt'],
    incompatibleColors: ['Đỏ', 'Cam', 'Hồng', 'Tím'],
    materials: ['Kim loại', 'Gỗ sồi', 'Đá marble trắng', 'Thủy tinh'],
  },
  Mộc: {
    icon: '🌿',
    color: '#22C55E',
    bgColor: '#F0FDF4',
    description: 'Người mệnh Mộc tràn đầy năng lượng sáng tạo, yêu thiên nhiên và hướng đến sự phát triển bền vững.',
    compatibleColors: ['Xanh lá', 'Xanh đen', 'Nâu gỗ'],
    incompatibleColors: ['Trắng', 'Bạc', 'Vàng kim'],
    materials: ['Gỗ tự nhiên', 'Gỗ ép', 'Mây tre', 'Vải cotton'],
  },
  Thủy: {
    icon: '💧',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    description: 'Người mệnh Thủy thông minh, linh hoạt và có khả năng thích nghi tốt. Mệnh Thủy đại diện cho trí tuệ và sự khéo léo.',
    compatibleColors: ['Xanh đen', 'Xanh dương', 'Xám trắng'],
    incompatibleColors: ['Nâu đất', 'Vàng đậm', 'Cam đất'],
    materials: ['Gỗ công nghiệp', 'Nhựa cao cấp', 'Thủy tinh', 'Đá travertine'],
  },
  Hỏa: {
    icon: '🔥',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    description: 'Người mệnh Hỏa nhiệt huyết, năng nổ và có khả năng truyền cảm hứng. Mệnh Hỏa đại diện cho đam mê và sự sáng tạo.',
    compatibleColors: ['Đỏ', 'Cam', 'Tím', 'Hồng', 'Vàng nghệ'],
    incompatibleColors: ['Xanh đen', 'Xanh dương đậm'],
    materials: ['Gỗ', 'Gỗ công nghiệp', 'Nhựa', 'Da thật', 'Gốm sứ'],
  },
  Thổ: {
    icon: '🪨',
    color: '#D97706',
    bgColor: '#FFFBEB',
    description: 'Người mệnh Thổ đáng tin cậy, thực tế và có khả năng xây dựng nền tảng vững chắc. Mệnh Thổ đại diện cho sự ổn định.',
    compatibleColors: ['Vàng', 'Nâu đất', 'Cam đất'],
    incompatibleColors: ['Xanh lá', 'Xanh đen'],
    materials: ['Đá tự nhiên', 'Gỗ thông', 'Gạch ốp', 'Bê tông trang trí'],
  },
};

// Cung Phi Configuration
export const CUNG_PHI_CONFIG: Record<CungPhi, {
  description: string;
  favorableDirections: Direction[];
  unfavorableDirections: Direction[];
  traits: string[];
}> = {
  Càn: {
    description: 'Cung Càn (Quốc quân) - Đại diện cho quyền uy, sự lãnh đạo và tầm nhìn chiến lược.',
    favorableDirections: ['Tây', 'Tây Bắc'],
    unfavorableDirections: ['Đông', 'Đông Nam'],
    traits: ['Quyết đoán', 'Có tầm nhìn', 'Đại diện cho người đứng đầu'],
  },
  Khảm: {
    description: 'Cung Khảm (Trí tuệ) - Đại diện cho trí thông minh, sự khéo léo và khả năng thích nghi.',
    favorableDirections: ['Bắc', 'Đông Bắc'],
    unfavorableDirections: ['Nam', 'Tây Nam'],
    traits: ['Thông minh', 'Khéo léo', 'Sáng tạo'],
  },
  Cấn: {
    description: 'Cung Cấn (Sở hữu) - Đại diện cho sự ổn định, tin cậy và khả năng quản lý tài chính.',
    favorableDirections: ['Đông Bắc', 'Bắc'],
    unfavorableDirections: ['Tây Nam', 'Nam'],
    traits: ['Ổn định', 'Thực tế', 'Có trách nhiệm'],
  },
  Chấn: {
    description: 'Cung Chấn (Bệnh tật) - Đại diện cho sức khỏe, sự phát triển và năng lượng mới.',
    favorableDirections: ['Đông', 'Đông Nam'],
    unfavorableDirections: ['Tây', 'Tây Bắc'],
    traits: ['Năng động', 'Phát triển', 'Sức khỏe'],
  },
  Tốn: {
    description: 'Cung Tốn (Phúc lộc) - Đại diện cho sự giàu có, may mắn và tài lộc.',
    favorableDirections: ['Đông Nam', 'Đông'],
    unfavorableDirections: ['Tây Bắc', 'Tây'],
    traits: ['Giàu có', 'Hạnh phúc', 'Tài lộc'],
  },
  Ly: {
    description: 'Cung Ly (Lộc tồn) - Đại diện cho sự thịnh vượng, danh tiếng và uy tín.',
    favorableDirections: ['Nam', 'Đông Nam'],
    unfavorableDirections: ['Bắc', 'Đông Bắc'],
    traits: ['Thịnh vượng', 'Có uy tín', 'Danh tiếng tốt'],
  },
  Khôn: {
    description: 'Cung Khôn (Thiên y) - Đại diện cho sự bình an, sức khỏe và bảo vệ.',
    favorableDirections: ['Tây Nam', 'Tây'],
    unfavorableDirections: ['Đông Bắc', 'Bắc'],
    traits: ['Bình an', 'Sức khỏe', 'Bảo vệ'],
  },
  Đoài: {
    description: 'Cung Đoài (Diên niên) - Đại diện cho sự trường tồn, hôn nhân và các mối quan hệ tốt đẹp.',
    favorableDirections: ['Tây Bắc', 'Tây'],
    unfavorableDirections: ['Đông Nam', 'Đông'],
    traits: ['Trường tồn', 'Hạnh phúc gia đình', 'Mối quan hệ tốt'],
  },
};

// Calculate Mệnh from birth year (traditional calculation)
export const calculateMenh = (birthYear: number): Menh => {
  const lastTwoDigits = birthYear % 100;
  const menhIndex = lastTwoDigits % 10;
  
  const menhMap: Record<number, Menh> = {
    4: 'Kim', 5: 'Kim',
    6: 'Thủy', 7: 'Thủy',
    8: 'Mộc', 9: 'Mộc',
    0: 'Hỏa', 1: 'Hỏa',
    2: 'Thổ', 3: 'Thổ',
  };
  
  return menhMap[menhIndex] || 'Thủy';
};

// Calculate Cung Phi from birth year and gender
export const calculateCungPhi = (birthYear: number, gender: Gender): CungPhi => {
  const lastTwoDigits = birthYear % 100;
  let sum = 0;
  
  // Sum digits
  const digits = String(lastTwoDigits).split('').map(Number);
  sum = digits.reduce((a, b) => a + b, 0);
  
  // Reduce to single digit
  while (sum >= 10) {
    sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
  }
  
  // Apply gender adjustment
  let cungPhiNumber: number;
  if (gender === 'Nam') {
    cungPhiNumber = 10 - sum;
    if (cungPhiNumber >= 5) cungPhiNumber -= 5;
    cungPhiNumber = 9 - cungPhiNumber;
  } else {
    cungPhiNumber = 4 + sum;
    if (cungPhiNumber >= 5) cungPhiNumber -= 5;
    cungPhiNumber = cungPhiNumber + 4;
  }
  
  cungPhiNumber = ((cungPhiNumber - 1) % 8) + 1;
  
  const cungPhiMap: Record<number, CungPhi> = {
    1: 'Càn',
    2: 'Khảm',
    3: 'Cấn',
    4: 'Chấn',
    5: 'Tốn',
    6: 'Ly',
    7: 'Khôn',
    8: 'Đoài',
  };
  
  return cungPhiMap[cungPhiNumber] || 'Khảm';
};

// Get favorable years for building (Tuổi Động Thổ)
export const getFavorableYears = (birthYear: number, startYear: number = 2025) => {
  const menh = calculateMenh(birthYear);
  const years: Array<{ year: number; rating: 'Rất tốt' | 'Tốt' | 'Trung bình' | 'Khá'; reason: string }> = [];
  
  for (let i = 0; i < 5; i++) {
    const year = startYear + i;
    const age = year - birthYear;
    const can = year % 10;
    const chi = year % 12;
    
    // Simple logic for demo - in real implementation, use detailed Ba Zi calculation
    let rating: 'Rất tốt' | 'Tốt' | 'Trung bình' | 'Khá' = 'Trung bình';
    let reason = '';
    
    // Check age compatibility (avoid certain ages)
    if (age < 18 || age > 80) {
      rating = 'Trung bình';
      reason = 'Tuổi chưa phù hợp';
    } else if (age >= 25 && age <= 55) {
      rating = 'Rất tốt';
      reason = 'Độ tuổi vàng để xây dựng';
    } else if (age >= 20 && age < 25 || age > 55 && age <= 65) {
      rating = 'Tốt';
      reason = 'Độ tuổi phù hợp';
    }
    
    years.push({ year, rating, reason });
  }
  
  return years;
};
