import React, { useState } from 'react';
import {
  BookOpen,
  Scale,
  Award,
  ShieldCheck,
  Flame,
  Coins,
  ChevronRight,
  FileCheck,
  HelpCircle,
} from 'lucide-react';

export const HandbookTab: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('mediation');

  const topics = [
    {
      id: 'mediation',
      title: 'Quy trình 5 bước hòa giải tranh chấp cơ sở',
      icon: Scale,
      tag: 'Kỹ năng dân vận',
      desc: 'Giải quyết mâu thuẫn láng giềng, tiếng ồn, ranh giới đất, tranh chấp cống rãnh',
    },
    {
      id: 'cultural_family',
      title: 'Tiêu chí bình xét Gia đình Văn hóa mới nhất',
      icon: Award,
      tag: 'Nghị định 86/2023/NĐ-CP',
      desc: 'Quy trình họp bình bầu công khai, tỷ lệ xét tặng và các trường hợp không xét',
    },
    {
      id: 'residence_vneid',
      title: 'Quy định quản lý cư trú & Đề án 06 (VNeID)',
      icon: ShieldCheck,
      tag: 'Luật Cư trú',
      desc: 'Thủ tục khai báo tạm trú cho nhà trọ, tiếp nhận thông báo lưu trú qua VNeID',
    },
    {
      id: 'fire_safety',
      title: 'Cẩm nang PCCC & Mô hình "Tổ liên gia"',
      icon: Flame,
      tag: 'An toàn phòng cháy',
      desc: 'Tiêu chuẩn mở chuồng cọp thoát hiểm thứ 2 và trang bị bình chữa cháy ban đầu',
    },
    {
      id: 'funds',
      title: 'Quy chế các khoản thu & Quỹ tự nguyện',
      icon: Coins,
      tag: 'Công khai tài chính',
      desc: 'Nguyên tắc vận động tự nguyện, không được cào bằng và công khai biên lai thu chi',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Topics */}
      <div className="lg:col-span-4 space-y-2">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 mb-3">
          <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-red-700" />
            Cẩm Nang Nghiệp Vụ Tổ Dân Phố
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Tổng hợp các văn bản quy phạm pháp luật và kinh nghiệm thực tiễn công tác cơ sở
          </p>
        </div>

        <div className="space-y-1.5">
          {topics.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-red-800 text-white border-red-800 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-amber-300' : 'bg-red-50 text-red-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs sm:text-sm">{t.title}</span>
                    </div>
                    <span
                      className={`text-[10px] inline-block px-1.5 py-0.2 rounded-full font-medium mt-1 ${
                        isSelected ? 'bg-white/20 text-amber-200' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {t.tag}
                    </span>
                    <p
                      className={`text-[11px] mt-1 line-clamp-2 ${
                        isSelected ? 'text-red-100' : 'text-stone-500'
                      }`}
                    >
                      {t.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 mt-1 ${
                    isSelected ? 'text-amber-300' : 'text-stone-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8 space-y-6">
        {selectedTopic === 'mediation' && (
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded uppercase">
                  Luật Hòa giải ở cơ sở
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  Quy trình 5 bước hòa giải mâu thuẫn tranh chấp tại khu dân cư
                </h3>
              </div>
              <Scale className="w-6 h-6 text-red-700" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  Bước 1: Tiếp nhận thông tin & Nắm bắt nguyên nhân cốt lõi
                </div>
                <p className="text-stone-600">
                  Khi nhận được phản ánh từ người dân về tiếng ồn, nước thải, lấn chiếm ngõ đi chung:
                  Tổ trưởng cần ghi nhận khách quan, không vội đưa ra kết luận đổ lỗi. Tìm hiểu
                  lịch sử quan hệ giữa hai gia đình để biết nguồn cơn bất hòa.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  Bước 2: Gặp gỡ riêng từng bên ("Hạ nhiệt" bức xúc)
                </div>
                <p className="text-stone-600">
                  Đến từng nhà lắng nghe tâm tư, chia sẻ và giải thích các quy định pháp luật cũng như
                  tình làng nghĩa xóm ("Bán anh em xa, mua láng giềng gần"). Tránh tổ chức đối thoại
                  ngay khi cả hai bên đang nóng giận.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  Bước 3: Mời người có uy tín cùng tham gia tổ hòa giải
                </div>
                <p className="text-stone-600">
                  Phối hợp với Chi hội trưởng Người cao tuổi, Chi hội Phụ nữ, Cựu chiến binh hoặc người
                  bà con họ hàng được các bên tôn trọng để cùng tác động vận động.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">
                    4
                  </span>
                  Bước 4: Tổ chức phiên gặp gỡ hòa giải tại Nhà sinh hoạt cộng đồng
                </div>
                <p className="text-stone-600">
                  Chủ trì với thái độ vô tư, công bằng. Tạo điều kiện để mỗi bên bày tỏ thiện chí. Đưa
                  ra phương án dung hòa có tình có lý (VD: Hát karaoke chỉ đến 21h30 với âm lượng vừa
                  phải; dọn dẹp chậu cây trả lại lối đi chung 1,5 mét).
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">
                    5
                  </span>
                  Bước 5: Lập Biên bản hòa giải & Theo dõi việc thực hiện cam kết
                </div>
                <p className="text-stone-600">
                  Nếu hòa giải thành: Lập biên bản có chữ ký của hai bên và Tổ hòa giải cơ sở. Nếu hòa
                  giải không thành và có dấu hiệu vi phạm hành chính/hình sự: Hướng dẫn công dân gửi đơn
                  lên UBND Phường hoặc cơ quan có thẩm quyền xử lý theo luật định.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedTopic === 'cultural_family' && (
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded uppercase">
                  Nghị định 86/2023/NĐ-CP
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  Quy định khung tiêu chuẩn & Quy trình xét tặng Gia đình Văn hóa
                </h3>
              </div>
              <Award className="w-6 h-6 text-amber-600" />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 text-stone-800">
                <h4 className="font-bold text-amber-950 mb-2">3 Nhóm Tiêu Chuẩn Cốt Lõi:</h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-700">
                  <li>
                    <strong>Gương mẫu chấp hành chủ trương, chính sách:</strong> Không có thành viên vi
                    phạm pháp luật; không khiếu kiện sai quy định; chấp hành nghiêm các quy ước của tổ
                    dân phố; không lấn chiếm lòng lề đường.
                  </li>
                  <li>
                    <strong>Kinh tế ổn định, gia đình hòa thuận:</strong> Đời sống vật chất ấm no; ông bà
                    cha mẹ gương mẫu, con cháu hiếu thảo; không có bạo lực gia đình; giữ gìn vệ sinh môi
                    trường sống.
                  </li>
                  <li>
                    <strong>Tích cực tham gia hoạt động cộng đồng:</strong> Nhiệt tình ủng hộ các phong
                    trào đền ơn đáp nghĩa, quỹ khuyến học; tham gia tổng vệ sinh ngõ phố; đoàn kết láng
                    giềng.
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-red-50/60 rounded-xl border border-red-200">
                <h4 className="font-bold text-red-950 mb-1">
                  Các Trường Hợp Không Được Xét Tặng Danh Hiệu:
                </h4>
                <p className="text-xs text-red-900">
                  - Có thành viên bị truy cứu trách nhiệm hình sự hoặc đang chấp hành biện pháp xử lý hành
                  chính.
                  <br />
                  - Có hành vi bạo lực gia đình bị lập biên bản hoặc xử phạt.
                  <br />
                  - Vi phạm nghiêm trọng về an toàn PCCC, trật tự xây dựng, không khắc phục sau nhắc nhở.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600">
                <strong>Quy trình bình xét:</strong> Họp đại diện các hộ gia đình hoặc Ban công tác Mặt
                trận và cán bộ tổ dân phố bình xét công khai vào dịp cuối năm (trước ngày 18/11 Ngày hội
                Đại đoàn kết toàn dân tộc).
              </div>
            </div>
          </div>
        )}

        {selectedTopic === 'residence_vneid' && (
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded uppercase">
                  Luật Cư trú & Đề án 06
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  Hướng dẫn quản lý cư trú, nhà trọ và cài đặt VNeID mức 2
                </h3>
              </div>
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1">Trách nhiệm của Chủ nhà trọ:</h4>
                <p className="text-stone-600 text-xs">
                  Công dân đến tạm trú từ 30 ngày trở lên phải đăng ký tạm trú. Chủ nhà trọ có nghĩa vụ
                  hướng dẫn hoặc thực hiện thông báo lưu trú qua ứng dụng VNeID hoặc Cổng dịch vụ công
                  quốc gia trước 23h00 của ngày đến lưu trú.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1">Vai trò của Tổ trưởng Tổ dân phố:</h4>
                <p className="text-stone-600 text-xs">
                  - Nắm biến động nhân khẩu (người mới đến, người chuyển đi).
                  <br />
                  - Phối hợp với Cảnh sát khu vực định kỳ rà soát, kiểm tra tạm trú, tuyên truyền công dân
                  kích hoạt tài khoản định danh VNeID mức 2 để thực hiện thủ tục trực tuyến mà không cần
                  giấy xác nhận cư trú CT07.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedTopic === 'fire_safety' && (
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded uppercase">
                  An toàn PCCC cơ sở
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  Xây dựng "Tổ liên gia an toàn PCCC" & Mở lối thoát hiểm thứ 2
                </h3>
              </div>
              <Flame className="w-6 h-6 text-red-700" />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="p-3.5 bg-red-50/60 rounded-xl border border-red-200">
                <h4 className="font-bold text-red-950 mb-1">
                  Mô hình "Tổ liên gia an toàn PCCC":
                </h4>
                <p className="text-xs text-red-900">
                  Gồm từ 5 đến 15 hộ gia đình liền kề. Mỗi nhà trang bị ít nhất 01 nút ấn báo cháy và
                  01 chuông báo động được đấu nối liên kết với nhau; trang bị tối thiểu 01 bình chữa cháy
                  xách tay (bột ABC hoặc CO2) và búa, kìm cộng lực để phá dỡ chướng ngại vật khi cần.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1">
                  Vận động mở lối thoát nạn thứ 2 (Cắt chuồng cọp):
                </h4>
                <p className="text-stone-600 text-xs">
                  Đối với các nhà hình ống trong ngõ hẹp có lồng sắt bảo vệ ban công, tầng thượng: Vận
                  động bà con cắt mở ô cửa thoát nạn kích thước tối thiểu 0.6m x 0.6m, có khóa lẫy từ bên
                  trong kèm thang dây để đảm bảo đường thoát nạn khi có hỏa hoạn ở tầng 1.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedTopic === 'funds' && (
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                  Dân chủ cơ sở & Tài chính
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  Quy chế thu các loại Quỹ & Đóng góp tự nguyện của nhân dân
                </h3>
              </div>
              <Coins className="w-6 h-6 text-emerald-700" />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 mb-1">Nguyên Tắc Bất Di Bất Dịch:</h4>
                <p className="text-xs text-emerald-900">
                  - <strong>Các quỹ xã hội - từ thiện</strong> (Quỹ Vì người nghèo, Đền ơn đáp nghĩa,
                  Khuyến học, Phòng chống thiên tai...): <strong>Hoàn toàn tự nguyện</strong>, tuyệt đối
                  không được ấn định mức bắt buộc, không được cào bằng và không được đưa vào tiêu chí gây
                  khó dễ khi công dân cần xác nhận giấy tờ!
                  <br />- <strong>Các khoản đóng góp dân sinh nội bộ</strong> (điện ngõ, sửa cống): Phải
                  được đưa ra cuộc họp toàn thể đại diện hộ dân bàn bạc và biểu quyết công khai theo Luật
                  Thực hiện Dân chủ ở cơ sở 2022.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1">Yêu cầu về Chứng từ & Công khai:</h4>
                <p className="text-stone-600 text-xs">
                  Mọi khoản thu đều phải có biên lai hoặc phiếu thu ghi rõ họ tên người nộp, số tiền. Định
                  kỳ 6 tháng hoặc cuối năm phải niêm yết bảng công khai tài chính tại Nhà sinh hoạt cộng
                  đồng và thông báo trong cuộc họp tổ dân phố.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
