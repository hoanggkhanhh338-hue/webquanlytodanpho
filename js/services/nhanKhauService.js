/**
 * DỊCH VỤ QUẢN LÝ CƯ DÂN / NHÂN KHẨU (CRUD & LOCAL STORAGE)
 * Tổ dân phố số 5 - Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội
 */

const NHAN_KHAU_STORAGE_KEY = 'tdp5_nhankhau_data';

const DEFAULT_NHAN_KHAU = [
  // Hộ HK-05-001 (Nguyễn Văn Hưng)
  {
    id: "NK001",
    hoTen: "Nguyễn Văn Hưng",
    cccd: "001080004521",
    ngaySinh: "1980-04-12",
    gioiTinh: "Nam",
    quanHeChuHo: "Chủ hộ",
    maHo: "HK-05-001",
    diaChi: "Số nhà 12, Ngõ 48 Phan Văn Trường",
    soDienThoai: "0912345678",
    ngheNghiep: "Cán bộ quản lý cơ sở",
    noiLamViec: "UBND Phường Dịch Vọng Hậu",
    tinhTrangCuTru: "Thường trú",
    ghiChu: "Tổ trưởng Tổ dân phố số 5"
  },
  {
    id: "NK002",
    hoTen: "Lê Thị Thảo",
    cccd: "001182003891",
    ngaySinh: "1982-09-25",
    gioiTinh: "Nữ",
    quanHeChuHo: "Vợ",
    maHo: "HK-05-001",
    diaChi: "Số nhà 12, Ngõ 48 Phan Văn Trường",
    soDienThoai: "0912888999",
    ngheNghiep: "Giáo viên THPT",
    noiLamViec: "Trường THPT Chuyên Sư Phạm",
    tinhTrangCuTru: "Thường trú",
    ghiChu: "Hội viên Chi hội Phụ nữ TDP"
  },
  {
    id: "NK003",
    hoTen: "Nguyễn Hoàng Minh",
    cccd: "001205001211",
    ngaySinh: "2005-08-14",
    gioiTinh: "Nam",
    quanHeChuHo: "Con",
    maHo: "HK-05-001",
    diaChi: "Số nhà 12, Ngõ 48 Phan Văn Trường",
    soDienThoai: "0345678901",
    ngheNghiep: "Sinh viên",
    noiLamViec: "Đại học Quốc gia Hà Nội",
    tinhTrangCuTru: "Thường trú",
    ghiChu: "Đoàn viên thanh niên tích cực"
  },
  {
    id: "NK004",
    hoTen: "Nguyễn Khánh Vy",
    cccd: "001312008892",
    ngaySinh: "2012-11-03",
    gioiTinh: "Nữ",
    quanHeChuHo: "Con",
    maHo: "HK-05-001",
    diaChi: "Số nhà 12, Ngõ 48 Phan Văn Trường",
    soDienThoai: "",
    ngheNghiep: "Học sinh THCS",
    noiLamViec: "Trường THCS Dịch Vọng Hậu",
    tinhTrangCuTru: "Thường trú",
    ghiChu: "Đội viên Đội TNTP Hồ Chí Minh"
  },

  // Hộ HK-05-002 (Trần Thị Mai Lan)
  {
    id: "NK005",
    hoTen: "Trần Thị Mai Lan",
    cccd: "001185002341",
    ngaySinh: "1985-02-18",
    gioiTinh: "Nữ",
    quanHeChuHo: "Chủ hộ",
    maHo: "HK-05-002",
    diaChi: "Số nhà 25, Ngõ 48 Phan Văn Trường",
    soDienThoai: "0983456789",
    ngheNghiep: "Bác sĩ",
    noiLamViec: "Bệnh viện E Hà Nội",
    tinhTrangCuTru: "Thường trú",
    ghiChu: "Tổ phó Tổ dân phố kiêm Y tế cơ sở"
  },
  {
    id: "NK006",
    hoTen: "Vũ Quang Hải",
    cccd: "001083006789",
    ngaySinh: "1983-07-21",
    gioiTinh: "Nam",
    quanHeChuHo: "Chồng",
    maHo: "HK-05-002",
    diaChi: "Số nhà 25, Ngõ 48 Phan Văn Trường",
    soDienThoai: "0982333444",
    ngheNghiep: "Kỹ sư xây dựng",
    noiLamViec: "Tổng công ty Vinaconex",
    tinhTrangCuTru: "Thường trú",
    ghiChu: ""
  },
  {
    id: "NK007",
    hoTen: "Vũ Minh Anh",
    cccd: "001315004561",
    ngaySinh: "2015-05-30",
    gioiTinh: "Nữ",
    quanHeChuHo: "Con",
    maHo: "HK-05-002",
    diaChi: "Số nhà 25, Ngõ 48 Phan Văn Trường",
    soDienThoai: "",
    ngheNghiep: "Học sinh Tiểu học",
    noiLamViec: "Trường Tiểu học Dịch Vọng B",
    tinhTrangCuTru: "Thường trú",
    ghiChu: ""
  },

  // Hộ HK-05-003 (Lê Hoàng Anh - Tạm trú)
  {
    id: "NK008",
    hoTen: "Lê Hoàng Anh",
    cccd: "036092006782",
    ngaySinh: "1992-12-10",
    gioiTinh: "Nam",
    quanHeChuHo: "Chủ hộ",
    maHo: "HK-05-003",
    diaChi: "Tầng 3, Nhà 5A Trần Quốc Vượng",
    soDienThoai: "0904567890",
    ngheNghiep: "Lập trình viên CNTT",
    noiLamViec: "Công ty FPT Software Duy Tân",
    tinhTrangCuTru: "Tạm trú",
    ghiChu: "Tạm trú dài hạn, khai báo tạm trú đầy đủ"
  },
  {
    id: "NK009",
    hoTen: "Ngô Diệu Linh",
    cccd: "034194008921",
    ngaySinh: "1994-06-08",
    gioiTinh: "Nữ",
    quanHeChuHo: "Vợ",
    maHo: "HK-05-003",
    diaChi: "Tầng 3, Nhà 5A Trần Quốc Vượng",
    soDienThoai: "0904112233",
    ngheNghiep: "Chuyên viên truyền thông",
    noiLamViec: "VNPAY Duy Tân",
    tinhTrangCuTru: "Tạm trú",
    ghiChu: ""
  },

  // Hộ HK-05-004 (Phạm Quang Minh)
  {
    id: "NK010",
    hoTen: "Phạm Quang Minh",
    cccd: "001075001290",
    ngaySinh: "1975-01-05",
    gioiTinh: "Nam",
    quanHeChuHo: "Chủ hộ",
    maHo: "HK-05-004",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    soDienThoai: "0976123456",
    ngheNghiep: "Kinh doanh hộ cá thể",
    noiLamViec: "Kiot 21 Chợ Nhà Xanh",
    tinhTrangCuTru: "Thường trú",
    ghiChu: "Trưởng ban An ninh tự quản Cụm 1"
  },
  {
    id: "NK011",
    hoTen: "Đặng Thị Hồng",
    cccd: "001178004523",
    ngaySinh: "1978-08-19",
    gioiTinh: "Nữ",
    quanHeChuHo: "Vợ",
    maHo: "HK-05-004",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    soDienThoai: "0976888777",
    ngheNghiep: "Kế toán viên",
    noiLamViec: "Công ty May Thăng Long",
    tinhTrangCuTru: "Thường trú",
    ghiChu: ""
  },
  {
    id: "NK012",
    hoTen: "Phạm Văn Thái",
    cccd: "001042000156",
    ngaySinh: "1942-03-10",
    gioiTinh: "Nam",
    quanHeChuHo: "Bố",
    maHo: "HK-05-004",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    soDienThoai: "",
    ngheNghiep: "Hưu trí / Cựu chiến binh",
    noiLamViec: "Đã nghỉ hưu",
    tinhTrangCuTru: "Thường trú",
    ghiChu: "Thương binh 4/4, Hội viên Hội Cựu chiến binh"
  },
  {
    id: "NK013",
    hoTen: "Phạm Đức Thắng",
    cccd: "001202005432",
    ngaySinh: "2002-04-16",
    gioiTinh: "Nam",
    quanHeChuHo: "Con",
    maHo: "HK-05-004",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    soDienThoai: "0975666555",
    ngheNghiep: "Kỹ sư",
    noiLamViec: "Cơ quan tại Nhật Bản",
    tinhTrangCuTru: "Tạm vắng",
    ghiChu: "Tạm vắng đi học tập & làm việc tại nước ngoài"
  },
  {
    id: "NK014",
    hoTen: "Phạm Phương Thảo",
    cccd: "001209004123",
    ngaySinh: "2009-10-22",
    gioiTinh: "Nữ",
    quanHeChuHo: "Con",
    maHo: "HK-05-004",
    diaChi: "Số nhà 18, Ngách 12/48 Phan Văn Trường",
    soDienThoai: "",
    ngheNghiep: "Học sinh THPT",
    noiLamViec: "Trường THPT Cầu Giấy",
    tinhTrangCuTru: "Thường trú",
    ghiChu: ""
  },

  // Hộ HK-05-005 (Hoàng Thu Thảo - Tạm trú)
  {
    id: "NK015",
    hoTen: "Hoàng Thu Thảo",
    cccd: "024195007812",
    ngaySinh: "1995-10-04",
    gioiTinh: "Nữ",
    quanHeChuHo: "Chủ hộ",
    maHo: "HK-05-005",
    diaChi: "Phòng 402, Nhà 14 Ngõ 20 Dịch Vọng Hậu",
    soDienThoai: "0945987654",
    ngheNghiep: "Thiết kế đồ họa UI/UX",
    noiLamViec: "Công ty Thiết kế Sáng tạo V-Studio",
    tinhTrangCuTru: "Tạm trú",
    ghiChu: "Kê khai tạm trú đầy đủ"
  },
  {
    id: "NK016",
    hoTen: "Nguyễn Tuấn Kiệt",
    cccd: "024093006543",
    ngaySinh: "1993-01-15",
    gioiTinh: "Nam",
    quanHeChuHo: "Chồng",
    maHo: "HK-05-005",
    diaChi: "Phòng 402, Nhà 14 Ngõ 20 Dịch Vọng Hậu",
    soDienThoai: "0945112244",
    ngheNghiep: "Chuyên viên Tài chính",
    noiLamViec: "Ngân hàng Techcombank",
    tinhTrangCuTru: "Tạm trú",
    ghiChu: ""
  },

  // Hộ HK-05-006 (Vũ Đình Tuấn)
  {
    id: "NK017",
    hoTen: "Vũ Đình Tuấn",
    cccd: "001088009845",
    ngaySinh: "1988-06-14",
    gioiTinh: "Nam",
    quanHeChuHo: "Chủ hộ",
    maHo: "HK-05-006",
    diaChi: "Số nhà 33, Ngõ 60 Trần Quốc Vượng",
    soDienThoai: "0934112233",
    ngheNghiep: "Kinh doanh tự do",
    noiLamViec: "Cửa hàng vật liệu xây dựng",
    tinhTrangCuTru: "Thường trú",
    ghiChu: ""
  },
  {
    id: "NK018",
    hoTen: "Hoàng Thị Cúc",
    cccd: "001190008765",
    ngaySinh: "1990-11-20",
    gioiTinh: "Nữ",
    quanHeChuHo: "Vợ",
    maHo: "HK-05-006",
    diaChi: "Số nhà 33, Ngõ 60 Trần Quốc Vượng",
    soDienThoai: "0934556677",
    ngheNghiep: "Dược sĩ",
    noiLamViec: "Nhà thuốc An Tâm",
    tinhTrangCuTru: "Thường trú",
    ghiChu: ""
  }
];

