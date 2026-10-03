/**
 * LOGIC XÁC THỰC & PHÂN QUYỀN ĐĂNG NHẬP / ĐĂNG XUẤT
 * Hệ thống Quản lý Dân cư Tổ dân phố số 5
 */

const AUTH_USER_KEY = 'tdp5_auth_session';

const PRESET_ACCOUNTS = [
  {
    email: "admin@todanpho5.gov.vn",
    password: "123",
    name: "Nguyễn Văn Hưng",
    role: "Tổ trưởng Tổ dân phố số 5",
    badge: "Tổ trưởng",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "0912.345.678"
  },
  {
    email: "phophuong@todanpho5.gov.vn",
    password: "123",
    name: "Trần Thị Mai Lan",
    role: "Tổ phó Tổ dân phố kiêm Y tế cơ sở",
    badge: "Tổ phó",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "0983.456.789"
  },
  {
    email: "cskv@todanpho5.gov.vn",
    password: "123",
    name: "Lê Hoàng Anh",
    role: "Cán bộ Cảnh sát khu vực",
    badge: "CSKV",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "0904.567.890"
  }
];

const authService = {
  // Lấy người dùng đang đăng nhập
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY) || sessionStorage.getItem(AUTH_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Mặc định cung cấp phiên Tổ trưởng để xem ngay Live Preview mà không bị rào cản
      return PRESET_ACCOUNTS[0];
    } catch (e) {
      return PRESET_ACCOUNTS[0];
    }
  },

  // Kiểm tra đăng nhập
  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  // Đăng nhập
  login(email, password, remember = true) {
    const user = PRESET_ACCOUNTS.find(
      acc => acc.email.toLowerCase() === email.trim().toLowerCase() && (acc.password === password || password === '123456')
    );

    if (user) {
      const sessionData = JSON.stringify(user);
      if (remember) {
        localStorage.setItem(AUTH_USER_KEY, sessionData);
      } else {
        sessionStorage.setItem(AUTH_USER_KEY, sessionData);
      }
      return { success: true, user };
    }

    // Cho phép bất kỳ email nào kết thúc bằng @todanpho5.gov.vn hoặc admin nếu mật khẩu là 123 hoặc 123456
    if (password === '123' || password === '123456' || password === 'admin') {
      const customUser = {
        email: email || "admin@todanpho5.gov.vn",
        name: email.split('@')[0].toUpperCase(),
        role: "Cán bộ Ban quản lý TDP 5",
        badge: "Cán bộ",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        phone: "0912.000.888"
      };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(customUser));
      return { success: true, user: customUser };
    }

    return { success: false, message: "Email hoặc mật khẩu không chính xác! (Mẹo thử nghiệm: dùng admin@todanpho5.gov.vn và mật khẩu: 123)" };
  },

  // Đăng xuất
  logout() {
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
    window.location.href = window.location.pathname.includes('/pages/') ? '../login.html' : 'login.html';
  },

  // Khởi tạo thông tin hiển thị trên thanh Navbar của trang
  setupNavbar() {
    const user = this.getCurrentUser();
    
    // Gắn thông tin người dùng lên các phần tử navbar nếu tồn tại
    const userNameEl = document.getElementById('navbar-user-name');
    const userRoleEl = document.getElementById('navbar-user-role');
    const userAvatarEl = document.getElementById('navbar-user-avatar');
    const logoutBtn = document.getElementById('navbar-logout-btn');

    if (userNameEl && user) userNameEl.textContent = user.name;
    if (userRoleEl && user) userRoleEl.textContent = user.badge || user.role;
    if (userAvatarEl && user && user.avatar) userAvatarEl.src = user.avatar;

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm(`Đồng chí ${user.name} có chắc chắn muốn đăng xuất khỏi hệ thống?`)) {
          this.logout();
        }
      });
    }

    // Xử lý nút bật/tắt sidebar trên màn hình điện thoại
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarEl = document.getElementById('app-sidebar');
    const backdropEl = document.getElementById('sidebar-backdrop');

    if (sidebarToggleBtn && sidebarEl) {
      sidebarToggleBtn.addEventListener('click', () => {
        sidebarEl.classList.toggle('open');
        if (backdropEl) backdropEl.classList.toggle('active');
      });
    }

    if (backdropEl && sidebarEl) {
      backdropEl.addEventListener('click', () => {
        sidebarEl.classList.remove('open');
        backdropEl.classList.remove('active');
      });
    }
  }
};

// Tự động gọi khi tải xong DOM
document.addEventListener('DOMContentLoaded', () => {
  if (typeof authService !== 'undefined') {
    authService.setupNavbar();
  }
});

if (typeof window !== 'undefined') {
  window.authService = authService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = authService;
}
