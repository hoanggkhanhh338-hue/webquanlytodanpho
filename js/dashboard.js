/**
 * LOGIC TÍNH TOÁN & HIỂN THỊ DỮ LIỆU BẢNG ĐIỀU KHIỂN (DASHBOARD)
 * Vẽ biểu đồ Chart.js và cập nhật số liệu động
 */

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function initDashboard() {
  // 1. Lấy dữ liệu từ các dịch vụ
  const hoKhauStats = window.hoKhauService ? window.hoKhauService.getStats() : { tongSoHo: 8, thuongTru: 5, tamTru: 3, tongNhanKhau: 27 };
  const nhanKhauStats = window.nhanKhauService ? window.nhanKhauService.getStats() : { tongSoNhanKhau: 18, nam: 10, nu: 8, thuongTru: 14, tamTru: 3, tamVang: 1 };
  const ageDemo = window.nhanKhauService ? window.nhanKhauService.getAgeDemographics() : { under18: 4, from18to35: 6, from36to60: 6, over60: 2 };
  const thuPhiStats = window.thuPhiService ? window.thuPhiService.getStats() : { tongDuKien: 8640000, tongDaThu: 6840000, tyLe: 79, soHoDaNop: 9, soHoChuaNop: 3 };
  const phanAnhStats = window.phanAnhService ? window.phanAnhService.getStats() : { tongSo: 5, daXuLy: 2, dangXuLy: 2, choTiepNhan: 1, khanCap: 2 };

  // 2. Cập nhật các thẻ chỉ số (KPI Stat Cards)
  const elTongHo = document.getElementById('stat-tong-ho');
  if (elTongHo) elTongHo.textContent = hoKhauStats.tongSoHo;

  const elHoSub = document.getElementById('stat-ho-sub');
  if (elHoSub) elHoSub.textContent = `${hoKhauStats.thuongTru} thường trú · ${hoKhauStats.tamTru} tạm trú`;

  const elNhanKhau = document.getElementById('stat-tong-nhankhau');
  if (elNhanKhau) elNhanKhau.textContent = nhanKhauStats.tongSoNhanKhau;

  const elNhanKhauSub = document.getElementById('stat-nhankhau-sub');
  if (elNhanKhauSub) elNhanKhauSub.textContent = `${nhanKhauStats.nam} Nam · ${nhanKhauStats.nu} Nữ`;

  const elTamTru = document.getElementById('stat-tamtru');
  if (elTamTru) elTamTru.textContent = `${nhanKhauStats.tamTru} / ${nhanKhauStats.tamVang}`;

  const elTamTruSub = document.getElementById('stat-tamtru-sub');
  if (elTamTruSub) elTamTruSub.textContent = `${nhanKhauStats.tamTru} người tạm trú · ${nhanKhauStats.tamVang} tạm vắng`;

  const elThuPhi = document.getElementById('stat-thuphi');
  if (elThuPhi) elThuPhi.textContent = formatVND(thuPhiStats.tongDaThu);

  const elThuPhiSub = document.getElementById('stat-thuphi-sub');
  if (elThuPhiSub) elThuPhiSub.textContent = `Đạt ${thuPhiStats.tyLe}% kế hoạch (${thuPhiStats.soHoDaNop} hộ nộp)`;

  const elPhanAnh = document.getElementById('stat-phananh');
  if (elPhanAnh) elPhanAnh.textContent = phanAnhStats.tongSo;

  const elPhanAnhSub = document.getElementById('stat-phananh-sub');
  if (elPhanAnhSub) elPhanAnhSub.textContent = `${phanAnhStats.khanCap} khẩn cấp · ${phanAnhStats.daXuLy} đã xử lý`;

  // 3. Khởi tạo Biểu đồ Chart.js
  if (typeof Chart !== 'undefined') {
    initResidenceChart(nhanKhauStats);
    initAgeChart(ageDemo);
    initFeeChart();
  }

  // 4. Hiển thị danh sách các phản ánh khẩn cấp gần nhất
  renderRecentIssues();
}

/**
 * Biểu đồ Cơ cấu Cư trú (Doughnut)
 */
let residenceChartInstance = null;
function initResidenceChart(stats) {
  const canvas = document.getElementById('chart-residence');
  if (!canvas) return;

  if (residenceChartInstance) residenceChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  residenceChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Thường trú', 'Tạm trú', 'Tạm vắng'],
      datasets: [{
        data: [stats.thuongTru, stats.tamTru, stats.tamVang],
        backgroundColor: [
          '#2563eb', // Xanh dương
          '#0d9488', // Xanh mòng két
          '#f59e0b'  // Vàng cam
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15,
            font: { family: 'Inter', size: 12 }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = stats.thuongTru + stats.tamTru + stats.tamVang;
              const value = context.raw || 0;
              const percent = Math.round((value / total) * 100);
              return ` ${context.label}: ${value} người (${percent}%)`;
            }
          }
        }
      },
      cutout: '70%'
    }
  });
}

