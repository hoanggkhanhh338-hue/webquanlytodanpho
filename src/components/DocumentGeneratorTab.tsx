import React, { useState } from 'react';
import { OrganizationInfo, OfficialDocument } from '../types';
import { sampleDocTemplates } from '../data/mockData';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Printer,
  Download,
  Edit3,
  BookmarkCheck,
} from 'lucide-react';

interface DocumentGeneratorTabProps {
  orgInfo: OrganizationInfo;
}

export const DocumentGeneratorTab: React.FC<DocumentGeneratorTabProps> = ({ orgInfo }) => {
  const [docType, setDocType] = useState('BÁO CÁO');
  const [title, setTitle] = useState('Tình hình an ninh trật tự và đời sống nhân dân Quý III/2026');
  const [recipient, setRecipient] = useState(`Ủy ban nhân dân ${orgInfo.ward}`);
  const [contentPoints, setContentPoints] = useState(
    '1. Tình hình an ninh trật tự: Duy trì ổn định, không có vụ việc phức tạp xảy ra.\n2. Công tác vệ sinh môi trường: Tổ chức tốt Ngày Chủ Nhật Xanh, xử lý dứt điểm điểm tập kết rác thải tự phát đầu ngõ.\n3. Quản lý cư trú: Đã rà soát nhân khẩu và hướng dẫn 100% công dân đủ điều kiện kích hoạt VNeID mức 2.\n4. Đề xuất: Đề nghị Phường khảo sát nạo vét cống rãnh ngõ Yên Thái trước mùa mưa bão.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [officialDoc, setOfficialDoc] = useState<OfficialDocument>({
    docHeader: {
      agencyParent: `UBND ${orgInfo.ward.toUpperCase()}`,
      agency: orgInfo.name.toUpperCase(),
      code: 'Số: 08/BC-TDP',
      locationDate: `${orgInfo.ward}, ngày 01 tháng 10 năm 2026`,
    },
    nationalMotto: {
      country: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
      motto: 'Độc lập - Tự do - Hạnh phúc',
    },
    title: 'BÁO CÁO',
    subject: 'Về tình hình an ninh trật tự, quản lý cư trú và đời sống nhân dân Quý III năm 2026',
    recipient: `Kính gửi: Ủy ban nhân dân ${orgInfo.ward}`,
    body: `Thực hiện chương trình công tác năm 2026 của UBND ${orgInfo.ward}, Ban Quản lý ${orgInfo.name} xin trân trọng báo cáo tình hình thực hiện nhiệm vụ Quý III năm 2026 với những nội dung cụ thể như sau:

I. ĐẶC ĐIỂM TÌNH HÌNH CHUNG:
Tổ dân phố hiện có ${orgInfo.totalHouseholds} hộ gia đình với ${orgInfo.totalPopulation} nhân khẩu. Đa số bà con nhân dân là cán bộ công chức hưu trí, người lao động và một số hộ kinh doanh dịch vụ. Đời sống vật chất, tinh thần của nhân dân trong tổ cơ bản ổn định, nội bộ đoàn kết, đồng thuận với các chủ trương chính sách của Đảng và Nhà nước.

II. KẾT QUẢ ĐẠT ĐƯỢC TRÊN CÁC MẶT CÔNG TÁC:
1. Công tác an ninh chính trị và trật tự an toàn xã hội:
- Tình hình an ninh trật tự trên địa bàn tiếp tục được giữ vững ổn định, không để xảy ra các vụ việc trọng án, tệ nạn xã hội hoặc mâu thuẫn khiếu kiện kéo dài.
- Tổ bảo vệ an ninh trật tự ở cơ sở phối hợp tốt với Cảnh sát khu vực tăng cường tuần tra đêm, nhắc nhở các hộ khóa cửa cẩn thận và thực hiện đúng cam kết PCCC.

2. Công tác quản lý cư trú và triển khai Đề án 06:
- Tổ dân phố đã phối hợp cùng Công an phường rà soát biến động nhân khẩu, kiểm tra việc khai báo tạm trú đối với các khu nhà trọ.
- Đã hướng dẫn 100% người dân đủ điều kiện kích hoạt tài khoản định danh điện tử VNeID mức 2.

3. Vệ sinh môi trường và nếp sống văn minh đô thị:
- Duy trì nền nếp phong trào "Ngày Chủ Nhật Xanh", vận động nhân dân bỏ rác đúng giờ và đúng nơi quy định, xóa bỏ điểm chân rác tồn đọng.

III. MỘT SỐ KIẾN NGHỊ VÀ ĐỀ XUẤT:
Kính đề nghị UBND ${orgInfo.ward} và các phòng ban chuyên môn:
1. Quan tâm khảo sát, bố trí kinh phí nạo vét hệ thống thoát nước ngõ Yên Thái trước mùa mưa bão năm 2026 để tránh ngập úng cục bộ.
2. Kiểm tra thay thế 02 bóng đèn chiếu sáng ngõ Trạm bị hỏng nhằm đảm bảo an toàn cho nhân dân đi lại vào ban đêm.

Trên đây là báo cáo kết quả công tác Quý III/2026 của ${orgInfo.name}, kính trình UBND ${orgInfo.ward} xem xét, chỉ đạo./.`,
    recipientsList: [
      `UBND ${orgInfo.ward} (để b/c)`,
      'Chi bộ, Ban CTMT (để phối hợp)',
      'Lưu: TDP.',
    ],
    signerRole: 'TM. TỔ DÂN PHỐ\nTỔ TRƯỞNG',
    signerName: orgInfo.leaderName,
  });

  const handleApplyTemplate = (tmpl: (typeof sampleDocTemplates)[0]) => {
    setDocType(tmpl.docType);
    setTitle(tmpl.title);
    setRecipient(tmpl.recipient);
    setContentPoints(tmpl.contentPoints);
  };

  const handleGenerate = async () => {
    if (!title.trim()) {
      alert('Bác vui lòng nhập trích yếu/tiêu đề văn bản!');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType,
          title,
          recipient,
          contentPoints,
          toDanPhoName: orgInfo.name,
          wardName: orgInfo.ward,
          districtName: `${orgInfo.district}, ${orgInfo.city}`,
          leaderName: orgInfo.leaderName,
        }),
      });

      const data = await res.json();
      setOfficialDoc(data);
    } catch (err) {
      console.error(err);
      alert('Có lỗi khi soạn thảo văn bản. Vui lòng thử lại!');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyFullDocument = () => {
    const fullText = `${officialDoc.docHeader.agencyParent}
${officialDoc.docHeader.agency}
${officialDoc.docHeader.code}

${officialDoc.nationalMotto.country}
${officialDoc.nationalMotto.motto}
${officialDoc.docHeader.locationDate}

${officialDoc.title}
${officialDoc.subject}

${officialDoc.recipient}

${officialDoc.body}

Nơi nhận:
${officialDoc.recipientsList.map((r) => `- ${r}`).join('\n')}

${officialDoc.signerRole}
(Ký, ghi rõ họ tên)

${officialDoc.signerName}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTextFile = () => {
    const fullText = `${officialDoc.docHeader.agencyParent}\n${officialDoc.docHeader.agency}\n${officialDoc.docHeader.code}\n\n${officialDoc.nationalMotto.country}\n${officialDoc.nationalMotto.motto}\n${officialDoc.docHeader.locationDate}\n\n${officialDoc.title}\n${officialDoc.subject}\n\n${officialDoc.recipient}\n\n${officialDoc.body}\n\nNơi nhận:\n${officialDoc.recipientsList.map((r) => `- ${r}`).join('\n')}\n\n${officialDoc.signerRole}\n\n${officialDoc.signerName}`;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${officialDoc.title}_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Form Setup Column (Left) */}
      <div className="lg:col-span-5 space-y-5">
        {/* Template Quick Select */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4">
          <div className="flex items-center gap-2 mb-3 text-stone-800 font-semibold text-sm">
            <BookmarkCheck className="w-4 h-4 text-red-700" />
            Biểu mẫu hành chính chuẩn cơ sở:
          </div>
          <div className="space-y-2">
            {sampleDocTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => handleApplyTemplate(t)}
                className="w-full text-left p-2.5 rounded-lg border border-stone-200 hover:border-red-400 hover:bg-red-50/50 text-xs text-stone-700 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-red-900 bg-red-100 px-1.5 py-0.5 rounded text-[10px] mr-2">
                    {t.docType}
                  </span>
                  <span className="font-medium text-stone-900">{t.title}</span>
                </div>
                <span className="text-[11px] text-stone-400 shrink-0 ml-2">Chọn mẫu</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5 space-y-4">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
            <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-700" />
              Soạn thảo văn bản hành chính
            </h2>
            <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
              Nghị định 30/2020/NĐ-CP
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Loại văn bản *
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full rounded-lg border border-stone-300 p-2 text-xs font-medium focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none bg-white"
              >
                <option value="BÁO CÁO">Báo cáo tình hình</option>
                <option value="BIÊN BẢN">Biên bản cuộc họp / hòa giải</option>
                <option value="TỜ TRÌNH">Tờ trình xin hỗ trợ / kinh phí</option>
                <option value="GIẤY XÁC NHẬN">Giấy nhận xét cư trú</option>
                <option value="KẾ HOẠCH">Kế hoạch hoạt động</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Cơ quan nhận *
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="UBND Phường, Công an Phường..."
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Trích yếu nội dung văn bản (Về việc...) *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Tình hình an ninh trật tự quý IV; Đề nghị sửa chữa ngõ..."
              className="w-full rounded-lg border border-stone-300 p-2.5 text-xs sm:text-sm focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Các ý chính / Số liệu / Căn cứ thực tế
            </label>
            <textarea
              rows={6}
              value={contentPoints}
              onChange={(e) => setContentPoints(e.target.value)}
              placeholder="Nhập các ý chính hoặc số liệu vắn tắt, AI sẽ tự động hành văn chuẩn theo phong cách công vụ nhà nước..."
              className="w-full rounded-lg border border-stone-300 p-2.5 text-xs sm:text-sm focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded-xl bg-red-800 hover:bg-red-900 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span>AI đang chuẩn hóa thể thức Nghị định 30...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Chuẩn hóa & Soạn thảo văn bản</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Official Document Preview Column (Right) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Action Header */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800 text-xs sm:text-sm flex items-center gap-1.5 font-serif">
              <FileText className="w-4 h-4 text-red-800" />
              Khổ in A4 Tiêu Chuẩn (Nghị định 30/2020/NĐ-CP)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyFullDocument}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>

            <button
              onClick={downloadTextFile}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
              title="Tải văn bản dạng file text"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-800 hover:bg-red-900 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In văn bản / Lưu PDF</span>
            </button>
          </div>
        </div>

        {/* Paper A4 Document Presentation */}
        <div className="bg-stone-200/80 rounded-xl p-4 sm:p-8 border border-stone-300 shadow-inner flex justify-center">
          <div className="w-full max-w-2xl bg-white p-8 sm:p-12 shadow-xl border border-stone-300 text-stone-900 font-serif leading-normal print:shadow-none print:border-none print:p-0">
            {/* Standard Header Grid (Decree 30) */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-transparent">
              {/* Left Header: Organization & Code */}
              <div className="text-center space-y-0.5">
                <div className="text-xs uppercase font-medium text-stone-700">
                  {officialDoc.docHeader.agencyParent}
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase underline decoration-1 underline-offset-4 text-stone-900">
                  {officialDoc.docHeader.agency}
                </div>
                <div className="text-xs text-stone-600 pt-1 font-sans">
                  {officialDoc.docHeader.code}
                </div>
              </div>

              {/* Right Header: National Motto & Date */}
              <div className="text-center space-y-0.5">
                <div className="text-xs sm:text-sm font-bold uppercase text-stone-900 tracking-tight">
                  {officialDoc.nationalMotto.country}
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900 underline decoration-1 underline-offset-4">
                  {officialDoc.nationalMotto.motto}
                </div>
                <div className="text-xs italic text-stone-600 pt-1 font-sans">
                  {officialDoc.docHeader.locationDate}
                </div>
              </div>
            </div>

            {/* Document Title & Subject */}
            <div className="text-center my-6 space-y-1">
              <h2 className="text-base sm:text-lg font-bold uppercase text-stone-950 tracking-wider">
                {officialDoc.title}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-stone-800">
                {officialDoc.subject}
              </p>
            </div>

            {/* Recipient */}
            <div className="mb-4 text-xs sm:text-sm font-bold text-stone-800 font-sans">
              {officialDoc.recipient}
            </div>

            {/* Body Content (Editable in-place) */}
            <div className="relative group">
              <textarea
                value={officialDoc.body}
                onChange={(e) => setOfficialDoc({ ...officialDoc, body: e.target.value })}
                rows={16}
                className="w-full text-xs sm:text-sm leading-relaxed text-stone-900 font-serif border border-transparent hover:border-stone-300 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 rounded p-1 resize-y bg-transparent"
                title="Bác có thể chỉnh sửa trực tiếp nội dung văn bản này trước khi in!"
              />
              <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-stone-400 bg-white/90 px-1.5 py-0.5 rounded border border-stone-200 pointer-events-none flex items-center gap-1 font-sans">
                <Edit3 className="w-3 h-3" />
                Có thể chỉnh sửa trực tiếp
              </span>
            </div>

            {/* Signatures & Recipients Footer (Decree 30) */}
            <div className="mt-8 pt-4 grid grid-cols-2 gap-4 text-xs font-sans">
              {/* Recipients list (Left) */}
              <div className="space-y-1">
                <div className="font-bold italic text-stone-900">Nơi nhận:</div>
                {officialDoc.recipientsList.map((rec, i) => (
                  <div key={i} className="text-stone-600 text-[11px]">
                    - {rec}
                  </div>
                ))}
              </div>

              {/* Signer Block (Right) */}
              <div className="text-center space-y-1">
                <div className="font-bold uppercase text-stone-900 whitespace-pre-line">
                  {officialDoc.signerRole}
                </div>
                <div className="h-16 flex items-center justify-center italic text-stone-400 text-[11px]">
                  (Ký, ghi rõ họ tên)
                </div>
                <div className="font-bold text-stone-950 text-sm">
                  {officialDoc.signerName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
