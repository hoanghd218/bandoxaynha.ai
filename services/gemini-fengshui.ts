"use server";

import { GoogleGenAI } from "@google/genai";
import { FengShuiInput, FengShuiAnalysis, calculateMenh, calculateCungPhi, getFavorableYears } from "@/data/fengshui";

const getClient = () => {
    let apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    apiKey = "AIzaSyCIBQhBhHd5hRw_wrCLS9R2YNZ7K3aNmuI"

    console.log("apiKey", apiKey)
    if (!apiKey) {
        console.error("GEMINI_API_KEY is missing from environment variables");
    }
    return new GoogleGenAI({ apiKey: apiKey || '' });
};

const SYSTEM_PROMPT = `
Bạn là một chuyên gia tư vấn phong thủy cao cấp của thương hiệu "Bản Đồ Xây Nhà AI". 
Nhiệm vụ của bạn là cung cấp các giải pháp phong thủy tối ưu cho không gian sống, 
kết hợp hài hòa với công nghệ hiện đại, nhằm tạo ra môi trường sống tốt cho gia chủ.

Từ ngữ: Tinh tế, nhẹ nhàng, mang tính truyền cảm hứng và thể hiện sự chuyên nghiệp.
Tông giọng: Đẳng cấp, phù hợp với gia chủ có vị thế cao, yêu thích sự hài hòa, tối ưu và bền vững.
`;

export const analyzeFengShui = async (
    input: FengShuiInput
): Promise<FengShuiAnalysis> => {
    const ai = getClient();
    const model = 'gemini-2.5-flash';

    // Calculate traditional Feng Shui elements
    const birthYear = new Date(input.birthDate).getFullYear();
    const menh = calculateMenh(birthYear);
    const cungPhi = calculateCungPhi(birthYear, input.gender);
    const favorableYears = getFavorableYears(birthYear);

    const promptTemplate = `
Gia chủ: Sinh ngày ${input.birthDate}, giới tính ${input.gender}

Cung Phi: ${cungPhi}, Mệnh: ${menh}

Hướng nhà hiện tại: ${input.houseDirection}

Hãy viết một đoạn tóm tắt chuyên nghiệp và truyền cảm hứng (khoảng 150-200 chữ) về cách tối ưu hóa không gian nội thất, giúp gia chủ tạo dựng một tổ ấm hạnh phúc và bền vững.

Tập trung vào việc cân bằng năng lượng không gian, chọn lựa vật liệu phù hợp, khai thác ánh sáng tự nhiên, và tạo ra một không gian sống hài hòa và thư thái.

Tránh chỉ liệt kê yếu tố hướng nhà, mà hãy nhấn mạnh vào cảm giác không gian tổng thể, làm sao để không gian này không chỉ phù hợp với phong thủy mà còn tôn vinh sự đẳng cấp và phong cách sống của gia chủ.

Giọng văn phải tinh tế, đẳng cấp, thể hiện rõ sự thấu hiểu sâu sắc về phong thủy và tôn trọng vị thế gia chủ.
`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    {
                        text: SYSTEM_PROMPT,
                    },
                    {
                        text: promptTemplate,
                    },
                ],
            },
            config: {
                temperature: 0.7,
            }
        });

        // Extract text from response
        let summary = '';
        if (response.candidates && response.candidates[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.text) {
                    summary += part.text;
                }
            }
        }

        // Generate recommendations based on Mệnh
        const materials = generateMaterialSuggestions(menh);
        const layout = generateLayoutSuggestions(cungPhi, input.houseDirection);

        return {
            summary: summary.trim() || 'Không thể tạo phân tích. Vui lòng thử lại.',
            cungPhi,
            menh,
            recommendations: [
                'Sử dụng vật liệu và màu sắc phù hợp với mệnh để tạo sự hài hòa',
                'Đặt bếp theo hướng sinh khí để thu hút tài lộc',
                'Tận dụng ánh sáng tự nhiên tối đa để kích hoạt năng lượng dương',
                'Tránh đặt giường ngủ dưới xà ngang hoặc đối diện cửa chính',
            ],
            materials,
            layout,
            favorableYears,
        };

    } catch (error) {
        console.error("Error analyzing Feng Shui:", error);
        throw error;
    }
};

