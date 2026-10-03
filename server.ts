import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System prompt grounding for "AI Tổ Dân Phố"
const SYSTEM_INSTRUCTION = `Bạn là "Trợ lý Trí tuệ Nhân tạo Tổ dân phố" (gọi tắt là AI Tổ dân phố), hỗ trợ Tổ trưởng và Ban quản lý tổ dân phố xử lý các công việc hành chính, truyền thông và quản lý dữ liệu dân cư tại Việt Nam.

NGUYÊN TẮC HOẠT ĐỘNG:
1. Chính xác & Tuân thủ: Chỉ xử lý dựa trên thông tin được cung cấp hoặc quy định quản lý nhà nước hiện hành (Luật Cư trú, Nghị định 30/2020/NĐ-CP về công tác văn thư, Thông tư 04/2012/TT-BNV, Thông tư 14/2018/TT-BNV về tổ chức hoạt động của thôn, tổ dân phố, các quy định về an ninh trật tự, PCCC). Không tự bịa đặt thông tin dân cư.
2. Bảo mật thông tin: Tuân thủ nghiêm ngặt quy định bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP). Khi được yêu cầu bảo mật, che giấu số CCCD, SĐT, ngày sinh nhạy cảm.
3. Văn phong linh hoạt:
   - Khi viết thông báo gửi dân (Zalo, loa phường, bảng tin): Thân thiện, tôn trọng bà con nhân dân, rõ ràng, ngắn gọn, cấu trúc dễ đọc, có thể dùng emoji phù hợp.
   - Khi lập báo cáo/văn bản gửi cấp trên (UBND Phường/Xã): Trang trọng, chuẩn mực hành chính Việt Nam, đúng thể thức Nghị định 30/2020/NĐ-CP (Cộng hòa xã hội chủ nghĩa Việt Nam, Độc lập - Tự do - Hạnh phúc...).
   - Khi xử lý dữ liệu: Xuất đúng định dạng được yêu cầu (Bảng, JSON, CSV).`;

// 1. Endpoint: AI Chat & Advice
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, context, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Nội dung tin nhắn không được để trống' });
    }

    if (!ai) {
      return res.json({
        reply: `[Chế độ dự phòng cục bộ] Xin chào bác Tổ trưởng và Ban quản lý Tổ dân phố! Về câu hỏi "${message}": \n\nTheo quy định hiện hành tại cơ sở, mọi thủ tục cần tuân thủ quy chế dân chủ ở cơ sở và quy định quản lý cư trú. Bạn có thể sử dụng các mẫu soạn thảo văn bản và thông báo có sẵn trong hệ thống để thực hiện nhanh chóng.`,
      });
    }

    const prompt = `Lịch sử trao đổi trước đó:\n${(history || []).map((h: any) => `${h.role === 'user' ? 'Tổ trưởng' : 'AI'}: ${h.text}`).join('\n')}\n\nThông tin bối cảnh tổ dân phố:\n${context ? JSON.stringify(context) : 'Tổ dân phố tại Việt Nam'}\n\nYêu cầu hiện tại của Tổ trưởng/Ban quản lý:\n${message}\n\nHãy trả lời chi tiết, chuẩn xác, thiết thực, tuân thủ nguyên tắc hoạt động của AI Tổ dân phố.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: error.message || 'Lỗi xử lý yêu cầu AI',
      reply: 'Hệ thống AI đang bận hoặc gặp sự cố kết nối. Vui lòng thử lại sau ít giây.',
    });
  }
});

// 2. Endpoint: Generate Community Notice (Thông báo Zalo / Bảng tin)
app.post('/api/generate-notice', async (req: Request, res: Response) => {
  try {
    const { topic, details, targetAudience, channel, urgentLevel, toDanPhoName } = req.body;

    const prompt = `Hãy soạn một bản thông báo gửi tới bà con nhân dân trong tổ dân phố với thông tin sau:
