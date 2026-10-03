/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OrganizationInfo } from './types';
import { initialOrganizationInfo } from './data/mockData';
import { Header } from './components/Header';
import { AiAssistantTab } from './components/AiAssistantTab';
import { NoticeGeneratorTab } from './components/NoticeGeneratorTab';
import { DocumentGeneratorTab } from './components/DocumentGeneratorTab';
import { DataManagerTab } from './components/DataManagerTab';
import { HandbookTab } from './components/HandbookTab';
import { ConfigModal } from './components/ConfigModal';
import { ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('ai-chat');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load saved organization info from localStorage if available
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo>(() => {
    try {
      const saved = localStorage.getItem('ai_todanpho_org_info');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return initialOrganizationInfo;
  });

  const handleSaveOrgInfo = (newInfo: OrganizationInfo) => {
    setOrgInfo(newInfo);
    try {
      localStorage.setItem('ai_todanpho_org_info', JSON.stringify(newInfo));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-red-200 selection:text-red-900">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orgInfo={orgInfo}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'ai-chat' && <AiAssistantTab orgInfo={orgInfo} />}
        {activeTab === 'notice' && <NoticeGeneratorTab orgInfo={orgInfo} />}
        {activeTab === 'document' && <DocumentGeneratorTab orgInfo={orgInfo} />}
        {activeTab === 'data' && <DataManagerTab />}
        {activeTab === 'handbook' && <HandbookTab />}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-6 border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🇻🇳</span>
            <div>
              <p className="font-semibold text-stone-200">
                AI Tổ Dân Phố — Hệ thống Trợ lý số Quản lý Dân cư & Hành chính Cơ sở
              </p>
              <p className="text-[11px] text-stone-500">
                Tuân thủ Nghị định 30/2020/NĐ-CP (Công tác văn thư) & Nghị định 13/2023/NĐ-CP (Bảo vệ dữ liệu cá nhân)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Bảo mật CCCD/SĐT
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <HeartHandshake className="w-3.5 h-3.5" />
              Đồng hành cùng Nhân dân
            </span>
            <span className="text-stone-500">
              Phiên bản 2026.1
            </span>
          </div>
        </div>
      </footer>

      {/* Neighborhood Information Settings Modal */}
      <ConfigModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        orgInfo={orgInfo}
        onSave={handleSaveOrgInfo}
      />
    </div>
  );
}
