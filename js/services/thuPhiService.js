/**
 * DỊCH VỤ QUẢN LÝ THU PHÍ & QUỸ ĐÓNG GÓP (CRUD & LOCAL STORAGE)
 * Tổ dân phố số 5 - Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội
 */

const KHOAN_THU_STORAGE_KEY = 'tdp5_khoanthu_data';
const THU_PHI_REC_STORAGE_KEY = 'tdp5_thuphi_records';

const DEFAULT_KHOAN_THU = [
  {
    id: "KT01",
    tenKhoanThu: "Phí vệ sinh môi trường năm 2026",
    loaiKhoan: "Bắt buộc",
    mucThu: 720000,
    donViTinh: "đồng/hộ/năm",
    hanNop: "2026-06-30",
    moTa: "Thu gom và xử lý rác thải sinh hoạt hàng ngày theo đơn giá TP Hà Nội"
  },
  {
    id: "KT02",
    tenKhoanThu: "Quỹ Đền ơn đáp nghĩa 2026",
    loaiKhoan: "Vận động tự nguyện",
    mucThu: 100000,
    donViTinh: "đồng/hộ",
    hanNop: "2026-07-27",
    moTa: "Thăm hỏi thương bệnh binh, gia đình liệt sĩ và người có công ngày 27/7"
  },
  {
    id: "KT03",
    tenKhoanThu: "Quỹ Vì người nghèo & An sinh",
    loaiKhoan: "Vận động tự nguyện",
    mucThu: 100000,
    donViTinh: "đồng/hộ",
    hanNop: "2026-11-18",
    moTa: "Hỗ trợ các hoàn cảnh khó khăn đột xuất và phong trào an sinh tổ dân phố"
  },
  {
    id: "KT04",
    tenKhoanThu: "Quỹ Khuyến học & Tết Thiếu nhi 1/6",
    loaiKhoan: "Vận động tự nguyện",
    mucThu: 150000,
    donViTinh: "đồng/hộ",
    hanNop: "2026-05-25",
    moTa: "Tặng quà khen thưởng học sinh giỏi các cấp và tổ chức Trung thu, 1/6 cho các cháu"
  },
  {
    id: "KT05",
    tenKhoanThu: "Phí An ninh tự quản & Bảo trì Camera",
    loaiKhoan: "Bắt buộc cơ sở",
    mucThu: 240000,
    donViTinh: "đồng/hộ/năm",
    hanNop: "2026-04-30",
    moTa: "Duy trì hệ thống 12 camera an ninh tại các ngõ và kinh phí tuần tra ban đêm"
  }
];

