import {
  User, Department, AttendanceRecord, PayrollRecord, LeaveRequest,
  RecruitmentJob, Candidate, GLAccount, JournalEntry, Invoice,
  BankAccount, Budget, Product, Warehouse, StockTransaction,
  Vendor, PurchaseOrder, BOM, WorkOrder, Machine, QCResult,
  Project, Sprint, Task, ITAsset, HelpdeskTicket, Notification,
  Announcement, AuditLog
} from './types';

const INITIAL_USERS_DB: User[] = [
  {
    id: 'USR001',
    email: 'ceo@erp.vn',
    pw: 'Admin@123',
    name: 'Nguyễn Tiến Dũng',
    role: 'superadmin',
    deptId: 'DEP007', // Ban Giám Hiệu
    title: 'Hiệu trưởng / Giám đốc điều hành',
    phone: '0901234567',
    initials: 'TD',
    avatarColor: 'bg-indigo-600 text-white',
    status: 'active',
    joinedAt: '2020-01-15',
    dob: '1975-08-20',
    cccd: '001075001234',
    bankAccount: '190345678901 - Techcombank'
  },
  {
    id: 'USR002',
    email: 'cfo@erp.vn',
    pw: 'Finance@123',
    name: 'Phạm Thanh Thủy',
    role: 'finance',
    deptId: 'DEP001', // Phòng Tài chính
    title: 'Trưởng phòng Tài chính - Kế toán',
    phone: '0912345678',
    initials: 'TT',
    avatarColor: 'bg-blue-600 text-white',
    status: 'active',
    joinedAt: '2021-03-10',
    dob: '1982-11-05',
    cccd: '001082005678',
    bankAccount: '0011001234567 - Vietcombank'
  },
  {
    id: 'USR003',
    email: 'hr@erp.vn',
    pw: 'HR@123',
    name: 'Hà Minh Nhật',
    role: 'hr',
    deptId: 'DEP002', // Phòng Nhân sự
    title: 'Trưởng phòng Nhân sự',
    phone: '0987654321',
    initials: 'MN',
    avatarColor: 'bg-green-600 text-white',
    status: 'active',
    joinedAt: '2021-06-20',
    dob: '1988-04-12',
    cccd: '001088009876',
    bankAccount: '1023456789 - VietinBank'
  },
  {
    id: 'USR004',
    email: 'it@erp.vn',
    pw: 'IT@123',
    name: 'Đặng Việt Anh',
    role: 'it',
    deptId: 'DEP003', // Phòng Công nghệ/IT Lab
    title: 'Trưởng phòng Công nghệ & IT Lab',
    phone: '0945678901',
    initials: 'VA',
    avatarColor: 'bg-purple-600 text-white',
    status: 'active',
    joinedAt: '2022-02-15',
    dob: '1990-09-30',
    cccd: '001090004321',
    bankAccount: '0945678901 - MB Bank'
  },
  {
    id: 'USR005',
    email: 'warehouse@erp.vn',
    pw: 'Wh@123',
    name: 'Trần Quốc Bảo',
    role: 'warehouse',
    deptId: 'DEP004', // Phòng Vật tư thiết bị
    title: 'Quản lý Kho Học liệu & Thiết bị',
    phone: '0934567890',
    initials: 'QB',
    avatarColor: 'bg-amber-600 text-white',
    status: 'active',
    joinedAt: '2022-05-01',
    dob: '1985-02-25',
    cccd: '001085006543',
    bankAccount: '12345678 - ACB'
  },
  {
    id: 'USR006',
    email: 'procurement@erp.vn',
    pw: 'Pro@123',
    name: 'Vũ Thị Mai',
    role: 'procurement',
    deptId: 'DEP005', // Phòng Mua sắm
    title: 'Trưởng phòng Mua sắm & Đấu thầu',
    phone: '0976543210',
    initials: 'VM',
    avatarColor: 'bg-cyan-600 text-white',
    status: 'active',
    joinedAt: '2022-08-01',
    dob: '1989-12-15',
    cccd: '001089007890',
    bankAccount: '19034987654 - Techcombank'
  },
  {
    id: 'USR007',
    email: 'production@erp.vn',
    pw: 'Prod@123',
    name: 'Lê Hoàng Long',
    role: 'production',
    deptId: 'DEP006', // Hub Phát triển Content/Luyện thi Lab
    title: 'Trưởng nhóm Sản xuất Học liệu & Robot Kit',
    phone: '0912344321',
    initials: 'HL',
    avatarColor: 'bg-red-600 text-white',
    status: 'active',
    joinedAt: '2023-01-10',
    dob: '1987-07-07',
    cccd: '001087002468',
    bankAccount: '0543210987 - VIB'
  },
  {
    id: 'USR008',
    email: 'employee@erp.vn',
    pw: 'Emp@123',
    name: 'Nguyễn Văn Đạt',
    role: 'employee',
    deptId: 'DEP003', // IT Lab
    title: 'Kỹ sư Phần mềm / Giảng viên IT',
    phone: '0967890123',
    initials: 'VD',
    avatarColor: 'bg-teal-600 text-white',
    status: 'active',
    joinedAt: '2023-04-01',
    dob: '1995-10-10',
    cccd: '001095001357',
    bankAccount: '0967890123 - VpBank'
  },
  // Additional realistic employees
  {
    id: 'USR009',
    email: 'giang.lt@erp.vn',
    pw: 'Giang@123',
    name: 'Lê Thu Giang',
    role: 'employee',
    deptId: 'DEP002',
    title: 'Chuyên viên Tuyển dụng',
    phone: '0911223344',
    initials: 'TG',
    avatarColor: 'bg-pink-600 text-white',
    status: 'active',
    joinedAt: '2023-07-01'
  },
  {
    id: 'USR010',
    email: 'nam.hd@erp.vn',
    pw: 'Nam@123',
    name: 'Hoàng Danh Nam',
    role: 'employee',
    deptId: 'DEP001',
    title: 'Kế toán tổng hợp',
    phone: '0922334455',
    initials: 'DN',
    avatarColor: 'bg-emerald-600 text-white',
    status: 'active',
    joinedAt: '2022-10-15'
  },
  {
    id: 'USR011',
    email: 'ha.nt@erp.vn',
    pw: 'Ha@123',
    name: 'Nguyễn Thanh Hà',
    role: 'employee',
    deptId: 'DEP006',
    title: 'Chuyên viên R&D Robot Kit',
    phone: '0933445566',
    initials: 'TH',
    avatarColor: 'bg-violet-600 text-white',
    status: 'active',
    joinedAt: '2023-11-01'
  },
  {
    id: 'USR012',
    email: 'tuan.lm@erp.vn',
    pw: 'Tuan@123',
    name: 'Lê Minh Tuấn',
    role: 'employee',
    deptId: 'DEP004',
    title: 'Chuyên viên kiểm kho',
    phone: '0944556677',
    initials: 'MT',
    avatarColor: 'bg-orange-600 text-white',
    status: 'active',
    joinedAt: '2024-01-10'
  }
];

