/**
 * DỊCH VỤ TIẾP NHẬN & XỬ LÝ PHẢN ÁNH, KIẾN NGHỊ CƯ DÂN (CRUD & LOCAL STORAGE)
 * Tổ dân phố số 5 - Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội
 */

const PHAN_ANH_STORAGE_KEY = 'tdp5_phananh_data';

const DEFAULT_PHAN_ANH = [
  {
    id: "PA001",
    tieuDe: "Bãi rác tự phát đầu ngõ 48 Phan Văn Trường bốc mùi và gây mất mỹ quan",
    nguoiGui: "Trần Thị Mai Lan",
    soDienThoai: "0983456789",
    diaChi: "Số nhà 25, Ngõ 48 Phan Văn Trường",
    linhVuc: "Vệ sinh môi trường",
    mucDo: "Khẩn cấp",
    trangThai: "Đã xử lý",
    ngayGui: "2026-09-26 08:30",
    noiDung: "Thời gian gần đây một số hộ thuê trọ vứt rác sinh hoạt không đúng giờ quy định tại góc cột điện đầu ngõ 48. Rác lưu cữu từ đêm đến trưa hôm sau bốc mùi nồng nặc và cản trở xe cộ đi lại.",
    ketQuaXuLy: "Tổ trưởng đã phối hợp cùng Công ty Môi trường đô thị URENCO Cầu Giấy dọn sạch lúc 15h00 cùng ngày; đã gắn camera giám sát phạt nguội và cắm biển 'Cấm xả rác bừa bãi'.",
    nguoiXuLy: "Nguyễn Văn Hưng (Tổ trưởng)",
    ngayXuLy: "2026-09-26 17:00"
  },
  {
    id: "PA002",
    tieuDe: "Bóng đèn chiếu sáng ngõ 60 Trần Quốc Vượng bị cháy tối om",
    nguoiGui: "Vũ Đình Tuấn",
    soDienThoai: "0934112233",
    diaChi: "Số nhà 33, Ngõ 60 Trần Quốc Vượng",
    linhVuc: "Hạ tầng & Đô thị",
    mucDo: "Quan trọng",
    trangThai: "Đang xử lý",
    ngayGui: "2026-09-29 19:15",
    noiDung: "Hai bóng đèn LED chiếu sáng công cộng tại ngách 60/12 bị hỏng 3 ngày nay, ban đêm rất tối, ngõ nhỏ nhiều phụ nữ và học sinh đi lại nguy hiểm.",
    ketQuaXuLy: "Tổ dân phố đã cử đồng chí phụ trách an ninh mua 02 bóng LED 50W mới. Đã hẹn thợ điện thay thế vào sáng mai 02/10/2026.",
    nguoiXuLy: "Nguyễn Văn Hưng (Tổ trưởng)",
    ngayXuLy: "2026-09-30 09:30"
  },
  {
    id: "PA003",
    tieuDe: "Hát karaoke loa kéo gây ồn ào quá 23h đêm tại ngách 12/48",
    nguoiGui: "Phạm Quang Minh",
    soDienThoai: "0976123456",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    linhVuc: "An ninh & Tiếng ồn",
    mucDo: "Khẩn cấp",
    trangThai: "Đã xử lý",
    ngayGui: "2026-09-27 23:20",
    noiDung: "Nhóm thanh niên thuê trọ tại số 15 thường xuyên mở loa kéo hát to sau 22h30 đêm, ảnh hưởng đến giấc ngủ của người cao tuổi và các cháu học sinh ôn thi.",
    ketQuaXuLy: "Tổ trưởng và Cảnh sát khu vực đã trực tiếp xuống hiện trường lập biên bản nhắc nhở, yêu cầu tắt loa và ký cam kết chấp hành quy ước khu dân cư.",
    nguoiXuLy: "Lê Hoàng Anh (Cán bộ CSKV phối hợp)",
    ngayXuLy: "2026-09-27 23:50"
  },
  {
    id: "PA004",
    tieuDe: "Cống thoát nước ngõ 20 Dịch Vọng Hậu bị ứ đọng sau mưa lớn",
    nguoiGui: "Hoàng Thu Thảo",
    soDienThoai: "0945987654",
    diaChi: "Phòng 402, Nhà 14 Ngõ 20 Dịch Vọng Hậu",
    linhVuc: "Hạ tầng & Đô thị",
    mucDo: "Quan trọng",
    trangThai: "Chờ tiếp nhận",
    ngayGui: "2026-10-01 06:45",
    noiDung: "Trận mưa rạng sáng nay làm đoạn cống trước cửa nhà số 14 bị tắc do lá cây và bùn cát tràn vào hố ga, nước rút rất chậm.",
    ketQuaXuLy: "",
    nguoiXuLy: "",
    ngayXuLy: ""
  },
  {
    id: "PA005",
    tieuDe: "Đề xuất mở lớp hướng dẫn cài đặt VNeID mức 2 cho người cao tuổi",
    nguoiGui: "Bùi Trọng Đạt",
    soDienThoai: "0965332211",
    diaChi: "Số nhà 45, Ngõ 48 Phan Văn Trường",
    linhVuc: "Cải cách hành chính",
    mucDo: "Bình thường",
    trangThai: "Đang xử lý",
    ngayGui: "2026-09-25 14:00",
    noiDung: "Các cụ hưu trí trong tổ rất mong muốn chi đoàn thanh niên hỗ trợ hướng dẫn kích hoạt lại tài khoản VNeID và tích hợp BHYT vào căn cước.",
    ketQuaXuLy: "Ban cán sự đã thống nhất với Bí thư Chi đoàn mở bàn hỗ trợ chuyển đổi số lưu động tại Nhà văn hóa vào thứ Bảy tới.",
    nguoiXuLy: "Trần Thị Mai Lan (Tổ phó)",
    ngayXuLy: "2026-09-26 10:00"
  }
];

