import React, { useState } from 'react';
import { OrganizationInfo, GeneratedNotice } from '../types';
import { sampleNoticeTemplates } from '../data/mockData';
import {
  BellRing,
  Sparkles,
  Copy,
  Check,
  Printer,
  Smartphone,
  FileCheck2,
  Share2,
  Calendar,
  AlertTriangle,
  HeartHandshake,
} from 'lucide-react';

interface NoticeGeneratorTabProps {
  orgInfo: OrganizationInfo;
}

export const NoticeGeneratorTab: React.FC<NoticeGeneratorTabProps> = ({ orgInfo }) => {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [targetAudience, setTargetAudience] = useState('Toàn thể bà con nhân dân trong tổ');
  const [urgentLevel, setUrgentLevel] = useState('Bình thường');
  const [tone, setTone] = useState<'friendly' | 'urgent' | 'mobilizing' | 'concise'>('friendly');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePreview, setActivePreview] = useState<'zalo' | 'print'>('zalo');
  const [copied, setCopied] = useState(false);

  const [generatedNotice, setGeneratedNotice] = useState<GeneratedNotice>({
    title: 'Lịch tổng vệ sinh môi trường "Ngày Chủ Nhật Xanh"',
    zaloVersion: `📢 KÍNH GỬI BÀ CON NHÂN DÂN ${orgInfo.name.toUpperCase()}!\n\n🌿 Nhằm giữ gìn đường làng ngõ phố phong quang, sạch đẹp và phòng chống dịch sốt xuất huyết trong mùa mưa bão, Ban Quản lý Tổ dân phố xin thông báo:\n\n⏰ THỜI GIAN: 07h00 sáng Chủ Nhật, ngày 04/10/2026\n📍 ĐỊA ĐIỂM TẬP TRUNG: Sân sinh hoạt cộng đồng ngõ Trạm\n👥 THÀNH PHẦN: Kính mời mỗi gia đình cử ít nhất 01 đại diện cùng tham gia\n\n🧹 NỘI DUNG CÔNG VIỆC:\n- Quét dọn lòng ngõ, thu gom bao bì, rác thải\n- Khơi thông các miệng hố ga, rãnh thoát nước\n- Lật úp các chai lọ đọng nước để diệt bọ gậy, lăng quăng\n\n🙏 Sự tham gia nhiệt tình của mỗi gia đình là đóng góp thiết thực cho nếp sống văn minh đô thị của tổ dân phố chúng ta!\n\n📞 Mọi thông tin xin liên hệ Bác ${orgInfo.leaderName} (Tổ trưởng) - ĐT: ${orgInfo.leaderPhone}.\n\nTrân trọng cảm ơn bà con! ❤️`,
    printVersion: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n${orgInfo.ward.toUpperCase()}\n${orgInfo.name.toUpperCase()}\n\nTHÔNG BÁO\nVề việc tổ chức "Ngày Chủ Nhật Xanh" tổng vệ sinh môi trường\n\nKính gửi: Toàn thể nhân dân cư trú tại ${orgInfo.name}\n\nThực hiện phong trào Toàn dân đoàn kết xây dựng đời sống văn hóa, Ban Quản lý Tổ dân phố trân trọng thông báo kế hoạch tổng vệ sinh môi trường:\n\n1. Thời gian: Đúng 07 giờ 00 phút, Chủ Nhật (ngày 04/10/2026).\n2. Địa điểm: Toàn bộ các tuyến ngõ ngách thuộc địa bàn tổ dân phố.\n3. Yêu cầu: Mỗi hộ gia đình cử ít nhất 01 thành viên tham gia quét dọn trước cửa nhà và cùng tham gia dọn dẹp các điểm công cộng; tự trang bị chổi, xẻng, khẩu trang y tế.\n\nĐề nghị các đồng chí cán bộ đoàn thể, tổ liên gia tuyên truyền, nhắc nhở và bà con nhân dân nhiệt tình hưởng ứng.\n\nNơi nhận:\n- Bà con nhân dân TDP;\n- Chi bộ, Ban CTMT (để báo cáo);\n- Lưu: TDP.\n\nTM. BAN QUẢN LÝ TỔ DÂN PHỐ\nTỔ TRƯỞNG\n\n\n${orgInfo.leaderName}`,
    keyPoints: [
      'Thời gian: 07h00 Chủ Nhật (04/10/2026)',
      'Địa điểm: Sân sinh hoạt cộng đồng ngõ Trạm',
      'Mỗi hộ cử 01 đại diện mang chổi, xẻng tham gia',
    ],
    reminders: 'Đề nghị bà con chú ý an toàn lao động và đeo khẩu trang y tế.',
  });

  const handleApplyTemplate = (tmpl: (typeof sampleNoticeTemplates)[0]) => {
    setTopic(tmpl.topic);
    setDetails(tmpl.details);
    setTargetAudience(tmpl.targetAudience);
    setUrgentLevel(tmpl.urgentLevel);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('Bác vui lòng nhập chủ đề thông báo!');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          details,
          targetAudience,
          urgentLevel,
          channel: 'Zalo & Bảng tin',
          tone,
          toDanPhoName: orgInfo.name,
        }),
      });

      const data = await res.json();
      setGeneratedNotice(data);
    } catch (err) {
      console.error(err);
      alert('Có lỗi khi soạn thảo thông báo. Vui lòng thử lại!');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Form Controls Column (Left) */}
      <div className="lg:col-span-5 space-y-5">
        {/* Template Quick Select */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4">
          <div className="flex items-center gap-2 mb-3 text-stone-800 font-semibold text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Chọn mẫu thông báo phổ biến:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {sampleNoticeTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => handleApplyTemplate(t)}
                className="text-left p-2.5 rounded-lg border border-stone-200 hover:border-red-400 hover:bg-red-50/50 text-xs text-stone-700 transition-colors flex flex-col justify-between"
              >
                <span className="font-medium text-stone-900 line-clamp-1">{t.title}</span>
                <span className="text-[11px] text-stone-500 mt-1 line-clamp-1">{t.topic}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5 space-y-4">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
            <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <BellRing className="w-4 h-4 text-red-700" />
              Thiết lập thông báo gửi dân
            </h2>
            <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
              Văn phong thân thiện
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Chủ đề thông báo *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="VD: Lịch tạm ngừng cấp điện, Tiêm chủng mở rộng, Thu các loại quỹ..."
              className="w-full rounded-lg border border-stone-300 p-2.5 text-xs sm:text-sm focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Thời gian, địa điểm & nội dung chi tiết
            </label>
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="VD: Từ 8h00 - 11h30 sáng thứ 7 tại Trạm y tế; yêu cầu mang theo sổ tiêm chủng và CCCD..."
              className="w-full rounded-lg border border-stone-300 p-2.5 text-xs sm:text-sm focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Đối tượng tiếp nhận
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Toàn thể bà con, các hộ thuê trọ..."
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mức độ thông báo
              </label>
              <select
                value={urgentLevel}
                onChange={(e) => setUrgentLevel(e.target.value)}
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none bg-white"
              >
                <option value="Bình thường">Bình thường</option>
                <option value="Quan trọng">Quan trọng (Lưu ý cao)</option>
                <option value="Khẩn cấp">Khẩn cấp (Cần làm ngay)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Sắc thái văn phong
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTone('friendly')}
                className={`p-2 rounded-lg border text-left flex items-center gap-2 ${
                  tone === 'friendly'
                    ? 'border-red-700 bg-red-50 text-red-900 font-semibold ring-1 ring-red-700'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-red-600" />
                <span>Thân thiện, ấm áp</span>
              </button>

              <button
                type="button"
                onClick={() => setTone('urgent')}
                className={`p-2 rounded-lg border text-left flex items-center gap-2 ${
                  tone === 'urgent'
                    ? 'border-red-700 bg-red-50 text-red-900 font-semibold ring-1 ring-red-700'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Khẩn cấp, dứt khoát</span>
              </button>

              <button
                type="button"
                onClick={() => setTone('mobilizing')}
                className={`p-2 rounded-lg border text-left flex items-center gap-2 ${
                  tone === 'mobilizing'
                    ? 'border-red-700 bg-red-50 text-red-900 font-semibold ring-1 ring-red-700'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Kêu gọi, vận động</span>
              </button>

              <button
                type="button"
                onClick={() => setTone('concise')}
                className={`p-2 rounded-lg border text-left flex items-center gap-2 ${
                  tone === 'concise'
                    ? 'border-red-700 bg-red-50 text-red-900 font-semibold ring-1 ring-red-700'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ngắn gọn, súc tích</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded-xl bg-red-800 hover:bg-red-900 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span>AI đang soạn thảo 2 phiên bản...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Soạn thông báo ngay bằng AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Output Column (Right) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Toggle Mode Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-2 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActivePreview('zalo')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activePreview === 'zalo'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Bản tin Zalo (Gửi ngay)</span>
            </button>
            <button
              onClick={() => setActivePreview('print')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activePreview === 'print'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Bản in A4 Bảng tin</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                copyToClipboard(
                  activePreview === 'zalo'
                    ? generatedNotice.zaloVersion
                    : generatedNotice.printVersion
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép 1 chạm</span>
                </>
              )}
            </button>

            {activePreview === 'print' && (
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-800 hover:bg-red-900 text-white text-xs font-medium transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In thông báo</span>
              </button>
            )}
          </div>
        </div>

        {/* View Mode 1: Zalo Phone Preview */}
        {activePreview === 'zalo' && (
          <div className="bg-[#e9ecef] rounded-2xl p-4 sm:p-6 border border-stone-300 shadow-inner flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-stone-800">
              {/* Simulated Phone Top Header */}
              <div className="bg-[#0068ff] text-white px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-[10px]">
                    Zalo
                  </div>
                  <div>
                    <div className="font-semibold">{orgInfo.zaloGroup}</div>
                    <div className="text-[10px] text-blue-100">168 thành viên • Hoạt động</div>
                  </div>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Tổ dân phố</span>
              </div>

              {/* Chat Message Bubble */}
              <div className="p-4 bg-[#f4f5f7] min-h-[380px] space-y-3">
                <div className="text-center">
                  <span className="bg-stone-200 text-stone-600 text-[10px] px-2.5 py-0.5 rounded-full">
                    Hôm nay
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-stone-200/70 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans whitespace-pre-wrap">
                  {generatedNotice.zaloVersion}
                </div>

                {/* Key Summary Pill */}
                {generatedNotice.keyPoints && generatedNotice.keyPoints.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                    <div className="font-semibold text-amber-950 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      Ghi nhớ nhanh:
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800">
                      {generatedNotice.keyPoints.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Phone Action bar */}
              <div className="bg-white border-t border-stone-200 px-3 py-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">Đã định dạng tối ưu gửi nhóm Zalo</span>
                <button
                  onClick={() => copyToClipboard(generatedNotice.zaloVersion)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Sao chép gửi Zalo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: A4 Notice Board Preview */}
        {activePreview === 'print' && (
          <div className="bg-stone-100 rounded-xl p-4 sm:p-6 border border-stone-300 shadow-inner flex justify-center">
            <div className="w-full max-w-2xl bg-white p-8 sm:p-12 shadow-lg border border-stone-300 font-serif leading-relaxed text-stone-900 print:shadow-none print:border-none print:p-0">
              <div className="text-center space-y-1 mb-6">
                <div className="font-bold text-xs uppercase tracking-wider text-stone-700">
                  {orgInfo.ward.toUpperCase()} - {orgInfo.district.toUpperCase()}
                </div>
                <div className="font-bold text-sm uppercase underline decoration-1 underline-offset-4 text-red-900">
                  BAN QUẢN LÝ {orgInfo.name.toUpperCase()}
                </div>
                <div className="text-[11px] italic text-stone-500 pt-1">
                  {orgInfo.city}, ngày 01 tháng 10 năm 2026
                </div>
              </div>

              <div className="text-center my-6 space-y-1">
                <h3 className="text-lg sm:text-xl font-bold uppercase text-red-900 tracking-wide">
                  THÔNG BÁO DÂN CƯ
                </h3>
                <p className="text-xs italic text-stone-600">
                  (Về việc: {topic || generatedNotice.title})
                </p>
              </div>

              <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-stone-800 space-y-3 font-sans">
                {generatedNotice.printVersion}
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-stone-300 flex justify-between items-end text-xs font-sans">
                <div>
                  <span className="font-semibold">Nơi nhận:</span>
                  <div className="text-stone-500 text-[11px]">- Toàn thể bà con TDP;</div>
                  <div className="text-stone-500 text-[11px]">- Bảng tin TDP (để niêm yết);</div>
                  <div className="text-stone-500 text-[11px]">- Lưu: BQL.</div>
                </div>

                <div className="text-center space-y-1">
                  <div className="font-bold uppercase text-stone-800">TM. TỔ DÂN PHỐ</div>
                  <div className="font-semibold text-stone-700">TỔ TRƯỞNG</div>
                  <div className="h-12 flex items-center justify-center italic text-stone-400 text-[10px]">
                    (Ký và ghi rõ họ tên)
                  </div>
                  <div className="font-bold text-stone-900">{orgInfo.leaderName}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