const generateCorporateUsers = (base: User[]): User[] => {
  const result = [...base];
  
  const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
  const middleNames = ['Văn', 'Thị', 'Minh', 'Hoàng', 'Thanh', 'Đức', 'Hữu', 'Kim', 'Ngọc', 'Quốc', 'Anh', 'Hà', 'Phương'];
  const firstNames = ['An', 'Bình', 'Chi', 'Dương', 'Đạt', 'Giang', 'Hà', 'Hải', 'Hùng', 'Huy', 'Hương', 'Khanh', 'Linh', 'Long', 'Mai', 'Minh', 'Nam', 'Phong', 'Quang', 'Sơn', 'Thảo', 'Thịnh', 'Trang', 'Trung', 'Tuấn', 'Vinh', 'Vũ', 'Yến', 'Trọng', 'Lâm', 'Khánh', 'Tú'];

  const deptsAllocation = [
    { id: 'DEP001', title: 'Chuyên viên Kế toán doanh nghiệp', target: 15 },
    { id: 'DEP002', title: 'Chuyên viên Tuyển dụng & Đào tạo', target: 22 },
    { id: 'DEP003', title: 'Giảng viên cấp cao Khoa học Máy tính / STEM', target: 58 },
    { id: 'DEP004', title: 'Kỹ thuật viên CSVC trường học & Lab bãi đỗ robot', target: 24 },
    { id: 'DEP005', title: 'Chuyên viên Đấu thầu & Mua sắm thiết bị', target: 18 },
    { id: 'DEP006', title: 'Kỹ sư Nghiên cứu R&D Robot Kit STEM', target: 60 },
    { id: 'DEP007', title: 'Trợ lý ban chỉ đạo điều hành Giám hiệu', target: 8 }
  ];

  deptsAllocation.forEach(da => {
    const currentCount = base.filter(u => u.deptId === da.id).length;
    const needToAdd = da.target - currentCount;
    for (let step = 0; step < needToAdd; step++) {
      const idNum = result.length + 1;
      const id = `USR${String(idNum).padStart(3, '0')}`;
      const seed = idNum;
      const lName = lastNames[seed % lastNames.length];
      const mName = middleNames[(seed * 7) % middleNames.length];
      const fName = firstNames[(seed * 13) % firstNames.length];
      const name = `${lName} ${mName} ${fName}`;
      const initials = `${lName[0]}${fName[0]}`;
      const email = `${fName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")}.${lName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")}${idNum}@erp.vn`;
      const phone = `09${Math.floor(10000000 + ((seed * 853213) % 90000000))}`;
      const colors = ['bg-blue-600', 'bg-indigo-600', 'bg-violet-600', 'bg-purple-600', 'bg-pink-600', 'bg-teal-600', 'bg-emerald-600', 'bg-orange-600', 'bg-cyan-600', 'bg-slate-600'];
      const avatarColor = `${colors[seed % colors.length]} text-white`;
      
      const joinedYear = 2021 + (seed % 4);
      const joinedMonth = String(1 + (seed % 12)).padStart(2, '0');
      const joinedDay = String(1 + (seed % 28)).padStart(2, '0');
      const joinedAt = `${joinedYear}-${joinedMonth}-${joinedDay}`;
      
      result.push({
        id,
        email,
        pw: 'Password@123',
        name,
        role: 'employee',
        deptId: da.id,
        title: da.title,
        phone,
        initials,
        avatarColor,
        status: 'active',
        joinedAt,
        dob: `1985-06-${String(1 + (seed % 28)).padStart(2, '0')}`,
        cccd: `00108500${String(1000 + idNum)}`,
        bankAccount: `${Math.floor(211100000 + ((seed * 43213) % 800000000))} - Vietcombank`
      });
    }
  });

  return result;
};

export const USERS_DB: User[] = generateCorporateUsers(INITIAL_USERS_DB);

export const DEPARTMENTS_DB: Department[] = [
  {
    id: 'DEP001',
    name: 'Phòng Tài chính - Kế toán',
    headName: 'Phạm Thanh Thủy',
    headId: 'USR002',
    headcount: 15,
    costCenter: 'CST-FIN',
    budget: 8500000000,
    budgetUsed: 4250000000
  },
  {
    id: 'DEP002',
    name: 'Phòng Nhân sự & Đào tạo',
    headName: 'Hà Minh Nhật',
    headId: 'USR003',
    headcount: 22,
    costCenter: 'CST-HRD',
    budget: 12000000000,
    budgetUsed: 6200000000
  },
  {
    id: 'DEP003',
    name: 'Khoa Công nghệ thông tin & Lab',
    headName: 'Đặng Việt Anh',
    headId: 'USR004',
    headcount: 58,
    costCenter: 'CST-ITL',
    budget: 35000000000,
    budgetUsed: 18400000000
  },
  {
    id: 'DEP004',
    name: 'Phòng Thiết bị & Cơ sở vật chất',
    headName: 'Trần Quốc Bảo',
    headId: 'USR005',
    headcount: 24,
    costCenter: 'CST-LOG',
    budget: 15000000000,
    budgetUsed: 7800000000
  },
  {
    id: 'DEP005',
    name: 'Phòng Mua sắm & Thiết bị học tập',
    headName: 'Vũ Thị Mai',
    headId: 'USR006',
    headcount: 18,
    costCenter: 'CST-PRC',
    budget: 25000000000,
    budgetUsed: 14500000000
  },
  {
    id: 'DEP006',
    name: 'Trung tâm Phát triển Robot & STEM',
    headName: 'Lê Hoàng Long',
    headId: 'USR007',
    headcount: 60,
    costCenter: 'CST-RBT',
    budget: 40000000000,
    budgetUsed: 22800000000
  },
  {
    id: 'DEP007',
    name: 'Ban Giám Hiệu',
    headName: 'Nguyễn Tiến Dũng',
    headId: 'USR001',
    headcount: 8,
    costCenter: 'CST-EXEC',
    budget: 20000000000,
    budgetUsed: 11200000000
  }
];