const phanAnhService = {
  getAll() {
    try {
      const data = localStorage.getItem(PHAN_ANH_STORAGE_KEY);
      if (!data) {
        this.saveAll(DEFAULT_PHAN_ANH);
        return DEFAULT_PHAN_ANH;
      }
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_PHAN_ANH;
    }
  },

  saveAll(list) {
    localStorage.setItem(PHAN_ANH_STORAGE_KEY, JSON.stringify(list));
  },

  getById(id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  // Tạo phản ánh mới
  create(itemData) {
    const list = this.getAll();
    const count = list.length + 1;
    const newId = `PA${String(count).padStart(3, '0')}`;

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    const newRecord = {
      id: newId,
      tieuDe: itemData.tieuDe || "Phản ánh từ cư dân",
      nguoiGui: itemData.nguoiGui || "Bà con nhân dân",
      soDienThoai: itemData.soDienThoai || "",
      diaChi: itemData.diaChi || "Tổ dân phố số 5",
      linhVuc: itemData.linhVuc || "Vệ sinh môi trường",
      mucDo: itemData.mucDo || "Bình thường",
      trangThai: itemData.trangThai || "Chờ tiếp nhận",
      ngayGui: formattedDate,
      noiDung: itemData.noiDung || "",
      ketQuaXuLy: itemData.ketQuaXuLy || "",
      nguoiXuLy: itemData.nguoiXuLy || "",
      ngayXuLy: itemData.ngayXuLy || ""
    };

    list.unshift(newRecord);
    this.saveAll(list);
    return newRecord;
  },

  // Cập nhật trạng thái và ghi nhận kết quả xử lý
  updateStatus(id, newStatus, ketQua, nguoiXuLy) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    const item = list[index];
    item.trangThai = newStatus;
    if (ketQua !== undefined) item.ketQuaXuLy = ketQua;
    if (nguoiXuLy !== undefined) item.nguoiXuLy = nguoiXuLy;
    
    if (newStatus === 'Đã xử lý' || newStatus === 'Đang xử lý') {
      const now = new Date();
      item.ngayXuLy = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    }

    this.saveAll(list);
    return item;
  },

  // Sửa phản ánh
  update(id, updatedData) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    list[index] = { ...list[index], ...updatedData };
    this.saveAll(list);
    return list[index];
  },

  delete(id) {
    const list = this.getAll();
    const filtered = list.filter(item => item.id !== id);
    if (filtered.length !== list.length) {
      this.saveAll(filtered);
      return true;
    }
    return false;
  },

  search(keyword = '', linhVuc = '', mucDo = '', trangThai = '') {
    let list = this.getAll();
    const kw = keyword.toLowerCase().trim();

    if (kw) {
      list = list.filter(item =>
        item.tieuDe.toLowerCase().includes(kw) ||
        item.nguoiGui.toLowerCase().includes(kw) ||
        item.noiDung.toLowerCase().includes(kw) ||
        item.diaChi.toLowerCase().includes(kw) ||
        (item.soDienThoai && item.soDienThoai.includes(kw))
      );
    }

    if (linhVuc && linhVuc !== 'all') {
      list = list.filter(item => item.linhVuc === linhVuc);
    }

    if (mucDo && mucDo !== 'all') {
      list = list.filter(item => item.mucDo === mucDo);
    }

    if (trangThai && trangThai !== 'all') {
      list = list.filter(item => item.trangThai === trangThai);
    }

    return list;
  },

  getStats() {
    const list = this.getAll();
    const tongSo = list.length;
    const daXuLy = list.filter(p => p.trangThai === 'Đã xử lý').length;
    const dangXuLy = list.filter(p => p.trangThai === 'Đang xử lý').length;
    const choTiepNhan = list.filter(p => p.trangThai === 'Chờ tiếp nhận').length;
    const khanCap = list.filter(p => p.mucDo === 'Khẩn cấp').length;

    return {
      tongSo,
      daXuLy,
      dangXuLy,
      choTiepNhan,
      khanCap
    };
  },

  resetToDefault() {
    this.saveAll(DEFAULT_PHAN_ANH);
    return DEFAULT_PHAN_ANH;
  }
};

if (typeof window !== 'undefined') {
  window.phanAnhService = phanAnhService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = phanAnhService;
}
