export type Role = 'superadmin' | 'finance' | 'hr' | 'it' | 'warehouse' | 'procurement' | 'production' | 'employee';

export interface User {
  id: string;
  email: string;
  pw: string;
  name: string;
  role: Role;
  deptId: string;
  title: string;
  phone: string;
  initials: string;
  avatarColor: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  lastLogin?: string;
  dob?: string;
  cccd?: string;
  bankAccount?: string;
}

export interface Department {
  id: string;
  name: string;
  headName: string;
  headId: string;
  headcount: number;
  costCenter: string;
  budget: number;
  budgetUsed: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  checkIn: string; // HH:MM
  checkOut: string; // HH:MM
  status: 'present' | 'absent' | 'late' | 'leave' | 'holiday' | 'wfh';
  overtime: number; // hours
  note?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string; // MM/YYYY
  basicSalary: number;
  allowances: {
    position: number;
    lunch: number;
    gas: number;
  };
  otHours: number;
  bonus: number;
  deductions: number;
  bhxh: number; // 8% Social Insurance
  bhyt: number; // 1.5% Health Insurance
  bhtn: number; // 1% Unemployment
  tncn: number; // Personal Income Tax
  netSalary: number;
  status: 'draft' | 'calculated' | 'approved' | 'paid';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'unpaid';
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
  days: number;
  reason: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  approverId?: string;
  approverNote?: string;
}

export interface RecruitmentJob {
  id: string;
  title: string;
  deptId: string;
  count: number;
  deadline: string;
  status: 'open' | 'closed';
  description: string;
  applicantsCount: number;
}

export interface Candidate {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: 'applied' | 'screening' | 'interview' | 'offer' | 'onboard' | 'rejected';
  rating: number; // 1 to 5
  interviewDate?: string;
  notes?: string;
}

export interface GLAccount {
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
}

export interface JournalEntryLine {
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  ref: string;
  description: string;
  lines: JournalEntryLine[];
  creator: string;
  status: 'draft' | 'posted';
}

export interface Invoice {
  id: string;
  number: string;
  partnerName: string; // Customer or Supplier
  partnerType: 'customer' | 'supplier';
  date: string;
  dueDate: string;
  items: {
    name: string;
    qty: number;
    price: number;
    taxRate: number; // %
  }[];
  total: number;
  paid: number;
  status: 'unpaid' | 'partial' | 'paid' | 'overdue';
  matching?: {
    po: boolean;
    grn: boolean;
    invoice: boolean;
  }; // 3-way match
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNo: string;
  balance: number;
  transactions: {
    id: string;
    date: string;
    description: string;
    debit: number; // thu entered
    credit: number; // chi spent
    balance: number;
  }[];
}

export interface Budget {
  id: string;
  deptId: string;
  category: string;
  annual: number;
  spent: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  maxStock: number;
  location: string;
  supplierName: string;
  barcode: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
}

export interface StockTransaction {
  id: string;
  type: 'in' | 'out' | 'transfer';
  date: string;
  productName: string;
  sku: string;
  qty: number;
  warehouse: string;
  ref: string;
  operator: string;
}

export interface Vendor {
  id: string;
  name: string;
  code: string;
  category: string;
  phone: string;
  email: string;
  taxCode: string;
  address: string;
  onTimeDeliveryRate: number; // %
  qualityScore: number; // out of 100
}

export interface PurchaseOrder {
  id: string;
  number: string;
  vendorId: string;
  vendorName: string;
  date: string;
  deliveryDate: string;
  items: {
    productId: string;
    name: string;
    qty: number;
    price: number;
  }[];
  total: number;
  status: 'draft' | 'pending' | 'approved' | 'overdue' | 'received';
  receivedQty?: number;
}

export interface BOMComponent {
  productId: string;
  name: string;
  qty: number;
  unit: string;
  cost: number;
}

export interface BOM {
  id: string;
  productId: string;
  productName: string;
  components: BOMComponent[];
  totalCost: number;
}

export interface WorkOrder {
  id: string;
  number: string;
  productId: string;
  productName: string;
  qty: number;
  bomId: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart?: string;
  stage: 'planned' | 'preparing' | 'producing' | 'qc' | 'completed' | 'cancelled';
  assignedTo: string;
  progress: number; // %
}

export interface Machine {
  id: string;
  name: string;
  code: string;
  status: 'running' | 'idle' | 'maintenance' | 'breakdown' | 'offline';
  oee: number; // %
  maintenanceSchedule?: string;
}

export interface QCResult {
  id: string;
  woNumber: string;
  productName: string;
  date: string;
  inspectorName: string;
  qtyInspected: number;
  qtyPassed: number;
  qtyFailed: number;
  status: 'pass' | 'fail';
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'active' | 'onhold' | 'completed' | 'cancelled';
  progress: number; // %
  deadline: string;
  budget: number;
  spent: number;
}

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  status: 'past' | 'active' | 'planning';
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  assigneeName: string;
  assigneeId: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  stage: 'backlog' | 'todo' | 'inprogress' | 'review' | 'done';
  dueDate: string;
  storyPoints: number;
  tags: string[];
}

export interface ITAsset {
  id: string;
  name: string;
  type: string;
  serial: string;
  assignedTo: string;
  purchaseDate: string;
  warrantyUntil: string;
  status: 'active' | 'spare' | 'repair' | 'retired';
}

export interface HelpdeskTicket {
  id: string;
  title: string;
  employeeName: string;
  category: 'hardware' | 'software' | 'network' | 'access' | 'other';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'inprogress' | 'resolved' | 'closed';
  createdAt: string;
}

export interface Notification {
  id: string;
  module: 'finance' | 'hr' | 'warehouse' | 'procurement' | 'production' | 'it' | 'system';
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export interface Announcement {
  id: string;
  authorName: string;
  authorRole: string;
  time: string;
  title: string;
  body: string;
  priority: 'critical' | 'important' | 'general';
}

export interface AuditLog {
  id: string;
  time: string;
  userName: string;
  role: string;
  action: string;
  module: string;
  record: string;
  ip: string;
  status: 'success' | 'fail';
}
