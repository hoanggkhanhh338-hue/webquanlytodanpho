/**
 * CẤU HÌNH KẾT NỐI FIREBASE & CLOUD FIRESTORE MẪU
 * Hệ thống Quản lý Dân cư Tổ dân phố số 5
 * 
 * Để kết nối với Firebase thực tế:
 * 1. Đăng ký dự án tại https://console.firebase.google.com
 * 2. Bật Firestore Database và Authentication (Email/Password)
 * 3. Thay thế các thông số bên dưới bằng cấu hình từ Firebase Console của bạn.
 */

const firebaseConfig = {
  apiKey: "AIzaSyB-SAMPLE-API-KEY-TDP5-HANOI-2026",
  authDomain: "to-dan-pho-so-5.firebaseapp.com",
  projectId: "to-dan-pho-so-5",
  storageBucket: "to-dan-pho-so-5.appspot.com",
  messagingSenderId: "10776815566",
  appId: "1:10776815566:web:8a9b7c6d5e4f3a2b1c",
  measurementId: "G-TDP5HANOI"
};

// Khởi tạo các biến dịch vụ Firebase
let firebaseApp = null;
let firebaseAuth = null;
let firestoreDb = null;
let isFirebaseActive = false;

/**
 * Khởi tạo Firebase SDK (nếu thư viện Firebase CDN được nhúng)
 */
function initFirebase() {
  try {
    if (typeof window !== 'undefined' && window.firebase) {
      if (!window.firebase.apps || window.firebase.apps.length === 0) {
        firebaseApp = window.firebase.initializeApp(firebaseConfig);
        firebaseAuth = window.firebase.auth();
        firestoreDb = window.firebase.firestore();
        isFirebaseActive = true;
        console.log("✅ Firebase đã được khởi tạo thành công cho Tổ dân phố số 5.");
      }
    } else {
      console.info("ℹ️ Chế độ lưu trữ: Sử dụng Bộ nhớ cục bộ đồng bộ (LocalStorage Local Persistence) an toàn và độc lập.");
    }
  } catch (error) {
    console.warn("⚠️ Khởi tạo Firebase ở chế độ mẫu dự phòng. Ứng dụng tiếp tục hoạt động qua Local Storage:", error.message);
  }
}

// Tự động gọi khi nạp script
if (typeof window !== 'undefined') {
  window.firebaseConfig = firebaseConfig;
  window.initFirebase = initFirebase;
  window.isFirebaseActive = () => isFirebaseActive;
}

// Hỗ trợ cả ES Module và Script tag thông thường
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { firebaseConfig, initFirebase, isFirebaseActive };
}