// 30 days of attendance for employees in May 2026 (Mon-Fri)
export const ATTENDANCE_DB: AttendanceRecord[] = [
  { id: 'ATT001', employeeId: 'USR001', employeeName: 'Nguyễn Tiến Dũng', date: '2026-05-22', checkIn: '07:55', checkOut: '17:30', status: 'present', overtime: 0 },
  { id: 'ATT002', employeeId: 'USR002', employeeName: 'Phạm Thanh Thủy', date: '2026-05-22', checkIn: '08:02', checkOut: '17:45', status: 'present', overtime: 0 },
  { id: 'ATT003', employeeId: 'USR003', employeeName: 'Hà Minh Nhật', date: '2026-05-22', checkIn: '08:15', checkOut: '17:35', status: 'late', overtime: 0, note: 'Tắc đường hầm Kim Liên' },
  { id: 'ATT004', employeeId: 'USR004', employeeName: 'Đặng Việt Anh', date: '2026-05-22', checkIn: '07:45', checkOut: '18:50', status: 'present', overtime: 1 },
  { id: 'ATT005', employeeId: 'USR005', employeeName: 'Trần Quốc Bảo', date: '2026-05-22', checkIn: '08:00', checkOut: '17:30', status: 'present', overtime: 0 },
  { id: 'ATT006', employeeId: 'USR006', employeeName: 'Vũ Thị Mai', date: '2026-05-22', checkIn: '08:30', checkOut: '17:30', status: 'late', overtime: 0 },
  { id: 'ATT007', employeeId: 'USR007', employeeName: 'Lê Hoàng Long', date: '2026-05-22', checkIn: '07:50', checkOut: '19:15', status: 'present', overtime: 2 },
  { id: 'ATT008', employeeId: 'USR008', employeeName: 'Nguyễn Văn Đạt', date: '2026-05-22', checkIn: '08:05', checkOut: '17:30', status: 'late', overtime: 0 },
  { id: 'ATT009', employeeId: 'USR009', employeeName: 'Lê Thu Giang', date: '2026-05-22', checkIn: '08:00', checkOut: '17:40', status: 'present', overtime: 0 },
  { id: 'ATT010', employeeId: 'USR010', employeeName: 'Hoàng Danh Nam', date: '2026-05-22', checkIn: '07:58', checkOut: '17:30', status: 'present', overtime: 0 },
  { id: 'ATT011', employeeId: 'USR011', employeeName: 'Nguyễn Thanh Hà', date: '2026-05-22', checkIn: '08:00', checkOut: '17:30', status: 'wfh', overtime: 0, note: 'Đã duyệt làm WFH' },
  { id: 'ATT012', employeeId: 'USR012', employeeName: 'Lê Minh Tuấn', date: '2026-05-22', checkIn: '00:00', checkOut: '00:00', status: 'leave', overtime: 0, note: 'Nghỉ phép năm' },

  // Prev days
  { id: 'ATT013', employeeId: 'USR001', employeeName: 'Nguyễn Tiến Dũng', date: '2026-05-21', checkIn: '08:00', checkOut: '17:30', status: 'present', overtime: 0 },
  { id: 'ATT014', employeeId: 'USR002', employeeName: 'Phạm Thanh Thủy', date: '2026-05-21', checkIn: '07:50', checkOut: '17:30', status: 'present', overtime: 0 },
  { id: 'ATT015', employeeId: 'USR003', employeeName: 'Hà Minh Nhật', date: '2026-05-21', checkIn: '07:55', checkOut: '17:30', status: 'present', overtime: 0 },
  { id: 'ATT016', employeeId: 'USR004', employeeName: 'Đặng Việt Anh', date: '2026-05-21', checkIn: '07:40', checkOut: '19:00', status: 'present', overtime: 1.5 },
  { id: 'ATT017', employeeId: 'USR005', employeeName: 'Trần Quốc Bảo', date: '2026-05-21', checkIn: '07:58', checkOut: '17:30', status: 'present', overtime: 0 },
  { id: 'ATT018', employeeId: 'USR006', employeeName: 'Vũ Thị Mai', date: '2026-05-21', checkIn: '08:05', checkOut: '17:30', status: 'late', overtime: 0 },
  { id: 'ATT019', employeeId: 'USR007', employeeName: 'Lê Hoàng Long', date: '2026-05-21', checkIn: '07:50', checkOut: '18:00', status: 'present', overtime: 0 },
  { id: 'ATT020', employeeId: 'USR008', employeeName: 'Nguyễn Văn Đạt', date: '2026-05-21', checkIn: '07:55', checkOut: '17:30', status: 'present', overtime: 0 }
];