const DEFAULT_RECORDS = [
  // Hộ HK-05-001 (Nguyễn Văn Hưng)
  {
    id: "REC001",
    maHo: "HK-05-001",
    chuHo: "Nguyễn Văn Hưng",
    diaChi: "Số nhà 12, Ngõ 48 Phan Văn Trường",
    khoanThuId: "KT01",
    tenKhoanThu: "Phí vệ sinh môi trường năm 2026",
    soTienPhaiNop: 720000,
    soTienDaNop: 720000,
    trangThai: "Đã nộp",
    ngayNop: "2026-01-10",
    phuongThuc: "Chuyển khoản QR",
    nguoiThu: "Trần Thị Mai Lan (Tổ phó)",
    maBienLai: "BL-2026-0001",
    ghiChu: "Đã chuyển khoản Vietcombank"
  },
  {
    id: "REC002",
    maHo: "HK-05-001",
    chuHo: "Nguyễn Văn Hưng",
    diaChi: "Số nhà 12, Ngõ 48 Phan Văn Trường",
    khoanThuId: "KT02",
    tenKhoanThu: "Quỹ Đền ơn đáp nghĩa 2026",
    soTienPhaiNop: 100000,
    soTienDaNop: 200000,
    trangThai: "Đã nộp",
    ngayNop: "2026-01-10",
    phuongThuc: "Chuyển khoản QR",
    nguoiThu: "Trần Thị Mai Lan (Tổ phó)",
    maBienLai: "BL-2026-0002",
    ghiChu: "Ủng hộ vượt mức quy định"
  },
  {
    id: "REC003",
    maHo: "HK-05-001",
    chuHo: "Nguyễn Văn Hưng",
    diaChi: "Số nhà 12, Ngõ 48 Phan Văn Trường",
    khoanThuId: "KT04",
    tenKhoanThu: "Quỹ Khuyến học & Tết Thiếu nhi 1/6",
    soTienPhaiNop: 150000,
    soTienDaNop: 150000,
    trangThai: "Đã nộp",
    ngayNop: "2026-02-15",
    phuongThuc: "Tiền mặt",
    nguoiThu: "Trần Thị Mai Lan (Tổ phó)",
    maBienLai: "BL-2026-0015",
    ghiChu: ""
  },

  // Hộ HK-05-002 (Trần Thị Mai Lan)
  {
    id: "REC004",
    maHo: "HK-05-002",
    chuHo: "Trần Thị Mai Lan",
    diaChi: "Số nhà 25, Ngõ 48 Phan Văn Trường",
    khoanThuId: "KT01",
    tenKhoanThu: "Phí vệ sinh môi trường năm 2026",
    soTienPhaiNop: 720000,
    soTienDaNop: 720000,
    trangThai: "Đã nộp",
    ngayNop: "2026-01-12",
    phuongThuc: "Chuyển khoản QR",
    nguoiThu: "Nguyễn Văn Hưng (Tổ trưởng)",
    maBienLai: "BL-2026-0005",
    ghiChu: ""
  },
  {
    id: "REC005",
    maHo: "HK-05-002",
    chuHo: "Trần Thị Mai Lan",
    diaChi: "Số nhà 25, Ngõ 48 Phan Văn Trường",
    khoanThuId: "KT02",
    tenKhoanThu: "Quỹ Đền ơn đáp nghĩa 2026",
    soTienPhaiNop: 100000,
    soTienDaNop: 100000,
    trangThai: "Đã nộp",
    ngayNop: "2026-01-12",
    phuongThuc: "Chuyển khoản QR",
    nguoiThu: "Nguyễn Văn Hưng (Tổ trưởng)",
    maBienLai: "BL-2026-0006",
    ghiChu: ""
  },

  // Hộ HK-05-003 (Lê Hoàng Anh)
  {
    id: "REC006",
    maHo: "HK-05-003",
    chuHo: "Lê Hoàng Anh",
    diaChi: "Tầng 3, Nhà 5A Trần Quốc Vượng",
    khoanThuId: "KT01",
    tenKhoanThu: "Phí vệ sinh môi trường năm 2026",
    soTienPhaiNop: 720000,
    soTienDaNop: 720000,
    trangThai: "Đã nộp",
    ngayNop: "2026-02-01",
    phuongThuc: "Chuyển khoản QR",
    nguoiThu: "Nguyễn Văn Hưng (Tổ trưởng)",
    maBienLai: "BL-2026-0022",
    ghiChu: "Hộ tạm trú đã nộp đủ phí vệ sinh năm"
  },
  {
    id: "REC007",
    maHo: "HK-05-003",
    chuHo: "Lê Hoàng Anh",
    diaChi: "Tầng 3, Nhà 5A Trần Quốc Vượng",
    khoanThuId: "KT05",
    tenKhoanThu: "Phí An ninh tự quản & Bảo trì Camera",
    soTienPhaiNop: 240000,
    soTienDaNop: 0,
    trangThai: "Chưa nộp",
    ngayNop: "",
    phuongThuc: "",
    nguoiThu: "",
    maBienLai: "",
    ghiChu: "Đã gửi thông báo qua Zalo"
  },

  // Hộ HK-05-004 (Phạm Quang Minh - Thương binh)
  {
    id: "REC008",
    maHo: "HK-05-004",
    chuHo: "Phạm Quang Minh",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    khoanThuId: "KT01",
    tenKhoanThu: "Phí vệ sinh môi trường năm 2026",
    soTienPhaiNop: 720000,
    soTienDaNop: 720000,
    trangThai: "Đã nộp",
    ngayNop: "2026-01-20",
    phuongThuc: "Tiền mặt",
    nguoiThu: "Nguyễn Văn Hưng (Tổ trưởng)",
    maBienLai: "BL-2026-0031",
    ghiChu: ""
  },
  {
    id: "REC009",
    maHo: "HK-05-004",
    chuHo: "Phạm Quang Minh",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    khoanThuId: "KT02",
    tenKhoanThu: "Quỹ Đền ơn đáp nghĩa 2026",
    soTienPhaiNop: 0,
    soTienDaNop: 0,
    trangThai: "Miễn giảm",
    ngayNop: "2026-01-20",
    phuongThuc: "Chính sách",
    nguoiThu: "Nguyễn Văn Hưng (Tổ trưởng)",
    maBienLai: "BL-2026-0032",
    ghiChu: "Gia đình chính sách có người có công / thương binh"
  },

  // Hộ HK-05-005 (Hoàng Thu Thảo)
  {
    id: "REC010",
    maHo: "HK-05-005",
    chuHo: "Hoàng Thu Thảo",
    diaChi: "Phòng 402, Nhà 14 Ngõ 20 Dịch Vọng Hậu",
    khoanThuId: "KT01",
    tenKhoanThu: "Phí vệ sinh môi trường năm 2026",
    soTienPhaiNop: 720000,
    soTienDaNop: 0,
    trangThai: "Chưa nộp",
    ngayNop: "",
    phuongThuc: "",
    nguoiThu: "",
    maBienLai: "",
    ghiChu: "Hẹn nộp vào đợt 2"
  },

  // Hộ HK-05-006 (Vũ Đình Tuấn)
  {
    id: "REC011",
    maHo: "HK-05-006",
    chuHo: "Vũ Đình Tuấn",
    diaChi: "Số nhà 33, Ngõ 60 Trần Quốc Vượng",
    khoanThuId: "KT01",
    tenKhoanThu: "Phí vệ sinh môi trường năm 2026",
    soTienPhaiNop: 720000,
    soTienDaNop: 720000,
    trangThai: "Đã nộp",
    ngayNop: "2026-02-10",
    phuongThuc: "Tiền mặt",
    nguoiThu: "Nguyễn Văn Hưng (Tổ trưởng)",
    maBienLai: "BL-2026-0045",
    ghiChu: ""
  },
  {
    id: "REC012",
    maHo: "HK-05-006",
    chuHo: "Vũ Đình Tuấn",
    diaChi: "Số nhà 33, Ngõ 60 Trần Quốc Vượng",
    khoanThuId: "KT04",
    tenKhoanThu: "Quỹ Khuyến học & Tết Thiếu nhi 1/6",
    soTienPhaiNop: 150000,
    soTienDaNop: 0,
    trangThai: "Chưa nộp",
    ngayNop: "",
    phuongThuc: "",
    nguoiThu: "",
    maBienLai: "",
    ghiChu: ""
  }
];

