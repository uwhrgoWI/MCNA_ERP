import React from 'react';
import { Role, User } from '../types';
import { 
  LayoutDashboard, Users, CreditCard, Landmark, Box, ShoppingCart, 
  Cpu, FolderKanban, ShieldAlert, Settings, LogOut, ChevronLeft, ChevronRight, 
  FileText, CalendarDays, Award, Star, ListChecks, HelpCircle, Activity,
  Briefcase, Mail, Building
} from 'lucide-react';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  onLogout
}) => {

  // Menu item structure
  interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
  }

  interface MenuSection {
    sectionLabel: string;
    items: MenuItem[];
  }

  // Define navigation categories per role
  const getNavSections = (role: Role): MenuSection[] => {
    switch (role) {
      case 'superadmin':
        return [
          {
            sectionLabel: 'TỔNG QUAN',
            items: [
              { id: 'dashboard', label: 'Dashboard Điều hành', icon: <LayoutDashboard size={18} /> },
              { id: 'announcements', label: 'Bảng tin Học viện', icon: <Mail size={18} /> }
            ]
          },
          {
            sectionLabel: 'TÀI CHÍNH KẾ TOÁN',
            items: [
              { id: 'ledger', label: 'Sổ Cái Kế toán', icon: <Landmark size={18} /> },
              { id: 'ar', label: 'Công nợ phải thu', icon: <CreditCard size={18} /> },
              { id: 'ap', label: 'Công nợ phải trả', icon: <FileText size={18} /> },
              { id: 'cashbank', label: 'Ngân quỹ & Dòng tiền', icon: <Landmark size={18} /> },
              { id: 'budget', label: 'Ngân sách phòng ban', icon: <LayoutDashboard size={18} /> },
              { id: 'financial-reports', label: 'Báo cáo Tài chính', icon: <FileText size={18} /> },
              { id: 'fixed-assets', label: 'Tài sản cố định', icon: <Cpu size={18} /> }
            ]
          },
          {
            sectionLabel: 'NHÂN SỰ & LUYỆN THI',
            items: [
              { id: 'employees', label: 'Hồ sơ Giáo viên', icon: <Users size={18} /> },
              { id: 'attendance', label: 'Bảng Chấm công', icon: <CalendarDays size={18} /> },
              { id: 'payroll', label: 'Bảng tính Lương', icon: <CreditCard size={18} /> },
              { id: 'leave', label: 'Duyệt Nghỉ phép', icon: <CalendarDays size={18} /> },
              { id: 'recruitment', label: 'Tin Tuyển dụng', icon: <Briefcase size={18} /> }
            ]
          },
          {
            sectionLabel: 'THIẾT BỊ & VẬT TƯ KHO',
            items: [
              { id: 'products', label: 'SKU & Học liệu', icon: <Box size={18} /> },
              { id: 'inventory', label: 'Quản lý Tồn kho', icon: <Box size={18} /> },
              { id: 'requisitions', label: 'Đề nghị Mua sắm', icon: <ShoppingCart size={18} /> },
              { id: 'purchase-orders', label: 'Đơn Mua hàng (PO)', icon: <ShoppingCart size={18} /> },
              { id: 'vendors', label: 'Nhà cung cấp STEM', icon: <Users size={18} /> }
            ]
          },
          {
            sectionLabel: 'SẢN XUẤT & ROBOTICS',
            items: [
              { id: 'production-plan', label: 'Kế hoạch Sản xuất', icon: <Cpu size={18} /> },
              { id: 'work-orders', label: 'Lệnh lắp ráp Kit', icon: <Cpu size={18} /> },
              { id: 'machinery', label: 'Quản lý Thiết bị Lab', icon: <Activity size={18} /> }
            ]
          },
          {
            sectionLabel: 'DỰ ÁN & IT HELPDESK',
            items: [
              { id: 'projects', label: 'Dự án LMS & Portals', icon: <FolderKanban size={18} /> },
              { id: 'kanban', label: 'Bảng Task Agile', icon: <ListChecks size={18} /> },
              { id: 'assets', label: 'Quản trị IT Assets', icon: <Cpu size={18} /> },
              { id: 'helpdesk', label: 'Tickets hỗ trợ', icon: <HelpCircle size={18} /> }
            ]
          },
          {
            sectionLabel: 'HỆ THỐNG',
            items: [
              { id: 'users', label: 'Người dùng & RBAC', icon: <ShieldAlert size={18} /> },
              { id: 'audit-log', label: 'Nhật ký hệ thống', icon: <Activity size={18} /> },
              { id: 'settings', label: 'Tham số Cấu hình', icon: <Settings size={18} /> }
            ]
          }
        ];

      case 'finance':
        return [
          {
            sectionLabel: 'TÀI CHÍNH CHUYÊN SÂU',
            items: [
              { id: 'dashboard', label: 'Finance Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'ledger', label: 'Sổ Cái Kế toán', icon: <Landmark size={18} /> },
              { id: 'ar', label: 'Công nợ phải thu', icon: <CreditCard size={18} /> },
              { id: 'ap', label: 'Công nợ phải trả', icon: <FileText size={18} /> },
              { id: 'cashbank', label: 'Ngân quỹ Ngân hàng', icon: <Landmark size={18} /> },
              { id: 'budget', label: 'Kế hoạch Ngân sách', icon: <LayoutDashboard size={18} /> },
              { id: 'financial-reports', label: 'Báo cáo Tài chính', icon: <FileText size={18} /> },
              { id: 'fixed-assets', label: 'Tài sản cố định', icon: <Cpu size={18} /> }
            ]
          }
        ];

      case 'hr':
        return [
          {
            sectionLabel: 'NHÂN SỰ & ĐÀO TẠO',
            items: [
              { id: 'dashboard', label: 'HR Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'employees', label: 'Danh Sách Giáo Viên', icon: <Users size={18} /> },
              { id: 'attendance', label: 'Chấm Công Giáo vụ', icon: <CalendarDays size={18} /> },
              { id: 'payroll', label: 'Phiếu tính Lương', icon: <CreditCard size={18} /> },
              { id: 'leave', label: 'Duyệt Nghỉ phép', icon: <CalendarDays size={18} /> },
              { id: 'recruitment', label: 'Tuyển dụng & Phỏng vấn', icon: <Briefcase size={18} /> }
            ]
          }
        ];

      case 'warehouse':
        return [
          {
            sectionLabel: 'QUẢN TRỊ KHO VẬT TƯ',
            items: [
              { id: 'dashboard', label: 'Warehouse Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'products', label: 'Danh mục Vật tư/Học liệu', icon: <Box size={18} /> },
              { id: 'inventory', label: 'Nhập - Xuất - Tồn', icon: <Box size={18} /> }
            ]
          }
        ];

      case 'procurement':
        return [
          {
            sectionLabel: 'MUA SẮM VẬT TƯ',
            items: [
              { id: 'dashboard', label: 'PO Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'requisitions', label: 'Yêu cầu Mua sắm', icon: <ShoppingCart size={18} /> },
              { id: 'purchase-orders', label: 'Đơn mua hàng PO', icon: <ShoppingCart size={18} /> },
              { id: 'vendors', label: 'Nhà cung cấp đối tác', icon: <Users size={18} /> }
            ]
          }
        ];

      case 'production':
        return [
          {
            sectionLabel: 'R&D ROBOTIC KIT',
            items: [
              { id: 'dashboard', label: 'Production Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'production-plan', label: 'Kế hoạch Chế tạo', icon: <Cpu size={18} /> },
              { id: 'work-orders', label: 'Lệnh sản xuất Kit', icon: <Cpu size={18} /> },
              { id: 'machinery', label: 'Máy móc & Thiết bị Lab', icon: <Activity size={18} /> }
            ]
          }
        ];

      case 'it':
        return [
          {
            sectionLabel: 'IT LAB & PORTALS',
            items: [
              { id: 'dashboard', label: 'IT Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'projects', label: 'Quản lý dự án Gantt', icon: <FolderKanban size={18} /> },
              { id: 'kanban', label: 'Task Sprints (Kanban)', icon: <ListChecks size={18} /> },
              { id: 'assets', label: 'Tài sản IT & Phần mềm', icon: <Cpu size={18} /> },
              { id: 'helpdesk', label: 'Helpdesk Tickets', icon: <HelpCircle size={18} /> }
            ]
          }
        ];

      case 'employee':
        default:
          return [
            {
              sectionLabel: 'CÁ NHÂN TỰ PHỤC VỤ (ESS)',
              items: [
                { id: 'dashboard', label: 'Bảng điều khiển cá nhân', icon: <LayoutDashboard size={18} /> },
                { id: 'my-profile', label: 'Hồ sơ lý lịch', icon: <Users size={18} /> },
                { id: 'check-in', label: 'Chấm công hôm nay', icon: <CalendarDays size={18} /> },
                { id: 'my-leave', label: 'Đăng ký Nghỉ phép', icon: <CalendarDays size={18} /> },
                { id: 'my-payslip', label: 'Phiếu lương của tôi', icon: <CreditCard size={18} /> },
                { id: 'expenses', label: 'Yêu cầu Thanh toán chi phí', icon: <FileText size={18} /> },
                { id: 'announcements', label: 'Bảng tin nội bộ', icon: <Mail size={18} /> }
              ]
            }
          ];
    }
  };

  const sections = getNavSections(user.role);

  // Helper get translation visual for Role Badge
  const getRoleLabel = (role: Role) => {
    switch (role) {
      case 'superadmin': return 'Hiệu trưởng / Admin';
      case 'finance': return 'Đầu ngành Tài chính';
      case 'hr': return 'Trưởng phòng Nhân sự';
      case 'it': return 'Tech Lead / IT Lab';
      case 'warehouse': return 'Thanh tra Kho vận';
      case 'procurement': return 'Trưởng ban Mua sắm';
      case 'production': return 'Trưởng nhóm Nghiên cứu';
      case 'employee': return 'Giảng viên / Nhân viên';
      default: return 'Nhân sự';
    }
  };

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case 'superadmin': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'finance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'hr': return 'bg-green-50 text-green-700 border-green-200';
      case 'it': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'warehouse': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'procurement': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'production': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <aside 
      className={`bg-white text-slate-700 min-h-screen flex flex-col justify-between border-r border-gray-200 transition-all duration-300 relative ${
        collapsed ? 'w-[66px]' : 'w-[264px]'
      }`}
    >
      {/* Sidebar Collapse Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 -right-3 w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-150 hover:text-gray-900 shadow-xs transition-all z-20"
        title={collapsed ? "Mở rộng" : "Thu gọn"}
      >
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>

      <div>
        {/* Brand Banner */}
        <div className="h-[62px] px-4 flex items-center gap-3 border-b border-gray-100 bg-white overflow-hidden">
          <div className="w-9 h-9 min-w-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
            MC
          </div>
          {!collapsed && (
            <div className="truncate">
              <span className="font-display font-black text-[13px] tracking-tight text-blue-600 block leading-none">MCNA ACADEMY</span>
              <span className="text-[9px] text-gray-400 font-bold tracking-widest block uppercase mt-0.5">Technology School</span>
            </div>
          )}
        </div>

        {/* Logged in User Profile Strip */}
        <div className={`p-4 border-b border-gray-100 flex items-center gap-3 ${collapsed ? 'justify-center' : ''} bg-gray-50/30`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner ${user.avatarColor || 'bg-blue-600 text-white text-[10px]'}`}>
            {user.initials}
          </div>
          {!collapsed && (
            <div className="truncate flex-1">
              <span className="text-xs font-bold text-gray-800 block truncate leading-tight">{user.name}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] text-gray-400 font-semibold truncate uppercase">{getRoleLabel(user.role)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-180px)] thin-scrollbar">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest pl-3 mb-1.5">
                  {section.sectionLabel}
                </div>
              )}
              <div className="space-y-[2px]">
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center ${
                        collapsed ? 'justify-center p-2.5' : 'gap-3 px-3.5 py-2.5'
                      } text-xs font-semibold rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-[#EFF6FF] text-[#2563EB] font-bold shadow-xs'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <div className={isActive ? 'text-[#2563EB]' : 'text-gray-400 group-hover:text-gray-500'}>
                        {item.icon}
                      </div>
                      {!collapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer Support info & Log Out */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/20">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="px-2.5 py-2 rounded-xl bg-white border border-gray-200 text-[10px] space-y-0.5 text-gray-500">
              <p className="font-bold text-gray-700">MCNA ERP v2.4a</p>
              <p>Môi trường: Thử nghiệm</p>
              <p>Cơ sở dữ liệu: In-Memory (JS)</p>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all"
            >
              <LogOut size={16} />
              <span>Đăng xuất tài khoản</span>
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogout}
            className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-all"
            title="Đăng xuất"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};
