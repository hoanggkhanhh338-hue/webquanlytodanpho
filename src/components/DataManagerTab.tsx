import React, { useState } from 'react';
import { Citizen, CitizenCategory, ResidentStatus } from '../types';
import { sampleCitizens } from '../data/mockData';
import {
  Users2,
  ShieldCheck,
  ShieldAlert,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Search,
  Plus,
  Sparkles,
  Eye,
  EyeOff,
  Filter,
  UserCheck,
  Baby,
  Heart,
  Home,
  Trash2,
  Printer,
} from 'lucide-react';

export const DataManagerTab: React.FC = () => {
  const [citizens, setCitizens] = useState<Citizen[]>(sampleCitizens);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ResidentStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | CitizenCategory>('All');

  // Privacy Protection Switch (Nghị định 13/2023/NĐ-CP)
  const [isMasked, setIsMasked] = useState(true);

  // AI Parser Box State
  const [showAiParser, setShowAiParser] = useState(false);
  const [rawText, setRawText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Modal to add single citizen
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCitizen, setNewCitizen] = useState<Partial<Citizen>>({
    gender: 'Nam',
    residentStatus: 'Thường trú',
    category: 'Bình thường',
  });

  // Masking helpers
  const maskIdCard = (id: string) => {
    if (!isMasked || !id || id.length < 6 || id.includes('Chưa')) return id;
    return `${id.slice(0, 3)}******${id.slice(-3)}`;
  };

  const maskPhone = (phone: string) => {
    if (!isMasked || !phone || phone.length < 6) return phone;
    return `${phone.slice(0, 3)}****${phone.slice(-3)}`;
  };

  // Filtered List
  const filteredCitizens = citizens.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.idCard.includes(searchQuery) ||
      c.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'All' || c.residentStatus === statusFilter;
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Demographics Statistics
  const stats = {
    total: citizens.length,
    thuongTru: citizens.filter((c) => c.residentStatus === 'Thường trú').length,
    tamTru: citizens.filter((c) => c.residentStatus === 'Tạm trú').length,
    nguoiCaoTuoi: citizens.filter((c) => {
      const year = parseInt(c.birthYear);
      return !isNaN(year) && 2026 - year >= 70;
    }).length,
    treEm: citizens.filter((c) => {
      const year = parseInt(c.birthYear);
      return !isNaN(year) && 2026 - year <= 6;
    }).length,
    chinhSach: citizens.filter((c) => c.category === 'Gia đình chính sách / Người có công').length,
  };

  // Handle AI Data Parsing
  const handleAiParse = async () => {
    if (!rawText.trim()) {
      alert('Vui lòng nhập hoặc dán danh sách dân cư cần bóc tách!');
      return;
    }

    setIsParsing(true);
    try {
      const res = await fetch('/api/process-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText,
          shouldMaskData: isMasked,
        }),
      });

      const data = await res.json();
      if (data.records && Array.isArray(data.records)) {
        const parsedList: Citizen[] = data.records.map((r: any, idx: number) => ({
          id: `TDP-AI-${Date.now()}-${idx + 1}`,
          fullName: r.fullName || 'Chưa rõ',
          birthYear: r.birthYear || '1990',
          gender: r.gender === 'Nữ' ? 'Nữ' : 'Nam',
          idCard: r.idCard || 'Chưa rõ',
          phone: r.phone || '',
          address: r.address || 'Khu dân cư',
          householdHead: r.householdHead || r.fullName || 'Chủ hộ',
          residentStatus: r.residentStatus === 'Tạm trú' ? 'Tạm trú' : 'Thường trú',
          category: r.category || 'Bình thường',
          notes: r.notes || 'Bóc tách tự động bởi AI',
        }));

        setCitizens((prev) => [...prev, ...parsedList]);
        alert(`Bóc tách thành công ${parsedList.length} nhân khẩu và đã cập nhật vào danh sách!`);
        setRawText('');
        setShowAiParser(false);
      }
    } catch (err) {
      console.error(err);
      alert('Có lỗi khi xử lý dữ liệu. Vui lòng kiểm tra lại đoạn text nhập vào.');
    } finally {
      setIsParsing(false);
    }
  };

  // Export CSV with UTF-8 BOM
  const exportToCSV = () => {
    const headers = [
      'STT',
      'Họ và tên',
      'Năm sinh',
      'Giới tính',
      'Số CCCD/Định danh',
      'Số điện thoại',
      'Địa chỉ cư trú',
      'Tình trạng cư trú',
      'Phân loại đối tượng',
      'Ghi chú',
    ];

    const rows = filteredCitizens.map((c, index) => [
      index + 1,
      `"${c.fullName}"`,
      c.birthYear,
      c.gender,
      `"${maskIdCard(c.idCard)}"`,
      `"${maskPhone(c.phone)}"`,
      `"${c.address}"`,
      c.residentStatus,
      `"${c.category}"`,
      `"${c.notes || ''}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Danh_Sach_Dan_Cu_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export JSON
  const exportToJSON = (copyOnly = false) => {
    const jsonStr = JSON.stringify(
      filteredCitizens.map((c) => ({
        ...c,
        idCard: maskIdCard(c.idCard),
        phone: maskPhone(c.phone),
      })),
      null,
      2
    );

    if (copyOnly) {
      navigator.clipboard.writeText(jsonStr);
      setCopiedFormat('JSON');
      setTimeout(() => setCopiedFormat(null), 2000);
    } else {
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Dan_Cu_${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleAddCitizenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCitizen.fullName || !newCitizen.birthYear || !newCitizen.address) {
      alert('Vui lòng điền đủ Họ tên, Năm sinh và Địa chỉ!');
      return;
    }

    const item: Citizen = {
      id: `TDP-${String(citizens.length + 1).padStart(3, '0')}`,
      fullName: newCitizen.fullName,
      birthYear: newCitizen.birthYear,
      gender: newCitizen.gender || 'Nam',
      idCard: newCitizen.idCard || 'Chưa cấp',
      phone: newCitizen.phone || '',
      address: newCitizen.address,
      householdHead: newCitizen.householdHead || newCitizen.fullName,
      residentStatus: newCitizen.residentStatus || 'Thường trú',
      category: newCitizen.category || 'Bình thường',
      notes: newCitizen.notes || '',
    };

    setCitizens((prev) => [item, ...prev]);
    setShowAddModal(false);
    setNewCitizen({
      gender: 'Nam',
      residentStatus: 'Thường trú',
      category: 'Bình thường',
    });
  };

  const handleDeleteCitizen = (id: string) => {
    if (confirm('Bác có chắc chắn muốn xóa nhân khẩu này khỏi danh sách quản lý không?')) {
      setCitizens((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Data Protection Compliance (Nghị định 13) & Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isMasked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isMasked ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-stone-900 text-sm sm:text-base">
                Quản Trị Dữ Liệu Dân Cư & Nhân Khẩu
              </h2>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isMasked
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {isMasked ? 'Đang bảo vệ dữ liệu (NĐ 13)' : 'Hiển thị đầy đủ nội bộ'}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {isMasked
                ? 'Đã tự động ẩn số CCCD và Số điện thoại để an toàn khi xuất biểu mẫu hoặc chia sẻ.'
                : 'Cảnh báo: Dữ liệu nhạy cảm đang hiển thị. Chỉ sử dụng trong phạm vi ban quản lý.'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Masking Toggle */}
          <button
            onClick={() => setIsMasked(!isMasked)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              isMasked
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
            }`}
          >
            {isMasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isMasked ? 'Đang ẩn CCCD/SĐT' : 'Bật che giấu CCCD'}</span>
          </button>

          {/* AI Parser Button */}
          <button
            onClick={() => setShowAiParser(!showAiParser)}
            className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Bóc Tách Văn Bản Thô</span>
          </button>

          {/* Add Citizen */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-2 rounded-lg bg-red-800 hover:bg-red-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm nhân khẩu</span>
          </button>
        </div>
      </div>

      {/* Demographics Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Tổng nhân khẩu</span>
            <Users2 className="w-4 h-4 text-red-700" />
          </div>
          <div className="text-xl font-bold text-stone-900">{stats.total}</div>
          <div className="text-[11px] text-stone-400">Đang quản lý</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Thường trú</span>
            <Home className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-700">{stats.thuongTru}</div>
          <div className="text-[11px] text-stone-400">
            {stats.total > 0 ? Math.round((stats.thuongTru / stats.total) * 100) : 0}% tổng số
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Tạm trú</span>
            <UserCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-blue-700">{stats.tamTru}</div>
          <div className="text-[11px] text-stone-400">Thuê trọ / Lưu trú</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Người cao tuổi</span>
            <Heart className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-amber-700">{stats.nguoiCaoTuoi}</div>
          <div className="text-[11px] text-stone-400">Từ 70 tuổi trở lên</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Trẻ em &lt;6 tuổi</span>
            <Baby className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-bold text-purple-700">{stats.treEm}</div>
          <div className="text-[11px] text-stone-400">Tiêm chủng / Vit A</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Gia đình chính sách</span>
            <ShieldCheck className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl font-bold text-red-800">{stats.chinhSach}</div>
          <div className="text-[11px] text-stone-400">Người có công</div>
        </div>
      </div>

      {/* AI Smart Parser Box (Expandable) */}
      {showAiParser && (
        <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-5 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-950 text-sm">
                AI Bóc Tách Dữ Liệu Dân Cư Từ Văn Bản Thô & Ghi Chép
              </h3>
            </div>
            <button
              onClick={() => setShowAiParser(false)}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Đóng
            </button>
          </div>

          <p className="text-xs text-amber-900 leading-relaxed">
            Bác có thể dán danh sách ghi chép bằng tay, tin nhắn Zalo của cảnh sát khu vực, hoặc danh
            sách đăng ký tạm trú không theo khuôn mẫu. AI sẽ tự động phân loại, kiểm tra số CCCD/SĐT
            và chuyển thành bảng quản lý chuẩn.
          </p>

          <textarea
            rows={4}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Ví dụ dán vào đây: 
- Nhà 14 Ngõ Trạm: Nguyễn Văn Nam sinh năm 1980, sđt 0912111222, cccd 001080004567, thường trú. Vợ là Phạm Bích Ngọc sn 1983, con Nguyễn An sn 2023.
- Nhà 22 Phố Hàng Gà: Đỗ Quốc Tuấn sn 2002 thuê trọ sinh viên, cccd 038202008899, sđt 0868999888..."
            className="w-full bg-white rounded-lg border border-amber-300 p-3 text-xs sm:text-sm focus:border-red-700 outline-none"
          />

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() =>
                setRawText(`- Số 16 Ngõ Trạm: Lê Hoàng Long sn 1978, CCCD 001078009912, ĐT 0903887766, chủ hộ, gia đình thương binh. Vợ là Đỗ Mai Hương sn 1982, con Lê Bảo An sn 2022.
- Số 32 Phố Hàng Gà tầng 2: Hoàng Hải Yến sn 1999, CCCD 034099001234, ĐT 0976554433, nhân viên văn phòng thuê trọ tạm trú 6 tháng.`)
              }
              className="text-xs text-amber-800 hover:text-amber-950 underline font-medium"
            >
              Nạp dữ liệu mẫu thử nghiệm
            </button>

            <button
              onClick={handleAiParse}
              disabled={isParsing}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isParsing ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang bóc tách thông minh...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tiến hành bóc tách vào hệ thống</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Filter and Export Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo họ tên, địa chỉ, số CCCD, SĐT..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm focus:border-red-700 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-stone-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-lg border border-stone-300 px-2.5 py-1.5 bg-white text-stone-700 focus:border-red-700 outline-none"
          >
            <option value="All">Tất cả cư trú</option>
            <option value="Thường trú">Thường trú</option>
            <option value="Tạm trú">Tạm trú</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="rounded-lg border border-stone-300 px-2.5 py-1.5 bg-white text-stone-700 focus:border-red-700 outline-none"
          >
            <option value="All">Tất cả đối tượng</option>
            <option value="Người cao tuổi">Người cao tuổi (&gt;=70)</option>
            <option value="Trẻ em dưới 6 tuổi">Trẻ em &lt;6 tuổi</option>
            <option value="Gia đình chính sách / Người có công">Gia đình chính sách</option>
            <option value="Hộ cận nghèo / Hoàn cảnh khó khăn">Hộ nghèo / khó khăn</option>
            <option value="Hộ kinh doanh / Nhà trọ">Kinh doanh / Nhà trọ</option>
          </select>
        </div>

        {/* Export Formats (Bảng, JSON, CSV) - Nguyên tắc 3 */}
        <div className="flex items-center gap-2">
          {/* CSV Export */}
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors"
            title="Xuất file CSV mở Excel không lỗi font tiếng Việt"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Xuất CSV</span>
          </button>

          {/* JSON Export */}
          <button
            onClick={() => exportToJSON(false)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-300 transition-colors"
            title="Tải dữ liệu dạng file JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => exportToJSON(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-300 transition-colors"
            title="Sao chép JSON vào bộ nhớ tạm"
          >
            {copiedFormat === 'JSON' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>Copy JSON</span>
          </button>

          {/* Print Table */}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors"
            title="In bảng danh sách"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In Bảng</span>
          </button>
        </div>
      </div>

      {/* Main Citizens Table */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-stone-100/90 text-stone-700 font-semibold border-b border-stone-200 text-xs">
                <th className="py-3 px-3 w-10 text-center">STT</th>
                <th className="py-3 px-3">Họ và tên</th>
                <th className="py-3 px-3">Năm sinh</th>
                <th className="py-3 px-3">Giới tính</th>
                <th className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <span>Số CCCD / Định danh</span>
                    {isMasked && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                </th>
                <th className="py-3 px-3">Số điện thoại</th>
                <th className="py-3 px-3">Địa chỉ cư trú</th>
                <th className="py-3 px-3">Cư trú</th>
                <th className="py-3 px-3">Diện đối tượng</th>
                <th className="py-3 px-3">Ghi chú</th>
                <th className="py-3 px-2 text-center w-10">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans">
              {filteredCitizens.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-stone-400 text-sm">
                    Không tìm thấy nhân khẩu nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredCitizens.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-red-50/40 transition-colors">
                    <td className="py-2.5 px-3 text-center text-stone-400 text-xs">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-semibold text-stone-900">{c.fullName}</td>
                    <td className="py-2.5 px-3 text-stone-700">{c.birthYear}</td>
                    <td className="py-2.5 px-3 text-stone-600">{c.gender}</td>
                    <td className="py-2.5 px-3 font-mono text-xs text-stone-800">
                      {maskIdCard(c.idCard)}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-xs text-stone-700">
                      {maskPhone(c.phone)}
                    </td>
                    <td className="py-2.5 px-3 text-stone-700 max-w-[160px] truncate" title={c.address}>
                      {c.address}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          c.residentStatus === 'Thường trú'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {c.residentStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                          c.category === 'Gia đình chính sách / Người có công'
                            ? 'bg-red-100 text-red-800 font-semibold'
                            : c.category === 'Người cao tuổi'
                            ? 'bg-amber-100 text-amber-900'
                            : c.category === 'Trẻ em dưới 6 tuổi'
                            ? 'bg-purple-100 text-purple-900'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {c.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-stone-500 text-xs max-w-[180px] truncate" title={c.notes}>
                      {c.notes || '-'}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => handleDeleteCitizen(c.id)}
                        className="text-stone-400 hover:text-red-700 p-1 rounded transition-colors"
                        title="Xóa nhân khẩu này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer info */}
        <div className="bg-stone-50 px-4 py-2.5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>
            Hiển thị <strong>{filteredCitizens.length}</strong> / {citizens.length} nhân khẩu
          </span>
          <span className="italic">
            {isMasked
              ? 'Dữ liệu cá nhân (CCCD, SĐT) đã được mã hóa hiển thị an toàn.'
              : 'Dữ liệu hiển thị đầy đủ cho Ban Quản trị.'}
          </span>
        </div>
      </div>

      {/* Add Citizen Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-stone-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-red-700" />
                Thêm Nhân Khẩu Mới Vào Quản Lý
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCitizenSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={newCitizen.fullName || ''}
                  onChange={(e) => setNewCitizen({ ...newCitizen, fullName: e.target.value })}
                  placeholder="Ví dụ: Hoàng Văn Thắng"
                  className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Năm sinh *</label>
                  <input
                    type="text"
                    required
                    value={newCitizen.birthYear || ''}
                    onChange={(e) => setNewCitizen({ ...newCitizen, birthYear: e.target.value })}
                    placeholder="VD: 1985"
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Giới tính</label>
                  <select
                    value={newCitizen.gender}
                    onChange={(e) => setNewCitizen({ ...newCitizen, gender: e.target.value as any })}
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs bg-white focus:border-red-700 outline-none"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Số CCCD / CMND</label>
                  <input
                    type="text"
                    value={newCitizen.idCard || ''}
                    onChange={(e) => setNewCitizen({ ...newCitizen, idCard: e.target.value })}
                    placeholder="VD: 001085001234"
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={newCitizen.phone || ''}
                    onChange={(e) => setNewCitizen({ ...newCitizen, phone: e.target.value })}
                    placeholder="VD: 0912345678"
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Địa chỉ cư trú *</label>
                <input
                  type="text"
                  required
                  value={newCitizen.address || ''}
                  onChange={(e) => setNewCitizen({ ...newCitizen, address: e.target.value })}
                  placeholder="VD: Số 18 Ngõ Trạm"
                  className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tình trạng cư trú</label>
                  <select
                    value={newCitizen.residentStatus}
                    onChange={(e) =>
                      setNewCitizen({ ...newCitizen, residentStatus: e.target.value as any })
                    }
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs bg-white focus:border-red-700 outline-none"
                  >
                    <option value="Thường trú">Thường trú</option>
                    <option value="Tạm trú">Tạm trú</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phân loại đối tượng</label>
                  <select
                    value={newCitizen.category}
                    onChange={(e) =>
                      setNewCitizen({ ...newCitizen, category: e.target.value as any })
                    }
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs bg-white focus:border-red-700 outline-none"
                  >
                    <option value="Bình thường">Bình thường</option>
                    <option value="Người cao tuổi">Người cao tuổi (&gt;=70)</option>
                    <option value="Trẻ em dưới 6 tuổi">Trẻ em dưới 6 tuổi</option>
                    <option value="Gia đình chính sách / Người có công">Gia đình chính sách</option>
                    <option value="Hộ cận nghèo / Hoàn cảnh khó khăn">Hộ nghèo / khó khăn</option>
                    <option value="Hộ kinh doanh / Nhà trọ">Hộ kinh doanh / Nhà trọ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ghi chú</label>
                <input
                  type="text"
                  value={newCitizen.notes || ''}
                  onChange={(e) => setNewCitizen({ ...newCitizen, notes: e.target.value })}
                  placeholder="Ghi chú hoàn cảnh, đối tượng ưu tiên..."
                  className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-800 hover:bg-red-900 text-white text-xs font-semibold shadow"
                >
                  Lưu nhân khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
