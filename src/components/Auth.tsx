import React, { useState, useRef, useEffect } from 'react';
import { Role, User } from '../types';
import { USERS_DB } from '../mockData';
import { KeyRound, ShieldAlert, Check, Eye, EyeOff, UserCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
  users: User[];
  onAddNewUser: (newUser: User) => void;
  toast: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess, users, onAddNewUser, toast }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Login States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // Register state (4-step wizard)
  const [regStep, setRegStep] = useState(1);
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Nam',
    cccd: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: 'MCNA Technology School',
    deptId: 'DEP003',
    title: '',
    joinedAt: new Date().toISOString().split('T')[0],
    contractType: 'Full-time'
  });

  // Forgot password
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timerCount, setTimerCount] = useState(60);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Refs for OTP boxes
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    let interval: any;
    if (mode === 'forgot' && forgotStep === 2 && timerCount > 0) {
      interval = setInterval(() => {
        setTimerCount((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, forgotStep, timerCount]);

  // Demo accounts
  const demoAccounts = [
    { label: '👑 CEO', email: 'ceo@erp.vn', pw: 'Admin@123', color: 'border-indigo-500 hover:bg-indigo-50 font-semibold' },
    { label: '📊 CFO', email: 'cfo@erp.vn', pw: 'Finance@123', color: 'border-blue-500 hover:bg-blue-50 font-semibold' },
    { label: '👥 HR', email: 'hr@erp.vn', pw: 'HR@123', color: 'border-green-500 hover:bg-green-50 font-semibold' },
    { label: '💻 IT Lab', email: 'it@erp.vn', pw: 'IT@123', color: 'border-purple-500 hover:bg-purple-50 font-semibold' },
    { label: '📦 Kho vận', email: 'warehouse@erp.vn', pw: 'Wh@123', color: 'border-amber-500 hover:bg-amber-50 font-semibold' },
    { label: '🛒 Mua hàng', email: 'procurement@erp.vn', pw: 'Pro@123', color: 'border-cyan-500 hover:bg-cyan-50 font-semibold' },
    { label: '🏭 Sản xuất', email: 'production@erp.vn', pw: 'Prod@123', color: 'border-red-500 hover:bg-red-50 font-semibold' },
    { label: '📋 Nhân viên', email: 'employee@erp.vn', pw: 'Emp@123', color: 'border-teal-500 hover:bg-teal-50 font-semibold' },
  ];

  const handleDemoSelect = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.pw);
    toast(`Đã áp dụng thông tin của ${acc.label}`, 'info');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.pw === password);
      setLoading(false);
      if (match) {
        toast(`Xin chào, ${match.name}! Chào mừng bạn quay trở lại.`, 'success');
        onLoginSuccess(match);
      } else {
        setErrorShake(true);
        toast('Tên đăng nhập hoặc mật khẩu không chính xác', 'error');
        setTimeout(() => setErrorShake(false), 500);
      }
    }, 1000);
  };

  // Register Handlers
  const handleRegNext = () => {
    if (regStep === 1) {
      if (!regForm.lastName || !regForm.firstName || !regForm.phone) {
        toast('Vui lòng điền các thông tin bắt buộc (*)', 'warning');
        return;
      }
      setRegStep(2);
    } else if (regStep === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(regForm.email)) {
        toast('Email không hợp lệ', 'warning');
        return;
      }
      const existing = users.find((u) => u.email.toLowerCase() === regForm.email.toLowerCase());
      if (existing) {
        toast('Email này đã được đăng ký trong hệ thống', 'error');
        return;
      }
      if (regForm.password.length < 8) {
        toast('Mật khẩu phải dài tối thiểu 8 ký tự', 'warning');
        return;
      }
      if (regForm.password !== regForm.confirmPassword) {
        toast('Xác nhận mật khẩu không trùng khớp', 'warning');
        return;
      }
      setRegStep(3);
    } else if (regStep === 3) {
      if (!regForm.company || !regForm.title) {
        toast('Vui lòng điền tên Công ty và Chức vụ', 'warning');
        return;
      }
      setRegStep(4);
    }
  };

  const handleRegisterFinalize = () => {
    const fullName = `${regForm.lastName} ${regForm.firstName}`;
    const initials = regForm.firstName.substring(0, 2).toUpperCase() || 'NV';
    const newId = `USR${String(users.length + 1).padStart(3, '0')}`;
    
    const newUser: User = {
      id: newId,
      email: regForm.email,
      pw: regForm.password,
      name: fullName,
      role: 'employee', // default registered user role
      deptId: regForm.deptId,
      title: regForm.title,
      phone: regForm.phone,
      initials: initials,
      avatarColor: 'bg-emerald-600 text-white',
      status: 'active',
      joinedAt: regForm.joinedAt,
      dob: regForm.dob,
      cccd: regForm.cccd
    };

    onAddNewUser(newUser);
    toast('Đăng ký tài khoản thành công!', 'success');
    onLoginSuccess(newUser);
  };

  // Forgot password flow
  const handleForgotStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast('Vui lòng nhập Email', 'warning');
      return;
    }
    const exists = users.some(u => u.email.toLowerCase() === forgotEmail.toLowerCase());
    if (!exists) {
      toast('Không tìm thấy tài khoản tương ứng với Email này', 'error');
      return;
    }
    toast('Mã OTP xác thực gồm 6 số đã được gửi qua email của bạn!', 'success');
    setForgotStep(2);
    setTimerCount(60);
  };

  const handleOtpInput = (val: string, index: number) => {
    const updated = [...otp];
    updated[index] = val.substring(val.length - 1);
    setOtp(updated);

    if (val && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleForgotStep2 = () => {
    const code = otp.join('');
    if (code.length < 6) {
      toast('Vui lòng nhập đầy đủ mã OTP 6 số', 'warning');
      return;
    }
    // Static verify 123456 or allow any to build robust preview experience
    toast('Xác thực OTP thành công! Vui lòng nhập mật khẩu mới.', 'success');
    setForgotStep(3);
  };

  const handleForgotStep3 = () => {
    if (newPassword.length < 8) {
      toast('Mật khẩu tối thiểu phải từ 8 ký tự', 'warning');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast('Mật khẩu xác nhận không trùng khớp', 'warning');
      return;
    }

    // Update password inside in-memory DB
    const usrIdx = users.findIndex(u => u.email.toLowerCase() === forgotEmail.toLowerCase());
    if (usrIdx !== -1) {
      users[usrIdx].pw = newPassword;
    }
    toast('Đã đặt lại mật khẩu thành công! Hãy đăng nhập.', 'success');
    setMode('login');
    setForgotStep(1);
    setForgotEmail('');
    setOtp(['', '', '', '', '', '']);
  };

  // Password rules validation helper
  const getPasswordStrength = (pw: string) => {
    if (!pw) return { strength: 0, text: 'Chưa có mật khẩu', color: 'bg-red-400' };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[@$!%*#?&]/.test(pw)) score++;

    if (score <= 1) return { strength: 25, text: 'Yếu', color: 'bg-rose-500' };
    if (score === 2) return { strength: 50, text: 'Trung bình', color: 'bg-amber-500' };
    if (score === 3) return { strength: 75, text: 'Mạnh', color: 'bg-blue-500' };
    return { strength: 100, text: 'Rất mạnh', color: 'bg-emerald-500' };
  };

  const currentStrength = getPasswordStrength(mode === 'register' ? regForm.password : newPassword);

  return (
    <div id="auth-screen" className="flex items-center justify-center min-h-screen bg-slate-50 font-sans p-4 relative overflow-hidden">
      
      {/* Decorative absolute shapes */}
      <div className="absolute w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-[500px] h-[500px] bg-sky-100/20 rounded-full blur-3xl -bottom-40 -right-20"></div>

      {/* Auth visual layout */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full max-w-5xl min-h-[600px] flex flex-col md:flex-row relative z-10 border border-gray-200">
        
        {/* Left branding panel */}
        <div className="md:w-5/12 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-lg text-white ring-1 ring-white/20">
                MC
              </div>
              <div>
                <h1 className="font-sans font-black text-lg tracking-tight uppercase leading-none">MCNA</h1>
                <p className="text-[10px] text-blue-400 uppercase font-bold tracking-widest mt-0.5">Technology School</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-sans leading-[1.2] tracking-tight text-white">Hệ Thống Quản Trị ERP Toàn Diện</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nền tảng số tự động điều hành công tác Đào tạo, Tài chính, Nhân sự, Thiết bị Lab, Mua sắm vật tư trường học.
              </p>
            </div>
          </div>

          {/* Sologan/Pills */}
          <div className="my-8 hidden md:block">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 bg-white/5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-200">Tài chính & Thu học phí tức thời</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="text-slate-200">Giám sát Thiết bị Lab & Robot STEM</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/5">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="text-slate-200">Quản lý dự án Sprint & IT Tickets</span>
              </div>
            </div>
          </div>

          <div className="text-[10.5px] text-slate-400 mt-auto pt-6 border-t border-slate-800">
            © 2026 MCNA Technology School. Tất cả quyền được bảo lưu.
          </div>
        </div>

        {/* Right interaction column */}
        <div className="md:w-7/12 p-8 flex flex-col justify-center">

          {/* ════ SCREEN 1: LOGIN ════ */}
          {mode === 'login' && (
            <div className={`${errorShake ? 'animate-bounce' : ''}`}>
              <div className="mb-6">
                <h3 className="text-xl font-bold font-display text-gray-800 tracking-tight">Chào mừng bạn quay lại!</h3>
                <p className="text-xs text-gray-500">Nhập thông tin tài khoản hoặc click nhanh vai trò để bắt đầu</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">Email Đăng Nhập</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@erp.vn"
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">Mật Khẩu</label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] font-semibold text-indigo-600 hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 pr-10 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-[11px] text-gray-500 font-medium">Ghi nhớ đăng nhập</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Đăng nhập hệ thống</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Fast Selection Box */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-2 text-center">Chọn nhanh vai trò để demo trải nghiệm</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {demoAccounts.map((acc, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDemoSelect(acc)}
                      className={`px-2 py-1.5 text-[10.5px] border rounded-lg text-gray-700 transition-all text-center leading-tight truncate ${acc.color}`}
                    >
                      {acc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle register */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  Chưa có tài khoản Công ty?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="text-indigo-600 hover:underline font-bold"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              </div>
            </div>
          )}


          {/* ════ SCREEN 2: REGISTER (4-Step Wizard) ════ */}
          {mode === 'register' && (
            <div>
              {/* Steppers Header */}
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    disabled={step > regStep}
                    onClick={() => setRegStep(step)}
                    className="flex flex-col items-center flex-1 relative"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black z-10 transition-colors ${
                        regStep === step
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : regStep > step
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {regStep > step ? <Check size={12} /> : step}
                    </div>
                    <span
                      className={`text-[8.5px] font-bold uppercase mt-1 transition-colors ${
                        regStep === step ? 'text-indigo-600' : 'text-gray-400'
                      }`}
                    >
                      {step === 1 ? 'Cá nhân' : step === 2 ? 'Tài khoản' : step === 3 ? 'Hồ sơ tuyển' : 'Xác nhận'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step 1: Cá nhân */}
              {regStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-md font-bold text-gray-800">Bước 1: Thông tin cá nhân</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Họ đệm *</label>
                      <input
                        type="text"
                        value={regForm.lastName}
                        onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                        placeholder="Nguyễn Văn"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Tên riêng *</label>
                      <input
                        type="text"
                        value={regForm.firstName}
                        onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                        placeholder="Đạt"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Số điện thoại *</label>
                      <input
                        type="tel"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        placeholder="0987xxxxxx"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Số CCCD / CMND</label>
                      <input
                        type="text"
                        value={regForm.cccd}
                        onChange={(e) => setRegForm({ ...regForm, cccd: e.target.value })}
                        placeholder="001095xxxxxx"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Ngày sinh</label>
                      <input
                        type="date"
                        value={regForm.dob}
                        onChange={(e) => setRegForm({ ...regForm, dob: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Giới tính</label>
                      <select
                        value={regForm.gender}
                        onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none"
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Tài khoản & Hệ thống */}
              {regStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-md font-bold text-gray-800">Bước 2: Tài khoản đăng nhập</h4>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-bold uppercase block">Email cá nhân / Đăng nhập *</label>
                    <input
                      type="email"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Mật khẩu *</label>
                      <input
                        type="password"
                        value={regForm.password}
                        onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                        placeholder="Từ 8 ký tự..."
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Xác nhận mật khẩu *</label>
                      <input
                        type="password"
                        value={regForm.confirmPassword}
                        onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                        placeholder="Trùng khớp..."
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Password strength */}
                  {regForm.password && (
                    <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div className="flex justify-between items-center text-[10px] text-gray-500">
                        <span>Độ bảo mật mật khẩu:</span>
                        <span className="font-bold text-gray-700">{currentStrength.text}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${currentStrength.color}`}
                          style={{ width: `${currentStrength.strength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Công việc / Hồ sơ */}
              {regStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-md font-bold text-gray-800">Bước 3: Thông tin công việc</h4>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-bold uppercase block">Trường học / Công ty *</label>
                    <input
                      type="text"
                      value={regForm.company}
                      onChange={(e) => setRegForm({ ...regForm, company: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Phòng ban ban đầu</label>
                      <select
                        value={regForm.deptId}
                        onChange={(e) => setRegForm({ ...regForm, deptId: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg"
                      >
                        <option value="DEP001">Phòng Tài chính - Kế toán</option>
                        <option value="DEP002">Phòng Nhân sự & Đào tạo</option>
                        <option value="DEP003">Khoa CNTT & IT Lab</option>
                        <option value="DEP004">Phòng Thiết bị</option>
                        <option value="DEP005">Phòng Mua sắm</option>
                        <option value="DEP006">TT Robot & STEM</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Chức vụ đăng ký *</label>
                      <input
                        type="text"
                        value={regForm.title}
                        onChange={(e) => setRegForm({ ...regForm, title: e.target.value })}
                        placeholder="ví dụ: Giảng viên, Chuyên viên..."
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Ngày gia nhập học viện</label>
                      <input
                        type="date"
                        value={regForm.joinedAt}
                        onChange={(e) => setRegForm({ ...regForm, joinedAt: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block">Loại Hợp đồng</label>
                      <select
                        value={regForm.contractType}
                        onChange={(e) => setRegForm({ ...regForm, contractType: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg"
                      >
                        <option value="Full-time">Full-time (Chính thức)</option>
                        <option value="Contractor">Cơ hữu / Hợp đồng</option>
                        <option value="Part-time">Part-time (Thỉnh giảng)</option>
                        <option value="Intern">Thực tập sinh (Intern)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {regStep === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-md font-bold text-gray-800">Bước 4: Kiểm tra và Ghi danh</h4>
                  <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-gray-200 space-y-2 text-xs">
                    <p className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-gray-400 font-semibold">Họ tên nhân sự:</span>
                      <span className="text-gray-800 font-bold">{regForm.lastName} {regForm.firstName}</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-gray-400 font-semibold">Email tài khoản:</span>
                      <span className="text-gray-800 font-semibold">{regForm.email}</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-gray-400 font-semibold">Chức vụ - Phòng ban:</span>
                      <span className="text-gray-800 font-semibold">
                        {regForm.title} ({regForm.deptId === 'DEP003' ? 'Khoa CNTT' : 'Bộ phận khác'})
                      </span>
                    </p>
                    <p className="flex justify-between pb-1">
                      <span className="text-gray-400 font-semibold">Chế độ đào tạo:</span>
                      <span className="text-gray-800 font-bold">{regForm.contractType}</span>
                    </p>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" required className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-[11px] text-gray-500 font-medium leading-relaxed">
                      Tôi xác nhận các thông tin trên hoàn toàn dữ liệu thật và đồng ý tuân thủ Nội quy bảo mật thông tin nội bộ của MCNA Academy.
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation button panel for register wizard */}
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    if (regStep === 1) {
                      setMode('login');
                    } else {
                      setRegStep(regStep - 1);
                    }
                  }}
                  className="flex items-center gap-1 py-1.5 px-3 text-xs text-gray-600 font-bold hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>{regStep === 1 ? 'Về Đăng nhập' : 'Trở lại'}</span>
                </button>

                {regStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleRegNext}
                    className="flex items-center gap-1.5 py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    <span>Tiếp tục</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRegisterFinalize}
                    className="flex items-center gap-1.5 py-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
                  >
                    <UserCheck size={14} />
                    <span>Hoàn thành Ghi danh</span>
                  </button>
                )}
              </div>
            </div>
          )}


          {/* ════ SCREEN 3: FORGOT PASSWORD ════ */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold font-display text-gray-800">Đặt lại mật khẩu</h3>
                <p className="text-xs text-gray-500">Khôi phục quyền truy cập an toàn bằng mã khóa OTP</p>
              </div>

              {/* Forgot Step 1: Nhập email */}
              {forgotStep === 1 && (
                <form onSubmit={handleForgotStep1} className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Nhập email tài khoản cần khôi phục</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-xs text-gray-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <ArrowLeft size={13} />
                      <span>Quay lại đăng nhập</span>
                    </button>
                    <button
                      type="submit"
                      className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1"
                    >
                      <span>Gửi mã xác thực</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </form>
              )}

              {/* Forgot Step 2: Nhập OTP */}
              {forgotStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center space-y-1 mb-2">
                    <p className="text-xs text-gray-600">Chúng tôi đã gửi mã xác thực tới email của bạn:</p>
                    <p className="text-xs font-bold text-indigo-600">{forgotEmail}</p>
                  </div>

                  {/* 6 digits OTP Inputs */}
                  <div className="flex gap-2.5 justify-center py-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpRefs.current[idx] = el)}
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpInput(e.target.value, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className="w-10 h-11 text-center font-bold text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ))}
                  </div>

                  {/* Countdown Timer */}
                  <div className="text-center">
                    {timerCount > 0 ? (
                      <p className="text-[11px] text-gray-400">
                        Yêu cầu gửi lại mã sau <span className="font-bold text-gray-600">{timerCount}s</span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setTimerCount(60);
                          toast('Đã gửi lại mã OTP khôi phục!', 'info');
                        }}
                        className="text-[11px] text-indigo-600 font-bold hover:underline"
                      >
                        Gửi lại mã OTP mới
                      </button>
                    )}
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-3">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-xs text-gray-500 hover:text-gray-700 font-bold"
                    >
                      Bỏ qua / Trở lại
                    </button>
                    <button
                      type="button"
                      onClick={handleForgotStep2}
                      className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg"
                    >
                      Xác thực mã OTP
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Step 3: Đặt mật khẩu mới */}
              {forgotStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase block">Nhập Mật khẩu mới *</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Tối thiểu 8 ký tự..."
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase block">Nhập lại Mật khẩu mới *</label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Xác nhận trùng khớp..."
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Password rules strength bar */}
                  {newPassword && (
                    <div className="space-y-1 bg-slate-50 p-2 text-xs rounded-lg">
                      <div className="flex justify-between mb-0.5 text-[10px]">
                        <span className="text-gray-500 font-medium">Độ phức tạp:</span>
                        <span className="font-bold text-gray-700">{currentStrength.text}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                        <div className={`h-full ${currentStrength.color}`} style={{ width: `${currentStrength.strength}%` }}></div>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleForgotStep3}
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Xác nhận đặt lại mật khẩu mới
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