- Tên tổ dân phố: ${toDanPhoName || 'Tổ dân phố'}
- Chủ đề thông báo: ${topic}
- Nội dung chi tiết / mốc thời gian / địa điểm / yêu cầu: ${details}
- Đối tượng tiếp nhận: ${targetAudience || 'Toàn thể bà con nhân dân trong tổ'}
- Kênh phát hành: ${channel || 'Nhóm Zalo cư dân & Bảng tin'}
- Mức độ khẩn: ${urgentLevel || 'Bình thường'}

YÊU CẦU ĐẶC BIỆT:
1. Soạn 2 phiên bản:
   - Phiên bản 1: "BẢN TIN NHÓM ZALO" - Thân thiện, ấm áp, rõ ràng, phân mục bằng gạch đầu dòng và emoji phù hợp (📢, ⏰, 📍, ⚠️, 🌿, 🙏), dễ đọc trên điện thoại, có lời cảm ơn và số điện thoại liên hệ Tổ trưởng/Ban quản lý.
   - Phiên bản 2: "BẢN IN TREO BẢNG TIN A4" - Có tiêu đề trang trọng, thông tin cô đọng, chữ to rõ, chuẩn mực cơ sở để in trực tiếp dán bảng tin tổ dân phố.
2. Trả về dưới định dạng JSON với cấu trúc:
{
  "title": "Tiêu đề ngắn gọn cuốn hút",
  "zaloVersion": "Nội dung đầy đủ gửi Zalo...",
  "printVersion": "Nội dung đầy đủ bản in A4...",
  "keyPoints": ["Ý chính 1", "Ý chính 2", "Ý chính 3"],
  "reminders": "Lưu ý quan trọng cho bà con"
}`;

    if (!ai) {
      return res.json({
        title: `THÔNG BÁO: ${topic}`,
        zaloVersion: `📢 KÍNH GỬI BÀ CON TỔ DÂN PHỐ!\n\nBan quản lý xin thông báo về việc: ${topic}.\n⏰ Thời gian & Chi tiết: ${details}\n📍 Kính mong bà con lưu ý và phối hợp thực hiện.\n\n🙏 Trân trọng cảm ơn bà con!\nBan Quản lý ${toDanPhoName || 'Tổ dân phố'}`,
        printVersion: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nTHÔNG BÁO\nV/v ${topic}\n\nKính gửi: Toàn thể nhân dân trong ${toDanPhoName || 'Tổ dân phố'}\n\nNội dung: ${details}\n\nĐề nghị bà con nghiêm túc thực hiện.\n\nTM. TỔ DÂN PHỐ\nTỔ TRƯỞNG`,
        keyPoints: [topic, 'Đúng thời gian quy định', 'Bảo đảm an ninh, vệ sinh'],
        reminders: 'Mọi thắc mắc xin liên hệ trực tiếp Tổ trưởng.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    try {
      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch {
      res.json({
        title: `Thông báo: ${topic}`,
        zaloVersion: response.text,
        printVersion: response.text,
        keyPoints: [topic],
        reminders: 'Đề nghị bà con chú ý thực hiện.',
      });
    }
  } catch (error: any) {
    console.error('Notice error:', error);
    res.status(500).json({ error: error.message || 'Lỗi soạn thông báo' });
  }
});