// Helper functions for generating suggestions
const generateMaterialSuggestions = (menh: string) => {
    const colorMap: Record<string, string[]> = {
        Kim: ['Trắng bạc', 'Xám nhạt', 'Vàng nghệ'],
        Mộc: ['Xanh lá', 'Nâu gỗ', 'Xanh đen'],
        Thủy: ['Xanh dương', 'Xanh đen', 'Trắng'],
        Hỏa: ['Đỏ', 'Cam', 'Tím', 'Hồng'],
        Thổ: ['Vàng đất', 'Nâu đất', 'Cam đất'],
    };

    const floorMap: Record<string, string[]> = {
        Kim: ['Gỗ sồi sáng màu', 'Gạch ceramic trắng', 'Đá marble trắng'],
        Mộc: ['Gỗ tự nhiên', 'Gỗ thông', 'Vải len'],
        Thủy: ['Gỗ công nghiệp', 'Gạch granite xanh', 'Thạch anh'],
        Hỏa: ['Gỗ mun', 'Gạch gốm đỏ', 'Đá onyx'],
        Thổ: ['Đá tự nhiên', 'Gạch ốp đất nung', 'Gỗ thông'],
    };

    const wallMap: Record<string, string[]> = {
        Kim: ['Sơn trắng', 'Giấy dán tường xám', 'Gương trang trí'],
        Mộc: ['Sơn xanh lá nhạt', 'Ván ốp gỗ', 'Giấy dán tường hoa lá'],
        Thủy: ['Sơn xanh dương nhạt', 'Gạch kính màu', 'Họa tiết sóng nước'],
        Hỏa: ['Sơn đỏ tía', 'Vách ốp gỗ đỏ', 'Họa tiết lửa'],
        Thổ: ['Sơn vàng kem', 'Gạch ốp đá', 'Vách bê tông mộc'],
    };

    const decorMap: Record<string, string[]> = {
        Kim: ['Đồng thau', 'Kính cường lực', 'Đá quý'],
        Mộc: ['Cây xanh', 'Gỗ trang trí', 'Mây tre đan'],
        Thủy: ['Bể cá', 'Đài phun nước', 'Thủy tinh'],
        Hỏa: ['Nến', 'Đèn ấm', 'Ánh sáng vàng'],
        Thổ: ['Đá phong thủy', 'Bình gốm', 'Tượng đất nung'],
    };

    const lightMap: Record<string, string[]> = {
        Kim: ['Đèn LED trắng', 'Đèn pha lê', 'Ánh sáng lạnh'],
        Mộc: ['Đèn gỗ', 'Ánh sáng tự nhiên', 'Đèn dây'],
        Thủy: ['Đèn thủy tinh', 'Ánh sáng xanh dương', 'Đèn LED màu'],
        Hỏa: ['Đèn chùm vàng', 'Ánh sáng ấm', 'Nến trang trí'],
        Thổ: ['Đèn đá', 'Ánh sáng vàng đất', 'Đèn gốm'],
    };

    return {
        colors: colorMap[menh] || [],
        floors: floorMap[menh] || [],
        walls: wallMap[menh] || [],
        decor: decorMap[menh] || [],
        light: lightMap[menh] || [],
    };
};

const generateLayoutSuggestions = (cungPhi: string, houseDirection: string) => {
    // Simplified logic based on traditional rules
    return {
        kitchen: `Hướng ${houseDirection === 'Nam' ? 'Đông Nam' : 'Nam'} (hợp sinh khí)`,
        bedroom: 'Hướng Đông Nam (phúc lộc, bình an)',
        mainDoor: `Hướng ${houseDirection} (hợp cung ${cungPhi})`,
        avoid: [
            'Tránh đặt cửa chính hướng Tây Nam (xung khắc)',
            'Tránh bếp đối diện cửa nhà (tài lộc thất thoát)',
            'Tránh giường ngủ đối diện cửa (giấc ngủ không yên)',
        ],
    };
};