export const PAYROLL_DB: PayrollRecord[] = [
  {
    id: 'PAY001',
    employeeId: 'USR001',
    employeeName: 'Nguyễn Tiến Dũng',
    period: '05/2026',
    basicSalary: 45000000,
    allowances: { position: 10000000, lunch: 1000000, gas: 1500000 },
    otHours: 0,
    bonus: 5000000,
    deductions: 0,
    bhxh: 3600000,
    bhyt: 675000,
    bhtn: 450000,
    tncn: 5450000,
    netSalary: 52325000,
    status: 'calculated'
  },
  {
    id: 'PAY002',
    employeeId: 'USR002',
    employeeName: 'Phạm Thanh Thủy',
    period: '05/2026',
    basicSalary: 32000000,
    allowances: { position: 6000000, lunch: 1000000, gas: 1000000 },
    otHours: 0,
    bonus: 2000000,
    deductions: 0,
    bhxh: 2560000,
    bhyt: 480000,
    bhtn: 320000,
    tncn: 2840000,
    netSalary: 35800000,
    status: 'calculated'
  },
  {
    id: 'PAY003',
    employeeId: 'USR003',
    employeeName: 'Hà Minh Nhật',
    period: '05/2026',
    basicSalary: 28000000,
    allowances: { position: 5000000, lunch: 1000000, gas: 1000000 },
    otHours: 0,
    bonus: 1500000,
    deductions: 0,
    bhxh: 2240000,
    bhyt: 420000,
    bhtn: 280000,
    tncn: 2120000,
    netSalary: 31440000,
    status: 'calculated'
  },
  {
    id: 'PAY004',
    employeeId: 'USR004',
    employeeName: 'Đặng Việt Anh',
    period: '05/2026',
    basicSalary: 35000000,
    allowances: { position: 6000000, lunch: 1000000, gas: 1000000 },
    otHours: 12,
    bonus: 4000000,
    deductions: 0,
    bhxh: 2800000,
    bhyt: 525000,
    bhtn: 350000,
    tncn: 3450000,
    netSalary: 42875000,
    status: 'calculated'
  },
  {
    id: 'PAY005',
    employeeId: 'USR008',
    employeeName: 'Nguyễn Văn Đạt',
    period: '05/2026',
    basicSalary: 18000000,
    allowances: { position: 1500000, lunch: 1000000, gas: 800000 },
    otHours: 4,
    bonus: 500000,
    deductions: 0,
    bhxh: 1440000,
    bhyt: 270000,
    bhtn: 180000,
    tncn: 450000,
    netSalary: 19460000,
    status: 'calculated'
  },
  // Paid history
  {
    id: 'PAY006',
    employeeId: 'USR008',
    employeeName: 'Nguyễn Văn Đạt',
    period: '04/2026',
    basicSalary: 18000000,
    allowances: { position: 1500000, lunch: 1000000, gas: 800000 },
    otHours: 10,
    bonus: 1000000,
    deductions: 200000,
    bhxh: 1440000,
    bhyt: 270000,
    bhtn: 180000,
    tncn: 520000,
    netSalary: 19740000,
    status: 'paid'
  }
];

export const LEAVE_DB: LeaveRequest[] = [
  {
    id: 'LR001',
    employeeId: 'USR012',
    employeeName: 'Lê Minh Tuấn',
    type: 'annual',
    from: '2026-05-22',
    to: '2026-05-22',
    days: 1,
    reason: 'Giải quyết việc riêng gia đình ở quê',
    status: 'approved',
    approverId: 'USR003',
    approverNote: 'Đồng ý nghỉ. Đã bàn giao chìa khóa kho cho trưởng phòng.'
  },
  {
    id: 'LR002',
    employeeId: 'USR008',
    employeeName: 'Nguyễn Văn Đạt',
    type: 'sick',
    from: '2026-05-26',
    to: '2026-05-27',
    days: 2,
    reason: 'Khám răng hàm mặt định kỳ và tiểu phẫu nhổ răng khôn',
    status: 'pending'
  },
  {
    id: 'LR003',
    employeeId: 'USR011',
    employeeName: 'Nguyễn Thanh Hà',
    type: 'personal',
    from: '2026-05-29',
    to: '2026-05-29',
    days: 1,
    reason: 'Đưa con đi tiêm chủng vaccine 6-trong-1',
    status: 'pending'
  }
];

export const RECRUITMENT_DB: RecruitmentJob[] = [
  {
    id: 'JOB001',
    title: 'Giảng viên Lập trình Frontend (React)',
    deptId: 'DEP003',
    count: 2,
    deadline: '2026-06-15',
    status: 'open',
    description: 'Giảng dạy các khóa học Front-end nâng cao, hướng dẫn sinh viên xây dựng đồ án thực tế.',
    applicantsCount: 8
  },
  {
    id: 'JOB002',
    title: 'Chuyên viên Phát triển Nội dung STEM/Robotics',
    deptId: 'DEP006',
    count: 1,
    deadline: '2026-05-31',
    status: 'open',
    description: 'Thiết kế giáo án STEM, chế tạo Robot Kit phục vụ cho các trường học đối tác.',
    applicantsCount: 14
  }
];

export const CANDIDATES_DB: Candidate[] = [
  {
    id: 'CAN001',
    jobId: 'JOB001',
    jobTitle: 'Giảng viên Lập trình Frontend (React)',
    name: 'Phùng Hoàng Nam',
    email: 'namphung@gmail.com',
    phone: '0981122334',
    source: 'TopCV',
    stage: 'interview',
    rating: 4,
    interviewDate: '2026-05-25 14:00',
    notes: 'Kỹ năng sư phạm tốt, có 3 năm kinh nghiệm lập trình ReactJS.'
  },
  {
    id: 'CAN002',
    jobId: 'JOB001',
    jobTitle: 'Giảng viên Lập trình Frontend (React)',
    name: 'Đoàn Thanh Sơn',
    email: 'sondoan@gmail.com',
    phone: '0904433221',
    source: 'LinkedIn',
    stage: 'screening',
    rating: 3,
    notes: 'Hồ sơ đạt tiêu chuẩn, đang sắp xếp lịch phỏng vấn sơ loại.'
  },
  {
    id: 'CAN003',
    jobId: 'JOB002',
    jobTitle: 'Chuyên viên Phát triển Nội dung STEM/Robotics',
    name: 'Vũ Hồng Hải',
    email: 'haivuhong@outlook.com',
    phone: '0966554433',
    source: 'Facebook Ad',
    stage: 'offer',
    rating: 5,
    interviewDate: '2026-05-18 09:30',
    notes: 'Cực kỳ sáng tạo, có kinh nghiệm chế tạo linh kiện Arduino.'
  }
];

