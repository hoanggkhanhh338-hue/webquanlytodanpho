import React, { useState } from 'react';
import { OrganizationInfo } from '../types';
import { Building2, Save, X, Phone, Users, Shield } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgInfo: OrganizationInfo;
  onSave: (newInfo: OrganizationInfo) => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  orgInfo,
  onSave,
}) => {
  const [formData, setFormData] = useState<OrganizationInfo>({ ...orgInfo });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-red-700" />
            <h3 className="font-bold text-stone-900 text-base">
              Cấu Hình Thông Tin Tổ Dân Phố
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-500">
          Thông tin này sẽ được tự động đồng bộ vào toàn bộ các thông báo Zalo, bản in A4 và văn bản hành chính gửi UBND Phường/Xã.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Tên Tổ dân phố / Thôn / Khóm *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="VD: Tổ dân phố số 12"
              className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Phường / Xã / Thị trấn *
              </label>
              <input
                type="text"
                required
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                placeholder="VD: Phường Hàng Mã"
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Quận / Huyện / Thị xã *
              </label>
              <input
                type="text"
                required
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="VD: Quận Hoàn Kiếm"
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Tỉnh / Thành phố trực thuộc Trung ương *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="VD: TP. Hà Nội hoặc TP. Hồ Chí Minh"
              className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Họ tên Bác Tổ trưởng *
              </label>
              <input
                type="text"
                required
                value={formData.leaderName}
                onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                placeholder="VD: Nguyễn Văn An"
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Số điện thoại liên hệ *
              </label>
              <input
                type="text"
                required
                value={formData.leaderPhone}
                onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                placeholder="VD: 0912.345.678"
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Tên Nhóm Zalo cư dân
            </label>
            <input
              type="text"
              value={formData.zaloGroup}
              onChange={(e) => setFormData({ ...formData, zaloGroup: e.target.value })}
              placeholder="VD: Nhóm Zalo Cư Dân Tổ 12"
              className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tổng số hộ gia đình
              </label>
              <input
                type="number"
                value={formData.totalHouseholds}
                onChange={(e) =>
                  setFormData({ ...formData, totalHouseholds: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tổng số nhân khẩu
              </label>
              <input
                type="number"
                value={formData.totalPopulation}
                onChange={(e) =>
                  setFormData({ ...formData, totalPopulation: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-red-700 outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-red-800 hover:bg-red-900 text-white text-xs font-semibold shadow flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu thông tin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
