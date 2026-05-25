import React, { useState } from 'react';
import { User, AttendanceRecord, PayrollRecord, LeaveRequest, Candidate, JournalEntry, Invoice, Product, StockTransaction, PurchaseOrder, WorkOrder, Task, Machine, Notification } from './types';
import { 
  USERS_DB, 
  DEPARTMENTS_DB, 
  ATTENDANCE_DB, 
  PAYROLL_DB, 
  LEAVE_DB, 
  RECRUITMENT_DB, 
  CANDIDATES_DB, 
  GL_ACCOUNTS_DB, 
  JOURNAL_ENTRIES_DB, 
  INVOICES_DB, 
  BANK_ACCOUNTS_DB, 
  PRODUCTS_DB, 
  STOCK_TRANSACTIONS_DB, 
  VENDORS_DB, 
  PURCHASE_ORDERS_DB, 
  WORK_ORDERS_DB, 
  MACHINES_DB, 
  PROJECTS_DB, 
  TASKS_DB, 
  TICKETS_DB, 
  IT_ASSETS_DB, 
  AUDIT_LOG_DB, 
  ANNOUNCEMENTS_DB,
  NOTIFICATIONS_DB,
  REVENUE_MONTHLY,
  EXPENSE_BY_DEPT
} from './mockData';

import { Auth } from './components/Auth';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { DashboardViews } from './components/DashboardViews';
import { ModuleViews } from './components/ModuleViews';