export const GL_ACCOUNTS_DB: GLAccount[] = [
  { code: '1111', name: 'Tiền mặt tại quỹ', type: 'asset', balance: 520000000 },
  { code: '1121', name: 'Tiền gửi ngân hàng (VND)', type: 'asset', balance: 8430000000 },
  { code: '131', name: 'Phải thu của khách hàng (Học phí)', type: 'asset', balance: 1450000000 },
  { code: '152', name: 'Nguyên liệu, vật liệu tồn kho', type: 'asset', balance: 1120000000 },
  { code: '156', name: 'Học liệu & Robot Kit thành phẩm', type: 'asset', balance: 1980000000 },
  { code: '211', name: 'Tài sản cố định hữu hình - Máy móc Lab', type: 'asset', balance: 12500000000 },
  { code: '331', name: 'Phải trả cho người bán (Vật tư)', type: 'liability', balance: 870000000 },
  { code: '334', name: 'Phải trả người lao động (Lương)', type: 'liability', balance: 125000000 },
  { code: '338', name: 'Phải trả, phải nộp khác (BHXH)', type: 'liability', balance: 45000000 },
  { code: '411', name: 'Vốn đầu tư của chủ sở hữu', type: 'equity', balance: 21500000000 },
  { code: '511', name: 'Doanh thu học phí & cung cấp dịch vụ', type: 'revenue', balance: 18500000000 },
  { code: '642', name: 'Chi phí quản lý doanh nghiệp (Trường)', type: 'expense', balance: 3450000000 }
];

export const JOURNAL_ENTRIES_DB: JournalEntry[] = [
  {
    id: 'JE001',
    date: '2026-05-20',
    ref: 'PKN-05-021',
    description: 'Thanh toán tiền điện mạng khu IT Lab và khối Văn phòng',
    lines: [
      { accountCode: '642', accountName: 'Chi phí quản lý doanh nghiệp', debit: 45000000, credit: 0 },
      { accountCode: '1121', accountName: 'Tiền gửi ngân hàng (VND)', debit: 0, credit: 45000000 }
    ],
    creator: 'Hoàng Danh Nam',
    status: 'posted'
  },
  {
    id: 'JE002',
    date: '2026-05-21',
    ref: 'PKN-05-022',
    description: 'Nhập kho lô vật liệu bo mạch STEM Arduino số 05',
    lines: [
      { accountCode: '152', accountName: 'Nguyên liệu, vật liệu tồn kho', debit: 120000000, credit: 0 },
      { accountCode: '331', accountName: 'Phải trả cho người bán', debit: 0, credit: 120000000 }
    ],
    creator: 'Hoàng Danh Nam',
    status: 'posted'
  }
];

export const INVOICES_DB: Invoice[] = [
  // Accounts receivable (Bán hàng/Thu phí)
  {
    id: 'INV001',
    number: 'HD-2026-0012',
    partnerName: 'Phụ huynh Nguyễn Minh Khải (Khóa STEM)',
    partnerType: 'customer',
    date: '2026-05-15',
    dueDate: '2026-06-15',
    items: [
      { name: 'Học phí Khóa Lập Trình Python Robot 3 tháng', qty: 1, price: 12000000, taxRate: 0 },
      { name: 'Bộ STEM Kit MCNA-M1 Smart Car', qty: 1, price: 2500000, taxRate: 10 }
    ],
    total: 14750000,
    paid: 14750000,
    status: 'paid'
  },
  {
    id: 'INV002',
    number: 'HD-2026-0013',
    partnerName: 'Trường THCS Thực Nghiệm (Đối tác STEM)',
    partnerType: 'customer',
    date: '2026-05-20',
    dueDate: '2026-06-20',
    items: [
      { name: 'Hợp đồng Tư vấn và Setup Phòng STEM Lab THCS', qty: 1, price: 180000000, taxRate: 10 }
    ],
    total: 198000000,
    paid: 50000000,
    status: 'partial'
  },
  {
    id: 'INV003',
    number: 'HD-2026-0014',
    partnerName: 'Đơn vị Liên kết Đào tạo Arena-Tech',
    partnerType: 'customer',
    date: '2026-04-10',
    dueDate: '2026-05-10',
    items: [
      { name: 'Học bổng và giáo trình Công nghệ đồ họa', qty: 10, price: 8000000, taxRate: 0 }
    ],
    total: 80000000,
    paid: 0,
    status: 'overdue'
  },
  // Accounts payable (Mua hàng/Công nợ trả)
  {
    id: 'INV004',
    number: 'HDM-2026-101',
    partnerName: 'Nhà phân phối Linh kiện điện tử Sao Việt',
    partnerType: 'supplier',
    date: '2026-05-18',
    dueDate: '2026-06-18',
    items: [
      { name: 'Cảm biến siêu âm HC-SR04 STEM', qty: 300, price: 45000, taxRate: 10 },
      { name: 'Bo mạch chính Uno R3 MCNA Edition', qty: 200, price: 180000, taxRate: 10 }
    ],
    total: 54450000,
    paid: 54450000,
    status: 'paid',
    matching: { po: true, grn: true, invoice: true }
  },
  {
    id: 'INV005',
    number: 'HDM-2026-102',
    partnerName: 'Đơn vị Cung ứng CNTT Protech Hà Nội',
    partnerType: 'supplier',
    date: '2026-05-22',
    dueDate: '2026-06-22',
    items: [
      { name: 'Màn hình máy tính Dell UltraSharp 24 inch Lab', qty: 15, price: 5500000, taxRate: 10 }
    ],
    total: 90750000,
    paid: 0,
    status: 'unpaid',
    matching: { po: true, grn: true, invoice: true }
  }
];

export const BANK_ACCOUNTS_DB: BankAccount[] = [
  {
    id: 'BANK001',
    bankName: 'Vietcombank - CN Ba Đình',
    accountNo: '0011001234567',
    balance: 5420000000,
    transactions: [
      { id: 'TX001', date: '2026-05-22', description: 'Rút tiền gửi ngân hàng thanh toán tạm ứng Công tác phí', debit: 0, credit: 15000000, balance: 5420000000 },
      { id: 'TX002', date: '2026-05-21', description: 'Trường THCS Thực Nghiệm chuyển khoản đặt cọc đợt 1', debit: 50000000, credit: 0, balance: 5435000000 }
    ]
  },
  {
    id: 'BANK002',
    bankName: 'Techcombank - CN Cầu Giấy',
    accountNo: '190345678901',
    balance: 3010000000,
    transactions: [
      { id: 'TX003', date: '2026-05-18', description: 'Nhận chuyển khoản Học phí lớp Python Coding Nguyễn Minh Khải', debit: 14750000, credit: 0, balance: 3010000000 }
    ]
  }
];