const thuPhiService = {
  // 1. Quản lý danh mục khoản thu
  getKhoanThuList() {
    try {
      const data = localStorage.getItem(KHOAN_THU_STORAGE_KEY);
      if (!data) {
        this.saveKhoanThuList(DEFAULT_KHOAN_THU);
        return DEFAULT_KHOAN_THU;
      }
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_KHOAN_THU;
    }
  },

  saveKhoanThuList(list) {
    localStorage.setItem(KHOAN_THU_STORAGE_KEY, JSON.stringify(list));
  },

  addKhoanThu(itemData) {
    const list = this.getKhoanThuList();
    const count = list.length + 1;
    const newId = `KT${String(count).padStart(2, '0')}`;

    const newRecord = {
      id: newId,
      tenKhoanThu: itemData.tenKhoanThu || "Khoản thu mới",
      loaiKhoan: itemData.loaiKhoan || "Vận động tự nguyện",
      mucThu: parseInt(itemData.mucThu, 10) || 50000,
      donViTinh: itemData.donViTinh || "đồng/hộ",
      hanNop: itemData.hanNop || "2026-12-31",
      moTa: itemData.moTa || ""
    };

    list.push(newRecord);
    this.saveKhoanThuList(list);

    // Tự động khởi tạo bản ghi thu cho tất cả các hộ hiện tại nếu là khoản bắt buộc
    if (typeof window !== 'undefined' && window.hoKhauService) {
      const hoList = window.hoKhauService.getAll();
      const recList = this.getAllRecords();
      hoList.forEach(ho => {
        const recId = `REC${String(recList.length + 1).padStart(3, '0')}`;
        recList.push({
          id: recId,
          maHo: ho.maHo,
          chuHo: ho.chuHo,
          diaChi: ho.diaChi,
          khoanThuId: newRecord.id,
          tenKhoanThu: newRecord.tenKhoanThu,
          soTienPhaiNop: newRecord.mucThu,
          soTienDaNop: 0,
          trangThai: "Chưa nộp",
          ngayNop: "",
          phuongThuc: "",
          nguoiThu: "",
          maBienLai: "",
          ghiChu: ""
        });
      });
      this.saveRecords(recList);
    }

    return newRecord;
  },

  // 2. Quản lý bản ghi đóng nộp của các hộ
  getAllRecords() {
    try {
      const data = localStorage.getItem(THU_PHI_REC_STORAGE_KEY);
      if (!data) {
        this.saveRecords(DEFAULT_RECORDS);
        return DEFAULT_RECORDS;
      }
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_RECORDS;
    }
  },

  saveRecords(list) {
    localStorage.setItem(THU_PHI_REC_STORAGE_KEY, JSON.stringify(list));
  },

  getRecordById(id) {
    const list = this.getAllRecords();
    return list.find(r => r.id === id) || null;
  },

  // Ghi nhận nộp tiền cho 1 bản ghi
  recordPayment(recId, soTien, phuongThuc, nguoiThu, ghiChu) {
    const list = this.getAllRecords();
    const index = list.findIndex(r => r.id === recId);
    if (index === -1) return null;

    const record = list[index];
    const amount = parseInt(soTien, 10);
    record.soTienDaNop = amount;
    record.ngayNop = new Date().toISOString().split('T')[0];
    record.phuongThuc = phuongThuc || 'Tiền mặt';
    record.nguoiThu = nguoiThu || 'Cán bộ TDP 5';
    record.ghiChu = ghiChu || record.ghiChu || '';
    
    if (amount >= record.soTienPhaiNop) {
      record.trangThai = 'Đã nộp';
    } else if (amount > 0) {
      record.trangThai = 'Nộp thiếu';
    } else {
      record.trangThai = 'Chưa nộp';
    }

    // Cấp mã biên lai nếu chưa có
    if (!record.maBienLai) {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      record.maBienLai = `BL-2026-${randomCode}`;
    }

    this.saveRecords(list);
    return record;
  },

  // Tạo biên lai / giấy xác nhận
  getReceiptData(recId) {
    const rec = this.getRecordById(recId);
    if (!rec) return null;

    return {
      tieuDe: "BIÊN LAI THU CÁC KHOẢN ĐÓNG GÓP TỔ DÂN PHỐ",
      coQuan: "TỔ DÂN PHỐ SỐ 5 - PHƯỜNG DỊCH VỌNG HẬU",
      maBienLai: rec.maBienLai || "BL-2026-CHUA-CAP",
      ngayThu: rec.ngayNop || new Date().toISOString().split('T')[0],
      hoTenNguoiNop: rec.chuHo,
      maHo: rec.maHo,
      diaChi: rec.diaChi,
      noiDung: rec.tenKhoanThu,
      soTien: rec.soTienDaNop || rec.soTienPhaiNop,
      hinhThuc: rec.phuongThuc || "Tiền mặt",
      nguoiThuTien: rec.nguoiThu || "Tổ trưởng Nguyễn Văn Hưng",
      ghiChu: rec.ghiChu
    };
  },

  // Tìm kiếm và lọc
  search(keyword = '', khoanThuId = '', trangThai = '') {
    let list = this.getAllRecords();
    const kw = keyword.toLowerCase().trim();

    if (kw) {
      list = list.filter(r =>
        r.chuHo.toLowerCase().includes(kw) ||
        r.maHo.toLowerCase().includes(kw) ||
        r.diaChi.toLowerCase().includes(kw) ||
        (r.maBienLai && r.maBienLai.toLowerCase().includes(kw))
      );
    }

    if (khoanThuId && khoanThuId !== 'all') {
      list = list.filter(r => r.khoanThuId === khoanThuId);
    }

    if (trangThai && trangThai !== 'all') {
      list = list.filter(r => r.trangThai === trangThai);
    }

    return list;
  },

  // Thống kê tổng hợp cho Dashboard và trang Thu Phí
  getStats() {
    const list = this.getAllRecords();
    const tongDuKien = list.reduce((sum, r) => sum + (r.soTienPhaiNop || 0), 0);
    const tongDaThu = list.reduce((sum, r) => sum + (r.soTienDaNop || 0), 0);
    const tyLe = tongDuKien > 0 ? Math.round((tongDaThu / tongDuKien) * 100) : 0;

    const soHoDaNop = list.filter(r => r.trangThai === 'Đã nộp').length;
    const soHoChuaNop = list.filter(r => r.trangThai === 'Chưa nộp' || r.trangThai === 'Nộp thiếu').length;
    const soHoMienGiam = list.filter(r => r.trangThai === 'Miễn giảm').length;

    return {
      tongDuKien,
      tongDaThu,
      tyLe,
      soHoDaNop,
      soHoChuaNop,
      soHoMienGiam
    };
  },

  resetToDefault() {
    this.saveKhoanThuList(DEFAULT_KHOAN_THU);
    this.saveRecords(DEFAULT_RECORDS);
    return { khoanThu: DEFAULT_KHOAN_THU, records: DEFAULT_RECORDS };
  }
};

if (typeof window !== 'undefined') {
  window.thuPhiService = thuPhiService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = thuPhiService;
}