import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(USERS_DB[0]); // Default logged-in as Superadmin Nguyễn Tiến Dũng for immediate user experience

  // Core CSDL State
  const [users, setUsers] = useState<User[]>(USERS_DB);
  const [departments, setDepartments] = useState(DEPARTMENTS_DB);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(ATTENDANCE_DB);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(PAYROLL_DB);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(LEAVE_DB);
  const [recruitmentJobs, setRecruitmentJobs] = useState(RECRUITMENT_DB);
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES_DB);
  const [glAccounts, setGlAccounts] = useState(GL_ACCOUNTS_DB);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(JOURNAL_ENTRIES_DB);
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES_DB);
  const [bankAccounts, setBankAccounts] = useState(BANK_ACCOUNTS_DB);
  const [budgets, setBudgets] = useState<any[]>([
    { id: 'BGD001', deptId: 'DEP001', category: 'Chi phí vận hành', annual: 8000000000, spent: 3450000000 },
    { id: 'BGD002', deptId: 'DEP003', category: 'Thiết bị R&D Robot', annual: 15000000000, spent: 7800000000 },
    { id: 'BGD003', deptId: 'DEP004', category: 'Học liệu STEM mua thầu', annual: 4500000000, spent: 2150000000 }
  ]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DB);
  const [stockTransactions, setStockTransactions] = useState<StockTransaction[]>(STOCK_TRANSACTIONS_DB);
  const [vendors, setVendors] = useState(VENDORS_DB);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(PURCHASE_ORDERS_DB);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(WORK_ORDERS_DB);
  const [machines, setMachines] = useState<Machine[]>(MACHINES_DB);
  const [projects, setProjects] = useState(PROJECTS_DB);
  const [tasks, setTasks] = useState<Task[]>(TASKS_DB);
  const [tickets, setTickets] = useState(TICKETS_DB);
  const [assets, setAssets] = useState(IT_ASSETS_DB);
  const [auditLogs, setAuditLogs] = useState(AUDIT_LOG_DB);
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS_DB);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS_DB);

  // App Layout state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Toast State Management
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  const showToast = (msg: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // --- ACTIONS WORKFLOWS ---

  // Auth logins
  const handleLogin = (email: string, pw: string): boolean => {
    const match = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.pw === pw);
    if (match) {
      setCurrentUser(match);
      // Log audit
      addAudit('LOGIN', 'Hệ thống Auth', `Đăng nhập thành công tài khoản: ${match.name}`);
      showToast(`Chào mừng quay lại, ${match.name}!`, 'success');
      setActiveTab('dashboard');
      return true;
    }
    showToast('Email hoặc mật khẩu không chính xác', 'error');
    return false;
  };

  const handleRegister = (email: string, pw: string, name: string): boolean => {
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      showToast('Email này đã được ghi danh trước đây!', 'error');
      return false;
    }
    const newUser: User = {
      id: `USR${String(users.length + 1).padStart(3, '0')}`,
      email,
      pw,
      name,
      role: 'employee',
      deptId: 'DEP003',
      title: 'Giáo viên phụ giảng',
      phone: '090-xxxx-xxxx',
      initials: name.substring(0, 2).toUpperCase(),
      avatarColor: 'bg-emerald-600 text-white',
      status: 'active',
      joinedAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    addAudit('REGISTER', 'Hệ thống Auth', `Tự ghi danh thành viên mới: ${newUser.name}`);
    showToast(`Chúc mừng ${newUser.name}! Bạn ghi danh thành công.`, 'success');
    setActiveTab('dashboard');
    return true;
  };

  const handleLogout = () => {
    if (currentUser) {
      addAudit('LOGOUT', 'Hệ thống Auth', `Rời phòng máy: ${currentUser.name}`);
    }
    setCurrentUser(null);
    showToast('Đã đăng xuất tài khoản an toàn.', 'info');
  };

  // Switch role dynamically (for multi-tenant demonstration purposes)
  const handleSwitchRole = (newRole: any) => {
    if (currentUser) {
      const updated = { ...currentUser, role: newRole };
      setCurrentUser(updated);
      addAudit('ROLE_SWITCH', 'Hệ thống', `Chuyển quyền sang: ${newRole}`);
      showToast(`Đã chuyển vai trò giao diện sang: ${newRole.toUpperCase()}`, 'info');
    }
  };

  // Logging Helper
  const addAudit = (action: string, module: string, record: string) => {
    const newLog = {
      id: `AUD${String(auditLogs.length + 1).padStart(3, '0')}`,
      time: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      userName: currentUser ? currentUser.name : 'Khách vãng lai',
      action,
      module,
      record,
      ip: '192.168.1.52'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // Chấm công
  const handleCheckIn = (status: 'present' | 'late' | 'wfh', note?: string) => {
    if (!currentUser) return;
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Check duplication
    const exist = attendance.find(a => a.employeeId === currentUser.id && a.date === todayStr);
    if (exist) {
      showToast('Hôm nay bạn đã chấm công điểm danh rồi!', 'warning');
      return;
    }

    const newRecord: AttendanceRecord = {
      id: `ATT${String(attendance.length + 1).padStart(3, '0')}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      date: todayStr,
      checkIn: new Date().toLocaleTimeString('vi-VN'),
      checkOut: '17:30:00',
      status,
      overtime: 0,
      note: note || ''
    };

    setAttendance([newRecord, ...attendance]);
    addAudit('PUNCH_IN', 'Phân hệ Nhân sự', `${currentUser.name} punch vào lúc ${newRecord.checkIn} (${status.toUpperCase()})`);
    showToast('Chấm công thành công! Nhật ký đã tải lên máy chủ MCNA.', 'success');
  };

  // Payroll calculate
  const handleCalculatePayroll = (period: string) => {
    const calculated = users.map((u, index) => {
      const basic = 15000000 + (index * 1500000);
      const bh = Math.round(basic * 0.095); // 9.5%
      const tax = Math.round(basic * 0.05); // 5%
      const net = basic - bh - tax;
      return {
        id: `PAY${String(index + 1).padStart(3, '0')}`,
        employeeId: u.id,
        employeeName: u.name,
        period,
        basicSalary: basic,
        allowances: { lunch: 1000000, gas: 500000 },
        bhxh: bh,
        tncn: tax,
        netSalary: net,
        status: 'pending' as any
      };
    });
    setPayroll(calculated);
    addAudit('PAYROLL_CALC', 'Phân hệ Tài chính', `Sinh bảng lương chu kỳ ${period}`);
  };

  const handleApprovePayroll = (id: string) => {
    setPayroll(payroll.map(p => p.id === id ? { ...p, status: 'paid' } : p));
    const pay = payroll.find(p => p.id === id);
    if (pay) {
      addAudit('PAY_DISBURSE', 'Phân hệ Kế toán', `Chi lương thực tế cho giáo thọ ${pay.employeeName}`);
    }
  };

  // Leave Requests approval
  const handleApproveLeave = (id: string, note?: string) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'approved' } : l));
    const req = leaveRequests.find(l => l.id === id);
    if (req) {
      addAudit('LEAVE_APPROVE', 'Phân hệ Nhân sự', `Chấp thuận phép lý do [${req.reason}] cho ${req.employeeName}`);
    }
  };

  const handleRejectLeave = (id: string, reason?: string) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
    const req = leaveRequests.find(l => l.id === id);
    if (req) {
      addAudit('LEAVE_REJECT', 'Phân hệ Nhân sự', `Từ chối xin phép cho ${req.employeeName}. Nguyên nhân: ${reason || 'Không sắp xếp được lớp'}`);
    }
  };

  const handleAddLeaveRequest = (req: LeaveRequest) => {
    setLeaveRequests([...leaveRequests, req]);
    addAudit('LEAVE_APPLY', 'Tự phục vụ ESS', `Xin nghỉ phép từ ${req.from} đến ${req.to}`);
  };

  // Applicant pipelines
  const handleMoveCandidateStage = (id: string, nextStage: string) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, stage: nextStage } : c));
    const cand = candidates.find(c => c.id === id);
    if (cand) {
      addAudit('CANDIDATE_MOVE', 'Tuyển dụng', `Dịch chuyển giai đoạn ${cand.name} sang ${nextStage}`);
    }
  };

  // Ledger Journal Entries
  const handleAddJournalEntry = (entry: JournalEntry) => {
    setJournalEntries([entry, ...journalEntries]);
    
    // Dynamically re-calculate GlAccounts balance
    const updatedAccounts = glAccounts.map(account => {
      let balanceChange = 0;
      entry.lines.forEach(line => {
        if (line.accountCode === account.code) {
          balanceChange += (line.debit - line.credit);
        }
      });
      return {
        ...account,
        balance: account.balance + balanceChange
      };
    });

    setGlAccounts(updatedAccounts);
    addAudit('JOURNAL_POST', 'Sổ cái Kế toán', `Đăng sổ bút toán ${entry.ref}: "${entry.description}"`);
  };

  // Invoices & Quỹ
  const handlePayInvoice = (id: string, amount: number) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === id) {
        const remaining = inv.total - inv.paid;
        const toPay = Math.min(amount, remaining);
        const newPaid = inv.paid + toPay;
        return {
          ...inv,
          paid: newPaid,
          status: newPaid >= inv.total ? 'paid' : 'partial' as any
        };
      }
      return inv;
    }));

    const target = invoices.find(inv => inv.id === id);
    if (target) {
      // Impact bank account (e.g. withdraw VND 1121 from first bank, or deposit VND)
      const isReceipt = target.partnerType === 'customer';
      
      const updatedBanks = bankAccounts.map((b, idx) => {
        if (idx === 0) { // Impact Vietnam Techcombank / Vietcombank ledger
          const txn = {
            date: new Date().toISOString().split('T')[0],
            description: `${isReceipt ? 'Thu tiền học phí' : 'Chi trả tiền hàng vật tư'}: Invoice ${target.number}`,
            debit: isReceipt ? amount : 0,
            credit: isReceipt ? 0 : amount
          };
          return {
            ...b,
            balance: isReceipt ? b.balance + amount : b.balance - amount,
            transactions: [txn, ...b.transactions]
          };
        }
        return b;
      });

      setBankAccounts(updatedBanks);
      addAudit('PAYMENT_REGISTER', 'Báo cáo ngân quỹ', `${isReceipt ? 'Thu chi học phí' : 'Thanh toán nhà thầu'} số tiền: ${amount.toLocaleString('vi-VN')} ₫`);
    }
  };

  // Product materials
  const handleAddProduct = (prod: Product) => {
    setProducts([...products, prod]);
    addAudit('PRODUCT_CREATE', 'Quản lý kho', `Tạo mới mã SKU thầu R&D: ${prod.sku} (${prod.name})`);
  };

  const handleAddStockTransaction = (trans: StockTransaction) => {
    setStockTransactions([trans, ...stockTransactions]);
    addAudit('STOCK_MOVE', 'Điều hành kho', `Thực hiện giao dịch Nhập/Xuất kho: SKU ${trans.sku}`);
  };

  // Procurements
  const handleAddPO = (po: PurchaseOrder) => {
    setPurchaseOrders([...purchaseOrders, po]);
    addAudit('PO_PUBLIST', 'Mua sắm thầu', `Lập và đệ trình đơn đặt mua ${po.number}`);
  };

  const handleUpdatePOStatus = (poId: string, status: 'draft' | 'pending' | 'approved' | 'overdue' | 'received') => {
    setPurchaseOrders(prevPos => prevPos.map(po => {
      if (po.id === poId || po.number === poId) {
        // If transitioning to received, automatically ingest items into warehouse stock!
        if (status === 'received' && po.status !== 'received') {
          po.items.forEach(item => {
            // Find product matching this item's productId or name
            setProducts(prevProducts => prevProducts.map(p => {
              if (p.id === item.productId || p.sku === item.productId || p.name === item.name) {
                // Generate stock transaction
                const stockTx: StockTransaction = {
                  id: `ST_PO_${Date.now().toString().slice(-4)}_${Math.floor(Math.random() * 100)}`,
                  type: 'in',
                  date: new Date().toISOString().split('T')[0],
                  productName: p.name,
                  sku: p.sku,
                  qty: item.qty,
                  warehouse: 'Kho Vật tư trung tâm R&D',
                  ref: po.number,
                  operator: currentUser.name
                };
                setStockTransactions(prev => [stockTx, ...prev]);
                return { ...p, stock: p.stock + item.qty };
              }
              return p;
            }));
          });
          showToast(`Nhận hàng thầu PO ${po.number} thành công! Đã tự động hạch toán nhập kho thiết bị giáo cụ.`, 'success');
        } else {
          showToast(`Cập nhật trạng thái đơn hàng ${po.number} sang: ${status.toUpperCase()}`, 'success');
        }
        return { ...po, status };
      }
      return po;
    }));
    addAudit('PO_UPDATE', 'Mua sắm thầu', `Cập nhật trạng thái đơn PO ${poId} sang: ${status.toUpperCase()}`);
  };

  // Work orders (WO) production kit Assemblies
  const handleAddWO = (wo: WorkOrder) => {
    setWorkOrders([...workOrders, wo]);
    addAudit('WO_ISSUE', 'Mặt điện tử R&D', `Ban hành lệnh lắp ráp STEM xe: ${wo.number}`);
  };

  const handleMoveWOStage = (woId: string, nextStage: string) => {
    setWorkOrders(workOrders.map(wo => {
      if (wo.id === woId) {
        let progress = 10;
        if (nextStage === 'preparing') progress = 30;
        else if (nextStage === 'producing') progress = 65;
        else if (nextStage === 'qc') progress = 90;
        else if (nextStage === 'completed') progress = 100;

        // If completed, let's impact products warehouse stock automatically!
        if (nextStage === 'completed' && wo.stage !== 'completed') {
          setProducts(prevProducts => prevProducts.map(p => {
            if (p.id === wo.productId) {
              const updatedStock = p.stock + wo.qty;
              // Push transactional inventory logs
              const stockTx: StockTransaction = {
                id: `ST${String(stockTransactions.length + 9).padStart(3, '0')}`,
                type: 'in',
                date: new Date().toISOString().split('T')[0],
                productName: p.name,
                sku: p.sku,
                qty: wo.qty,
                warehouse: 'Kho Vật tư trung tâm R&D',
                ref: wo.number,
                operator: 'Hệ thống CNC'
              };
              setStockTransactions(prev => [stockTx, ...prev]);
              showToast(`Lắp ráp hoàn tất! Đã tự động nhập ${wo.qty} chiếc ${p.name} vào kho.`, 'success');
              return { ...p, stock: updatedStock };
            }
            return p;
          }));
        }

        return { ...wo, stage: nextStage as any, progress };
      }
      return wo;
    }));

    const targetWO = workOrders.find(w => w.id === woId);
    if (targetWO) {
      addAudit('WO_STAGE_MOVE', 'Xưởng chế tạo STEM', `Dịch chuyển lệnh ${targetWO.number} sang phân đoạn: [${nextStage.toUpperCase()}]`);
    }
  };

  // Machinery statuses
  const handleUpdateMachineState = (id: string, newState: 'running' | 'idle' | 'maintenance' | 'breakdown') => {
    setMachines(machines.map(m => m.id === id ? { ...m, status: newState } : m));
    const target = machines.find(m => m.id === id);
    if (target) {
      addAudit('MACHINE_STATE_UPDATE', 'Cơ điện Lab CNC', `Dịch chuyển trạng thái thiết bị [${target.name}] sang: ${newState.toUpperCase()}`);
      showToast(`Đã chuyển trạng thái ${target.name} sang ${newState.toUpperCase()}`, 'info');
    }
  };

  // Agile Sprints / tasks
  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
    addAudit('TASK_CREATE', 'Agile Lab', `Kéo thẻ Jira mới: ${task.title} phân ban LMS`);
  };

  const handleMoveTaskStage = (taskId: string, nextStage: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, stage: nextStage as any } : t));
    const t = tasks.find(tsk => tsk.id === taskId);
    if (t) {
      addAudit('TASK_STAGE_MOVE', 'Portal LMS Sprints', `Kéo thẻ task "${t.title}" sang cột: [${nextStage.toUpperCase()}]`);
    }
  };

  const handleMarkNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    showToast('Đã đánh dấu tất cả thông báo là đã đọc!', 'success');
  };

  const handleSearchSelect = (type: string, id: string) => {
    switch (type) {
      case 'employee':
        setActiveTab('employees');
        break;
      case 'invoice':
        setActiveTab('ar');
        break;
      case 'product':
        setActiveTab('products');
        break;
      case 'task':
        setActiveTab('kanban');
        break;
      default:
        break;
    }
    showToast(`Đã điều hướng tới tài liệu ${id}`, 'info');
  };

  const handleQuickCreate = (type: string) => {
    switch (type) {
      case 'employee':
        setActiveTab('employees');
        break;
      case 'grn':
        setActiveTab('inventory');
        break;
      case 'po':
        setActiveTab('purchase-orders');
        break;
      case 'wo':
        setActiveTab('work-orders');
        break;
      case 'task':
        setActiveTab('kanban');
        break;
      case 'ticket':
        setActiveTab('helpdesk');
        break;
      default:
        break;
    }
    showToast(`Đã mở phân hệ ${type} để tạo mới`, 'success');
  };

  // Self Service Quick checkins
  const myCheckInToday = attendance.find(a => a.employeeId === (currentUser ? currentUser.id : '') && a.date === new Date().toISOString().split('T')[0]);

  // If user is not authenticated, force Auth panel screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        {/* Custom floating toast notification */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800 text-white border border-slate-750 shadow-xl max-w-sm animate-fade-in text-xs font-semibold">
            {toastType === 'success' && <CheckCircle size={16} className="text-emerald-400" />}
            {toastType === 'error' && <XCircle size={16} className="text-rose-400" />}
            {toastType === 'warning' && <AlertCircle size={16} className="text-amber-400" />}
            {toastType === 'info' && <Info size={16} className="text-blue-400" />}
            <span>{toastMessage}</span>
          </div>
        )}
        <Auth 
          users={users}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            addAudit('LOGIN', 'Hệ thống Auth', `Đăng nhập thành công tài khoản: ${user.name}`);
            showToast(`Chào mừng quay lại, ${user.name}!`, 'success');
            setActiveTab('dashboard');
          }}
          onAddNewUser={(newUser) => {
            setUsers(prev => [...prev, newUser]);
            addAudit('REGISTER', 'Hệ thống Auth', `Tự ghi danh thành viên mới: ${newUser.name}`);
          }}
          toast={showToast}
        />
      </div>
    );
  }

  // Active sub tab title computation for beautiful breadcrumbs
  const getTabLabel = () => {
    switch (activeTab) {
      case 'dashboard': return 'Bảng điều khiển Tổng';
      case 'employees': return 'Hồ sơ Giáo vụ & Nhân sự';
      case 'attendance': return 'Nhật ký Điểm danh';
      case 'payroll': return 'Tính toán Bảng lương';
      case 'leave': return 'Phê duyệt phép học vụ';
      case 'ledger': return 'Sổ cái Kế toán TT200';
      case 'ar': return 'Hóa đơn Phải thu (AR)';
      case 'ap': return 'Phát hành Phải trả (AP)';
      case 'cashbank': return 'Ngân quỹ & Ngân hàng';
      case 'budget': return 'Báo cáo ngân sách';
      case 'financial-reports': return 'Báo cáo lãi lỗ P&L';
      case 'products': return 'Danh mục học liệu R&D';
      case 'inventory': return 'Nhật ký biến động kho';
      case 'requisitions': return 'Đề nghị thầu mua sắm';
      case 'purchase-orders': return 'Mua sắm PO liên kết';
      case 'production-plan': return 'Kế hoạch CNC master';
      case 'work-orders': return 'Lệnh sản xuất CNC dán chip';
      case 'machinery': return 'Cơ điện Lab & Robotics';
      case 'projects': return 'Dự án LMS & Portals thầu';
      case 'kanban': return 'Bảng thẻ Agile Kanban';
      case 'users': return 'Đầu mục quyền RBAC';
      case 'settings': return 'Cấu hình chung hệ học viện';
      case 'audit-log': return 'Audit Logs an ninh';
      case 'my-profile': return 'Hồ sơ lý lịch cá nhân';
      default: return 'Phân hệ';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      
      {/* Toast banners */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl max-w-sm animate-fade-in text-xs font-semibold print:hidden">
          {toastType === 'success' && <CheckCircle size={16} className="text-emerald-400" />}
          {toastType === 'error' && <XCircle size={16} className="text-rose-400" />}
          {toastType === 'warning' && <AlertCircle size={16} className="text-amber-400" />}
          {toastType === 'info' && <Info size={16} className="text-blue-400" />}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dynamic Navigation Sidebar */}
      <Sidebar 
        user={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onLogout={handleLogout}
      />

      {/* Main layout context wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Topbar 
          user={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          onSwapRole={handleSwitchRole}
          onQuickCreate={handleQuickCreate}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          onSearchSelect={handleSearchSelect}
          users={users}
          invoices={invoices}
          products={products}
          tasks={tasks}
        />

        {/* Dense business display viewport container */}
        <main className="p-4 sm:p-6 pb-20 max-w-7xl w-full mx-auto space-y-6">
          
          {activeTab === 'dashboard' ? (
            <DashboardViews 
              user={currentUser}
              users={users}
              departments={departments}
              attendance={attendance}
              onCheckIn={handleCheckIn}
              myCheckInToday={myCheckInToday}
              payroll={payroll}
              leaveRequests={leaveRequests}
              onApproveLeave={handleApproveLeave}
              onRejectLeave={handleRejectLeave}
              products={products}
              purchaseOrders={purchaseOrders}
              workOrders={workOrders}
              machines={machines}
              onUpdateMachineState={handleUpdateMachineState}
              projects={projects}
              tasks={tasks}
              onToggleTaskStage={(taskId) => {
                const target = tasks.find(t => t.id === taskId);
                if (target) {
                  const nextStage = target.stage === 'done' ? 'todo' : 'done';
                  handleMoveTaskStage(taskId, nextStage);
                  if (nextStage === 'done') {
                    showToast('Đã hoàn thành thẻ task thầu!', 'success');
                  }
                }
              }}
              tickets={tickets}
              announcements={announcements}
              revenueData={REVENUE_MONTHLY}
              expenseByDept={EXPENSE_BY_DEPT}
            />
          ) : (
            <ModuleViews 
              activeTab={activeTab}
              user={currentUser}
              users={users}
              onAddNewUser={(newUsr) => setUsers([newUsr, ...users])}
              departments={departments}
              attendance={attendance}
              onUpdateAttendance={setAttendance}
              payroll={payroll}
              onCalculatePayroll={handleCalculatePayroll}
              onApprovePayroll={handleApprovePayroll}
              leaveRequests={leaveRequests}
              onApproveLeave={handleApproveLeave}
              onRejectLeave={handleRejectLeave}
              onAddLeaveRequest={handleAddLeaveRequest}
              recruitmentJobs={recruitmentJobs}
              candidates={candidates}
              onMoveCandidateStage={handleMoveCandidateStage}
              glAccounts={glAccounts}
              journalEntries={journalEntries}
              onAddJournalEntry={handleAddJournalEntry}
              invoices={invoices}
              onPayInvoice={handlePayInvoice}
              bankAccounts={bankAccounts}
              budgets={budgets}
              products={products}
              onAddProduct={handleAddProduct}
              onAddStockTransaction={handleAddStockTransaction}
              stockTransactions={stockTransactions}
              vendors={vendors}
              purchaseOrders={purchaseOrders}
              onAddPO={handleAddPO}
              onUpdatePOStatus={handleUpdatePOStatus}
              workOrders={workOrders}
              onAddWO={handleAddWO}
              onMoveWOStage={handleMoveWOStage}
              machines={machines}
              projects={projects}
              tasks={tasks}
              onAddTask={handleAddTask}
              onMoveTaskStage={handleMoveTaskStage}
              tickets={tickets}
              assets={assets}
              auditLogs={auditLogs}
              announcements={announcements}
              toast={showToast}
            />
          )}

        </main>
      </div>

    </div>
  );
}