export const PRODUCTS_DB: Product[] = [
  {
    id: 'PRD001',
    sku: 'STEM-UNO-R3',
    name: 'Bo mạch chủ Arduino Uno R3 STEM Pro',
    category: 'Linh kiện điện tử',
    unit: 'Chiếc',
    costPrice: 180000,
    salePrice: 320000,
    stock: 245,
    minStock: 50,
    maxStock: 1000,
    location: 'Khu A - Kệ 02 - Tầng 1',
    supplierName: 'Nhà phân phối Linh kiện điện tử Sao Việt',
    barcode: '893601550123'
  },
  {
    id: 'PRD002',
    sku: 'STEM-KIT-CAR1',
    name: 'Bộ STEM Kit Thiết kế Xe Tự Hành Thông Minh',
    category: 'STEM Kit Thành phẩm',
    unit: 'Hộp',
    costPrice: 1200000,
    salePrice: 2500000,
    stock: 84,
    minStock: 20,
    maxStock: 200,
    location: 'Khu B - Kệ 01 - Tầng 2',
    supplierName: 'Tự sản xuất / Lắp ráp',
    barcode: '893601550124'
  },
  {
    id: 'PRD003',
    sku: 'LAB-PC-DELL',
    name: 'Màn hình Dell UltraSharp U2422H chuyên Lab',
    category: 'Thiết bị CNTT Lab',
    unit: 'Chiếc',
    costPrice: 5000000,
    salePrice: 6200000,
    stock: 15,
    minStock: 5,
    maxStock: 50,
    location: 'Phòng IT Lab 01',
    supplierName: 'Đơn vị Cung ứng CNTT Protech Hà Nội',
    barcode: '893601550125'
  },
  {
    id: 'PRD004',
    sku: 'STEM-CHASSIS-3WD',
    name: 'Khung Xe Mica 3 Bánh STEM Car',
    category: 'Cơ khí / Mica',
    unit: 'Chiếc',
    costPrice: 65000,
    salePrice: 120000,
    stock: 8,
    minStock: 30,
    maxStock: 500,
    location: 'Khu A - Kệ 04 - Tầng 1',
    supplierName: 'Xưởng CNC nhựa Sao Mai',
    barcode: '893601550126'
  },
  {
    id: 'PRD005',
    sku: 'STEM-SENSOR-US',
    name: 'Cảm biến siêu âm HC-SR04',
    category: 'Linh kiện điện tử',
    unit: 'Chiếc',
    costPrice: 45000,
    salePrice: 85000,
    stock: 450,
    minStock: 20,
    maxStock: 1000,
    location: 'Khu A - Kệ 02 - Tầng 2',
    supplierName: 'Nhà phân phối Linh kiện điện tử Sao Việt',
    barcode: '893601550127'
  }
];

export const STOCK_TRANSACTIONS_DB: StockTransaction[] = [
  {
    id: 'ST001',
    type: 'in',
    date: '2026-05-18',
    productName: 'Cảm biến siêu âm HC-SR04',
    sku: 'STEM-SENSOR-US',
    qty: 300,
    warehouse: 'Kho Vật tư trung tâm',
    ref: 'PNK-2026-0041',
    operator: 'Trần Quốc Bảo'
  },
  {
    id: 'ST002',
    type: 'out',
    date: '2026-05-22',
    productName: 'Bo mạch chủ Arduino Uno R3 STEM Pro',
    sku: 'STEM-UNO-R3',
    qty: 40,
    warehouse: 'Kho Vật tư trung tâm',
    ref: 'PXK-2026-0012',
    operator: 'Trần Quốc Bảo'
  }
];

export const VENDORS_DB: Vendor[] = [
  {
    id: 'VEN001',
    name: 'Nhà phân phối Linh kiện điện tử Sao Việt',
    code: 'NCC-SAOVIET',
    category: 'Linh kiện Điện tử',
    phone: '0243.999.8888',
    email: 'sales@linhkiensaoviet.vn',
    taxCode: '0102030405',
    address: 'Số 15, Ngách 2, Ngõ 102 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội',
    onTimeDeliveryRate: 96.5,
    qualityScore: 92
  },
  {
    id: 'VEN002',
    name: 'Đơn vị Cung ứng CNTT Protech Hà Nội',
    code: 'NCC-PROTECH',
    category: 'Thiết bị Giáo dục & CNTT',
    phone: '0243.555.6666',
    email: 'info@protechhanoi.com.vn',
    taxCode: '0109988776',
    address: 'Tòa nhà Protech, Lô 12 Khu đô thị mới Mỹ Đình 2, Nam Từ Liêm, Hà Nội',
    onTimeDeliveryRate: 98,
    qualityScore: 95
  }
];

export const PURCHASE_ORDERS_DB: PurchaseOrder[] = [
  {
    id: 'PO001',
    number: 'PO-2026-015',
    vendorId: 'VEN001',
    vendorName: 'Nhà phân phối Linh kiện điện tử Sao Việt',
    date: '2026-05-15',
    deliveryDate: '2026-05-18',
    items: [
      { productId: 'PRD005', name: 'Cảm biến siêu âm HC-SR04', qty: 300, price: 45000 },
      { productId: 'PRD001', name: 'Bo mạch chủ Arduino Uno R3 STEM Pro', qty: 200, price: 180000 }
    ],
    total: 49500000,
    status: 'received',
    receivedQty: 500
  },
  {
    id: 'PO002',
    number: 'PO-2026-016',
    vendorId: 'VEN002',
    vendorName: 'Đơn vị Cung ứng CNTT Protech Hà Nội',
    date: '2026-05-22',
    deliveryDate: '2026-05-25',
    items: [
      { productId: 'PRD003', name: 'Màn hình Dell UltraSharp U2422H chuyên Lab', qty: 15, price: 5000000 }
    ],
    total: 75000000,
    status: 'approved',
    receivedQty: 0
  }
];

