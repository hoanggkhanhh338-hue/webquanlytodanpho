/**
 * DỊCH VỤ QUẢN LÝ SỔ HỘ KHẨU (CRUD & LOCAL STORAGE)
 * Tổ dân phố số 5 - Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội
 */

const HO_KHAU_STORAGE_KEY = 'tdp5_hokhau_data';

const DEFAULT_HO_KHAU = [
  {
    id: "HK001",
    maHo: "HK-05-001",
    chuHo: "Nguyễn Văn Hưng",
    cccdChuHo: "001080004521",
    soDienThoai: "0912345678",
    diaChi: "Số nhà 12, Ngõ 48 Phan Văn Trường",
    khuVuc: "Cụm 1 - Phố Phan Văn Trường",
    loaiCuTru: "Thường trú",
    soThanhVien: 4,
    ngayCap: "2018-03-15",
    tinhTrang: "Bình thường",
    ghiChu: "Gia đình cán bộ Tổ trưởng TDP số 5"
  },
  {
    id: "HK002",
    maHo: "HK-05-002",
    chuHo: "Trần Thị Mai Lan",
    cccdChuHo: "001185002341",
    soDienThoai: "0983456789",
    diaChi: "Số nhà 25, Ngõ 48 Phan Văn Trường",
    khuVuc: "Cụm 1 - Phố Phan Văn Trường",
    loaiCuTru: "Thường trú",
    soThanhVien: 3,
    ngayCap: "2019-05-10",
    tinhTrang: "Bình thường",
    ghiChu: "Gia đình văn hóa tiêu biểu năm 2025"
  },
  {
    id: "HK003",
    maHo: "HK-05-003",
    chuHo: "Lê Hoàng Anh",
    cccdChuHo: "036092006782",
    soDienThoai: "0904567890",
    diaChi: "Tầng 3, Nhà 5A Trần Quốc Vượng",
    khuVuc: "Cụm 2 - Phố Trần Quốc Vượng",
    loaiCuTru: "Tạm trú",
    soThanhVien: 2,
    ngayCap: "2023-08-20",
    tinhTrang: "Tạm trú có thời hạn",
    ghiChu: "Đăng ký tạm trú 24 tháng đến 08/2025 (đã gia hạn)"
  },
  {
    id: "HK004",
    maHo: "HK-05-004",
    chuHo: "Phạm Quang Minh",
    cccdChuHo: "001075001290",
    soDienThoai: "0976123456",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    khuVuc: "Cụm 1 - Phố Phan Văn Trường",
    loaiCuTru: "Thường trú",
    soThanhVien: 5,
    ngayCap: "2017-11-05",
    tinhTrang: "Bình thường",
    ghiChu: "Có người cao tuổi trên 80 tuổi được mừng thọ"
  },
  {
    id: "HK005",
    maHo: "HK-05-005",
    chuHo: "Hoàng Thu Thảo",
    cccdChuHo: "024195007812",
    soDienThoai: "0945987654",
    diaChi: "Phòng 402, Nhà 14 Ngõ 20 Dịch Vọng Hậu",
    khuVuc: "Cụm 3 - Ngõ 20 Dịch Vọng Hậu",
    loaiCuTru: "Tạm trú",
    soThanhVien: 2,
    ngayCap: "2024-02-12",
    tinhTrang: "Tạm trú",
    ghiChu: "Hộ kinh doanh trực tuyến và văn phòng đại diện"
  },
  {
    id: "HK006",
    maHo: "HK-05-006",
    chuHo: "Vũ Đình Tuấn",
    cccdChuHo: "001088009845",
    soDienThoai: "0934112233",
    diaChi: "Số nhà 33, Ngõ 60 Trần Quốc Vượng",
    khuVuc: "Cụm 2 - Phố Trần Quốc Vượng",
    loaiCuTru: "Thường trú",
    soThanhVien: 4,
    ngayCap: "2016-07-22",
    tinhTrang: "Bình thường",
    ghiChu: "Gia đình quân nhân xuất ngũ"
  },
  {
    id: "HK007",
    maHo: "HK-05-007",
    chuHo: "Đỗ Bích Ngọc",
    cccdChuHo: "017198005634",
    soDienThoai: "0918776655",
    diaChi: "Tầng 2, Số 8 Ngách 4/18 Dịch Vọng Hậu",
    khuVuc: "Cụm 3 - Ngõ 20 Dịch Vọng Hậu",
    loaiCuTru: "Tạm trú",
    soThanhVien: 3,
    ngayCap: "2024-09-01",
    tinhTrang: "Tạm trú",
    ghiChu: "Sinh viên & Giảng viên thuê trọ dài hạn"
  },
  {
    id: "HK008",
    maHo: "HK-05-008",
    chuHo: "Bùi Trọng Đạt",
    cccdChuHo: "001082003478",
    soDienThoai: "0965332211",
    diaChi: "Số nhà 45, Ngõ 48 Phan Văn Trường",
    khuVuc: "Cụm 1 - Phố Phan Văn Trường",
    loaiCuTru: "Thường trú",
    soThanhVien: 4,
    ngayCap: "2019-04-18",
    tinhTrang: "Bình thường",
    ghiChu: "Cán bộ hưu trí ngành bưu chính viễn thông"
  }
];