const nhanKhauService = {
  // Lấy toàn bộ danh sách nhân khẩu
  getAll() {
    try {
      const data = localStorage.getItem(NHAN_KHAU_STORAGE_KEY);
      if (!data) {
        this.saveAll(DEFAULT_NHAN_KHAU);
        return DEFAULT_NHAN_KHAU;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Lỗi đọc dữ liệu nhân khẩu:", e);
      return DEFAULT_NHAN_KHAU;
    }
  },

  // Lưu toàn bộ danh sách
  saveAll(list) {
    localStorage.setItem(NHAN_KHAU_STORAGE_KEY, JSON.stringify(list));
  },

  // Tìm theo ID
  getById(id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  // Lấy các thành viên theo mã hộ khẩu
  getByMaHo(maHo) {
    const list = this.getAll();
    return list.filter(item => item.maHo === maHo);
  },

  // Thêm mới nhân khẩu
  create(itemData) {
    const list = this.getAll();
    const count = list.length + 1;
    const newId = `NK${String(count).padStart(3, '0')}`;

    const newRecord = {
      id: newId,
      hoTen: itemData.hoTen || "Chưa có tên",
      cccd: itemData.cccd || "",
      ngaySinh: itemData.ngaySinh || "1990-01-01",
      gioiTinh: itemData.gioiTinh || "Nam",
      quanHeChuHo: itemData.quanHeChuHo || "Thành viên",
      maHo: itemData.maHo || "HK-05-001",
      diaChi: itemData.diaChi || "Tổ dân phố số 5",
      soDienThoai: itemData.soDienThoai || "",
      ngheNghiep: itemData.ngheNghiep || "Tự do",
      noiLamViec: itemData.noiLamViec || "",
      tinhTrangCuTru: itemData.tinhTrangCuTru || "Thường trú",
      ghiChu: itemData.ghiChu || ""
    };

    list.unshift(newRecord);
    this.saveAll(list);

    // Cập nhật lại số lượng thành viên trong sổ hộ khẩu tương ứng
    if (typeof window !== 'undefined' && window.hoKhauService) {
      const ho = window.hoKhauService.getById(newRecord.maHo);
      if (ho) {
        window.hoKhauService.update(ho.id, { soThanhVien: (ho.soThanhVien || 0) + 1 });
      }
    }

    return newRecord;
  },

  // Sửa thông tin nhân khẩu
  update(id, updatedData) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    list[index] = { ...list[index], ...updatedData };
    this.saveAll(list);
    return list[index];
  },

  // Xóa nhân khẩu
  delete(id) {
    const list = this.getAll();
    const target = list.find(item => item.id === id);
    const filtered = list.filter(item => item.id !== id);
    
    if (filtered.length !== list.length) {
      this.saveAll(filtered);

      // Cập nhật giảm số lượng thành viên trong sổ hộ khẩu tương ứng
      if (target && typeof window !== 'undefined' && window.hoKhauService) {
        const ho = window.hoKhauService.getById(target.maHo);
        if (ho && ho.soThanhVien > 1) {
          window.hoKhauService.update(ho.id, { soThanhVien: ho.soThanhVien - 1 });
        }
      }

      return true;
    }
    return false;
  },

  // Tìm kiếm & Lọc nhân khẩu đa tiêu chí
  search(keyword = '', maHo = '', tinhTrangCuTru = '', gioiTinh = '') {
    let list = this.getAll();
    const kw = keyword.toLowerCase().trim();

    if (kw) {
      list = list.filter(item =>
        item.hoTen.toLowerCase().includes(kw) ||
        (item.cccd && item.cccd.includes(kw)) ||
        (item.soDienThoai && item.soDienThoai.includes(kw)) ||
        item.diaChi.toLowerCase().includes(kw) ||
        item.ngheNghiep.toLowerCase().includes(kw)
      );
    }

    if (maHo && maHo !== 'all') {
      list = list.filter(item => item.maHo === maHo);
    }

    if (tinhTrangCuTru && tinhTrangCuTru !== 'all') {
      list = list.filter(item => item.tinhTrangCuTru === tinhTrangCuTru);
    }

    if (gioiTinh && gioiTinh !== 'all') {
      list = list.filter(item => item.gioiTinh === gioiTinh);
    }

    return list;
  },

  // Thống kê phân bố độ tuổi cho biểu đồ Dashboard
  getAgeDemographics() {
    const list = this.getAll();
    const currentYear = 2026;
    let under18 = 0;
    let from18to35 = 0;
    let from36to60 = 0;
    let over60 = 0;

    list.forEach(p => {
      const birthYear = p.ngaySinh ? parseInt(p.ngaySinh.split('-')[0], 10) : 1990;
      const age = currentYear - birthYear;

      if (age < 18) under18++;
      else if (age <= 35) from18to35++;
      else if (age <= 60) from36to60++;
      else over60++;
    });

    return { under18, from18to35, from36to60, over60 };
  },

  // Thống kê chung
  getStats() {
    const list = this.getAll();
    const nam = list.filter(p => p.gioiTinh === 'Nam').length;
    const nu = list.filter(p => p.gioiTinh === 'Nữ').length;
    const thuongTru = list.filter(p => p.tinhTrangCuTru === 'Thường trú').length;
    const tamTru = list.filter(p => p.tinhTrangCuTru === 'Tạm trú').length;
    const tamVang = list.filter(p => p.tinhTrangCuTru === 'Tạm vắng').length;

    return {
      tongSoNhanKhau: list.length,
      nam,
      nu,
      thuongTru,
      tamTru,
      tamVang
    };
  },

  resetToDefault() {
    this.saveAll(DEFAULT_NHAN_KHAU);
    return DEFAULT_NHAN_KHAU;
  }
};

if (typeof window !== 'undefined') {
  window.nhanKhauService = nhanKhauService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = nhanKhauService;
}
