import React, { useState } from 'react';
import { User, Role } from '../types';
import { 
  GroupedBarChart, LineAreaChart, DonutChart, SemiCircleGauge, FunnelChart, AttendanceHeatmap 
} from './Charts';
import { 
  DollarSign, Users, ShoppingBag, Radio, ShieldAlert, Zap, Box, 
  Settings, Clock, CheckSquare, Sparkles, AlertTriangle, Play, Pause, ListTodo
} from 'lucide-react';

interface DashboardViewsProps {
  user: User;
  users: User[];
  departments: any[];
  attendance: any[];
  onCheckIn: (status: 'present' | 'late' | 'wfh', note?: string) => void;
  myCheckInToday: any;
  payroll: any[];
  leaveRequests: any[];
  onApproveLeave: (id: string, note?: string) => void;
  onRejectLeave: (id: string, reason?: string) => void;
  products: any[];
  purchaseOrders: any[];
  workOrders: any[];
  machines: any[];
  onUpdateMachineState: (machineId: string, newState: 'running' | 'idle' | 'maintenance' | 'breakdown') => void;
  projects: any[];
  tasks: any[];
  onToggleTaskStage: (taskId: string) => void;
  tickets: any[];
  announcements: any[];
  revenueData: any[];
  expenseByDept: any[];
}