export const BOMS_DB: BOM[] = [
  {
    id: 'BOM001',
    productId: 'PRD002',
    productName: 'Bộ STEM Kit Thiết kế Xe Tự Hành Thông Minh',
    components: [
      { productId: 'PRD001', name: 'Bo mạch chủ Arduino Uno R3 STEM Pro', qty: 1, unit: 'Chiếc', cost: 180000 },
      { productId: 'PRD004', name: 'Khung Xe Mica 3 Bánh STEM Car', qty: 1, unit: 'Chiếc', cost: 65000 },
      { productId: 'PRD005', name: 'Cảm biến siêu âm HC-SR04', qty: 1, unit: 'Chiếc', cost: 45000 },
      { productId: 'MOCK-BAT', name: 'Hộp pin lithium 18650 & mạch sạc xả', qty: 1, unit: 'Bộ', cost: 150000 }
    ],
    totalCost: 4400000
  }
];

export const WORK_ORDERS_DB: WorkOrder[] = [
  {
    id: 'WO001',
    number: 'LSX-2026-008',
    productId: 'PRD002',
    productName: 'Bộ STEM Kit Thiết kế Xe Tự Hành Thông Minh',
    qty: 50,
    bomId: 'BOM001',
    plannedStart: '2026-05-20',
    plannedEnd: '2026-05-25',
    actualStart: '2016-05-20',
    stage: 'producing',
    assignedTo: 'Lê Hoàng Long',
    progress: 75
  },
  {
    id: 'WO002',
    number: 'LSX-2026-009',
    productId: 'PRD002',
    productName: 'Bộ STEM Kit Thiết kế Xe Tự Hành Thông Minh',
    qty: 100,
    bomId: 'BOM001',
    plannedStart: '2026-05-28',
    plannedEnd: '2026-06-05',
    stage: 'planned',
    assignedTo: 'Lê Hoàng Long',
    progress: 0
  }
];

export const MACHINES_DB: Machine[] = [
  { id: 'MCH001', name: 'Máy khò hàn dán chip SMD Lab 02', code: 'MAY-HAN-SMD', status: 'running', oee: 88.5 },
  { id: 'MCH002', name: 'Máy cắt CNC Mica Chassis STEM Car', code: 'MAY-CNC-MICA', status: 'running', oee: 92.0, maintenanceSchedule: '2026-06-15' },
  { id: 'MCH003', name: 'Thiết bị in 3D mô hình Robot vỏ nhựa', code: 'MAY-IN-3D', status: 'maintenance', oee: 70.4, maintenanceSchedule: 'Hôm nay 14:00' },
  { id: 'MCH004', name: 'Máy kiểm thử xung dao động mạch Arduino', code: 'MAY-KT-XUNG', status: 'idle', oee: 85.0 }
];

export const QC_RESULTS_DB: QCResult[] = [
  { id: 'QC001', woNumber: 'LSX-2026-008', productName: 'Bộ STEM Kit Thiết kế Xe Tự Hành Thông Minh', date: '2026-05-22', inspectorName: 'Lê Hoàng Long', qtyInspected: 20, qtyPassed: 19, qtyFailed: 1, status: 'pass' }
];

export const PROJECTS_DB: Project[] = [
  { id: 'PRJ001', name: 'Hệ thống Quản lý Đào tạo MCNA (LMS Portal)', client: 'Nội bộ MCNA School', status: 'active', progress: 68, deadline: '2026-07-31', budget: 1200000000, spent: 540000000 },
  { id: 'PRJ002', name: 'Xây dựng Giáo trình STEM K12 chuẩn hóa Bộ Giáo Dục', client: 'Phân ban STEM & Đào Tạo', status: 'active', progress: 42, deadline: '2026-09-30', budget: 850000000, spent: 310000000 },
  { id: 'PRJ003', name: 'Ứng dụng Học tiếng Anh tương tác AI Coach', client: 'Trung tâm Ngoại ngữ liên kết', status: 'planning', progress: 5, deadline: '2026-12-15', budget: 1500000000, spent: 0 }
];

export const SPRINTS_DB: Sprint[] = [
  { id: 'SPR001', name: 'Sprint 14: Grading module & Quiz', projectId: 'PRJ001', projectName: 'Hệ thống Quản lý Đào tạo MCNA (LMS Portal)', startDate: '2026-05-15', endDate: '2026-05-29', status: 'active' },
  { id: 'SPR002', name: 'Sprint 13: Interactive Board & Auth', projectId: 'PRJ001', projectName: 'Hệ thống Quản lý Đào tạo MCNA (LMS Portal)', startDate: '2026-05-01', endDate: '2026-05-14', status: 'past' }
];

export const TASKS_DB: Task[] = [
  { id: 'TSK001', title: 'Tạo UI Bảng điểm sinh viên lớp Python Coding', projectId: 'PRJ001', projectName: 'Hệ thống Quản lý Đào tạo MCNA', assigneeName: 'Nguyễn Văn Đạt', assigneeId: 'USR008', priority: 'high', stage: 'inprogress', dueDate: '2026-05-25', storyPoints: 5, tags: ['frontend', 'feature'] },
  { id: 'TSK002', title: 'Viết API chấm điểm trắc nghiệm tự động bằng AI', projectId: 'PRJ001', projectName: 'Hệ thống Quản lý Đào tạo MCNA', assigneeName: 'Đặng Việt Anh', assigneeId: 'USR004', priority: 'critical', stage: 'review', dueDate: '2026-05-24', storyPoints: 8, tags: ['backend', 'ai'] },
  { id: 'TSK003', title: 'Tích hợp thanh toán học phí qua ví điện tử MoMo', projectId: 'PRJ001', projectName: 'Hệ thống Quản lý Đào tạo MCNA', assigneeName: 'Nguyễn Văn Đạt', assigneeId: 'USR008', priority: 'medium', stage: 'todo', dueDate: '2026-05-28', storyPoints: 5, tags: ['payment', 'integration'] },
  { id: 'TSK004', title: 'Fix bug rò rỉ bộ nhớ màn hình tương tác webcam WebRTC', projectId: 'PRJ001', projectName: 'Hệ thống Quản lý Đào tạo MCNA', assigneeName: 'Nguyễn Văn Đạt', assigneeId: 'USR008', priority: 'critical', stage: 'done', dueDate: '2026-05-18', storyPoints: 3, tags: ['bug', 'hotfix'] }
];