const hoKhauService = {
  // Lấy toàn bộ danh sách hộ khẩu
  getAll() {
    try {
      const data = localStorage.getItem(HO_KHAU_STORAGE_KEY);
      if (!data) {
        this.saveAll(DEFAULT_HO_KHAU);
        return DEFAULT_HO_KHAU;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Lỗi đọc dữ liệu hộ khẩu:", e);
      return DEFAULT_HO_KHAU;
    }
  },

  // Lưu toàn bộ danh sách
  saveAll(list) {
    localStorage.setItem(HO_KHAU_STORAGE_KEY, JSON.stringify(list));
  },

  // Tìm theo ID hoặc Mã hộ
  getById(id) {
    const list = this.getAll();
    return list.find(item => item.id === id || item.maHo === id) || null;
  },

  // Thêm mới sổ hộ khẩu
  create(itemData) {
    const list = this.getAll();
    const count = list.length + 1;
    const newId = `HK${String(count).padStart(3, '0')}`;
    const newMaHo = itemData.maHo || `HK-05-${String(count).padStart(3, '0')}`;

    const newRecord = {
      id: newId,
      maHo: newMaHo,
      chuHo: itemData.chuHo || "Chưa có tên",
      cccdChuHo: itemData.cccdChuHo || "",
      soDienThoai: itemData.soDienThoai || "",
      diaChi: itemData.diaChi || "Tổ dân phố số 5",
      khuVuc: itemData.khuVuc || "Cụm 1 - Phố Phan Văn Trường",
      loaiCuTru: itemData.loaiCuTru || "Thường trú",
      soThanhVien: parseInt(itemData.soThanhVien, 10) || 1,
      ngayCap: itemData.ngayCap || new Date().toISOString().split('T')[0],
      tinhTrang: itemData.tinhTrang || "Bình thường",
      ghiChu: itemData.ghiChu || ""
    };

    list.unshift(newRecord);
    this.saveAll(list);
    return newRecord;
  },

  // Cập nhật sổ hộ khẩu
  update(id, updatedData) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id || item.maHo === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updatedData,
      soThanhVien: parseInt(updatedData.soThanhVien ?? list[index].soThanhVien, 10)
    };

    this.saveAll(list);
    return list[index];
  },

  // Xóa sổ hộ khẩu
  delete(id) {
    const list = this.getAll();
    const filtered = list.filter(item => item.id !== id && item.maHo !== id);
    if (filtered.length !== list.length) {
      this.saveAll(filtered);
      return true;
    }
    return false;
  },

  // Tìm kiếm & Lọc hộ khẩu
  search(keyword = '', loaiCuTru = '', khuVuc = '') {
    let list = this.getAll();
    const kw = keyword.toLowerCase().trim();

    if (kw) {
      list = list.filter(item =>
        item.chuHo.toLowerCase().includes(kw) ||
        item.maHo.toLowerCase().includes(kw) ||
        item.diaChi.toLowerCase().includes(kw) ||
        (item.cccdChuHo && item.cccdChuHo.includes(kw)) ||
        (item.soDienThoai && item.soDienThoai.includes(kw))
      );
    }

    if (loaiCuTru && loaiCuTru !== 'all') {
      list = list.filter(item => item.loaiCuTru === loaiCuTru);
    }

    if (khuVuc && khuVuc !== 'all') {
      list = list.filter(item => item.khuVuc === khuVuc);
    }

    return list;
  },

  // Thống kê nhanh
  getStats() {
    const list = this.getAll();
    const thuongTru = list.filter(h => h.loaiCuTru === 'Thường trú').length;
    const tamTru = list.filter(h => h.loaiCuTru === 'Tạm trú').length;
    const tongNhanKhau = list.reduce((sum, h) => sum + (h.soThanhVien || 0), 0);

    return {
      tongSoHo: list.length,
      thuongTru,
      tamTru,
      tongNhanKhau
    };
  },

  // Reset về dữ liệu gốc
  resetToDefault() {
    this.saveAll(DEFAULT_HO_KHAU);
    return DEFAULT_HO_KHAU;
  }
};

// Gán toàn cục cho window để các file script HTML khác dễ dàng gọi
if (typeof window !== 'undefined') {
  window.hoKhauService = hoKhauService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = hoKhauService;
}