export const DashboardViews: React.FC<DashboardViewsProps> = ({
  user,
  users,
  departments,
  attendance,
  onCheckIn,
  myCheckInToday,
  payroll,
  leaveRequests,
  onApproveLeave,
  onRejectLeave,
  products,
  purchaseOrders,
  workOrders,
  machines,
  onUpdateMachineState,
  projects,
  tasks,
  onToggleTaskStage,
  tickets,
  announcements,
  revenueData,
  expenseByDept
}) => {
  const [punchNote, setPunchNote] = useState('');

  // 1. CE0/Giám đốc Executive Dashboard
  const renderCEODashboard = () => {
    const totalRev = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalExp = revenueData.reduce((acc, curr) => acc + curr.expense, 0);
    const totalCount = users.length;
    const activeWoCount = workOrders.filter(w => w.stage === 'producing').length;
    const pendingPoCount = purchaseOrders.filter(p => p.status === 'pending').length;

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Dynamic Greeting Hero Banner */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-gray-900 flex justify-between items-center shadow-xs">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold font-sans text-gray-950 leading-none">Chào Giám đốc, {user.name}! 👋</h3>
            <p className="text-xs text-gray-500">
              MCNA Technology School đang hoạt động tối ưu. Hôm nay có {attendance.filter(a => a.date === '2026-05-22' && a.status === 'present').length} giáo viên có mặt.
            </p>
          </div>
          <div className="hidden sm:flex gap-3 text-xs">
            <div className="bg-gray-50 px-3.5 py-1.5 rounded-xl border border-gray-200 text-center">
              <span className="block text-[10px] text-gray-400 font-bold uppercase">Doanh thu MTD</span>
              <span className="font-extrabold text-blue-600 font-sans">2.35 tỷ ₫</span>
            </div>
            <div className="bg-gray-50 px-3.5 py-1.5 rounded-xl border border-gray-200 text-center">
              <span className="block text-[10px] text-gray-400 font-bold uppercase">Hiệu suất R&D</span>
              <span className="font-extrabold text-[#2563EB] font-sans">92.0%</span>
            </div>
          </div>
        </div>

        {/* Executive Row Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-xs space-y-2 border-t-4 border-t-blue-500">
            <div className="flex justify-between items-center text-gray-500 text-xs">
              <span className="font-semibold block uppercase tracking-wider">Doanh thu lũy kế</span>
              <DollarSign size={16} className="text-blue-500" />
            </div>
            <h4 className="text-lg font-black font-display text-gray-900 leading-none">{(totalRev).toLocaleString('vi-VN')} ₫</h4>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full">+12.4% so tháng trước</span>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-xs space-y-2 border-t-4 border-t-green-500">
            <div className="flex justify-between items-center text-gray-500 text-xs text-right">
              <span className="font-semibold block uppercase tracking-wider">Chi phí trường học</span>
              <DollarSign size={16} className="text-green-500" />
            </div>
            <h4 className="text-lg font-black font-display text-gray-900 leading-none">{(totalExp).toLocaleString('vi-VN')} ₫</h4>
            <span className="text-[10px] bg-red-50 text-red-700 font-bold px-1.5 py-0.5 rounded-full">-2.1% chi phí vận hành</span>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-xs space-y-2 border-t-4 border-t-purple-500">
            <div className="flex justify-between items-center text-gray-500 text-xs">
              <span className="font-semibold block uppercase tracking-wider">Tổng số Giảng viên</span>
              <Users size={16} className="text-purple-500" />
            </div>
            <h4 className="text-lg font-black font-display text-gray-900 leading-none">{totalCount} Giáo vụ</h4>
            <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded-full">Đủ 100% định biên lớp học</span>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-xs space-y-2 border-t-4 border-t-amber-500">
            <div className="flex justify-between items-center text-gray-500 text-xs">
              <span className="font-semibold block uppercase tracking-wider">Lệnh Robot Kit mở</span>
              <Radio size={16} className="text-amber-500" />
            </div>
            <h4 className="text-lg font-black font-display text-gray-900 leading-none">{activeWoCount} Đang chế tạo</h4>
            <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded-full">Phòng Lab sẵn sàng</span>
          </div>
        </div>

        {/* Charts block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-1.5">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">So sánh Thu - Chi dòng tiền 12 tháng</h5>
            <GroupedBarChart data={revenueData} />
          </div>
          <div className="space-y-1.5">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cơ cấu Chi phí phòng ban</h5>
            <DonutChart data={expenseByDept} />
          </div>
        </div>

        {/* Dashboard Splitting Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Budgets summary list */}
          <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">Phân bổ ngân sách phòng ban</h5>
              <span className="text-[10.5px] text-indigo-600 font-bold">Thao tác nhanh</span>
            </div>
            <div className="space-y-3.5">
              {departments.map(dept => {
                const pct = (dept.budgetUsed / dept.budget) * 100;
                return (
                  <div key={dept.id} className="space-y-1 bg-slate-50/55 p-2 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-800 font-bold text-[11px]">{dept.name} <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-1.5 py-0.2 rounded-md">({dept.headcount} nhân sự)</span></span>
                      <span className="text-gray-900 font-extrabold">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          pct > 90 ? 'bg-rose-500' : pct > 75 ? 'bg-amber-500' : 'bg-blue-600'
                        }`} 
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[9.5px] text-gray-400 font-mono">
                      <span>Đã dùng: {dept.budgetUsed.toLocaleString('vi-VN')} ₫ / {dept.budget.toLocaleString('vi-VN')} ₫</span>
                      <span>{dept.costCenter}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Campus Announcements */}
          <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">Bảng tin học vụ & Khẩn cấp</h5>
              <span className="text-[10px] text-gray-400 font-bolder">Cập nhật lúc 09h34</span>
            </div>
            <div className="space-y-3 Divide-y divide-gray-50">
              {announcements.slice(0, 2).map(ann => (
                <div key={ann.id} className="pt-2 first:pt-0 pb-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      ann.priority === 'critical' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {ann.priority === 'critical' ? 'Khẩn cấp' : 'Quan trọng'}
                    </span>
                    <span className="text-[9.5px] text-gray-400 font-medium">{ann.time}</span>
                  </div>
                  <h6 className="text-xs font-bold text-gray-800">{ann.title}</h6>
                  <p className="text-[10.5px] text-gray-500 leading-relaxed truncate-2-lines">{ann.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    );
  };

  // 2. CFO/Kế toán trưởng Dashboard
  const renderCFODashboard = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-gray-900 space-y-1 shadow-xs border-l-4 border-l-blue-600">
          <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Dòng tiền khả dụng hệ thống</span>
          <h3 className="text-2xl font-bold font-sans text-blue-600">11,960,000,000 ₫</h3>
          <p className="text-xs text-gray-600 leading-relaxed mt-1">Đã cân đối Công nợ & Quản lý thu kế toán các lớp chuyên đề STEM.</p>
        </div>

        {/* Banking Accounts List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2">Số dư Sổ Ngân hàng</h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-gray-800">Vietcombank - CN Ba Đình</p>
                  <p className="text-[10px] text-gray-400 font-mono">TK: 0011001234567</p>
                </div>
                <span className="text-xs font-extrabold text-blue-600 font-display">5,420,000,000 ₫</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-gray-800">Techcombank - CN Cầu Giấy</p>
                  <p className="text-[10px] text-gray-400 font-mono">TK: 190345678901</p>
                </div>
                <span className="text-xs font-extrabold text-blue-600 font-display">3,010,000,000 ₫</span>
              </div>
            </div>
          </div>

          {/* Aging metrics breakdown */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2">Hạn công nợ phải thu (Học sinh/Phụ huynh)</h5>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <p className="text-gray-600 font-semibold flex justify-between">
                  <span>Dưới 30 ngày (Trong hạn):</span>
                  <span className="font-bold text-emerald-600">14,750,000 ₫</span>
                </p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[80%]"></div>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 font-semibold flex justify-between">
                  <span>Trên 30 ngày (Quá hạn cảnh báo):</span>
                  <span className="font-bold text-rose-600">198,000,000 ₫</span>
                </p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CFO SVG Profit line */}
        <div className="space-y-1.5">
          <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Chi tiết Lợi nhuận gộp & Chi vận hành 12 tháng</h5>
          <LineAreaChart data={revenueData} />
        </div>
      </div>
    );
  };

  // 3. HR Nhân sự Dashboard
  const renderHRDashboard = () => {
    const presentToday = attendance.filter(a => a.date === '2026-05-22' && a.status === 'present').length;
    const lateToday = attendance.filter(a => a.date === '2026-05-22' && a.status === 'late').length;
    const leaveToday = attendance.filter(a => a.date === '2026-05-22' && a.status === 'leave').length;

    // Filter leaveRequests pending
    const hrPendingLeaves = leaveRequests.filter(l => l.status === 'pending');

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Có mặt giảng dạy</span>
            <h4 className="text-xl font-black text-emerald-600 font-display">{presentToday} giáo vụ</h4>
            <span className="text-[9.5px] text-gray-400">Tính đến 08:30 sáng</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Đang đi muộn/Vào trễ</span>
            <h4 className="text-xl font-black text-amber-600 font-display">{lateToday} người</h4>
            <span className="text-[9.5px] text-gray-400">Cần phản hồi giáo vụ</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Vắng phép đã duyệt</span>
            <h4 className="text-xl font-black text-blue-600 font-display">{leaveToday} người</h4>
            <span className="text-[9.5px] text-gray-400">Ứng dụng ESS tự động</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1 text-center font-semibold">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Tuyển dụng đang mở</span>
            <h4 className="text-xl font-black text-purple-600 font-display">2 vị trí</h4>
            <span className="text-[9.5px] text-gray-400">React Frontend, Robot STEM</span>
          </div>
        </div>

        {/* Pending user leaves approval table */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2">Nghỉ phép học vụ chờ duyệt</h5>
          {hrPendingLeaves.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">Tuyệt vời! Đã duyệt sạch toàn bộ nghỉ phép giáo viên.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400">
                    <th className="py-2 font-bold">Giáo viên</th>
                    <th className="py-2 font-bold">Lý do</th>
                    <th className="py-2 font-bold">Thời gian</th>
                    <th className="py-2 font-bold">Số ngày</th>
                    <th className="py-2 font-bold text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {hrPendingLeaves.map(lr => (
                    <tr key={lr.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold text-gray-800">{lr.employeeName}</td>
                      <td className="py-2.5 text-gray-600">{lr.reason}</td>
                      <td className="py-2.5 font-mono text-gray-500">{lr.from} &rarr; {lr.to}</td>
                      <td className="py-2.5 font-bold text-indigo-600">{lr.days} ngày</td>
                      <td className="py-2.5 text-right space-x-2">
                        <button
                          onClick={() => onApproveLeave(lr.id, 'Đồng ý duyệt phép học vụ')}
                          className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-bold rounded hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => onRejectLeave(lr.id, 'Lớp học thiếu giáo thỉnh giảng')}
                          className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-[10px] text-rose-700 font-bold rounded hover:bg-rose-100 transition-colors cursor-pointer"
                        >
                          Từ chối
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 4. Warehouse Module Dashboard
  const renderWarehouseDashboard = () => {
    // Collect low stock list
    const lowStockList = products.filter(p => p.stock <= p.minStock);

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-xs space-y-2 border-t-4 border-t-amber-500">
            <span className="text-[10px] text-orange-600 font-bold uppercase block tracking-wider">SKU CẢNH BÁO TỐN</span>
            <h4 className="text-lg font-black font-display text-orange-700 leading-none">{lowStockList.length} thiết bị sắp hết</h4>
            <p className="text-[10px] text-gray-400">Đơn hàng Uno R3, Khung Mica</p>
          </div>
          <div className="bg-white p-4.5 rounded-xl border border-gray-100 shadow-xs space-y-2 border-t-4 border-t-blue-500">
            <span className="text-[10px] text-blue-600 font-bold uppercase block tracking-wider">Địa điểm lưu kho</span>
            <h4 className="text-md font-black text-slate-800 leading-none">3 Kho vận hành</h4>
            <p className="text-[10px] text-gray-400">Kho HN, HCM, DN Lab</p>
          </div>
        </div>

        {/* Low inventory list details */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h5 className="text-xs font-extrabold text-rose-600 uppercase tracking-widest border-b border-gray-50 pb-2">Thiết bị học liệu sắp hết kho</h5>
          <div className="space-y-3 text-xs">
            {lowStockList.map(item => (
              <div key={item.id} className="flex justify-between items-center p-2 rounded-lg bg-red-50/20 border border-red-50">
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-[10px] text-gray-400">SKU: {item.sku} &bull; Vị trí: {item.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-rose-600">{item.stock} / {item.minStock} {item.unit}</span>
                  <p className="text-[9px] text-gray-400">Hạn định tối thiểu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 5. Procurement Dashboard
  const renderProcurementDashboard = () => {
    const pendingPoList = purchaseOrders.filter(p => p.status === 'pending');

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-white p-5 rounded-xl border border-gray-200 text-gray-900 space-y-1 shadow-xs border-l-4 border-l-cyan-600">
          <span className="text-[9.5px] font-bold tracking-widest text-cyan-600 uppercase">Quy trình Đấu thầu - Procurement</span>
          <h4 className="text-lg font-bold font-sans text-gray-900 leading-tight">Yêu cầu báo giá liên kết và đánh giá nhà cung cấp</h4>
        </div>

        {/* PO pending design */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2">Đơn mua hàng ứng viên chờ duyệt (PO)</h5>
          {pendingPoList.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">Tuyệt vời! Không có PO thầu chờ ký duyệt đợt này.</p>
          ) : (
            <div className="space-y-2">
              {pendingPoList.map(po => (
                <div key={po.id} className="flex justify-between items-center p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                  <div>
                    <p className="font-bold text-gray-800">{po.number} &rarr; {po.vendorName}</p>
                    <p className="text-[10px] text-gray-400">Ngày đặt: {po.date} &bull; Delivery: {po.deliveryDate}</p>
                  </div>
                  <span className="font-extrabold text-gray-800">{po.total.toLocaleString('vi-VN')} ₫</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // 6. Production Dashboard
  const renderProductionDashboard = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Machinery status check list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tiến trình dán chip mạch Uno R3 & In 3D (Work Orders)</h5>
            <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm font-semibold text-xs">
              {workOrders.map(wo => (
                <div key={wo.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">{wo.number}: {wo.qty} {wo.productName}</span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-bold capitalize">{wo.stage}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${wo.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-none">Hoàn tất: {wo.progress}% &bull; Trưởng kiểm thử: {wo.assignedTo}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hiệu suất Thiết bị Lab (OEE)</h5>
            <SemiCircleGauge value={88} label="Điểm OEE trung bình" />
          </div>
        </div>

        {/* Machinery grids */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2">Hố đen trạng thái Robot Machine dán chip</h5>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {machines.map(m => (
              <div key={m.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-center relative overflow-hidden">
                <span className="text-[9.5px] text-gray-400 block font-bold truncate leading-none">{m.code}</span>
                <p className="text-xs font-black text-gray-800 leading-tight truncate">{m.name}</p>
                <div className="flex items-center gap-1.5 justify-center">
                  <span className={`w-2 h-2 rounded-full ${
                    m.status === 'running' ? 'bg-emerald-500' : m.status === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></span>
                  <span className="text-[10px] font-bold text-gray-600 uppercase leading-none">{m.status}</span>
                </div>
                {/* Control switches */}
                <div className="pt-2 border-t border-gray-150/50 flex justify-center gap-2">
                  <button
                    onClick={() => onUpdateMachineState(m.id, m.status === 'running' ? 'idle' : 'running')}
                    className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                    title="Chuyển trạng thái Khởi động/Dừng"
                  >
                    {m.status === 'running' ? <Pause size={12} /> : <Play size={12} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 7. IT Lab / Sprint Board mini dashboard
  const renderITDashboard = () => {
    const totalSprintTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.stage === 'done').length;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1 border-l-4 border-l-purple-600 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Sprint LMS hiện tại</span>
            <h4 className="text-md font-extrabold text-purple-700 leading-none">Sprint 14: LMS interactive</h4>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1 border-l-4 border-l-emerald-600 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Hoàn tất Sprint</span>
            <h4 className="text-md font-extrabold text-emerald-700 leading-none">{completedTasks} / {totalSprintTasks} tasks</h4>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1 border-l-4 border-l-cyan-600 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Tickets IT lỗi Helpdesk</span>
            <h4 className="text-md font-extrabold text-cyan-700 leading-none">2 Mới nhất</h4>
          </div>
        </div>

        {/* Task lists checklist */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">Nhiệm vụ Sprints (Click để đổi trạng thái nhanh)</h5>
            <span className="text-[10px] text-gray-400">LMS Portal & AI Coach</span>
          </div>
          <div className="space-y-2">
            {tasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => onToggleTaskStage(task.id)}
                className="flex justify-between items-center p-2.5 hover:bg-slate-50/60 rounded-xl border border-slate-100 cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    task.stage === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
                  }`}>
                    {task.stage === 'done' && <span>✓</span>}
                  </div>
                  <div>
                    <p className={`font-bold text-gray-800 leading-tight ${task.stage === 'done' ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-[10px] font-medium text-gray-400 mt-0.5">{task.projectName} &bull; Chịu trách nhiệm: {task.assigneeName}</p>
                  </div>
                </div>
                <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded capitalize ${
                  task.priority === 'critical' ? 'bg-red-50 text-red-700' :
                  task.priority === 'high' ? 'bg-orange-50 text-orange-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 8. ESS Employee Self-Service (Giáo viên / Nhân viên)
  const renderEmployeeDashboard = () => {
    // Generate simulated monthly working attendance cell calendar Mon-Fri
    const mockHeatmapCells: any[] = [
      { day: 1, status: 'present', dateStr: '01/05/2026' },
      { day: 2, status: 'holiday', dateStr: '02/05/2026' },
      { day: 3, status: 'holiday', dateStr: '03/05/2026' },
      { day: 4, status: 'present', dateStr: '04/05/2026' },
      { day: 5, status: 'present', dateStr: '05/05/2026' },
      { day: 6, status: 'late', dateStr: '06/05/2026' },
      { day: 7, status: 'present', dateStr: '07/05/2026' },
      { day: 8, status: 'present', dateStr: '08/05/2026' },
      { day: 9, status: 'holiday', dateStr: '09/05/2026' },
      { day: 10, status: 'holiday', dateStr: '10/05/2026' },
      { day: 11, status: 'present', dateStr: '11/05/2026' },
      { day: 12, status: 'present', dateStr: '12/05/2026' },
      { day: 13, status: 'present', dateStr: '13/05/2026' },
      { day: 14, status: 'wfh', dateStr: '14/05/2026' },
      { day: 15, status: 'present', dateStr: '15/05/2026' },
      { day: 16, status: 'holiday', dateStr: '16/05/2026' },
      { day: 17, status: 'holiday', dateStr: '17/05/2026' },
      { day: 18, status: 'present', dateStr: '18/05/2026' },
      { day: 19, status: 'present', dateStr: '19/05/2026' },
      { day: 20, status: 'present', dateStr: '20/05/2026' },
      { day: 21, status: 'present', dateStr: '21/05/2026' },
      { day: 22, status: myCheckInToday ? myCheckInToday.status : 'none', dateStr: '22/05/2026' }
    ];

    // Personal assigned tasks
    const myAssignedTasks = tasks.filter(t => t.assigneeId === user.id);

    return (
      <div className="space-y-6 animate-fade-in">
        {/* ESS Welcome Strip */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-gray-900 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-l-teal-600">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-sans text-gray-950 leading-tight">Chào mừng giảng dạy, {user.name}! 🌟</h3>
            <p className="text-xs text-slate-500">Cổng thông tin tự phục vụ cán bộ / giáo thỉnh giảng MCNA Technology School.</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3.5 py-1.5 rounded-xl border border-gray-200">
            <Clock size={14} className="text-teal-600" />
            <span className="text-xs font-sans font-bold text-gray-700">Lịch học: 08h00 - 17h30</span>
          </div>
        </div>

        {/* Attendance Check in panel widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Thiết Bị Điểm Danh Giáo Vụ</h5>
              <span className="text-[10px] bg-slate-150 px-2 py-0.5 rounded text-gray-500 font-bold">Cổng phụ</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Dynamic stamp clock indicator */}
              <div className="flex-1 text-center py-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                <p className="text-2xl font-black font-mono text-gray-800 tracking-tight leading-none">09:34:42</p>
                <span className="text-[10px] font-bold text-gray-400 block uppercase mt-1">23 Tháng 5, 2026</span>
                {myCheckInToday && (
                  <div className="absolute top-2 right-2 w-16 h-16 border-4 border-dashed border-emerald-500 rounded-full flex items-center justify-center rotate-12 bg-white/80 pointer-events-none opacity-90 scale-90 transition-all duration-300">
                    <span className="text-[10px] text-emerald-600 font-black tracking-widest">ĐÃ PUNCH</span>
                  </div>
                )}
              </div>

              {/* Punch trigger button */}
              <div className="space-y-2 flex-1">
                <input
                  type="text"
                  value={punchNote}
                  disabled={!!myCheckInToday}
                  onChange={(e) => setPunchNote(e.target.value)}
                  placeholder="Ghi chú đi muộn / WFH..."
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                />
                <button
                  onClick={() => onCheckIn('present', punchNote)}
                  disabled={!!myCheckInToday}
                  className={`w-full py-2 px-4 rounded-xl text-xs font-bold text-white tracking-wide shadow-sm transition-all cursor-pointer ${
                    myCheckInToday 
                      ? 'bg-slate-200 text-gray-400 border-none pointer-events-none' 
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {myCheckInToday ? 'Điểm danh thành công ✓' : 'Punch Chấm công (Vào)'}
                </button>
              </div>
            </div>

            {/* Attendance feedback line */}
            {myCheckInToday && (
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] font-medium leading-relaxed">
                Đã ghi nhận check-in lúc <span className="font-bold">{myCheckInToday.checkIn}</span>. Trạng thái: <span className="font-bold uppercase">{myCheckInToday.status}</span>. {myCheckInToday.note && `Lý do: "${myCheckInToday.note}"`}
              </div>
            )}
          </div>

          {/* Personal Sprints checklists tasks widget */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest border-b border-gray-50 pb-2">Việc được phân công hôm nay</h5>
            {myAssignedTasks.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">Tuyệt vời! Không có tasks tồn trong đợt này.</p>
            ) : (
              <div className="space-y-2 max-h-[160px] overflow-y-auto">
                {myAssignedTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2 text-xs">
                    <input 
                      type="checkbox" 
                      checked={task.stage === 'done'}
                      onChange={() => onToggleTaskStage(task.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="truncate flex-1">
                      <p className={`font-semibold text-gray-800 leading-tight ${task.stage === 'done' ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
                      <p className="text-[10px] text-gray-400">Sprint 14 LMS &bull; Hạn: {task.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Heatmap line */}
        <AttendanceHeatmap cells={mockHeatmapCells} />
      </div>
    );
  };

  // Render Dashboard helper routing
  switch (user.role) {
    case 'superadmin': return renderCEODashboard();
    case 'finance': return renderCFODashboard();
    case 'hr': return renderHRDashboard();
    case 'warehouse': return renderWarehouseDashboard();
    case 'procurement': return renderProcurementDashboard();
    case 'production': return renderProductionDashboard();
    case 'it': return renderITDashboard();
    case 'employee':
    default:
      return renderEmployeeDashboard();
  }
};
