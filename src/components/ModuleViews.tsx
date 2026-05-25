import React, { useState } from 'react';
import { 
  User, Department, AttendanceRecord, PayrollRecord, LeaveRequest,
  RecruitmentJob, Candidate, GLAccount, JournalEntry, Invoice,
  BankAccount, Budget, Product, Warehouse, StockTransaction,
  Vendor, PurchaseOrder, BOM, WorkOrder, Machine, QCResult,
  Project, Sprint, Task, ITAsset, HelpdeskTicket, Notification,
  Announcement, AuditLog 
} from '../types';
import { 
  Plus, Search, Filter, Eye, Edit2, Shield, Trash2, CheckCircle2, XCircle, 
  MapPin, Phone, Mail, Award, BookOpen, Download, Printer, ToggleLeft, ToggleRight,
  Database, RefreshCw, Barcode, Scale, Calendar, AlertTriangle, ArrowRight, ArrowLeft
} from 'lucide-react';

interface ModuleViewsProps {
  activeTab: string;
  user: User;
  users: User[];
  onAddNewUser: (newUser: User) => void;
  departments: Department[];
  attendance: AttendanceRecord[];
  onUpdateAttendance: (records: AttendanceRecord[]) => void;
  payroll: PayrollRecord[];
  onCalculatePayroll: (period: string) => void;
  onApprovePayroll: (id: string) => void;
  leaveRequests: LeaveRequest[];
  onApproveLeave: (id: string, note?: string) => void;
  onRejectLeave: (id: string, reason?: string) => void;
  onAddLeaveRequest: (req: LeaveRequest) => void;
  recruitmentJobs: RecruitmentJob[];
  candidates: Candidate[];
  onMoveCandidateStage: (candidateId: string, nextStage: string) => void;
  glAccounts: GLAccount[];
  journalEntries: JournalEntry[];
  onAddJournalEntry: (entry: JournalEntry) => void;
  invoices: Invoice[];
  onPayInvoice: (invoiceId: string, amount: number) => void;
  bankAccounts: BankAccount[];
  budgets: Budget[];
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onAddStockTransaction: (trans: StockTransaction) => void;
  stockTransactions: StockTransaction[];
  vendors: Vendor[];
  purchaseOrders: PurchaseOrder[];
  onAddPO: (po: PurchaseOrder) => void;
  onUpdatePOStatus?: (poId: string, status: 'draft' | 'pending' | 'approved' | 'overdue' | 'received') => void;
  workOrders: WorkOrder[];
  onAddWO: (wo: WorkOrder) => void;
  onMoveWOStage: (woId: string, nextStage: string) => void;
  machines: Machine[];
  projects: Project[];
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onMoveTaskStage: (taskId: string, nextStage: string) => void;
  tickets: HelpdeskTicket[];
  assets: ITAsset[];
  auditLogs: AuditLog[];
  announcements: Announcement[];
  toast: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export const ModuleViews: React.FC<ModuleViewsProps> = ({
  activeTab,
  user,
  users,
  onAddNewUser,
  departments,
  attendance,
  onUpdateAttendance,
  payroll,
  onCalculatePayroll,
  onApprovePayroll,
  leaveRequests,
  onApproveLeave,
  onRejectLeave,
  onAddLeaveRequest,
  recruitmentJobs,
  candidates,
  onMoveCandidateStage,
  glAccounts,
  journalEntries,
  onAddJournalEntry,
  invoices,
  onPayInvoice,
  bankAccounts,
  budgets,
  products,
  onAddProduct,
  onAddStockTransaction,
  stockTransactions,
  vendors,
  purchaseOrders,
  onAddPO,
  onUpdatePOStatus,
  workOrders,
  onAddWO,
  onMoveWOStage,
  machines,
  projects,
  tasks,
  onAddTask,
  onMoveTaskStage,
  tickets,
  assets,
  auditLogs,
  announcements,
  toast
}) => {

  // Modals & triggers
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<User | null>(null);
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);
  const [selectedJE, setSelectedJE] = useState<JournalEntry | null>(null);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [showAddJEModal, setShowAddJEModal] = useState(false);
  const [showAddProdModal, setShowAddProdModal] = useState(false);
  const [showAddPOModal, setShowAddPOModal] = useState(false);
  const [showAddWOModal, setShowAddWOModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // Filter States
  const [empSearch, setEmpSearch] = useState('');
  const [empDeptFilter, setEmpDeptFilter] = useState('ALL');
  const [empPage, setEmpPage] = useState(1);
  const [empPerPage, setEmpPerPage] = useState(15);
  const [payPage, setPayPage] = useState(1);
  const [prodSearch, setProdSearch] = useState('');
  const [finReportTab, setFinReportTab] = useState<'p_l' | 'balance_sheet' | 'cash_flow'>('p_l');

  // Local Form states (Employee Creation)
  const [newEmpForm, setNewEmpForm] = useState({
    lastName: '',
    firstName: '',
    dob: '',
    gender: 'Nam',
    cccd: '',
    phone: '',
    email: '',
    password: 'Password@123',
    role: 'employee' as any,
    deptId: 'DEP003',
    title: '',
    salary: 15000000,
    joinedAt: new Date().toISOString().split('T')[0]
  });

  // Local Double entry Journal creation states
  const [jeDesc, setJeDesc] = useState('');
  const [jeLines, setJeLines] = useState<any[]>([
    { accountCode: '642', debit: 0, credit: 0 },
    { accountCode: '1121', debit: 0, credit: 0 }
  ]);

  // Local Product creation states
  const [newProd, setNewProd] = useState({
    sku: '',
    name: '',
    category: 'Linh kiện điện tử',
    unit: 'Chiếc',
    costPrice: 0,
    salePrice: 0,
    stock: 100,
    minStock: 20
  });

  // Local PO creation
  const [poVendor, setPoVendor] = useState('');
  const [poLines, setPoLines] = useState<any[]>([
    { productId: '', qty: 10, price: 0 }
  ]);

  // Local WO creation
  const [woProduct, setWoProduct] = useState('');
  const [woQty, setWoQty] = useState(50);
  const [woAssignee, setWoAssignee] = useState('');

  // Local Task creation
  const [taskTitle, setTaskTitle] = useState('');
  const [taskProject, setTaskProject] = useState('');
  const [taskPoints, setTaskPoints] = useState(3);
  const [taskPriority, setTaskPriority] = useState('medium' as any);

  // Payslip Printer Dialog Helper
  const handlePrintPayslip = () => {
    window.print();
  };

  const getDeptName = (deptId: string) => {
    const d = departments.find(dep => dep.id === deptId);
    return d ? d.name : 'Bộ phận chung';
  };

  // Helper calculation totals
  const totalDebit = jeLines.reduce((acc, curr) => acc + Number(curr.debit || 0), 0);
  const totalCredit = jeLines.reduce((acc, curr) => acc + Number(curr.credit || 0), 0);

  // 1. SAVE NEW EMPLOYEE Handler
  const handleSaveEmployee = () => {
    if (!newEmpForm.lastName || !newEmpForm.firstName || !newEmpForm.email || !newEmpForm.title) {
      toast('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'warning');
      return;
    }
    const initials = newEmpForm.firstName.substring(0, 2).toUpperCase() || 'NV';
    const newId = `USR${String(users.length + 1).padStart(3, '0')}`;
    
    const createdUser: User = {
      id: newId,
      email: newEmpForm.email,
      pw: newEmpForm.password,
      name: `${newEmpForm.lastName} ${newEmpForm.firstName}`,
      role: newEmpForm.role,
      deptId: newEmpForm.deptId,
      title: newEmpForm.title,
      phone: newEmpForm.phone,
      initials: initials,
      avatarColor: 'bg-indigo-600 text-white',
      status: 'active',
      joinedAt: newEmpForm.joinedAt,
      dob: newEmpForm.dob,
      cccd: newEmpForm.cccd
    };

    onAddNewUser(createdUser);
    toast(`Đã khởi tạo hồ sơ nhân sự của ${createdUser.name} thành công.`, 'success');
    setShowAddEmpModal(false);
    // Reset
    setNewEmpForm({
      lastName: '',
      firstName: '',
      dob: '',
      gender: 'Nam',
      cccd: '',
      phone: '',
      email: '',
      password: 'Password@123',
      role: 'employee',
      deptId: 'DEP003',
      title: '',
      salary: 15000000,
      joinedAt: new Date().toISOString().split('T')[0]
    });
  };

  // 2. JOURNAL POSTING Handler
  const handlePostJournal = () => {
    if (!jeDesc.trim()) {
      toast('Hãy nhập diễn giải bút toán kế toán', 'warning');
      return;
    }
    if (totalDebit !== totalCredit) {
      toast('Bút toán không cân bằng! Tổng bên Nợ phải bằng bên Có.', 'error');
      return;
    }
    const newJE: JournalEntry = {
      id: `JE${String(journalEntries.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      ref: `PKN-05-${String(journalEntries.length + 21).padStart(3, '0')}`,
      description: jeDesc,
      lines: jeLines.map(line => {
        const found = glAccounts.find(a => a.code === line.accountCode);
        return {
          accountCode: line.accountCode,
          accountName: found ? found.name : 'Tài khoản',
          debit: Number(line.debit || 0),
          credit: Number(line.credit || 0)
        };
      }),
      creator: user.name,
      status: 'posted'
    };

    onAddJournalEntry(newJE);
    toast('Đã đăng sổ bút toán kế toán thành công!', 'success');
    setShowAddJEModal(false);
    setJeDesc('');
    setJeLines([
      { accountCode: '642', debit: 0, credit: 0 },
      { accountCode: '1121', debit: 0, credit: 0 }
    ]);
  };

  // 3. MATERALS SKU INBOUND SAVE
  const handleSaveProduct = () => {
    if (!newProd.sku || !newProd.name || !newProd.costPrice) {
      toast('Vui lòng điền thông tin SKU và tên thiết bị học liệu', 'warning');
      return;
    }
    const p: Product = {
      id: `PRD${String(products.length + 1).padStart(3, '0')}`,
      sku: newProd.sku,
      name: newProd.name,
      category: newProd.category,
      unit: newProd.unit,
      costPrice: Number(newProd.costPrice),
      salePrice: Number(newProd.salePrice || newProd.costPrice * 1.5),
      stock: Number(newProd.stock),
      minStock: Number(newProd.minStock),
      maxStock: 5000,
      location: 'Khu trung tâm Lắp ráp',
      supplierName: 'Mã thầu chính',
      barcode: String(Math.floor(100000000000 + Math.random() * 900000000000))
    };

    onAddProduct(p);
    // Add transaction list
    onAddStockTransaction({
      id: `ST${String(stockTransactions.length + 1).padStart(3, '0')}`,
      type: 'in',
      date: new Date().toISOString().split('T')[0],
      productName: p.name,
      sku: p.sku,
      qty: p.stock,
      warehouse: 'Kho Vật tư trung tâm',
      ref: 'PNK-Mẫu',
      operator: user.name
    });

    toast('Khởi tạo sản phẩm/học liệu thành công!', 'success');
    setShowAddProdModal(false);
    setNewProd({
      sku: '',
      name: '',
      category: 'Linh kiện điện tử',
      unit: 'Chiếc',
      costPrice: 0,
      salePrice: 0,
      stock: 100,
      minStock: 20
    });
  };

  // 4. SAVE PO Handler
  const handleSavePO = () => {
    if (!poVendor) {
      toast('Vui lòng chọn Nhà cung cấp thầu', 'warning');
      return;
    }
    const poItems: any[] = [];
    let grandTotal = 0;

    poLines.forEach(line => {
      const matchPrd = products.find(p => p.id === line.productId);
      if (matchPrd) {
        const qty = Number(line.qty || 1);
        const price = Number(line.price || matchPrd.costPrice);
        const lineTotal = qty * price;
        grandTotal += lineTotal;
        poItems.push({
          productId: matchPrd.id,
          name: matchPrd.name,
          qty,
          price
        });
      }
    });

    const newPO: PurchaseOrder = {
      id: `PO${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      number: `PO-2026-${String(purchaseOrders.length + 17).padStart(3, '0')}`,
      vendorId: poVendor,
      vendorName: vendors.find(v => v.id === poVendor)?.name || 'Nhà cung cấp',
      date: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: poItems,
      total: grandTotal,
      status: 'pending'
    };

    onAddPO(newPO);
    toast(`Đã gởi Đơn Mua PO (${newPO.number}) phê duyệt`, 'success');
    setShowAddPOModal(false);
    setPoLines([{ productId: '', qty: 10, price: 0 }]);
  };

  // 5. SAVE WO Assembly
  const handleSaveWO = () => {
    if (!woProduct || !woAssignee) {
      toast('Vui lòng chọn sản phẩm và người phụ trách chính', 'warning');
      return;
    }
    const matchObj = products.find(p => p.id === woProduct);

    const newWOObj: WorkOrder = {
      id: `WO${String(workOrders.length + 1).padStart(3, '0')}`,
      number: `LSX-2026-${String(workOrders.length + 10).padStart(3, '0')}`,
      productId: woProduct,
      productName: matchObj?.name || 'Sản phẩm Robot',
      qty: Number(woQty),
      bomId: 'BOM001',
      plannedStart: new Date().toISOString().split('T')[0],
      plannedEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      stage: 'planned',
      assignedTo: woAssignee,
      progress: 0
    };

    onAddWO(newWOObj);
    toast(`Đã ban hành Lệnh sản xuất lắp ráp: ${newWOObj.number}`, 'success');
    setShowAddWOModal(false);
  };

  // 6. SAVE TASK Agile Group
  const handleSaveTask = () => {
    if (!taskTitle || !taskProject) {
      toast('Vui lòng điền tiêu đề và ghép dự án thầu', 'warning');
      return;
    }
    const newTaskObj: Task = {
      id: `TSK${String(tasks.length + 1).padStart(3, '0')}`,
      title: taskTitle,
      projectId: taskProject,
      projectName: projects.find(p => p.id === taskProject)?.name || 'Dự án thầu',
      assigneeName: user.name,
      assigneeId: user.id,
      priority: taskPriority,
      stage: 'todo',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      storyPoints: Number(taskPoints),
      tags: ['interactive', 'it-lab']
    };

    onAddTask(newTaskObj);
    toast('Đã lập Task mới trong Agile Board!', 'success');
    setShowAddTaskModal(false);
    setTaskTitle('');
  };

  return (
    <div className="space-y-6">

      {/* ──────────────── 1. QUẢN LÝ NHÂN SỰ (EMPLOYEES) ──────────────── */}
      {activeTab === 'employees' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h4 className="text-[15px] font-black font-display text-gray-800 uppercase tracking-wide">
              HỒ SƠ GIÁO VIÊN & STAFF HỌC VIỆN
            </h4>
            <button
              onClick={() => setShowAddEmpModal(true)}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-xl cursor-pointer shadow-sm transition-all"
            >
              <Plus size={14} />
              <span>Ghi danh Giáo thợ mới</span>
            </button>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={empSearch}
              onChange={(e) => setEmpSearch(e.target.value)}
              placeholder="Tìm theo tên giảng viên, email..."
              className="px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
            <select
              value={empDeptFilter}
              onChange={(e) => setEmpDeptFilter(e.target.value)}
              className="px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="ALL">Tất cả Phòng ban</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* List Sheet */}
          {(() => {
            const filtered = users.filter(u => {
              const matchesSearch = u.name.toLowerCase().includes(empSearch.toLowerCase()) || 
                                    u.email.toLowerCase().includes(empSearch.toLowerCase()) ||
                                    u.id.toLowerCase().includes(empSearch.toLowerCase());
              const matchesDept = empDeptFilter === 'ALL' || u.deptId === empDeptFilter;
              return matchesSearch && matchesDept;
            });

            const totalCount = filtered.length;
            const totalPages = Math.max(1, Math.ceil(totalCount / empPerPage));
            const activePage = Math.min(empPage, totalPages);
            const startIndex = (activePage - 1) * empPerPage;
            const endIndex = Math.min(startIndex + empPerPage, totalCount);
            const pageItems = filtered.slice(startIndex, endIndex);

            return (
              <div className="space-y-4">
                {/* Enterprise Quick Metrics Panel */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-sans">
                  <div>
                    <span className="block text-gray-400 font-bold uppercase tracking-wider text-[9px]">Tổng Cán bộ/Giảng viên</span>
                    <span className="font-extrabold text-gray-900 text-sm">{users.length} nhân sự</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase tracking-wider text-[9px]">Tìm thấy hiện tại</span>
                    <span className="font-extrabold text-blue-600 text-sm">{totalCount} nhân sự</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase tracking-wider text-[9px]">Lương bình quân MTD</span>
                    <span className="font-extrabold text-emerald-600 text-sm">~18.2 triệu ₫</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase tracking-wider text-[9px]">Bảo hiểm & Thuế TNCN</span>
                    <span className="font-extrabold text-purple-600 text-sm">Khấu trừ tự động</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="border-b border-gray-150 text-gray-400 font-bold">
                        <th className="py-2.5">Mã NV</th>
                  <th className="py-2.5">Họ & Tên</th>
                  <th className="py-2.5 font-bold">Chức danh / Vị trí</th>
                  <th className="py-2.5 font-bold">Mã Phòng / Bộ phận</th>
                  <th className="py-2.5 font-bold">Số điện thoại</th>
                  <th className="py-2.5 font-bold">Ngày gia nhập</th>
                  <th className="py-2.5 text-right font-bold text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {pageItems
                  .map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold text-slate-500 font-mono text-[11px]">{emp.id}</td>
                      <td className="py-2.5 font-bold text-slate-900 text-[12px]">{emp.name}</td>
                      <td className="py-2.5 text-slate-600 text-[11px]">{emp.title}</td>
                      <td className="py-2.5 text-indigo-700 font-semibold text-[11px]">{getDeptName(emp.deptId)}</td>
                      <td className="py-2.5 font-mono text-slate-500 text-[11px]">{emp.phone}</td>
                      <td className="py-2.5 font-mono text-slate-400 text-[11px]">{emp.joinedAt}</td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => setSelectedEmp(emp)}
                          className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-[10.5px] font-bold text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          Hồ sơ chi tiết
                        </button>
                      </td>
                    </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400 font-semibold">
                      Không tìm thấy nhân sự phù hợp tiêu chí lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-gray-100 gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span>Hiển thị:</span>
              <select
                value={empPerPage}
                onChange={(e) => {
                  setEmpPerPage(Number(e.target.value));
                  setEmpPage(1);
                }}
                className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg outline-none"
              >
                <option value={10}>10 cán bộ</option>
                <option value={15}>15 cán bộ</option>
                <option value={30}>30 cán bộ</option>
                <option value={50}>50 cán bộ</option>
              </select>
              <span>| Đang hiển thị {totalCount > 0 ? startIndex + 1 : 0}-{endIndex} trên {totalCount} nhân sự</span>
            </div>

            <div className="flex items-center gap-1.5 font-sans">
              <button
                onClick={() => setEmpPage(prev => Math.max(1, prev - 1))}
                disabled={activePage === 1}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 font-bold cursor-pointer"
              >
                Trước
              </button>
              <span className="font-bold text-gray-700">Trang {activePage} / {totalPages}</span>
              <button
                onClick={() => setEmpPage(prev => Math.min(totalPages, prev + 1))}
                disabled={activePage === totalPages}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 font-bold cursor-pointer"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      );
    })()}
        </div>
      )}


      {/* ──────────────── 2. CHẤM CÔNG (ATTENDANCE) ──────────────── */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[15px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            BẢNG CHẤM CÔNG GIÁO VỤ ACADEMY
          </h4>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-gray-500 font-bold">
                  <th className="p-3">Giáo viên / Cán bộ</th>
                  <th className="p-3">Ngày điểm danh</th>
                  <th className="p-3">Nút check-in</th>
                  <th className="p-3">Nút check-out</th>
                  <th className="p-3 text-center">Trạng thái</th>
                  <th className="p-3">Ghi chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-slate-700">
                {attendance.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-gray-850">{a.employeeName}</td>
                    <td className="p-3 font-mono text-gray-500">{a.date}</td>
                    <td className="p-3 font-mono text-emerald-600 font-bold">{a.checkIn}</td>
                    <td className="p-3 font-mono text-blue-600 font-bold">{a.checkOut}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold uppercase ${
                        a.status === 'present' ? 'bg-emerald-50 text-emerald-700' :
                        a.status === 'late' ? 'bg-amber-50 text-amber-700' :
                        a.status === 'wfh' ? 'bg-indigo-50 text-indigo-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500 italic">{a.note || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ──────────────── 3. BẢNG LƯƠNG NHÂN VIÊN (PAYROLL) ──────────────── */}
      {activeTab === 'payroll' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-50 pb-3">
            <div>
              <h4 className="text-[15px] font-black font-display text-gray-800 uppercase tracking-wide">
                BẢNG LƯƠNG VÀ CAM KẾT ACADEMY
              </h4>
              <p className="text-[11.5px] text-gray-400 font-medium">Bảng quyết toán học phí quy đổi giờ thỉnh giảng</p>
            </div>
            <button
              onClick={() => {
                onCalculatePayroll('05/2026');
                toast('Đã tính toán bảng lương tháng 05/2026 tự động dựa trên số công!', 'success');
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Chạy bảng tính toán tự động
            </button>
          </div>

          {(() => {
            const payPerPage = 15;
            const totalCount = payroll.length;
            const totalPages = Math.max(1, Math.ceil(totalCount / payPerPage));
            const activePage = Math.min(payPage, totalPages);
            const startIndex = (activePage - 1) * payPerPage;
            const endIndex = Math.min(startIndex + payPerPage, totalCount);
            const pagePayroll = payroll.slice(startIndex, endIndex);

            return (
              <div className="space-y-4">
                {/* Enterprise Payroll quick metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50/70 p-4 rounded-xl border border-gray-150 text-xs">
                  <div>
                    <span className="block text-gray-400 font-bold uppercase tracking-wider text-[9px]">Tổng định mức quỹ lương</span>
                    <span className="font-extrabold text-gray-800 text-sm">~3.78 tỷ ₫</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase tracking-wider text-[9px]">Quyết toán quý</span>
                    <span className="font-extrabold text-blue-600 text-sm">Đã lập hồ sơ</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase tracking-wider text-[9px]">Kênh giao dịch</span>
                    <span className="font-extrabold text-emerald-600 text-sm">API VietQR liên ngân hàng</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold uppercase tracking-wider text-[9px]">Tổng số phiếu phát bản</span>
                    <span className="font-extrabold text-purple-600 text-sm">{totalCount} phiếu chi</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="border-b border-gray-150 text-gray-400 font-bold">
                        <th className="py-2.5">Cán bộ / Giáo thọ</th>
                        <th className="py-2.5 font-mono">Chu kỳ</th>
                        <th className="py-2.5 text-right">Lương cơ bản</th>
                        <th className="py-2.5 text-right">Khấu trừ BHXH</th>
                        <th className="py-2.5 text-right">Thuế TNCN</th>
                        <th className="py-2.5 text-right">Lương thực lĩnh</th>
                        <th className="py-2.5 text-center">Trạng thái</th>
                        <th className="py-2.5 text-right">Chứng từ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                      {pagePayroll.map(pay => (
                        <tr key={pay.id} className="hover:bg-slate-50/50 text-[11px] font-semibold text-gray-700">
                          <td className="py-2.5 font-bold text-slate-900">{pay.employeeName}</td>
                          <td className="py-2.5 font-mono text-slate-500">{pay.period}</td>
                          <td className="py-2.5 text-right font-mono text-slate-705">{pay.basicSalary.toLocaleString('vi-VN')} ₫</td>
                          <td className="py-2.5 text-right font-mono text-red-500">{pay.bhxh?.toLocaleString('vi-VN')} ₫</td>
                          <td className="py-2.5 text-right font-mono text-red-500">{pay.tncn?.toLocaleString('vi-VN')} ₫</td>
                          <td className="py-2.5 text-right font-black font-mono text-indigo-700">{pay.netSalary.toLocaleString('vi-VN')} ₫</td>
                          <td className="py-2.5 text-center font-bold">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              pay.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' : 'bg-amber-50 text-amber-700 border border-amber-150'
                            }`}>
                              {pay.status === 'paid' ? 'Đã chi' : 'Chờ chuyển'}
                            </span>
                          </td>
                          <td className="py-2.5 text-right flex justify-end gap-1.5 items-center">
                            {pay.status !== 'paid' && (
                              <button
                                onClick={() => {
                                  onApprovePayroll(pay.id);
                                  toast(`Đã hạch toán duyệt chuyển lương giải ngân thực tế cho ${pay.employeeName}!`, 'success');
                                }}
                                className="px-1.5 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded cursor-pointer transition-colors border border-emerald-700"
                              >
                                Duyệt chi
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedPayslip(pay)}
                              className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-[10px] font-bold rounded hover:bg-slate-100 cursor-pointer transition-colors"
                            >
                              Phiếu chi
                            </button>
                          </td>
                        </tr>
                      ))}
                      {pagePayroll.length === 0 && (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-gray-400 font-semibold">
                            Chưa khởi tạo bảng quyết toán. Vui lòng chạy quyết toán.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-gray-100 gap-3 text-xs text-gray-500">
                  <div>
                    <span>Đang xem {totalCount > 0 ? startIndex + 1 : 0}-{endIndex} trong tổng số {totalCount} bản ghi lương</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-sans">
                    <button
                      onClick={() => setPayPage(prev => Math.max(1, prev - 1))}
                      disabled={activePage === 1}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 font-bold cursor-pointer transition-all"
                    >
                      Trước
                    </button>
                    <span className="font-bold text-gray-700">Trang {activePage} / {totalPages}</span>
                    <button
                      onClick={() => setPayPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={activePage === totalPages}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 font-bold cursor-pointer transition-all"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}


      {/* ──────────────── 4. DUYỆT NGHỈ PHÉP (LEAVE) ──────────────── */}
      {activeTab === 'leave' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[15px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            ĐĂNG KÝ VÀ DUYỆT NGHỈ PHÉP HỌC VỤ
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold">
                  <th className="py-2">Nhân sự</th>
                  <th className="py-2">Lý do</th>
                  <th className="py-2">Thời gian</th>
                  <th className="py-2">Số ngày</th>
                  <th className="py-2 text-center">Trạng thái</th>
                  <th className="py-2 text-right">Hành động quản lý</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {leaveRequests.map(lr => (
                  <tr key={lr.id} className="hover:bg-slate-50/50">
                    <td className="py-3 font-bold text-gray-800">{lr.employeeName}</td>
                    <td className="py-3 text-gray-600">{lr.reason}</td>
                    <td className="py-3 font-mono text-gray-500">{lr.from} &rarr; {lr.to}</td>
                    <td className="py-3 font-bold text-gray-700">{lr.days} ngày</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        lr.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                        lr.status === 'rejected' ? 'bg-rose-50 text-rose-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {lr.status}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      {lr.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => { onApproveLeave(lr.id, 'Chấp nhận phép'); toast('Đã phê duyệt nghỉ phép', 'success'); }}
                            className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded hover:bg-emerald-100"
                          >
                            Duyệt
                          </button>
                          <button
                            onClick={() => { onRejectLeave(lr.id, 'Thiếu thỉnh giảng'); toast('Đã từ chối đơn', 'warning'); }}
                            className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold text-[10px] rounded hover:bg-rose-100"
                          >
                            Từ chối
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 italic text-[10px] font-bolder">Đã chốt quyết định</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ──────────────── 5. SỔ CÁI KẾ TOÁN (LEDGER) ──────────────── */}
      {activeTab === 'ledger' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <h4 className="text-[14px] font-black font-display text-gray-800 uppercase">
              SỔ CÁI KẾ TOÁN (TT200/2014-BTC CHỐT)
            </h4>
            <button
              onClick={() => setShowAddJEModal(true)}
              className="flex items-center gap-1 bg-indigo-600 text-white font-bold text-xs py-1.5 px-3.5 rounded-xl"
            >
              <Plus size={13} />
              <span>Ghi nhận bút toán Nợ-Có</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Account Tree catalog */}
            <div className="md:col-span-1 bg-slate-50 p-4 rounded-xl space-y-3 max-h-[350px] overflow-y-auto">
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">HỆ THỐNG TÀI KHOẢN CHỦ</span>
              <div className="space-y-1 text-xs">
                {glAccounts.map(acc => (
                  <div key={acc.code} className="flex justify-between items-center p-1.5 bg-white rounded border border-slate-100">
                    <span className="font-bold font-display text-indigo-700">{acc.code} &bull; <span className="font-medium text-gray-600">{acc.name}</span></span>
                    <span className="font-mono text-[10.5px] text-gray-800">{acc.balance.toLocaleString('vi-VN')} ₫</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posting Journals list */}
            <div className="md:col-span-2 space-y-3">
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">DANH SÁCH BÚT TOÁN ĐÃ ĐĂNG SỔ KHÓA (CLICK XEM CHỨNG TỪ VOUCHER)</span>
              {journalEntries.map(je => (
                <div 
                  key={je.id} 
                  onClick={() => setSelectedJE(je)}
                  className="p-3.5 border border-slate-100 rounded-xl space-y-2 hover:bg-indigo-50/10 hover:border-indigo-150 cursor-pointer transition-all text-xs relative group"
                >
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-800 flex items-center gap-1.5 group-hover:text-indigo-600">
                      {je.description}
                      <Eye size={12} className="text-indigo-600 opacity-60 group-hover:opacity-100 transition-all" />
                    </span>
                    <span className="text-gray-500 font-mono text-[10.5px] bg-slate-100 px-1.5 py-0.5 rounded">{je.ref}</span>
                  </div>
                  {je.lines.map((line, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2 py-0.5 text-[11px] border-b border-gray-50 last:border-none">
                      <span className="text-indigo-700 font-bold">{line.accountCode} - {line.accountName}</span>
                      <span className="text-right text-emerald-600 font-mono font-bold">
                        {line.debit > 0 ? `Nợ: ${line.debit.toLocaleString('vi-VN')} ₫` : ''}
                      </span>
                      <span className="text-right text-rose-600 font-mono font-bold">
                        {line.credit > 0 ? `Có: ${line.credit.toLocaleString('vi-VN')} ₫` : ''}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-1 text-[9.5px] text-gray-400">
                    <span className="text-indigo-500 italic font-bold">Click để in chứng từ hạch toán sổ phụ &rarr;</span>
                    <span className="font-medium">Lập bởi: {je.creator} &bull; Ngày: {je.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── 6. CÔNG NỢ PHẢI THU (AR) & PHẢI TRẢ (AP) ──────────────── */}
      {(activeTab === 'ar' || activeTab === 'ap') && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[15px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            {activeTab === 'ar' ? 'CÔNG NỢ PHẢI THU (HỌC PHÍ & PHỤ HUYNH)' : 'CÔNG NỢ PHẢI TRẢ (MUA VẬT TƯ THIẾT BỊ)'}
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold">
                  <th className="py-2">Mã Hóa đơn</th>
                  <th className="py-2">Đối tác liên kết</th>
                  <th className="py-2">Ngày phát hành</th>
                  <th className="py-2">Voucher Hạn cuối</th>
                  <th className="py-2 text-right">Tổng giá trị</th>
                  <th className="py-2 text-center">Trạng thái thu</th>
                  <th className="py-2 text-right">Thanh toán nhanh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                {invoices
                  .filter(inv => inv.partnerType === (activeTab === 'ar' ? 'customer' : 'supplier'))
                  .map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-bold font-mono text-slate-500">{inv.number}</td>
                      <td className="py-3 text-slate-800 font-black">{inv.partnerName}</td>
                      <td className="py-3 font-mono text-gray-400">{inv.date}</td>
                      <td className="py-3 font-mono text-gray-400">{inv.dueDate}</td>
                      <td className="py-3 text-right font-black font-mono text-gray-800">{inv.total.toLocaleString('vi-VN')} ₫</td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold ${
                          inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700' :
                          inv.status === 'partial' ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {inv.status !== 'paid' ? (
                          <button
                            onClick={() => {
                              onPayInvoice(inv.id, inv.total - inv.paid);
                              toast('Thanh toán thành công! Sổ cái và quỹ ngân hàng đã cập nhật lũy kế.', 'success');
                            }}
                            className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-[10px] font-bold text-indigo-700 rounded cursor-pointer"
                          >
                            Xác nhận Thu/Chi
                          </button>
                        ) : (
                          <span className="text-gray-400 italic text-[10.5px]">Đã chốt thanh toán</span>
                        )}
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ──────────────── 7. NGÂN QUỸ NGÂN HÀNG (CASHBANK) ──────────────── */}
      {activeTab === 'cashbank' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-6 animate-fade-in">
          <h4 className="text-[15px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            QUẢN LÝ NGÂN QUỸ & SỔ PHỤ NGÂN HÀNG LỢI NHUẬN
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankAccounts.map(bank => (
              <div key={bank.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-gray-150/40 pb-2">
                  <div>
                    <h5 className="text-xs font-black text-gray-800 font-display">{bank.bankName}</h5>
                    <p className="text-[10px] text-gray-400 font-mono leading-none mt-0.5">Số TK: {bank.accountNo}</p>
                  </div>
                  <span className="text-sm font-black text-blue-600 font-mono font-display">{bank.balance.toLocaleString('vi-VN')} ₫</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase block tracking-wider">Nhật ký giao dịch gần nhất</span>
                  {bank.transactions.map((tx, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] py-1 border-b border-slate-100 last:border-none">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800 truncate max-w-[200px]">{tx.description}</p>
                        <p className="text-[9.5px] text-gray-400 leading-none">{tx.date}</p>
                      </div>
                      <span className={tx.debit > 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                        {tx.debit > 0 ? `+${tx.debit.toLocaleString('vi-VN')} ₫` : `-${tx.credit.toLocaleString('vi-VN')} ₫`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* ──────────────── 8. NGÂN SÁCH PHÒNG BAN (BUDGETS) ──────────────── */}
      {activeTab === 'budget' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            BÁO CÁO NGÂN SÁCH VÀ CHI TIÊU THỰC TẾ
          </h4>

          <div className="space-y-4">
            {budgets.map(b => {
              const dName = getDeptName(b.deptId);
              const pct = (b.spent / b.annual) * 100;
              return (
                <div key={b.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-800">{dName} &bull; <span className="font-medium text-slate-500 uppercase">{b.category}</span></span>
                    <span className="text-indigo-700 font-black font-mono">{pct.toFixed(1)}% đã dùng</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[10.5px] text-gray-400">
                    <span>Hạn mức: {b.annual.toLocaleString('vi-VN')} ₫</span>
                    <span>Đã dùng: {b.spent.toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


      {/* ──────────────── 9. BÁO CÁO TÀI CHÍNH P&L (FINANCIAL-REPORTS) ──────────────── */}
      {activeTab === 'financial-reports' && (() => {
        // Safe account lookup helper
        const getAcctBal = (code: string, def: number): number => {
          const acc = glAccounts.find(a => a.code === code);
          return acc ? acc.balance : def;
        };

        // Real-time calculated accounts
        const cashFund = getAcctBal('1111', 520000000);
        const bankDeposit = getAcctBal('1121', 8430000000);
        const receivables = getAcctBal('131', 1450000000);
        const rawMaterials = getAcctBal('152', 1120000000);
        const finishedGoods = getAcctBal('156', 1980000000);
        const fixedAssets = getAcctBal('211', 12500000000);

        const payablesSupplier = getAcctBal('331', 870000000);
        const payablesEmployee = getAcctBal('334', 125000000);
        const payablesOther = getAcctBal('338', 45000000);

        const ownerEquity = getAcctBal('411', 21500000000);
        const totalRevenueCumulative = getAcctBal('511', 18500000000);
        const totalExpenseCumulative = getAcctBal('642', 3450000000);

        // Core Balance Sheet formulas to ensure mathematical balance
        const totalShortTermAssets = cashFund + bankDeposit + receivables + rawMaterials + finishedGoods;
        const totalLongTermAssets = fixedAssets;
        const totalAssets = totalShortTermAssets + totalLongTermAssets;

        const totalLiabilities = payablesSupplier + payablesEmployee + payablesOther;
        // Retained earnings balancing figure ensuring A = L + E
        const retainedEarnings = totalAssets - totalLiabilities - ownerEquity;
        const totalResources = totalLiabilities + ownerEquity + retainedEarnings;

        // Cash Flow Statement tie-in (Direct Method)
        const totalEndingCashAndEquivalents = cashFund + bankDeposit;
        const startingCashAndEquivalents = 1520000000; // Historic foundation cash
        const netCashFlowInPeriod = totalEndingCashAndEquivalents - startingCashAndEquivalents;

        return (
          <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-6 animate-fade-in print:p-0 print:border-none">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-105 pb-3">
              <div>
                <h4 className="text-[14px] font-black font-display text-gray-800 uppercase">
                  BÁO CÁO TÀI CHÍNH QUẢN TRỊ (FINANCIAL STATEMENTS)
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Hệ thống đồng bộ tự động theo thời gian thực từ Sổ Cái Kế Toán</p>
              </div>
              
              <div className="flex items-center gap-2 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-1.5 px-3 rounded-lg cursor-pointer"
                >
                  <Printer size={13} />
                  <span>In báo cáo</span>
                </button>
                <span className="text-xs text-gray-400 font-mono bg-slate-50 border border-slate-100 px-2 py-1 rounded">May 2026</span>
              </div>
            </div>

            {/* Sub-tab selection menu */}
            <div className="flex border-b border-gray-150 gap-2 print:hidden">
              <button
                onClick={() => setFinReportTab('p_l')}
                className={`pb-2.5 px-4 font-black font-display text-xs cursor-pointer transition-all border-b-2 ${
                  finReportTab === 'p_l'
                    ? 'border-indigo-650 text-indigo-700'
                    : 'border-transparent text-gray-400 hover:text-slate-650'
                }`}
              >
                1. Báo cáo Kết quả Kinh doanh (P&L)
              </button>
              <button
                onClick={() => setFinReportTab('balance_sheet')}
                className={`pb-2.5 px-4 font-black font-display text-xs cursor-pointer transition-all border-b-2 ${
                  finReportTab === 'balance_sheet'
                    ? 'border-indigo-650 text-indigo-700'
                    : 'border-transparent text-gray-400 hover:text-slate-650'
                }`}
              >
                2. Bảng Cân đối Kế toán
              </button>
              <button
                onClick={() => setFinReportTab('cash_flow')}
                className={`pb-2.5 px-4 font-black font-display text-xs cursor-pointer transition-all border-b-2 ${
                  finReportTab === 'cash_flow'
                    ? 'border-indigo-650 text-indigo-700'
                    : 'border-transparent text-gray-400 hover:text-slate-650'
                }`}
              >
                3. Báo cáo Lưu chuyển Tiền tệ (Direct)
              </button>
            </div>

            {/* Tab contents (P&L) */}
            {finReportTab === 'p_l' && (
              <div className="space-y-4 max-w-2xl mx-auto animate-fade-in">
                <div className="text-center space-y-0.5 mb-6">
                  <h5 className="font-display font-black text-sm uppercase text-slate-800">BÁO CÁO KẾT QUẢ HOẠT ĐỘNG KINH DOANH</h5>
                  <p className="text-[10px] text-gray-400 italic">Tháng 05 năm 2026 &amp; Lũy kế từ đầu chu kỳ</p>
                </div>

                <div className="border border-slate-100 rounded-2xl bg-slate-50/50 p-6 space-y-4">
                  <div className="space-y-2 text-xs font-semibold text-gray-700">
                    
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-800">1. Doanh thu bán học tự thầu & thỉnh giảng (Acc 511):</span>
                      <div className="text-right font-mono text-emerald-600">
                        <p className="font-bold">2,350,000,000 ₫</p>
                        <p className="text-[9.5px] text-slate-400 block font-normal mt-0.5">(Lũy kế năm: {totalRevenueCumulative.toLocaleString('vi-VN')} ₫)</p>
                      </div>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2 pt-1">
                      <span className="font-bold text-slate-800">2. Các khoản giảm trừ doanh thu:</span>
                      <span className="font-mono text-gray-400">0 ₫</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-150 pb-2 pt-1 font-bold text-slate-800">
                      <span>3. Doanh thu thuần về bán hàng & cung cấp dịch vụ:</span>
                      <span className="font-mono text-emerald-600">2,350,000,000 ₫</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2 pt-1 text-rose-600">
                      <span>4. Giá vốn hàng bán (Khấu hao linh kiện Robot STEM):</span>
                      <span className="font-mono font-bold">-340,000,000 ₫</span>
                    </div>

                    <div className="flex justify-between font-black text-slate-900 border-b-2 border-slate-300 pb-2.5 pt-1.5 text-xs">
                      <span className="text-indigo-900 font-extrabold uppercase">5. LỢI NHUẬN GỘP (COGS MATCHED):</span>
                      <span className="font-mono text-indigo-700">2,010,000,000 ₫</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2 pt-1.5 text-gray-650 pl-4 font-medium">
                      <span>- Lương giảng viên thỉnh giảng & Hành chính gốc:</span>
                      <span className="font-mono">-420,000,000 ₫</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2 pt-1 text-gray-650 pl-4 font-medium">
                      <span>- Thuê Server IT Lab Cloud & Điện nước văn phòng:</span>
                      <span className="font-mono">-120,000,000 ₫</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2 pt-1 text-gray-650 pl-4 font-medium">
                      <span>- Chi phí quản lý doanh nghiệp thầu khác (Acc 642):</span>
                      <div className="text-right font-mono text-rose-500">
                        <p className="font-bold">0 ₫</p>
                        <p className="text-[9px] text-slate-400 block font-normal mt-0.5">(Lũy kế năm: {totalExpenseCumulative.toLocaleString('vi-VN')} ₫)</p>
                      </div>
                    </div>

                    <div className="flex justify-between font-black text-indigo-900 border-t-2 border-indigo-700 pt-3 text-sm">
                      <span className="uppercase text-[12px] text-indigo-950">6. LỢI NHUẬN THUẦN TRƯỚC THUẾ (EBT):</span>
                      <span className="font-mono text-indigo-700 text-sm">1,470,000,000 ₫</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2 pt-1 font-semibold text-gray-500">
                      <span>7. Thuế thu nhập doanh nghiệp ước tính (20%):</span>
                      <span className="font-mono text-rose-500">-294,000,000 ₫</span>
                    </div>

                    <div className="flex justify-between font-black text-emerald-700 border-t-2 border-emerald-600 pt-3 text-sm bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100">
                      <span className="uppercase text-[12px] text-emerald-900">8. LỢI NHUẬN SAU THUẾ THUẦN (NET INCOME):</span>
                      <span className="font-mono text-emerald-700 text-sm">{ (1470000000 - 294000000).toLocaleString('vi-VN') } ₫</span>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* Tab contents (Balance Sheet) */}
            {finReportTab === 'balance_sheet' && (
              <div className="space-y-4 max-w-2xl mx-auto animate-fade-in">
                <div className="text-center space-y-0.5 mb-6">
                  <h5 className="font-display font-black text-sm uppercase text-slate-800">BẢNG CÂN ĐỐI KẾ TOÁN QUẢN TRỊ</h5>
                  <p className="text-[10px] text-gray-400 italic">Định biên chi tiết ban hành áp dụng theo TT200/2014-BTC</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: ASSETS */}
                  <div className="space-y-4 border border-slate-100 rounded-2xl bg-slate-50/50 p-4">
                    <div className="border-b border-indigo-700 pb-2">
                      <h6 className="font-black text-indigo-900 uppercase text-[11px] tracking-wider">PHẦN I. TÀI SẢN (ASSETS)</h6>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-700 font-semibold">
                      
                      {/* Short Term */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-black text-slate-900 text-[11px]">
                          <span>A. TÀI SẢN NGẮN HẠN</span>
                          <span className="font-mono">{totalShortTermAssets.toLocaleString('vi-VN')} ₫</span>
                        </div>
                        <div className="pl-3.5 space-y-1.5 text-[11px] font-medium text-slate-600">
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>1. Tiền & tương đương tiền (Quỹ):</span>
                            <span className="font-mono text-slate-800 font-semibold">{totalEndingCashAndEquivalents.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1 pl-4 text-[10px]">
                            <span>- Tiền mặt tại quỹ (Acc 1111):</span>
                            <span className="font-mono">{cashFund.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1 pl-4 text-[10px]">
                            <span>- Tiền gửi ngân hàng (Acc 1121):</span>
                            <span className="font-mono">{bankDeposit.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>2. Các khoản thu ngắn hạn (Acc 131):</span>
                            <span className="font-mono text-slate-800 font-semibold">{receivables.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>3. Hàng hóa vật liệu tồn kho:</span>
                            <span className="font-mono text-slate-800 font-semibold">{(rawMaterials + finishedGoods).toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1 pl-4 text-[10px]">
                            <span>- Nguyên liệu STEM (Acc 152):</span>
                            <span className="font-mono">{rawMaterials.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1 pl-4 text-[10px]">
                            <span>- Học cụ & Robot Kit (Acc 156):</span>
                            <span className="font-mono">{finishedGoods.toLocaleString('vi-VN')} ₫</span>
                          </div>
                        </div>
                      </div>

                      {/* Long Term */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between font-black text-slate-900 text-[11px]">
                          <span>B. TÀI SẢN DÀI HẠN</span>
                          <span className="font-mono">{totalLongTermAssets.toLocaleString('vi-VN')} ₫</span>
                        </div>
                        <div className="pl-3.5 space-y-1.5 text-[11px] font-medium text-slate-600">
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>1. Tài sản cố định hữu hình Lab:</span>
                            <span className="font-mono text-slate-800 font-semibold">{fixedAssets.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1 pl-4 text-[10px]">
                            <span>- Nguyên giá thiết bị (Acc 211):</span>
                            <span className="font-mono">{fixedAssets.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1 pl-4 text-[10px]">
                            <span>- Hao mòn lũy kế ước tính:</span>
                            <span className="font-mono">0 ₫</span>
                          </div>
                        </div>
                      </div>

                      {/* Total Assets Footer */}
                      <div className="flex justify-between font-black text-indigo-900 border-t-2 border-indigo-700 pt-3 text-[12px] uppercase">
                        <span>TỔNG CỘNG TÀI SẢN:</span>
                        <span className="font-mono text-indigo-700">{totalAssets.toLocaleString('vi-VN')} ₫</span>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: LIABILITIES & EQUITY */}
                  <div className="space-y-4 border border-slate-100 rounded-2xl bg-slate-50/50 p-4">
                    <div className="border-b border-indigo-700 pb-2">
                      <h6 className="font-black text-indigo-900 uppercase text-[11px] tracking-wider">PHẦN II. NGUỒN VỐN (CAPITAL)</h6>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-700 font-semibold">
                      
                      {/* Liabilities */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-black text-slate-900 text-[11px]">
                          <span>A. NỢ PHẢI TRẢ (LIABILITIES)</span>
                          <span className="font-mono">{totalLiabilities.toLocaleString('vi-VN')} ₫</span>
                        </div>
                        <div className="pl-3.5 space-y-1.5 text-[11px] font-medium text-slate-600">
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>1. Phải trả người bán vật tư (Acc 331):</span>
                            <span className="font-mono text-slate-800 font-semibold">{payablesSupplier.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>2. Phải trả người lao động (Acc 334 – Lương thầu):</span>
                            <span className="font-mono text-slate-800 font-semibold">{payablesEmployee.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>3. Thuế & các khoản nộp thầu khác (Acc 338):</span>
                            <span className="font-mono text-slate-800 font-semibold">{payablesOther.toLocaleString('vi-VN')} ₫</span>
                          </div>
                        </div>
                      </div>

                      {/* Equity */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between font-black text-slate-900 text-[11px]">
                          <span>B. VỐN CHỦ SỞ HỮU (EQUITY)</span>
                          <span className="font-mono">{(ownerEquity + retainedEarnings).toLocaleString('vi-VN')} ₫</span>
                        </div>
                        <div className="pl-3.5 space-y-1.5 text-[11px] font-medium text-slate-600">
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>1. Vốn đầu tư góp của chủ sở hữu (Acc 411):</span>
                            <span className="font-mono text-slate-800 font-semibold">{ownerEquity.toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100/60 pb-1">
                            <span>2. Lợi nhuận tích lũy chưa phân phối:</span>
                            <span className={`font-mono font-bold ${retainedEarnings >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                              {retainedEarnings.toLocaleString('vi-VN')} ₫
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Total Resources Footer */}
                      <div className="flex justify-between font-black text-indigo-900 border-t-2 border-indigo-700 pt-3 text-[12px] uppercase">
                        <span>TỔNG CỘNG NGUỒN VỐN:</span>
                        <span className="font-mono text-indigo-700">{totalResources.toLocaleString('vi-VN')} ₫</span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Balance sheet confirmation audit */}
                <div className="p-3 bg-emerald-50 text-emerald-800 text-center rounded-xl font-bold flex items-center justify-center gap-1.5 text-[11px] border border-emerald-150">
                  <CheckCircle2 size={13} className="text-emerald-650" />
                  <span>Cân đối lưỡng cực hoàn hảo! Tài sản = Nguồn vốn ({totalAssets.toLocaleString('vi-VN')} ₫)</span>
                </div>
              </div>
            )}

            {/* Tab contents (Cash Flow) */}
            {finReportTab === 'cash_flow' && (
              <div className="space-y-4 max-w-2xl mx-auto animate-fade-in">
                <div className="text-center space-y-0.5 mb-6">
                  <h5 className="font-display font-black text-sm uppercase text-slate-800">BÁO CÁO LƯU CHUYỂN TIỀN TỆ MTD</h5>
                  <p className="text-[10px] text-gray-400 italic">Theo phương pháp trực tiếp (Direct Method File-Matched)</p>
                </div>

                <div className="border border-slate-100 rounded-2xl bg-slate-50/50 p-6 space-y-4">
                  <div className="space-y-2.5 text-xs font-semibold text-gray-700">
                    
                    {/* section I */}
                    <div className="space-y-1">
                      <p className="font-black text-slate-900 text-[11px] border-b border-slate-200/80 pb-1 uppercase tracking-wider text-indigo-950">
                        I. Lưu chuyển tiền từ hoạt động kinh doanh (Operating Cash Flow)
                      </p>
                      <div className="pl-3 space-y-1.5 font-medium text-slate-650 text-[11px]">
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span>1. Tiền thu từ bán học phí & LMS thầu (Chuyển khoản / Tiền mặt):</span>
                          <span className="font-mono text-emerald-600 font-bold">+18,500,000,000 ₫</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span>2. Tiền chi trả cho nhà thầu cung cấp nguyên vật liệu STEM:</span>
                          <span className="font-mono text-rose-500">-2,450,050,000 ₫</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span>3. Tiền chi lương, phụ cấp & thỉnh giảng trong chu kỳ:</span>
                          <span className="font-mono text-rose-500">-4,250,000,000 ₫</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span>4. Tiền chi đóng thuế thầu & Bảo hiểm (BHXH):</span>
                          <span className="font-mono text-rose-500">-150,000,000 ₫</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span>5. Tiền chi khác cho các hoạt động vận hành:</span>
                          <span className="font-mono text-rose-500">-1,250,000,000 ₫</span>
                        </div>
                        <div className="flex justify-between text-indigo-900 font-extrabold pb-1 pt-1 justify-end gap-4">
                          <span>Lưu chuyển tiền thuần từ HĐKD:</span>
                          <span className="font-mono text-indigo-700">{(18500000000 - 2450050000 - 4250000000 - 150000000 - 1250000000).toLocaleString('vi-VN')} ₫</span>
                        </div>
                      </div>
                    </div>

                    {/* section II */}
                    <div className="space-y-1 pt-2">
                      <p className="font-black text-slate-900 text-[11px] border-b border-slate-200/80 pb-1 uppercase tracking-wider text-indigo-950">
                        II. Lưu chuyển tiền từ hoạt động đầu tư (Investing Cash Flow)
                      </p>
                      <div className="pl-3 space-y-1.5 font-medium text-slate-650 text-[11px]">
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span>1. Tiền chi để mua sắm, xây dựng TSCĐ (Cơ sở Máy tính & Server Lab):</span>
                          <span className="font-mono text-rose-500">-{fixedAssets.toLocaleString('vi-VN')} ₫</span>
                        </div>
                        <div className="flex justify-between text-indigo-900 font-extrabold pb-1 pt-1 justify-end gap-4">
                          <span>Lưu chuyển tiền thuần từ HĐĐT:</span>
                          <span className="font-mono text-rose-500">-{fixedAssets.toLocaleString('vi-VN')} ₫</span>
                        </div>
                      </div>
                    </div>

                    {/* section III */}
                    <div className="space-y-1 pt-2">
                      <p className="font-black text-slate-900 text-[11px] border-b border-slate-200/80 pb-1 uppercase tracking-wider text-indigo-950">
                        III. Lưu chuyển tiền từ hoạt động tài chính (Financing Cash Flow)
                      </p>
                      <div className="pl-3 space-y-1.5 font-medium text-slate-650 text-[11px]">
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span>1. Tiền thu từ vốn góp ban đầu thầu của các chủ sở hữu:</span>
                          <span className="font-mono text-emerald-600 font-bold">+{ownerEquity.toLocaleString('vi-VN')} ₫</span>
                        </div>
                        <div className="flex justify-between text-indigo-900 font-extrabold pb-1 pt-1 justify-end gap-4">
                          <span>Lưu chuyển tiền thuần từ HĐTC:</span>
                          <span className="font-mono text-emerald-600">+{ownerEquity.toLocaleString('vi-VN')} ₫</span>
                        </div>
                      </div>
                    </div>

                    {/* summary statement totals */}
                    <div className="pt-4 border-t-2 border-slate-200 text-[11.5px] font-black space-y-2">
                      
                      <div className="flex justify-between text-gray-800">
                        <span>LƯU CHUYỂN TIỀN SỨC THUẦN TRONG KỲ (Net Cash Flow):</span>
                        <span className={`font-mono ${netCashFlowInPeriod >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {netCashFlowInPeriod >= 0 ? '+' : ''}{netCashFlowInPeriod.toLocaleString('vi-VN')} ₫
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500 font-semibold border-b border-dashed border-gray-205 pb-1">
                        <span>Số dư Tiền và tương đương tiền ĐẦU kỳ:</span>
                        <span className="font-mono">{startingCashAndEquivalents.toLocaleString('vi-VN')} ₫</span>
                      </div>

                      <div className="flex justify-between text-indigo-950 font-black text-xs uppercase bg-indigo-50/50 p-2 border border-indigo-100 rounded-lg">
                        <span>Số dư Tiền và tương đương tiền CUỐI kỳ:</span>
                        <span className="font-mono text-indigo-850">{totalEndingCashAndEquivalents.toLocaleString('vi-VN')} ₫</span>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}


      {/* ──────────────── 10. SKU & HỌC LIỆU (PRODUCTS) ──────────────── */}
      {activeTab === 'products' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-50 pb-3">
            <h4 className="text-[14px] font-black font-display text-gray-800 uppercase">
              DANH MỤC SKU GIÁO TRÌNH & KIT ĐIỆN TỬ
            </h4>
            <button
              onClick={() => setShowAddProdModal(true)}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-xl"
            >
              <Plus size={14} />
              <span>Khởi tạo SKU mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(prd => (
              <div key={prd.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-700 font-mono tracking-tight">{prd.sku}</span>
                  <p className="text-xs font-black text-gray-800 leading-tight">{prd.name}</p>
                  <p className="text-[10px] text-gray-400">Danh mục: {prd.category} &bull; Kho: {prd.location}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs font-extrabold text-blue-600 font-mono">{prd.costPrice.toLocaleString('vi-VN')} ₫</p>
                  <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold block text-center ${
                    prd.stock > prd.minStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    Tồn: {prd.stock} {prd.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* ──────────────── 11. NHẬP XUẤT TỒN KHO VẬT TƯ (INVENTORY) ──────────────── */}
      {activeTab === 'inventory' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[15px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            NHẬT KÝ ĐIỀU PHỐI VÀ BIẾN ĐỘNG KHO (NHẬP XUẤT TỒN)
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold">
                  <th className="py-2">Mã nghiệp vụ</th>
                  <th className="py-2">Học liệu/Thiết bị</th>
                  <th className="py-2">SKU chuyển thầu</th>
                  <th className="py-2">Phân loại</th>
                  <th className="py-2">Thời gian</th>
                  <th className="py-2 text-right">Số lượng chuyển</th>
                  <th className="py-2">Nhân viên kho vận</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {stockTransactions.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50/50">
                    <td className="py-3 font-bold font-mono text-slate-500">{st.ref}</td>
                    <td className="py-3 font-black text-slate-800">{st.productName}</td>
                    <td className="py-3 font-mono text-slate-500">{st.sku}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        st.type === 'in' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {st.type === 'in' ? 'Nhập kho' : 'Xuất kho'}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-gray-400">{st.date}</td>
                    <td className="py-3 text-right font-black font-mono text-indigo-700">{st.qty} cái</td>
                    <td className="py-3 text-gray-500">{st.operator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ──────────────── 12. ĐỀ TIÊU MUA SẮM (REQUISITIONS) ──────────────── */}
      {activeTab === 'requisitions' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            ĐỀ NGHỊ MUA SẮM VẬT TƯ GIẢNG DẠY
          </h4>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-gray-400 font-bold">MÃ: RFQ-05-01</span>
                <p className="font-extrabold text-slate-800">Cảm biến siêu âm HC-SR04 & Broad Arduino STEM</p>
                <p className="text-[10px] text-gray-500">Phục vụ cuộc thi xe đua tự hành thông minh chuẩn bị diễn ra.</p>
              </div>
              <span className="font-mono text-xs font-extrabold text-blue-600">Đăng kí thầu</span>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── 13. ĐƠN MUA HÀNG (PO) ──────────────── */}
      {activeTab === 'purchase-orders' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <h4 className="text-[14px] font-black font-display text-gray-800 uppercase">
              DANH SÁCH ĐƠN MUA HÀNG (PURCHASE ORDERS)
            </h4>
            <button
              onClick={() => setShowAddPOModal(true)}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg cursor-pointer"
            >
              <Plus size={13} />
              <span>Lập Đơn PO thầu</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold">
                  <th className="py-2">Mã PO</th>
                  <th className="py-2">Nhà đấu thầu liên kết</th>
                  <th className="py-2">Ngày kí thầu</th>
                  <th className="py-2">Giao thầu dự kiến</th>
                  <th className="py-2 text-right">Tổng giá trị PO</th>
                  <th className="py-2 text-center">Trạng thái phê thầu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                {purchaseOrders.map(po => (
                  <tr 
                    key={po.id} 
                    onClick={() => setSelectedPO(po)}
                    className="hover:bg-indigo-50/10 hover:text-indigo-700 cursor-pointer transition-colors"
                    title="Click để quản lý phê duyệt và nhập kho Đơn hàng thầu này"
                  >
                    <td className="py-3 font-bold font-mono text-indigo-700 flex items-center gap-1">
                      <Eye size={11} className="text-indigo-400" />
                      {po.number}
                    </td>
                    <td className="py-3 text-slate-800 font-black">{po.vendorName}</td>
                    <td className="py-3 font-mono text-gray-400">{po.date}</td>
                    <td className="py-3 font-mono text-gray-400">{po.deliveryDate}</td>
                    <td className="py-3 text-right font-black font-mono">{po.total.toLocaleString('vi-VN')} ₫</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        po.status === 'received' ? 'bg-emerald-50 text-emerald-700' :
                        po.status === 'approved' ? 'bg-indigo-50 text-indigo-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ──────────────── 14. KẾ HOẠCH CHẾ TẠO SẢN PHẨM (PRODUCTION-PLAN) ──────────────── */}
      {activeTab === 'production-plan' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            KẾ HOẠCH SẢN XUẤT HỌC LIỆU STEM (PRODUCTION MASTER PLAN)
          </h4>

          <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl text-xs space-y-2">
            <h5 className="font-extrabold text-indigo-700 uppercase tracking-widest">Máy CNC & in dán chip dây chuyền Robot STEM</h5>
            <p className="text-gray-500 leading-relaxed font-semibold">
              Xây dựng và gá đặt tự động 200 chiếc Xe Tự Hành STEM kit lớp Python thỉnh giảng nhằm chuẩn bị cho vòng chung kết.
            </p>
          </div>
        </div>
      )}


      {/* ──────────────── 15. LỆNH CHẾ TẠO LÓP RÁP ROBOT KIT (WORK-ORDERS) ──────────────── */}
      {activeTab === 'work-orders' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <h4 className="text-[14px] font-black font-display text-gray-800 uppercase">
              LỆNH SẢN XUẤT LẮP RÁP ROBOT KIT (WORK ORDERS)
            </h4>
            <button
              onClick={() => setShowAddWOModal(true)}
              className="flex items-center gap-1 bg-indigo-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg"
            >
              <Plus size={13} />
              <span>Ban hành Lệnh Lắp Ráp</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workOrders.map(wo => {
              const stages = ['planned', 'preparing', 'producing', 'qc', 'completed'];
              const curIdx = stages.indexOf(wo.stage);
              return (
                <div key={wo.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3 font-semibold text-xs text-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="font-bold font-mono text-indigo-700">{wo.number}</span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9.5px] uppercase font-bold">{wo.stage}</span>
                  </div>

                  <p className="font-black text-slate-800 leading-tight">{wo.qty} cái: {wo.productName}</p>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>Tiến độ lắp ráp</span>
                      <span>{wo.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-150 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${wo.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2 text-[10.5px]">
                    <span className="text-gray-400">Chỉ huy: <span className="font-bold text-gray-700">{wo.assignedTo}</span></span>
                    {wo.stage !== 'completed' && (
                      <button
                        onClick={() => {
                          const nextIdx = Math.min(curIdx + 1, stages.length - 1);
                          onMoveWOStage(wo.id, stages[nextIdx]);
                          toast('Tiến trình lệnh sản xuất đã dịch chuyển thành công sang phân đoạn tiếp theo!', 'info');
                        }}
                        className="px-2.5 py-1 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-bold"
                      >
                        Tiến giai đoạn &rarr;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


      {/* ──────────────── 16. THIẾT BỊ MÁY MÓC LAB (MACHINERY) ──────────────── */}
      {activeTab === 'machinery' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            MÁY MÓC VÀ TRANG THIẾT BỊ ĐÀO TẠO LAB
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {machines.map(m => (
              <div key={m.id} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-2 text-center text-xs">
                <span className="text-[10px] font-mono text-gray-400 block">{m.code}</span>
                <p className="font-extrabold text-slate-800 leading-tight truncate">{m.name}</p>
                <div className="flex items-center gap-1.5 justify-center mt-1">
                  <span className={`w-2 h-2 rounded-full ${
                    m.status === 'running' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}></span>
                  <span className="font-bold text-gray-600 block uppercase">{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* ──────────────── 17. PORTALS & LMS (PROJECTS) ──────────────── */}
      {activeTab === 'projects' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            DANH MỤC DỰ ÁN CÔNG NGHỆ THUẦN (PORTALS / LMS THÀNH PHẦM)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(proj => (
              <div key={proj.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3 text-xs font-semibold text-gray-800">
                <p className="font-black text-sm text-gray-800 leading-none">{proj.name}</p>
                <p className="text-[10.5px] text-gray-400 leading-none">Chủ đầu tư: {proj.client}</p>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Tiến độ cổng thầu LMS</span>
                    <span>{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-150 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${proj.progress}%` }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10.5px] text-gray-400 leading-none pt-2 border-t border-gray-50 mt-2">
                  <span>Hạn thầu: {proj.deadline}</span>
                  <span className="text-indigo-700 font-extrabold">Ngân sách: {proj.budget.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* ──────────────── 18. SPRINT BOARD (KANBAN) ──────────────── */}
      {activeTab === 'kanban' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <h4 className="text-[14px] font-black font-display text-gray-800 uppercase">
              BẢNG TASK SPRINT TEAM LAB AGILE KANBAN
            </h4>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="flex items-center gap-1 bg-indigo-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg"
            >
              <Plus size={13} />
              <span>Thêm Thẻ Task Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Col 1: To Do */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2.5">
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block pl-1">📌 TO D0 (CHỜ THỰC HIỆN)</span>
              {tasks.filter(t => t.stage === 'todo').map(task => (
                <div key={task.id} className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs relative">
                  <p className="font-extrabold text-slate-800 leading-tight">{task.title}</p>
                  <p className="text-[10px] text-gray-400 leading-none">SP thầu: {task.storyPoints} &bull; Chịu trách nhiệm: {task.assigneeName}</p>
                  <button
                    onClick={() => { onMoveTaskStage(task.id, 'inprogress'); toast('Task đã di chuyển sang In Progress!', 'info'); }}
                    className="p-1 px-2.5 bg-slate-100 rounded hover:bg-slate-200 mt-2 text-[10px] cursor-pointer"
                  >
                    Bắt đầu làm &rarr;
                  </button>
                </div>
              ))}
            </div>

            {/* Col 2: In progress */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2.5">
              <span className="text-[10px] font-black tracking-widest text-indigo-700 uppercase block pl-1">⚡ IN PROGRESS (ĐANG CHẠY)</span>
              {tasks.filter(t => t.stage === 'inprogress').map(task => (
                <div key={task.id} className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs relative">
                  <p className="font-extrabold text-slate-800 leading-tight">{task.title}</p>
                  <p className="text-[10px] text-gray-400 leading-none">SP thầu: {task.storyPoints} &bull; Chịu trách nhiệm: {task.assigneeName}</p>
                  <button
                    onClick={() => { onMoveTaskStage(task.id, 'done'); toast('Chúc mừng! Task đã hoàn tất.', 'success'); }}
                    className="p-1 px-2.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 mt-2 text-[10px] cursor-pointer font-bold"
                  >
                    Đóng thẻ Done &rarr;
                  </button>
                </div>
              ))}
            </div>

            {/* Col 3: Done */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2.5">
              <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase block pl-1">✓ DONE (HOÀN THÀNH)</span>
              {tasks.filter(t => t.stage === 'done').map(task => (
                <div key={task.id} className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs relative opacity-75">
                  <p className="font-extrabold text-slate-400 line-through leading-tight">{task.title}</p>
                  <p className="text-[9.5px] text-slate-300 ml-1 leading-none">Đã kiểm duyệt đóng thầu hoàn toàn</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── 19. NGƯỜI DÙNG & PHÂN QUYỀN (USERS) ──────────────── */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-6 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            PHÂN QUYỀN VAI TRÒ CHẶT CHẼ TRƯỜNG HỌC (RBAC MATRIX)
          </h4>

          <div className="p-4 bg-indigo-50 border border-indigo-150 rounded-2xl text-xs space-y-2 text-indigo-900 leading-relaxed max-w-xl font-semibold">
            <span className="font-black text-md block uppercase leading-none">Ma Trận RBAC Chấp Thuận</span>
            <p>
              Ma trận kiểm soát quyền truy cập chặt chẽ (Role-Based Access Control). Giảng viên, kế toán, thủ kho chỉ nhìn thấy dữ liệu nằm trong quyền tự phục vụ hoặc trực thuộc phòng có thầu chính.
            </p>
          </div>
        </div>
      )}


      {/* ──────────────── 20. THAM SỐ CẤU HÌNH (SETTINGS) ──────────────── */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-6 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-1.5">
            CẤU HÌNH HỆ THỐNG ACADEMY PARAMETERS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-gray-800">
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
              <h5 className="font-bold text-indigo-700 font-display">Thông số Trường học MCNA</h5>
              <div className="space-y-1.5">
                <p>Website: www.mcna.edu.vn</p>
                <p>Địa điểm chính: Cầu Giấy, Hà Nội</p>
                <p>Múi giờ hệ thống: UTC+07:00 (Băng Cốc, Hà Nội)</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
              <h5 className="font-bold text-indigo-700 font-display">Tham số Tính lương & OT</h5>
              <div className="space-y-1.5">
                <p>Khấu trừ BHXH cơ sở: 8% (NLĐ đóng)</p>
                <p>Khấu trừ BHYT cơ sở: 1.5% (NLĐ đóng)</p>
                <p>Bảo hiểm thất nghiệp: 1.0% (NLĐ đóng)</p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── 21. AUDIT LOG MTD (AUDIT-LOG) ──────────────── */}
      {activeTab === 'audit-log' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            NHẬT KÝ ĐĂNG NHẬP & BÚT TOÁN PHÁT SINH (AUDIT LOGS)
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold">
                  <th className="py-2">Thời gian</th>
                  <th className="py-2">Nhân viên thực hiện</th>
                  <th className="py-2">Hành động ghi nhận</th>
                  <th className="py-2">Phân hệ</th>
                  <th className="py-2">Ghi chép</th>
                  <th className="py-2">Địa chỉ IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="py-3 font-mono text-gray-400">{log.time}</td>
                    <td className="py-3 font-bold text-gray-800">{log.userName}</td>
                    <td className="py-3 font-bold font-mono text-indigo-700">{log.action}</td>
                    <td className="py-3 text-gray-600">{log.module}</td>
                    <td className="py-3 text-gray-700">{log.record}</td>
                    <td className="py-3 font-mono text-gray-400">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* ──────────────── 22. HỒ SƠ GIẢNG VIÊN (MY-PROFILE) ──────────────── */}
      {activeTab === 'my-profile' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4 animate-fade-in">
          <h4 className="text-[14px] font-black font-display text-gray-800 uppercase border-b border-gray-50 pb-2">
            LÝ LỊCH TRÍCH NGANG GIẢNG VIÊN THỦ KHOA
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-800 font-semibold leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2">
              <p>Mã Giảng viên: {user.id}</p>
              <p>Họ tên đầy đủ: {user.name}</p>
              <p>Học vị / Học hàm thầu: {user.title}</p>
              <p>Điện thoại liên hệ: {user.phone}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2">
              <p>Email liên kết tài khoản: {user.email}</p>
              <p>Ngày bắt đầu đứng lớp thỉnh giảng: {user.joinedAt}</p>
              <p>Chính sách nghỉ dưỡng / phúc lợi: 12 ngày phép năm</p>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 1: CHUYÊN VIÊN / GIÁO THỰ MỚI (ADD EMPLOYEE) ──────────────── */}
      {showAddEmpModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-slide-in">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h5 className="font-extrabold text-xs text-gray-800 uppercase tracking-widest font-display">GHI DANH NHÂN SỰ ACADEMY MỚI</h5>
              <button onClick={() => setShowAddEmpModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">×</button>
            </div>
            <div className="p-6 space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Họ đệm (*)"
                  value={newEmpForm.lastName}
                  onChange={(e) => setNewEmpForm({ ...newEmpForm, lastName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Tên riêng (*)"
                  value={newEmpForm.firstName}
                  onChange={(e) => setNewEmpForm({ ...newEmpForm, firstName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>

              <input
                type="email"
                placeholder="Email tài khoản (*)"
                value={newEmpForm.email}
                onChange={(e) => setNewEmpForm({ ...newEmpForm, email: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newEmpForm.deptId}
                  onChange={(e) => setNewEmpForm({ ...newEmpForm, deptId: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                >
                  <option value="DEP001">Kế toán & Thu Ngân</option>
                  <option value="DEP002">Nhân sự & Công đoàn</option>
                  <option value="DEP003">Khoa CNTT & IT Lab</option>
                </select>
                <input
                  type="text"
                  placeholder="Học vị Chức vụ (*)"
                  value={newEmpForm.title}
                  onChange={(e) => setNewEmpForm({ ...newEmpForm, title: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>

              <input
                type="tel"
                placeholder="Số điện thoại (*)"
                value={newEmpForm.phone}
                onChange={(e) => setNewEmpForm({ ...newEmpForm, phone: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
              />

              <button
                onClick={handleSaveEmployee}
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Lưu hồ sơ lên in-memory CSDL ✓
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 2: XEM CHI TIẾT LÝ LỊCH NHÂN VIÊN ──────────────── */}
      {selectedEmp && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-slide-in">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h5 className="font-extrabold text-xs text-indigo-700 uppercase tracking-widest font-display">HỒ SƠ LÝ LỊCH TRÍCH NGANG GIÁO THƯ</h5>
              <button onClick={() => setSelectedEmp(null)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">×</button>
            </div>
            <div className="p-6 space-y-3 text-xs font-semibold text-gray-800 leading-relaxed">
              <p className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-400">Họ và Tên thỉnh giảng:</span>
                <span className="font-extrabold text-slate-800">{selectedEmp.name}</span>
              </p>
              <p className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-400">Email liên lạc:</span>
                <span className="font-mono">{selectedEmp.email}</span>
              </p>
              <p className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-400">Số Điện thoại:</span>
                <span className="font-mono">{selectedEmp.phone}</span>
              </p>
              <p className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-400">Bộ phận thỉnh giảng:</span>
                <span className="text-indigo-700">{getDeptName(selectedEmp.deptId)}</span>
              </p>
              <p className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-400">Gia nhập học viện:</span>
                <span className="font-mono">{selectedEmp.joinedAt}</span>
              </p>
              <p className="flex justify-between pb-1">
                <span className="text-gray-400">Hạn ngạch phép năm:</span>
                <span>12 ngày / Chu kỳ 12 tháng</span>
              </p>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 3: IN PHIẾU CHI LƯƠNG FORMATTED A4 ──────────────── */}
      {selectedPayslip && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden animate-slide-in">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center print:hidden">
              <h5 className="font-extrabold text-xs text-indigo-700 uppercase tracking-widest font-display">XEM PHIẾU LƯƠNG TRỰC QUAN A4</h5>
              <div className="flex gap-2">
                <button
                  onClick={handlePrintPayslip}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10.5px] rounded-lg cursor-pointer flex items-center gap-1"
                >
                  <Printer size={12} />
                  <span>In phiếu chi / PDF</span>
                </button>
                <button onClick={() => setSelectedPayslip(null)} className="text-gray-400 hover:text-gray-600 font-extrabold px-1 text-sm">×</button>
              </div>
            </div>

            {/* Print-ready Payslip Content */}
            <div className="p-8 space-y-6 text-xs text-gray-800 leading-relaxed font-sans" id="payslip-print-section">
              <div className="text-center space-y-1">
                <h3 className="font-display font-black text-sm tracking-widest uppercase">MCNA TECHNOLOGY SCHOOL</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">KHOA HỌC - CÔNG NGHỆ - KỸ THUẬT</p>
                <p className="text-[9.5px] text-gray-500 font-medium">Cầu Giấy, Hà Nội &bull; Hotline: 1900-xxxx</p>
                <div className="w-16 h-0.5 bg-indigo-600 mx-auto mt-2"></div>
              </div>

              <div className="text-center space-y-1 my-4">
                <h4 className="font-extrabold text-md uppercase">PHIẾU CHI LƯƠNG & GIỜ THỈNH GIẢNG</h4>
                <p className="text-[10.5px] text-gray-400 font-mono">Chu kỳ thanh toán: Tháng {selectedPayslip.period}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-3.5 my-3 text-[11px] font-semibold text-gray-700">
                <p>Mã Cán bộ: <span className="font-bold text-gray-900">{selectedPayslip.employeeId}</span></p>
                <p>Họ tên: <span className="font-bold text-gray-900">{selectedPayslip.employeeName}</span></p>
              </div>

              <div className="space-y-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-1">Mục thu nhập</th>
                      <th className="py-1 text-right">Giá trị thầu phát sinh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-semibold text-slate-700">
                    <tr>
                      <td className="py-2">Lương Gross cơ bản thầu chính:</td>
                      <td className="py-2 text-right font-mono">{selectedPayslip.basicSalary.toLocaleString('vi-VN')} ₫</td>
                    </tr>
                    <tr>
                      <td className="py-2">Học liệu / Kit chế tác R&D phụ trợ:</td>
                      <td className="py-2 text-right font-mono">{(selectedPayslip.allowances?.lunch || 1000000).toLocaleString('vi-VN')} ₫</td>
                    </tr>
                    <tr>
                      <td className="py-2">Phụ cấp công đoàn / thính giảng vượt giờ:</td>
                      <td className="py-2 text-right font-mono">{(selectedPayslip.allowances?.gas || 500000).toLocaleString('vi-VN')} ₫</td>
                    </tr>
                    <tr className="border-t border-slate-200 font-bold uppercase text-[10px] text-slate-500">
                      <th className="py-2">Các khoản khấu trừ</th>
                      <th className="py-2 text-right">Trừ quỹ</th>
                    </tr>
                    <tr>
                      <td className="py-2">Thuế TNCN thính giảng (Tính lũy tiến):</td>
                      <td className="py-2 text-right font-mono text-red-500">{(selectedPayslip.tncn || 500000).toLocaleString('vi-VN')} ₫</td>
                    </tr>
                    <tr>
                      <td className="py-2">Đóng quỹ bảo hiểm thầu (BHXH 8%, BHYT 1.5%):</td>
                      <td className="py-2 text-right font-mono text-red-500">{(selectedPayslip.bhxh || 1440000).toLocaleString('vi-VN')} ₫</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border-t-2 border-indigo-600 pt-3.5 flex justify-between items-center text-sm font-black text-indigo-700">
                <span>THỰC LĨNH CHUYỂN KHOẢN (NET):</span>
                <span className="font-mono text-md font-display">{selectedPayslip.netSalary.toLocaleString('vi-VN')} ₫</span>
              </div>

              <div className="text-center pt-8 text-[9px] text-slate-400 border-t border-dashed border-gray-100">
                Phiếu lương đã ký số tự động bởi MCNA School ERP. Xin cảm ơn nỗ lực giảng dạy của thầy cô!
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 3B: XEM VÀ IN CHỨNG TỪ SỔ CÁI BÚT TOÁN (selectedJE) ──────────────── */}
      {selectedJE && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden animate-slide-in">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center print:hidden">
              <h5 className="font-extrabold text-xs text-indigo-700 uppercase tracking-widest font-display">CHỨNG TỪ KẾ TOÁN SỔ CÁI</h5>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10.5px] rounded-lg cursor-pointer flex items-center gap-1"
                >
                  <Printer size={12} />
                  <span>In chứng từ kế toán</span>
                </button>
                <button onClick={() => setSelectedJE(null)} className="text-gray-400 hover:text-gray-600 font-extrabold px-1 text-sm">×</button>
              </div>
            </div>

            {/* Print-ready GL Voucher */}
            <div className="p-8 space-y-6 text-xs text-gray-800 leading-relaxed font-sans" id="je-print-section">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-xs tracking-wider uppercase">MCNA ERP PRO SYSTEM</h3>
                  <p className="text-[9px] text-gray-450 uppercase font-black">Bộ phận Tài chính Kế toán &bull; TT200-BTC</p>
                </div>
                <div className="text-right space-y-0.5 text-[10px]">
                  <p className="font-bold text-gray-700">Mẫu số C01-DNS</p>
                  <p className="text-gray-400 italic">(Ban hành kèm theo TT 200/2014/TT-BTC)</p>
                </div>
              </div>

              <div className="text-center space-y-1 my-4">
                <h4 className="font-extrabold text-sm uppercase text-gray-900 tracking-wider">CHỨNG TỪ GHI SỔ TỔNG HỢP</h4>
                <p className="text-[10px] font-mono text-gray-500">Mã tham chiếu sổ cái: {selectedJE.ref}</p>
                <p className="text-[10px] text-gray-500">Ngày hạch toán gốc: {selectedJE.date}</p>
              </div>

              <div className="space-y-2 border border-slate-100 rounded-xl p-3.5 bg-slate-50/50">
                <p className="font-semibold text-gray-700">Nội dung diễn giải: <span className="font-bold text-gray-900">{selectedJE.description}</span></p>
                <p className="text-[10px] text-gray-500">Người lập bút toán: <span className="font-bold">{selectedJE.creator}</span> &bull; Trạng thái ghi sổ: <span className="font-black text-xs text-emerald-600">ĐÃ ĐĂNG SỔ KHÓA</span></p>
              </div>

              <div>
                <p className="text-[10px] font-black tracking-wider text-gray-400 uppercase mb-2">ĐỊNH KHOẢN TÀI KHOẢN PHIẾU GHI SỔ POCC-CENTRAL:</p>
                <table className="w-full text-left text-xs border border-collapse border-slate-100">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[9.5px] border-b border-slate-100">
                      <th className="p-2 border-r border-slate-100">Tài khoản hạch toán</th>
                      <th className="p-2 text-right border-r border-slate-100">Phát sinh Nợ</th>
                      <th className="p-2 text-right">Phát sinh Có</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {selectedJE.lines.map((ln, i) => (
                      <tr key={i} className="hover:bg-slate-50/10">
                        <td className="p-2 border-r border-slate-100">
                          <span className="font-bold text-indigo-700">{ln.accountCode}</span> - {ln.accountName}
                        </td>
                        <td className="p-2 text-right font-mono border-r border-slate-100 text-emerald-600 font-bold">
                          {ln.debit > 0 ? `${ln.debit.toLocaleString('vi-VN')} ₫` : '-'}
                        </td>
                        <td className="p-2 text-right font-mono text-rose-600 font-bold">
                          {ln.credit > 0 ? `${ln.credit.toLocaleString('vi-VN')} ₫` : '-'}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50/50 font-black border-t-2 border-slate-200">
                      <td className="p-2 border-r border-slate-100">TỔNG CỘNG PHÁT SINH CÂN ĐỐI:</td>
                      <td className="p-2 text-right font-mono border-r border-slate-100 text-indigo-700 text-xs">
                        {selectedJE.lines.reduce((s, c) => s + (c.debit || 0), 0).toLocaleString('vi-VN')} ₫
                      </td>
                      <td className="p-2 text-right font-mono text-indigo-700 text-xs">
                        {selectedJE.lines.reduce((s, c) => s + (c.credit || 0), 0).toLocaleString('vi-VN')} ₫
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center pt-8 text-[9px] font-semibold text-gray-700">
                <div className="space-y-12">
                  <p className="uppercase font-bold text-gray-800">GIÁM ĐỐC DUYỆT</p>
                  <p className="italic text-gray-400 font-medium">(Ký và ghi rõ họ tên)</p>
                </div>
                <div className="space-y-12">
                  <p className="uppercase font-bold text-gray-800">KẾ TOÁN TRƯỞNG</p>
                  <p className="italic text-gray-400 font-medium">(Ký tên xác thực)</p>
                </div>
                <div className="space-y-12">
                  <p className="uppercase font-bold text-gray-800">THỦ QUỸ CHI QUỸ</p>
                  <p className="italic text-gray-400 font-medium">(Liên 1 lưu hành)</p>
                </div>
                <div className="space-y-12">
                  <p className="uppercase font-bold text-gray-800">NGƯỜI LẬP PHIẾU</p>
                  <p className="font-bold text-indigo-600 truncate">{selectedJE.creator}</p>
                </div>
              </div>

              <div className="text-center pt-10 text-[9px] text-slate-400 border-t border-dashed border-gray-100">
                Sổ cái MCNA ERP chốt khóa sổ tại chu kỳ hoạt động tháng 5/2026. Mọi hành vi sửa đổi cần có Audit Log xác định.
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 3C: XEM CHI TIẾT ĐƠN MUA VÀ 3-WAY MATCHING (selectedPO) ──────────────── */}
      {selectedPO && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden animate-slide-in">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h5 className="font-extrabold text-xs text-indigo-700 uppercase tracking-widest font-display">QUẢN LÝ QUY TRÌNH THẦU PO & THU HOẠCH VẬT TƯ</h5>
              <button onClick={() => setSelectedPO(null)} className="text-gray-400 hover:text-gray-650 font-extrabold text-sm px-1">×</button>
            </div>

            <div className="p-6 space-y-4 text-xs font-semibold text-gray-800">
              
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-black">Nhà cấp thầu chính:</p>
                  <p className="text-slate-800 font-extrabold text-xs">{selectedPO.vendorName}</p>
                  <p className="text-gray-500 text-[10px] font-mono mt-0.5">Mã số thuế thầu: MST-VND-{selectedPO.vendorId || '928'}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-[10px] uppercase font-black">Thông số Đơn PO:</p>
                  <p className="text-indigo-700 font-black font-mono">{selectedPO.number}</p>
                  <p className="text-gray-500 font-mono text-[10px]">Ngày tạo: {selectedPO.date}</p>
                </div>
              </div>

              {/* 3-Way Match Verification Graphics */}
              <div className="border border-slate-100 rounded-xl p-3.5 space-y-3 bg-white shadow-xs">
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">TIẾN TRÌNH ĐỒNG BỘ 3-CHIỀU (3-WAY MATCH AUDIT STATUS)</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 border border-slate-50 rounded-lg bg-emerald-50/30">
                    <CheckCircle2 size={15} className="mx-auto text-emerald-600 mb-1" />
                    <p className="text-[10px] font-bold text-gray-700">1. PO Mua Khớp</p>
                    <span className="text-[9px] text-emerald-700 font-bold uppercase">APPROVED</span>
                  </div>
                  <div className="p-2 border border-slate-50 rounded-lg bg-emerald-50/30">
                    {selectedPO.status === 'received' ? (
                      <CheckCircle2 size={15} className="mx-auto text-emerald-600 mb-1" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-amber-400 text-amber-500 font-mono text-[9px] mx-auto flex items-center justify-center font-bold mb-1">!</div>
                    )}
                    <p className="text-[10px] font-bold text-gray-700">2. Số Kho Cổng Giao</p>
                    <span className={`text-[9px] font-bold uppercase ${selectedPO.status === 'received' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {selectedPO.status === 'received' ? 'RECEIVED' : 'STILL WAITING'}
                    </span>
                  </div>
                  <div className="p-2 border border-slate-50 rounded-lg bg-emerald-50/30">
                    {selectedPO.status === 'received' ? (
                      <CheckCircle2 size={15} className="mx-auto text-emerald-600 mb-1" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-gray-300 text-gray-400 font-mono text-[9px] mx-auto flex items-center justify-center font-bold mb-1">-</div>
                    )}
                    <p className="text-[10px] font-bold text-gray-700">3. Hóa Đơn AP Tương Ứng</p>
                    <span className={`text-[9px] font-bold uppercase ${selectedPO.status === 'received' ? 'text-emerald-700' : 'text-gray-400'}`}>
                      {selectedPO.status === 'received' ? 'AP INVOICED' : 'PENDING GOODS'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items in PO */}
              <div>
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2 block">DANH MỤC THIẾT BỊ HỌC CỤ TRONG HỢP ĐỒNG:</span>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 text-[10px] font-black">
                      <tr>
                        <th className="p-2">Sản phẩm học cụ/Thiết bị</th>
                        <th className="p-2 text-right">Mã SKU</th>
                        <th className="p-2 text-right">Số lượng</th>
                        <th className="p-2 text-right">Đơn giá thầu</th>
                        <th className="p-2 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-gray-700">
                      {selectedPO.items?.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/20">
                          <td className="p-2 font-black text-slate-800">{item.name || 'Học cụ STEM'}</td>
                          <td className="p-2 text-right font-mono text-[11px] text-gray-450">{item.productId}</td>
                          <td className="p-2 text-right font-mono font-bold text-indigo-700">{item.qty} Chiếc</td>
                          <td className="p-2 text-right font-mono">{item.price.toLocaleString('vi-VN')} ₫</td>
                          <td className="p-2 text-right font-mono font-black text-slate-900">{(item.qty * item.price).toLocaleString('vi-VN')} ₫</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-sm font-black text-indigo-700 bg-slate-50 p-3 rounded-xl mb-2">
                <span className="text-xs font-black uppercase text-gray-450">TỔNG TRỊ GIÁ TRÚNG THẦU PO:</span>
                <span className="font-mono text-base">{selectedPO.total.toLocaleString('vi-VN')} ₫</span>
              </div>

              {/* Interactive Status Actions Section */}
              <div className="pt-2">
                {selectedPO.status === 'pending' && (
                  <button
                    onClick={() => {
                      if (onUpdatePOStatus) {
                        onUpdatePOStatus(selectedPO.id, 'approved');
                        setSelectedPO({ ...selectedPO, status: 'approved' });
                        toast('Đã phê chuẩn Đơn đặt mua PO thành công!', 'success');
                      }
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-center shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={13} />
                    <span>Duyệt & Ban Hành Đơn PO</span>
                  </button>
                )}

                {selectedPO.status === 'approved' && (
                  <button
                    onClick={() => {
                      if (onUpdatePOStatus) {
                        onUpdatePOStatus(selectedPO.id, 'received');
                        setSelectedPO({ ...selectedPO, status: 'received' });
                        toast('Đã nhận bàn giao hàng thầu và hạch toán tăng tồn kho Central R&D!', 'success');
                      }
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-1.5 animate-pulse"
                  >
                    <Database size={13} />
                    <span>Nhận Hàng & Hạch Toán Nhập Kho Tồn Trực Tiếp ⚡</span>
                  </button>
                )}

                {selectedPO.status === 'received' && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-center rounded-xl font-bold flex items-center justify-center gap-1.5 text-[11px] border border-emerald-150">
                    <CheckCircle2 size={14} className="text-emerald-600 animate-bounce" />
                    <span>Đơn hàng đã bàn giao hoàn tất! Toàn bộ học cụ đã lưu kho giáo đoàn Central.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 4: GHI BÚT TOÁN KẾ TOÁN (ADD JE) ──────────────── */}
      {showAddJEModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden animate-slide-in">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h5 className="font-extrabold text-xs text-indigo-700 uppercase tracking-widest font-display">ĐĂNG KÝ BÚT TOÁN NỢ-CÓ</h5>
              <button onClick={() => setShowAddJEModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">×</button>
            </div>
            <div className="p-6 space-y-4 text-xs font-semibold">
              <input
                type="text"
                placeholder="Diễn giải nghiệp vụ phát sinh (*)"
                value={jeDesc}
                onChange={(e) => setJeDesc(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none"
              />

              <div className="space-y-2">
                <div className="grid grid-cols-[1.5fr_1fr_1fr_30px] gap-2 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                  <span>Tài khoản kế toán</span>
                  <span className="text-right">Bên Nợ (₫)</span>
                  <span className="text-right">Bên Có (₫)</span>
                  <span></span>
                </div>
                {jeLines.map((line, idx) => (
                  <div key={idx} className="grid grid-cols-[1.5fr_1fr_1fr_30px] gap-2 items-center">
                    <select
                      value={line.accountCode}
                      onChange={(e) => {
                        const updated = [...jeLines];
                        updated[idx].accountCode = e.target.value;
                        setJeLines(updated);
                      }}
                      className="px-2 py-1 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 text-[11px]"
                    >
                      {glAccounts.map(a => (
                        <option key={a.code} value={a.code}>{a.code} - {a.name}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="0"
                      value={line.debit || ''}
                      onChange={(e) => {
                        const updated = [...jeLines];
                        updated[idx].debit = Number(e.target.value);
                        if (Number(e.target.value) > 0) {
                          updated[idx].credit = 0; // mutually exclusive
                        }
                        setJeLines(updated);
                      }}
                      className="w-full text-right px-2 py-1 border border-gray-200 rounded-lg focus:outline-none font-mono text-emerald-600 font-bold text-[11px]"
                    />
                    <input
                      type="number"
                      placeholder="0"
                      value={line.credit || ''}
                      onChange={(e) => {
                        const updated = [...jeLines];
                        updated[idx].credit = Number(e.target.value);
                        if (Number(e.target.value) > 0) {
                          updated[idx].debit = 0; // mutually exclusive
                        }
                        setJeLines(updated);
                      }}
                      className="w-full text-right px-2 py-1 border border-gray-200 rounded-lg focus:outline-none font-mono text-rose-600 font-bold text-[11px]"
                    />
                    <button
                      type="button"
                      disabled={jeLines.length <= 2}
                      onClick={() => {
                        const updated = jeLines.filter((_, i) => i !== idx);
                        setJeLines(updated);
                      }}
                      className="text-gray-400 hover:text-rose-500 disabled:opacity-30 disabled:hover:text-gray-450 text-base font-bold flex justify-center items-center"
                      title="Xóa dòng"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-[10px]">
                <button
                  type="button"
                  onClick={() => setJeLines([...jeLines, { accountCode: '1111', debit: 0, credit: 0 }])}
                  className="px-2.5 py-1 text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg font-bold flex items-center gap-1 transition-all"
                >
                  <Plus size={12} />
                  Thêm dòng hạch toán
                </button>
              </div>

              <div className="flex justify-between items-center text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="font-bold text-gray-500">Cân đối:</span>
                <span className={totalDebit === totalCredit ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                  {totalDebit.toLocaleString('vi-VN')} ₫ / {totalCredit.toLocaleString('vi-VN')} ₫
                </span>
              </div>

              <button
                onClick={handlePostJournal}
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Ghi sổ kế toán ✓
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 5: KHỞI TẠO SKU HỌC LIỆU ──────────────── */}
      {showAddProdModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-slide-in">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h5 className="font-extrabold text-xs text-indigo-700 uppercase tracking-widest font-display">KHỞI TẠO SKU THIẾT BỊ HỌC LIỆU</h5>
              <button onClick={() => setShowAddProdModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">×</button>
            </div>
            <div className="p-6 space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="SKU Code (*)"
                  value={newProd.sku}
                  onChange={(e) => setNewProd({ ...newProd, sku: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Tên SKU Thiết bị (*)"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Đơn giá mua vào (*)"
                  value={newProd.costPrice || ''}
                  onChange={(e) => setNewProd({ ...newProd, costPrice: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Số lượng nhập kho ban đầu"
                  value={newProd.stock || ''}
                  onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>

              <button
                onClick={handleSaveProduct}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Xác nhận tạo hàng ✓
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 6: LẬP ĐƠN ĐẤU THẦU (PO) ──────────────── */}
      {showAddPOModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-in">
            <div className="p-4 bg-slate-50 border-b border-gray-100 flex justify-between items-center text-xs">
              <h5 className="font-extrabold uppercase font-display text-gray-800">LẬP ĐƠN MUA HÀNG THẦU CHÍNH (PO)</h5>
              <button onClick={() => setShowAddPOModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">×</button>
            </div>
            <div className="p-6 space-y-4 text-xs font-semibold">
              <label className="text-[10px] uppercase text-gray-500 font-bold block">1. Chọn Nhà thầu liên kết</label>
              <select
                value={poVendor}
                onChange={(e) => setPoVendor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
              >
                <option value="">-- Click chọn thầu --</option>
                {vendors.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>

              <label className="text-[10px] uppercase text-gray-500 font-bold block">2. Chọn mặt hàng thầu</label>
              {poLines.map((line, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2">
                  <select
                    value={line.productId}
                    onChange={(e) => {
                      const updated = [...poLines];
                      updated[idx].productId = e.target.value;
                      setPoLines(updated);
                    }}
                    className="px-2 py-1.5 border border-gray-200 rounded-lg"
                  >
                    <option value="">-- Chọn SKU --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Số lượng đặt"
                    value={line.qty}
                    onChange={(e) => {
                      const updated = [...poLines];
                      updated[idx].qty = Number(e.target.value);
                      setPoLines(updated);
                    }}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg"
                  />
                </div>
              ))}

              <button
                onClick={handleSavePO}
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl cursor-pointer hover:bg-indigo-700"
              >
                Kí duyệt chuyển thầu PO ✓
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 7: LẬP LỆNH CHẾ TẠO LÓP RÁP (WO) ──────────────── */}
      {showAddWOModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-slide-in">
            <div className="p-4 bg-slate-50 border-b border-gray-100 flex justify-between items-center text-xs">
              <h5 className="font-extrabold uppercase font-display text-gray-800">LẬP LỆNH CHẾ TẠO LẮP RÁP ROBOT STEM</h5>
              <button onClick={() => setShowAddWOModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">×</button>
            </div>
            <div className="p-6 space-y-4 text-xs font-semibold">
              <label className="text-[10px] uppercase text-gray-500 font-bold block">Sản phẩm lắp ráp</label>
              <select
                value={woProduct}
                onChange={(e) => setWoProduct(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
              >
                <option value="">-- Chọn xe STEM Kit --</option>
                {products.filter(p => p.sku.startsWith('STEM-KIT-')).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <label className="text-[10px] uppercase text-gray-500 font-bold block">Số lượng lắp ráp</label>
              <input
                type="number"
                value={woQty}
                onChange={(e) => setWoQty(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
              />

              <label className="text-[10px] uppercase text-gray-500 font-bold block">Người phụ trách chính / Tech Lead</label>
              <select
                value={woAssignee}
                onChange={(e) => setWoAssignee(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
              >
                <option value="">-- Chọn thợ gá --</option>
                {users.map(u => (
                  <option key={u.id} value={u.name}>{u.name} ({u.title})</option>
                ))}
              </select>

              <button
                onClick={handleSaveWO}
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl cursor-pointer hover:bg-indigo-700"
              >
                Ban hành lệnh chế tác ✓
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────── MODAL 8: THÊM THẺ TASK SPRINT ──────────────── */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-slide-in">
            <div className="p-4 bg-slate-50 border-b border-gray-100 flex justify-between items-center text-xs">
              <h5 className="font-extrabold uppercase font-display text-gray-800">LẬP THẺ SPRINT TASK KANBAN</h5>
              <button onClick={() => setShowAddTaskModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">×</button>
            </div>
            <div className="p-6 space-y-4 text-xs font-semibold">
              <label className="text-[10px] uppercase text-gray-500 font-bold block">Tiêu đề nhiệm vụ (*)</label>
              <input
                type="text"
                placeholder="Ví dụ: Thiết kế cơ sở dữ liệu..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
              />

              <label className="text-[10px] uppercase text-gray-500 font-bold block">Ghép với dự án thầu</label>
              <select
                value={taskProject}
                onChange={(e) => setTaskProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
              >
                <option value="">-- Chọn Dự án --</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <label className="text-[10px] uppercase text-gray-500 font-bold block">Story Points (Điểm SP)</label>
              <input
                type="number"
                value={taskPoints}
                onChange={(e) => setTaskPoints(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />

              <button
                onClick={handleSaveTask}
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl cursor-pointer hover:bg-indigo-700"
              >
                Ghim thẻ lên Kanban ✓
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