/**
 * Biểu đồ Phân bổ Độ tuổi Dân cư (Bar Chart)
 */
let ageChartInstance = null;
function initAgeChart(ageDemo) {
  const canvas = document.getElementById('chart-age');
  if (!canvas) return;

  if (ageChartInstance) ageChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  ageChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Dưới 18 tuổi', '18 - 35 tuổi', '36 - 60 tuổi', 'Trên 60 tuổi'],
      datasets: [{
        label: 'Số lượng nhân khẩu',
        data: [ageDemo.under18, ageDemo.from18to35, ageDemo.from36to60, ageDemo.over60],
        backgroundColor: [
          'rgba(59, 130, 246, 0.85)',
          'rgba(16, 185, 129, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(139, 92, 246, 0.85)'
        ],
        borderRadius: 6,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.raw} nhân khẩu`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, font: { family: 'Inter' } },
          grid: { color: '#f1f5f9' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 } }
        }
      }
    }
  });
}

/**
 * Biểu đồ Tiến độ Thu Phí & Quỹ theo Danh mục
 */
let feeChartInstance = null;
function initFeeChart() {
  const canvas = document.getElementById('chart-fees');
  if (!canvas) return;

  if (feeChartInstance) feeChartInstance.destroy();

  const khoanThuList = window.thuPhiService ? window.thuPhiService.getKhoanThuList().slice(0, 4) : [];
  const records = window.thuPhiService ? window.thuPhiService.getAllRecords() : [];

  const labels = khoanThuList.map(kt => kt.tenKhoanThu.replace('năm 2026', '').replace('2026', '').trim());
  const daThuData = khoanThuList.map(kt => {
    return records
      .filter(r => r.khoanThuId === kt.id)
      .reduce((sum, r) => sum + (r.soTienDaNop || 0), 0);
  });
  const keHoachData = khoanThuList.map(kt => {
    return records
      .filter(r => r.khoanThuId === kt.id)
      .reduce((sum, r) => sum + (r.soTienPhaiNop || 0), 0);
  });

  const ctx = canvas.getContext('2d');
  feeChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Đã thu (VNĐ)',
          data: daThuData,
          backgroundColor: '#10b981',
          borderRadius: 4
        },
        {
          label: 'Kế hoạch phải thu (VNĐ)',
          data: keHoachData,
          backgroundColor: '#e2e8f0',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { boxWidth: 12, font: { family: 'Inter', size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${formatVND(ctx.raw)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => `${val / 1000000} tr`,
            font: { family: 'Inter' }
          },
          grid: { color: '#f1f5f9' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 } }
        }
      }
    }
  });
}

/**
 * Hiển thị bảng phản ánh khẩn cấp gần đây trên trang chủ
 */
function renderRecentIssues() {
  const container = document.getElementById('recent-issues-table-body');
  if (!container) return;

  const list = window.phanAnhService ? window.phanAnhService.getAll().slice(0, 4) : [];

  if (list.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-slate-500">Chưa có phản ánh nào được ghi nhận.</td></tr>`;
    return;
  }

  container.innerHTML = list.map(item => {
    let badgeClass = 'badge-info';
    if (item.mucDo === 'Khẩn cấp') badgeClass = 'badge-danger';
    else if (item.mucDo === 'Quan trọng') badgeClass = 'badge-warning';

    let statusBadge = 'badge-warning';
    if (item.trangThai === 'Đã xử lý') statusBadge = 'badge-success';
    else if (item.trangThai === 'Đang xử lý') statusBadge = 'badge-info';

    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="px-4 py-3 text-xs font-semibold text-slate-500">#${item.id}</td>
        <td class="px-4 py-3">
          <div class="font-medium text-slate-900 line-clamp-1">${item.tieuDe}</div>
          <div class="text-xs text-slate-500"><i class="fa-solid fa-location-dot text-rose-500 mr-1"></i>${item.diaChi}</div>
        </td>
        <td class="px-4 py-3">
          <span class="badge ${badgeClass}">${item.mucDo}</span>
        </td>
        <td class="px-4 py-3">
          <span class="badge ${statusBadge}">${item.trangThai}</span>
        </td>
        <td class="px-4 py-3 text-right">
          <a href="pages/phan-anh.html" class="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800">
            Chi tiết <i class="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

if (typeof window !== 'undefined') {
  window.initDashboard = initDashboard;
}
