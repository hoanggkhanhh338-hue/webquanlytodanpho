export interface OrganizationInfo {
  name: string; // e.g. "Tổ dân phố số 12"
  ward: string; // e.g. "Phường Hàng Mã"
  district: string; // e.g. "Quận Hoàn Kiếm"
  city: string; // e.g. "TP. Hà Nội"
  leaderName: string; // e.g. "Bác Nguyễn Văn An"
  leaderPhone: string; // e.g. "0912.888.999"
  zaloGroup: string; // e.g. "Nhóm Zalo Cư Dân TDP 12"
  totalHouseholds: number;
  totalPopulation: number;
}

export type ResidentStatus = 'Thường trú' | 'Tạm trú';

export type CitizenCategory =
  | 'Bình thường'
  | 'Người cao tuổi'
  | 'Trẻ em dưới 6 tuổi'
  | 'Gia đình chính sách / Người có công'
  | 'Hộ cận nghèo / Hoàn cảnh khó khăn'
  | 'Hộ kinh doanh / Nhà trọ';

export interface Citizen {
  id: string;
  fullName: string;
  birthYear: string;
  gender: 'Nam' | 'Nữ' | 'Khác';
  idCard: string;
  phone: string;
  address: string;
  householdHead: string; // Tên chủ hộ
  residentStatus: ResidentStatus;
  category: CitizenCategory;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface GeneratedNotice {
  title: string;
  zaloVersion: string;
  printVersion: string;
  keyPoints: string[];
  reminders: string;
}

export interface OfficialDocument {
  docHeader: {
    agencyParent: string;
    agency: string;
    code: string;
    locationDate: string;
  };
  nationalMotto: {
    country: string;
    motto: string;
  };
  title: string;
  subject: string;
  recipient: string;
  body: string;
  recipientsList: string[];
  signerRole: string;
  signerName: string;
}
