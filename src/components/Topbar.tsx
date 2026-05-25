import React, { useState, useEffect, useRef } from 'react';
import { User, Role, Notification } from '../types';
import { 
  Search, Bell, Plus, ChevronDown, User as UserIcon, Settings, 
  LogOut, ShieldAlert, Check, Landmark, Users, Box, ShoppingCart, 
  Cpu, CalendarDays, HelpCircle, Activity 
} from 'lucide-react';

interface TopbarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onSwapRole: (role: Role) => void;
  onQuickCreate: (type: 'employee' | 'grn' | 'po' | 'wo' | 'task' | 'ticket') => void;
  notifications: Notification[];
  onMarkNotificationsRead: () => void;
  onSearchSelect: (type: string, recordId: string) => void;
  users: User[];
  invoices: any[];
  products: any[];
  tasks: any[];
}

export const Topbar: React.FC<TopbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogout,
  onSwapRole,
  onQuickCreate,
  notifications,
  onMarkNotificationsRead,
  onSearchSelect,
  users,
  invoices,
  products,
  tasks
}) => {
  // Dropdown States
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  // Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    employees: any[];
    invoices: any[];
    products: any[];
    tasks: any[];
  }>({ employees: [], invoices: [], products: [], tasks: [] });
  const [showSearch, setShowSearch] = useState(false);

  // Refs for closing on outside click
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);

  // Handle outside click closures
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setShowQuickCreate(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Debounced search logic (300ms)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ employees: [], invoices: [], products: [], tasks: [] });
      return;
    }

    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();

      // Query Employees
      const matchedEmp = users.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query) || 
        u.title.toLowerCase().includes(query)
      ).slice(0, 3);

      // Query Invoices
      const matchedInv = invoices.filter(i => 
        i.number.toLowerCase().includes(query) || 
        i.partnerName.toLowerCase().includes(query)
      ).slice(0, 3);

      // Query Products
      const matchedProd = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.sku.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      ).slice(0, 3);

      // Query Tasks
      const matchedTask = tasks.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.projectName.toLowerCase().includes(query)
      ).slice(0, 3);

      setSearchResults({
        employees: matchedEmp,
        invoices: matchedInv,
        products: matchedProd,
        tasks: matchedTask
      });
      setShowSearch(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, users, invoices, products, tasks]);

  // Translate tab IDs into beautiful Vietnamese breadcrumbs
  const getBreadcrumbs = (tab: string) => {
    switch (tab) {
      case 'dashboard': return { category: 'Học viện MCNA', title: 'Bảng Điều Hành' };
      case 'ledger': return { category: 'Kế toán Tài chính', title: 'Sổ Cái Kế Toán' };
      case 'ar': return { category: 'Ngân quỹ Tài chính', title: 'Công nợ phải thu' };
      case 'ap': return { category: 'Ngân quỹ Tài chính', title: 'Công nợ phải trả' };
      case 'cashbank': return { category: 'Ngân quỹ Tài chính', title: 'Sổ quỹ ngân hàng' };
      case 'budget': return { category: 'Kế toán quản trị', title: 'Ngân sách các Bộ phận' };
      case 'financial-reports': return { category: 'Tài chính', title: 'Báo cáo Tài chính Phân tích' };
      case 'fixed-assets': return { category: 'Tài sản công', title: 'Khấu hao Tài sản cố định' };
      case 'employees': return { category: 'Văn phòng hành chính', title: 'Hồ sơ Giáo viên & Nhân viên' };
      case 'attendance': return { category: 'Quản trị nhân sự', title: 'Bảng Chấm công Giáo vụ' };
      case 'payroll': return { category: 'Phúc lợi Công đoàn', title: 'Lương & Thưởng Nhân viên' };
      case 'leave': return { category: 'Số hóa Nhân sự', title: 'Duyệt Đăng ký nghỉ học viên' };
      case 'recruitment': return { category: 'Công tác tuyển dụng', title: 'Pipeline Tuyển dụng ứng viên' };
      case 'products': return { category: 'Thiết bị & Học cụ', title: 'SKU Giáo trình & Robot Kit' };
      case 'inventory': return { category: 'Bộ phận Kho vận', title: 'Danh mục Tồn kho thiết bị' };
      case 'requisitions': return { category: 'Ban mua sắm', title: 'Đề nghị Mua sắm vật tư' };
      case 'purchase-orders': return { category: 'Ban đấu thầu', title: 'Theo dõi Đơn mua PO' };
      case 'vendors': return { category: 'Ban đấu thầu', title: 'Hồ sơ Nhà thầu liên kết' };
      case 'production-plan': return { category: 'Phòng Lab R&D', title: 'Master Plan Chế tạo' };
      case 'work-orders': return { category: 'Sản xuất STEM', title: 'Lệnh lắp ráp Robot Kit' };
      case 'machinery': return { category: 'Cơ sở vật chất', title: 'Máy móc & Thiết bị in 3D' };
      case 'projects': return { category: 'Dự án LMS', title: 'Hồ sơ thầu Phần mềm & LMS' };
      case 'kanban': return { category: 'IT Lab', title: 'Bảng quản lý Sprint (Agile)' };
      case 'assets': return { category: 'Quản lý Tài sản', title: 'Tài sản IT & Cấp bản quyền' };
      case 'helpdesk': return { category: 'Cơ sở vật chất', title: 'IT Helpdesk & Tickets' };
      case 'users': return { category: 'Quản trị bảo mật', title: 'Phân quyền người dùng (RBAC)' };
      case 'audit-log': return { category: 'Hệ thống', title: 'Audit Logs Bảo mật' };
      case 'settings': return { category: 'Cơ sở hạ tầng', title: 'Cài đặt Cấu hình ERP' };
      // Employee Portal Tabs
      case 'my-profile': return { category: 'Cá nhân tự phục vụ', title: 'Hồ sơ giảng viên' };
      case 'check-in': return { category: 'Cá nhân tự phục vụ', title: 'Máy Chấm công hôm nay' };
      case 'my-leave': return { category: 'Cá nhân tự phục vụ', title: 'Thời khóa biểu nghỉ phép' };
      case 'my-payslip': return { category: 'Cá nhân tự phục vụ', title: 'Phiếu thanh toán lương MTD' };
      case 'expenses': return { category: 'Cá nhân tự phục vụ', title: 'Đề xuất Hoàn ứng chi phí' };
      case 'announcements': return { category: 'Học viện MCNA', title: 'Bảng tin tức chung' };
      default: return { category: 'Hệ thống ERP', title: 'Phân hệ MCNA ERP' };
    }
  };

  const breadcrumbs = getBreadcrumbs(activeTab);
  const unreadNotifCount = notifications.filter(n => n.unread).length;

  const demoRoles = [
    { role: 'superadmin', label: '👑 CEO / Super Admin', desc: 'Quyền tối thượng toàn bộ module' },
    { role: 'finance', label: '📊 CFO / Tài chính', desc: 'Chuyên gia Sổ cái, Công nợ, P&L' },
    { role: 'hr', label: '👥 HR Manager / Nhân sự', desc: 'Chấm công, Lương thưởng, Tuyển sinh' },
    { role: 'it', label: '💻 IT Lab / Tech Lead', desc: 'Agile tasks, IT Assets, Helpdesk' },
    { role: 'warehouse', label: '📦 Warehouse / Kho vận', desc: 'Vật tư, Nhập xuất tồn và Vị trí' },
    { role: 'procurement', label: '🛒 Procurement / Mua sắm', desc: 'Yêu cầu, Đấu thầu, So sánh PO' },
    { role: 'production', label: '🏭 Production / Sản xuất', desc: 'BOM Robot, Máy móc dán chip' },
    { role: 'employee', label: '📋 Employee / Giảng viên', desc: 'Tự phục vụ, Check-in, Lương' }
  ];

  return (
    <header className="h-[62px] bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      
      {/* Left breadcrumb details */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[10.5px] text-gray-400 font-bold tracking-tight">
            <span>{breadcrumbs.category}</span>
            <span>&bull;</span>
            <span className="text-gray-500">{breadcrumbs.title}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <h2 className="text-[15px] font-extrabold text-gray-800 tracking-tight font-display">
              {breadcrumbs.title}
            </h2>
            {/* BREATHING GREEN BULB */}
            <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-[8.5px] text-emerald-700 font-black tracking-widest uppercase">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Debounced Search Bar */}
      <div ref={searchRef} className="hidden md:block w-96 relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearch(true)}
            placeholder="Tìm giáo viên, hóa đơn, robot kit, dự án..."
            className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-medium placeholder-gray-400"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Search results dropdown panel */}
        {showSearch && (searchResults.employees.length > 0 || searchResults.invoices.length > 0 || searchResults.products.length > 0 || searchResults.tasks.length > 0) && (
          <div className="absolute top-[44px] left-0 w-full bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-20 p-2 space-y-3 max-h-[350px] overflow-y-auto">
            
            {/* Employee Result Group */}
            {searchResults.employees.length > 0 && (
              <div className="space-y-1">
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider pl-2 block">👤 GIẢNG VIÊN & NHÂN SỰ</span>
                {searchResults.employees.map(emp => (
                  <button
                    key={emp.id}
                    onClick={() => {
                      onSearchSelect('employee', emp.id);
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-800">{emp.name}</p>
                      <p className="text-[10px] text-gray-400 leading-none mt-0.5">{emp.title} &bull; {emp.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Invoices Result Group */}
            {searchResults.invoices.length > 0 && (
              <div className="space-y-1">
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider pl-2 block">💰 PHÂN HỆ HÓA ĐƠN & THU CHI</span>
                {searchResults.invoices.map(inv => (
                  <button
                    key={inv.id}
                    onClick={() => {
                      onSearchSelect('invoice', inv.id);
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-800">{inv.number}</p>
                      <p className="text-[10px] text-gray-400 leading-none mt-0.5">{inv.partnerName}</p>
                    </div>
                    <span className="text-[10.5px] text-gray-700 font-extrabold">{inv.total.toLocaleString('vi-VN')} ₫</span>
                  </button>
                ))}
              </div>
            )}

            {/* Products Result Group */}
            {searchResults.products.length > 0 && (
              <div className="space-y-1">
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider pl-2 block">📦 SKU VẬT TƯ & HỌC CỤ</span>
                {searchResults.products.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      onSearchSelect('product', prod.id);
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-800">{prod.name}</p>
                      <p className="text-[10px] text-gray-400 leading-none mt-0.5">{prod.sku} &bull; {prod.category}</p>
                    </div>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">Tồn: {prod.stock}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Tasks Group */}
            {searchResults.tasks.length > 0 && (
              <div className="space-y-1">
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider pl-2 block">📋 AGILE TASKS / SPRINTS</span>
                {searchResults.tasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => {
                      onSearchSelect('task', task.id);
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-800">{task.title}</p>
                      <p className="text-[10px] text-gray-400 leading-none mt-0.5">{task.projectName} &bull; {task.priority.toUpperCase()}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right control utilities */}
      <div className="flex items-center gap-3">
        
        {/* INTERACTIVE DEMO ROLE SWITCHER PILL */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-1.5 bg-blue-50 border border-blue-105 hover:bg-blue-100 px-3 py-1.5 rounded-xl cursor-pointer text-xs font-bold text-blue-700 transition-colors"
          >
            <span>Vai trò Demo</span>
            <ChevronDown size={13} />
          </button>

          {showRoleSwitcher && (
            <div className="absolute right-0 top-[42px] w-[260px] bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50 p-1.5 space-y-0.5">
              <span className="text-[9.5px] font-bold text-blue-600 block px-2.5 py-1 uppercase tracking-widest border-b border-blue-50 mb-1">
                Chuyển nhanh phân hệ
              </span>
              {demoRoles.map(item => (
                <button
                  key={item.role}
                  onClick={() => {
                    onSwapRole(item.role as Role);
                    setShowRoleSwitcher(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-all flex flex-col ${
                    user.role === item.role ? 'bg-blue-50/50 ring-1 ring-blue-500/10' : ''
                  }`}
                >
                  <p className="text-xs font-bold text-gray-800">{item.label}</p>
                  <p className="text-[9.5px] text-gray-400 leading-none mt-0.5 truncate">{item.desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 1. QUICK CREATE SHORTCUT */}
        <div ref={quickRef} className="relative">
          <button
            onClick={() => setShowQuickCreate(!showQuickCreate)}
            className="w-8.5 h-8.5 rounded-xl bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
            title="Tạo nhanh tài liệu"
          >
            <Plus size={16} />
          </button>

          {showQuickCreate && (
            <div className="absolute right-0 top-[42px] w-52 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-50 py-1">
              <span className="text-[9px] text-gray-400 font-bold block px-3 py-1 uppercase tracking-widest">TẠO NHANH CHỨNG TỪ</span>
              <button
                onClick={() => { onQuickCreate('employee'); setShowQuickCreate(false); }}
                className="w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 transition-colors text-left flex items-center gap-2"
              >
                <Users size={14} className="text-emerald-500" />
                <span>Thêm Giáo viên mới</span>
              </button>
              <button
                onClick={() => { onQuickCreate('grn'); setShowQuickCreate(false); }}
                className="w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 transition-colors text-left flex items-center gap-2"
              >
                <Box size={14} className="text-amber-500" />
                <span>Lập Phiếu Nhập Kho</span>
              </button>
              <button
                onClick={() => { onQuickCreate('po'); setShowQuickCreate(false); }}
                className="w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 transition-colors text-left flex items-center gap-2"
              >
                <ShoppingCart size={14} className="text-blue-500" />
                <span>Tạo Đơn Mua hàng (PO)</span>
              </button>
              <button
                onClick={() => { onQuickCreate('wo'); setShowQuickCreate(false); }}
                className="w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 transition-colors text-left flex items-center gap-2"
              >
                <Cpu size={14} className="text-red-500" />
                <span>Lập Lệnh Lọp Ráp Kit</span>
              </button>
              <button
                onClick={() => { onQuickCreate('task'); setShowQuickCreate(false); }}
                className="w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 transition-colors text-left flex items-center gap-2"
              >
                <CalendarDays size={14} className="text-purple-500" />
                <span>Tạo Nhiệm vụ Sprint</span>
              </button>
              <button
                onClick={() => { onQuickCreate('ticket'); setShowQuickCreate(false); }}
                className="w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 transition-colors text-left flex items-center gap-2"
              >
                <HelpCircle size={14} className="text-cyan-500" />
                <span>Log IT Helpdesk Ticket</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. NOTIFICATIONS BELL WITH BADGE */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8.5 h-8.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer relative"
          >
            <Bell size={15} />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-extrabold text-[9px] rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-[42px] w-[350px] bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-50">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                <span className="text-xs font-extrabold text-gray-800 font-display">Thông báo từ hệ thống</span>
                {unreadNotifCount > 0 && (
                  <button
                    onClick={() => { onMarkNotificationsRead(); setShowNotifications(false); }}
                    className="text-[10px] text-indigo-600 font-bold hover:underline"
                  >
                    Đọc tất cả ({unreadNotifCount})
                  </button>
                )}
              </div>
              <div className="max-h-[280px] overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400">
                    Bạn không có thông báo mới nào
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-3 hover:bg-slate-50/60 transition-colors relative ${notif.unread ? 'bg-indigo-50/30' : ''}`}
                    >
                      <div className="flex gap-2.5 items-start">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] min-w-7 mt-0.5 ${
                          notif.module === 'finance' ? 'bg-blue-50 text-blue-600' :
                          notif.module === 'hr' ? 'bg-green-50 text-green-600' :
                          notif.module === 'warehouse' ? 'bg-amber-50 text-amber-600' :
                          'bg-purple-50 text-purple-600'
                        }`}>
                          {notif.module === 'finance' ? <Landmark size={14} /> :
                           notif.module === 'hr' ? <Users size={14} /> :
                           notif.module === 'warehouse' ? <Box size={14} /> :
                           <Activity size={14} />}
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <p className={`text-xs text-gray-800 leading-tight truncate ${notif.unread ? 'font-bold' : 'font-medium'}`}>
                            {notif.title}
                          </p>
                          <p className="text-[10px] text-gray-500 leading-relaxed truncate-2-lines">{notif.body}</p>
                          <span className="text-[9px] text-gray-400 block font-medium uppercase mt-1">{notif.time}</span>
                        </div>
                      </div>
                      {notif.unread && (
                        <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. PROFILE PILL DROP & PROFILE CONFIGS */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-90 select-none pb-0.5"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${user.avatarColor || 'bg-slate-800 text-white text-[10px]'}`}>
              {user.initials}
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-[42px] w-52 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-50 py-1">
              <div className="px-3 py-2 border-b border-gray-50">
                <p className="text-xs font-bold text-gray-800 truncate leading-none mb-1">{user.name}</p>
                <span className="text-[9px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-sm font-semibold truncate uppercase">{user.role}</span>
              </div>
              <button
                onClick={() => { setActiveTab(user.role === 'employee' ? 'my-profile' : 'settings'); setShowProfile(false); }}
                className="w-full px-3 py-2 text-xs font-medium text-gray-700 hover:bg-slate-50 transition-colors text-left flex items-center gap-2"
              >
                <UserIcon size={14} />
                <span>Hồ sơ cá nhân</span>
              </button>
              {user.role === 'superadmin' && (
                <button
                  onClick={() => { setActiveTab('settings'); setShowProfile(false); }}
                  className="w-full px-3 py-2 text-xs font-medium text-gray-700 hover:bg-slate-50 transition-colors text-left flex items-center gap-2"
                >
                  <Settings size={14} />
                  <span>Tham số Cấu hình</span>
                </button>
              )}
              <hr className="border-gray-50 my-1" />
              <button
                onClick={onLogout}
                className="w-full px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors text-left flex items-center gap-2"
              >
                <LogOut size={14} />
                <span>Đăng xuất ERP</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