export const IT_ASSETS_DB: ITAsset[] = [
  { id: 'AST001', name: 'Server Dell PowerEdge R750 Lab IT', type: 'Server Vật lý', serial: 'DELL-SRV-R750-X1', assignedTo: 'Đặng Việt Anh', purchaseDate: '2023-11-20', warrantyUntil: '2026-11-20', status: 'active' },
  { id: 'AST002', name: 'Laptop ASUS ROG Strix - GV01 IT Lab', type: 'Laptop đồ họa', serial: 'ASUS-ROG-S1029', assignedTo: 'Nguyễn Văn Đạt', purchaseDate: '2024-02-15', warrantyUntil: '2026-02-15', status: 'active' },
  { id: 'AST003', name: 'Router Cisco Catalyst 9300 Lab CNTT', type: 'Thiết bị Mạng', serial: 'CSCO-SW-9300-24P', assignedTo: 'Đặng Việt Anh', purchaseDate: '2023-05-10', warrantyUntil: '2026-05-10', status: 'active' }
];

export const TICKETS_DB: HelpdeskTicket[] = [
  { id: 'HDK001', title: 'Máy tính Giảng đường 302 không khởi động được', employeeName: 'Hà Minh Nhật', category: 'hardware', priority: 'high', status: 'inprogress', createdAt: '2026-05-23 08:30' },
  { id: 'HDK002', title: 'Yêu cầu cấp quyền truy cập repository gitlab nội bộ', employeeName: 'Nguyễn Văn Đạt', category: 'access', priority: 'medium', status: 'resolved', createdAt: '2026-05-22 10:15' }
];

export const NOTIFICATIONS_DB: Notification[] = [
  { id: 'NTF001', module: 'finance', title: 'Đề xuất mua sắm mới cần duyệt', body: 'Phòng Thiết bị vừa gửi một đề xuất mua sắm màn hình máy tính Dell 75 triệu.', time: '5 phút trước', unread: true },
  { id: 'NTF002', module: 'hr', title: 'Đăng ký nghỉ phép chờ phê duyệt', body: 'Nhân viên Nguyễn Văn Đạt vừa gửi yêu cầu nghỉ phép 2 ngày nhổ răng khôn.', time: '1 tiếng trước', unread: true },
  { id: 'NTF003', module: 'warehouse', title: 'Cảnh báo mức tồn kho tối thiểu', body: 'Sản phẩm Khung Xe Mica 3 Bánh STEM Car chỉ còn dưới mức tối thiểu (8 cái).', time: '2 tiếng trước', unread: true },
  { id: 'NTF004', module: 'it', title: 'Task phân công mới trong Sprint', body: 'Trưởng phòng IT Đặng Việt Anh đã giao cho bạn task "UI Bảng điểm sinh viên Python".', time: 'Hôm qua', unread: false }
];

export const ANNOUNCEMENTS_DB: Announcement[] = [
  { id: 'ANC001', authorName: 'Nguyễn Tiến Dũng', authorRole: 'Hiệu trưởng', time: '2026-05-20', title: 'Thông báo về việc tổ chức Ngày hội Khoa học STEM & Robotics 2026', body: 'Toàn bộ khối IT Lab và Robot STEM chuẩn bị học liệu, Kit xe đua tự hành thông minh để trình diễn đón tiếp đoàn Sở Giáo dục Hà Nội.', priority: 'critical' },
  { id: 'ANC002', authorName: 'Hà Minh Nhật', authorRole: 'Trưởng phòng Nhân sự', time: '2026-05-15', title: 'Cập nhật nội quy chấm công & chế độ OT mới áp dụng từ tháng 6', body: 'Chi tiết nhân viên vui lòng tham khảo file đính kèm trên driver. Hệ thống ERP sẽ tự động tính toán hệ số OT tăng thêm 150% - 200%.', priority: 'important' }
];

export const AUDIT_LOG_DB: AuditLog[] = [
  { id: 'AD001', time: '2026-05-23 09:12', userName: 'Hà Minh Nhật', role: 'hr', action: 'CREATE_LEAVE_POLICY', module: 'Nhân sự', record: 'Cập nhật hạn ngạch nghỉ phép năm 12 ngày', ip: '192.168.1.15', status: 'success' },
  { id: 'AD002', time: '2026-05-23 09:05', userName: 'Phạm Thanh Thủy', role: 'finance', action: 'POST_JOURNAL_ENTRY', module: 'Tài chính', record: 'Bút toán thanh toán tiền điện PKN-05-021', ip: '118.70.147.22', status: 'success' }
];

// SVG charts revenue/expense metrics
export const REVENUE_MONTHLY = [
  { month: 'T1', revenue: 1200000000, expense: 950000000 },
  { month: 'T2', revenue: 1450000000, expense: 1100000000 },
  { month: 'T3', revenue: 1750000000, expense: 1250000000 },
  { month: 'T4', revenue: 1900000000, expense: 1350000000 },
  { month: 'T5', revenue: 2350000000, expense: 1450000000 }, // Current month
  { month: 'T6', revenue: 1800000000, expense: 1300000000 },
  { month: 'T7', revenue: 2100000000, expense: 1400000000 },
  { month: 'T8', revenue: 2200000000, expense: 1500000000 },
  { month: 'T9', revenue: 2500000000, expense: 1600000000 },
  { month: 'T10', revenue: 2700000000, expense: 1700000000 },
  { month: 'T11', revenue: 2850000000, expense: 1750000000 },
  { month: 'T12', revenue: 3200000000, expense: 1950000000 }
];

export const EXPENSE_BY_DEPT = [
  { label: 'IT Lab & Thiết bị', value: 35, color: '#7c3aed' },
  { label: 'Sản xuất Robot Kit', value: 25, color: '#dc2626' },
  { label: 'Vận hành VP & Lương', value: 20, color: '#2563eb' },
  { label: 'Mua sắm Linh kiện', value: 12, color: '#0891b2' },
  { label: 'Marketing-Tuyển sinh', value: 8, color: '#16a34a' }
];
