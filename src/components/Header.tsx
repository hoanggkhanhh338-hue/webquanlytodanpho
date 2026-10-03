import React from 'react';
import { OrganizationInfo } from '../types';
import {
  Building2,
  Bot,
  BellRing,
  FileText,
  Users2,
  BookOpen,
  Settings,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  orgInfo: OrganizationInfo;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  orgInfo,
  onOpenSettings,
}) => {
  const tabs = [
    { id: 'ai-chat', label: 'Trợ Lý AI Tư Vấn', icon: Bot, badge: 'Thông minh' },
    { id: 'notice', label: 'Soạn Thông Báo Gửi Dân', icon: BellRing, badge: 'Zalo / Bảng tin' },
    { id: 'document', label: 'Văn Bản Hành Chính', icon: FileText, badge: 'Chuẩn NĐ 30' },
    { id: 'data', label: 'Quản Lý Dữ Liệu Dân Cư', icon: Users2, badge: 'Bảo mật CCCD' },
    { id: 'handbook', label: 'Cẩm Nang & Biểu Mẫu', icon: BookOpen },
  ];

  return (
    <header className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 text-white shadow-lg sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-red-700/50">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shadow-inner backdrop-blur-sm">
            <span className="text-2xl">🇻🇳</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2 font-serif">
                AI TỔ DÂN PHỐ
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-400/20 text-amber-200 border border-amber-400/30">
                <ShieldCheck className="w-3 h-3 text-amber-300" />
                Chuẩn Hành Chính
              </span>
            </div>
            <p className="text-xs text-red-200/90 font-medium">
              Trợ lý Trí tuệ Nhân tạo hỗ trợ Ban Quản lý & Tổ trưởng Tổ dân phố
            </p>
          </div>
        </div>

        {/* Current Neighborhood Badge & Settings button */}
        <div className="flex items-center gap-3">
          <div className="bg-black/25 backdrop-blur-md rounded-lg px-3.5 py-1.5 border border-white/10 text-xs flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
            <div>
              <div className="font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                {orgInfo.name} - {orgInfo.ward}
              </div>
              <div className="text-[11px] text-red-200 truncate">
                Tổ trưởng: <span className="font-medium text-amber-200">{orgInfo.leaderName}</span> ({orgInfo.leaderPhone})
              </div>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white transition-colors border border-white/15"
            title="Cài đặt thông tin Tổ dân phố"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-red-900 shadow-md font-semibold ring-2 ring-amber-400/50'
                    : 'text-red-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-800' : 'text-amber-300'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden md:inline-block text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-red-100 text-red-800 font-bold'
                        : 'bg-black/20 text-amber-200 border border-white/10'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sub-bar: Compliance & Principles Banner */}
      <div className="bg-red-950/70 border-t border-red-900/60 py-1.5 px-4 sm:px-8 text-[11px] text-red-200/80 flex items-center justify-between">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            1. Chính xác & Tuân thủ pháp luật
          </span>
          <span className="flex items-center gap-1 text-amber-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            2. Bảo mật dữ liệu cá nhân (CCCD, SĐT)
          </span>
          <span className="flex items-center gap-1 text-sky-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            3. Văn phong linh hoạt (Zalo thân thiện / Hành chính trang trọng)
          </span>
        </div>
        <div className="hidden lg:block text-red-300/70">
          Quy chế dân chủ cơ sở 2026
        </div>
      </div>
    </header>
  );
};