// 3. Endpoint: Generate Official Administrative Documents (Chuẩn Nghị định 30/2020/NĐ-CP)
app.post('/api/generate-document', async (req: Request, res: Response) => {
  try {
    const { docType, title, recipient, contentPoints, toDanPhoName, wardName, districtName, leaderName } = req.body;

    const prompt = `Hãy soạn thảo một văn bản hành chính nhà nước chuẩn theo Nghị định 30/2020/NĐ-CP về công tác văn thư cho Tổ dân phố:
- Loại văn bản: ${docType} (Ví dụ: Báo cáo tình hình, Biên bản cuộc họp, Tờ trình xin kinh phí/sửa chữa, Giấy xác nhận cư trú / Nhận xét dân sự...)
- Trích yếu / Tiêu đề: ${title}
- Nơi nhận: ${recipient || 'UBND Phường/Xã'}
- Tên Tổ dân phố: ${toDanPhoName || 'Tổ dân phố 12'}
- Phường/Xã: ${wardName || 'Phường Hàng Mã'}
- Quận/Huyện/Tỉnh: ${districtName || 'Quận Hoàn Kiếm, TP. Hà Nội'}
- Người đại diện / Tổ trưởng: ${leaderName || 'Nguyễn Văn An'}
- Các nội dung chính cần đưa vào: ${contentPoints}

YÊU CẦU THỂ THỨC CHUẨN NGHỊ ĐỊNH 30/2020/NĐ-CP:
1. Phần Quốc hiệu và Tiêu ngữ viết hoa/chữ nghiêng chuẩn.
2. Tên cơ quan, tổ chức ban hành: UBND PHƯỜNG ... / TỔ DÂN PHỐ SỐ ...
3. Số và ký hiệu văn bản (ví dụ: Số: .../BC-TDP hoặc .../TTr-TDP).
4. Địa danh và thời gian (ví dụ: ..., ngày ... tháng ... năm ...).
5. Trích yếu nội dung văn bản.
6. Nội dung chi tiết với câu từ hành chính, chuẩn mực, khúc chiết, đúng thẩm quyền của Tổ dân phố.
7. Nơi nhận (Kính gửi, Nơi nhận: như trên, lưu TDP).
8. Chức vụ, chữ ký của Tổ trưởng tổ dân phố.

Trả về JSON cấu trúc:
{
  "docHeader": {
    "agencyParent": "UBND ...",
    "agency": "TỔ DÂN PHỐ ...",
    "code": "Số: .../...",
    "locationDate": "..., ngày ... tháng ... năm 2026"
  },
  "nationalMotto": {
    "country": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
    "motto": "Độc lập - Tự do - Hạnh phúc"
  },
  "title": "TÊN LOẠI VĂN BẢN (CHỮ HOA)",
  "subject": "Về việc ...",
  "recipient": "Kính gửi: ...",
  "body": "Nội dung văn bản chi tiết...",
  "recipientsList": ["Như trên", "Lưu: TDP."],
  "signerRole": "TỔ TRƯỞNG",
  "signerName": "${leaderName || 'Tổ trưởng'}"
}`;

    if (!ai) {
      return res.json({
        docHeader: {
          agencyParent: `UBND ${wardName || 'PHƯỜNG'}`,
          agency: `TỔ DÂN PHỐ ${toDanPhoName || ''}`.toUpperCase(),
          code: 'Số: 01/BC-TDP',
          locationDate: `${wardName || 'Địa phương'}, ngày 01 tháng 10 năm 2026`,
        },
        nationalMotto: {
          country: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
          motto: 'Độc lập - Tự do - Hạnh phúc',
        },
        title: docType.toUpperCase(),
        subject: `Về việc ${title}`,
        recipient: `Kính gửi: ${recipient || 'UBND Phường'}`,
        body: `Căn cứ tình hình thực tế tại ${toDanPhoName || 'Tổ dân phố'};\n\nNay Tổ dân phố xin kính báo cáo nội dung sau:\n${contentPoints}\n\nKính trình cấp trên xem xét và chỉ đạo.`,
        recipientsList: ['Như trên', 'Lưu: Tổ dân phố.'],
        signerRole: 'TM. TỔ DÂN PHỐ\nTỔ TRƯỞNG',
        signerName: leaderName || 'Nguyễn Văn An',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    try {
      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch {
      res.json({
        docHeader: {
          agencyParent: `UBND ${wardName || 'PHƯỜNG'}`,
          agency: (toDanPhoName || 'TỔ DÂN PHỐ').toUpperCase(),
          code: 'Số: .../TDP',
          locationDate: 'Ngày ... tháng ... năm 2026',
        },
        nationalMotto: {
          country: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
          motto: 'Độc lập - Tự do - Hạnh phúc',
        },
        title: docType.toUpperCase(),
        subject: title,
        recipient: `Kính gửi: ${recipient}`,
        body: response.text,
        recipientsList: ['Như kính gửi', 'Lưu: TDP'],
        signerRole: 'TỔ TRƯỞNG',
        signerName: leaderName || '',
      });
    }
  } catch (error: any) {
    console.error('Doc error:', error);
    res.status(500).json({ error: error.message || 'Lỗi soạn thảo văn bản' });
  }
});

// 4. Endpoint: Intelligent Citizen Data Processing & Masking
app.post('/api/process-data', async (req: Request, res: Response) => {
  try {
    const { rawText, shouldMaskData } = req.body;
    if (!rawText) {
      return res.status(400).json({ error: 'Dữ liệu đầu vào không được để trống' });
    }

    const prompt = `Bạn là chuyên gia xử lý dữ liệu dân cư tổ dân phố.
Hãy phân tích và bóc tách đoạn văn bản danh sách dân cư sau đây thành danh sách có cấu trúc chuẩn:
"""
${rawText}
"""

YÊU CẦU:
1. Bóc tách từng cá nhân/hộ gia đình thành các trường:
   - fullName (Họ và tên)
   - birthYear (Năm sinh hoặc Ngày sinh)
   - gender (Nam/Nữ)
   - idCard (Số CCCD/CMND nếu có)
   - phone (Số điện thoại nếu có)
   - address (Số nhà, phòng, tổ)
   - residentStatus (Thường trú / Tạm trú)
   - category (Bình thường / Người cao tuổi / Trẻ em / Gia đình chính sách / Hộ nghèo / Hộ kinh doanh)
   - notes (Ghi chú nếu có)

2. BẢO VỆ DỮ LIỆU CÁ NHÂN (Nghị định 13/2023/NĐ-CP):
   - ${shouldMaskData ? 'YÊU CẦU CHE GIẤU DỮ LIỆU NHẠY CẢM: idCard chỉ giữ lại 3 số đầu và 3 số cuối (ví dụ: 001***456), phone chỉ giữ 3 số đầu và 2 số cuối (ví dụ: 091***89), birthYear nếu có ngày tháng thì chỉ giữ năm sinh.' : 'Giữ nguyên dữ liệu để ban quản lý lưu trữ nội bộ.'}

3. Trả về đúng định dạng JSON:
{
  "totalRecords": số lượng bản ghi,
  "summary": {
    "thuongTru": số người thường trú,
    "tamTru": số người tạm trú,
    "nguoiCaoTuoi": số người >= 70 tuổi,
    "treEm": số trẻ em < 6 tuổi,
    "chinhSach": số người/hộ chính sách
  },
  "records": [
    {
      "id": "1",
      "fullName": "...",
      "birthYear": "...",
      "gender": "...",
      "idCard": "...",
      "phone": "...",
      "address": "...",
      "residentStatus": "...",
      "category": "...",
      "notes": "..."
    }
  ]
}`;

    if (!ai) {
      // Local fallback parsing
      const lines = rawText.split('\n').filter((l: string) => l.trim().length > 0);
      const records = lines.map((line: string, idx: number) => ({
        id: String(idx + 1),
        fullName: line.split(/[,;-]/)[0]?.trim() || `Dân cư ${idx + 1}`,
        birthYear: '1985',
        gender: 'Chưa rõ',
        idCard: shouldMaskData ? '001******789' : '001085001789',
        phone: shouldMaskData ? '098****123' : '0981234123',
        address: line,
        residentStatus: 'Thường trú',
        category: 'Bình thường',
        notes: '',
      }));
      return res.json({
        totalRecords: records.length,
        summary: { thuongTru: records.length, tamTru: 0, nguoiCaoTuoi: 0, treEm: 0, chinhSach: 0 },
        records,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    try {
      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch {
      res.status(500).json({ error: 'Không thể phân tích dữ liệu JSON trả về từ AI' });
    }
  } catch (error: any) {
    console.error('Data process error:', error);
    res.status(500).json({ error: error.message || 'Lỗi xử lý dữ liệu dân cư' });
  }
});

// Configure Vite or Static Files
async function startServer() {
  app.use(express.static(path.resolve(__dirname)));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'mpa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      // Support direct routing to dist pages
      const reqPath = req.path;
      if (reqPath.endsWith('.html')) {
        const targetFile = path.resolve(__dirname, 'dist', reqPath.replace(/^\//, ''));
        res.sendFile(targetFile, (err) => {
          if (err) res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
        });
      } else {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
      }
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer();
