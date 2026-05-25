import React, { useState } from 'react';

// Common Formatter
const fmtVNDShort = (n: number) => {
  if (n >= 1000000000) {
    return (n / 1000000000).toFixed(2) + ' tỷ';
  }
  if (n >= 1000000) {
    return (n / 1000000).toFixed(0) + ' tr';
  }
  return n.toLocaleString('vi-VN');
};

// 1. Grouped Bar Chart
interface GroupedBarData {
  month: string;
  revenue: number;
  expense: number;
}
export const GroupedBarChart: React.FC<{ data: GroupedBarData[] }> = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const maxVal = Math.max(...data.map(d => Math.max(d.revenue, d.expense))) * 1.1;

  const width = 500;
  const height = 200;
  const paddingLeft = 50;
  const paddingRight = 10;
  const paddingTop = 20;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const barWidth = 10;
  const barGap = 3;
  const groupWidth = chartWidth / data.length;

  return (
    <div className="relative p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="flex gap-4 justify-end mb-2 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
          <span>Doanh thu</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-400 rounded-sm"></span>
          <span>Chi phí</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Y-Axis Gridlines & Labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const val = maxVal * ratio;
          const y = paddingTop + chartHeight * (1 - ratio);
          return (
            <g key={i} className="opacity-70">
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#f3f4f6"
                strokeWidth={1}
                strokeDasharray="4"
              />
              <text
                x={paddingLeft - 8}
                y={y + 4}
                className="font-mono text-[9px] fill-gray-400 text-right"
                textAnchor="end"
              >
                {fmtVNDShort(val)}
              </text>
            </g>
          );
        })}

        {/* Dynamic Groups */}
        {data.map((d, index) => {
          const xGroup = paddingLeft + index * groupWidth;
          const revHeight = (d.revenue / maxVal) * chartHeight;
          const expHeight = (d.expense / maxVal) * chartHeight;

          const revY = paddingTop + chartHeight - revHeight;
          const expY = paddingTop + chartHeight - expHeight;

          return (
            <g
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="cursor-pointer"
            >
              {/* Highlight background on hover */}
              {hoverIndex === index && (
                <rect
                  x={xGroup}
                  y={paddingTop}
                  width={groupWidth}
                  height={chartHeight}
                  fill="#f8fafc"
                  rx={2}
                />
              )}

              {/* Revenue Bar */}
              <rect
                x={xGroup + (groupWidth - (barWidth * 2 + barGap)) / 2}
                y={revY}
                width={barWidth}
                height={revHeight}
                fill={hoverIndex === index ? '#2563eb' : '#3b82f6'}
                rx={1.5}
                className="transition-all duration-300"
              />

              {/* Expense Bar */}
              <rect
                x={xGroup + (groupWidth - (barWidth * 2 + barGap)) / 2 + barWidth + barGap}
                y={expY}
                width={barWidth}
                height={expHeight}
                fill={hoverIndex === index ? '#dc2626' : '#f87171'}
                rx={1.5}
                className="transition-all duration-300"
              />

              {/* X-Axis Labels */}
              <text
                x={xGroup + groupWidth / 2}
                y={height - 8}
                className="text-[10px] fill-gray-500 font-medium"
                textAnchor="middle"
              >
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip on Hover */}
      {hoverIndex !== null && (
        <div className="absolute top-1/2 left-1/2 p-2 bg-gray-900/95 text-white text-[11px] rounded-md shadow-lg border border-gray-700 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10 transition-all">
          <p className="font-semibold text-gray-300 border-b border-gray-700 pb-0.5 mb-1 text-center">
            Tháng {data[hoverIndex].month.replace('T', '')}
          </p>
          <div className="space-y-0.5">
            <p className="flex justify-between gap-4">
              <span>Doanh thu:</span>
              <span className="font-semibold text-emerald-400">
                {data[hoverIndex].revenue.toLocaleString('vi-VN')} ₫
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Chi phí:</span>
              <span className="font-semibold text-red-400">
                {data[hoverIndex].expense.toLocaleString('vi-VN')} ₫
              </span>
            </p>
            <p className="flex justify-between gap-4 border-t border-gray-700 pt-0.5 mt-0.5 font-bold">
              <span>Lợi nhuận:</span>
              <span className="text-blue-300">
                {(data[hoverIndex].revenue - data[hoverIndex].expense).toLocaleString('vi-VN')} ₫
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Line Area Chart (Profit Trend)
interface LineChartData {
  month: string;
  revenue: number;
  expense: number;
}
export const LineAreaChart: React.FC<{ data: LineChartData[] }> = ({ data }) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const profits = data.map(d => d.revenue - d.expense);
  const maxVal = Math.max(...profits) * 1.1;
  const minVal = Math.min(...profits) * 0.9;

  const width = 500;
  const height = 200;
  const paddingLeft = 55;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const stepX = chartWidth / (data.length - 1);

  // Calc SVG Path coordinates
  const points = data.map((d, idx) => {
    const profit = d.revenue - d.expense;
    const x = paddingLeft + idx * stepX;
    // Normalized y
    const y = paddingTop + chartHeight - ((profit - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, val: profit, month: d.month };
  });

  // Polyline coordinates string
  const mainPath = points.map(p => `${p.x},${p.y}`).join(' L ');
  const areaPath = `${points[0].x},${paddingTop + chartHeight} L ${mainPath} L ${points[points.length - 1].x},${paddingTop + chartHeight} Z`;

  return (
    <div className="relative p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500 font-semibold">Tăng trưởng Lợi nhuận (12 tháng MTD)</span>
        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
          Trung bình: {fmtVNDShort(profits.reduce((a, b) => a + b, 0) / profits.length)} / tháng
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Y Gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const val = minVal + (maxVal - minVal) * ratio;
          const y = paddingTop + chartHeight * (1 - ratio);
          return (
            <g key={i} className="opacity-70">
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#f3f4f6"
                strokeWidth={1}
              />
              <text
                x={paddingLeft - 8}
                y={y + 3}
                className="font-mono text-[9px] fill-gray-400"
                textAnchor="end"
              >
                {fmtVNDShort(val)}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={`M ${areaPath}`} fill="url(#profitGrad)" />

        {/* Line */}
        <path
          d={`M ${mainPath}`}
          fill="none"
          stroke="#2563eb"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points & interaction hit-areas */}
        {points.map((p, idx) => (
          <g key={idx}>
            {/* Guide line */}
            {hoverIdx === idx && (
              <line
                x1={p.x}
                y1={paddingTop}
                x2={p.x}
                y2={paddingTop + chartHeight}
                stroke="#2563eb"
                strokeWidth={1}
                strokeDasharray="3"
                className="opacity-50"
              />
            )}

            <circle
              cx={p.x}
              cy={p.y}
              r={hoverIdx === idx ? 6 : 3.5}
              fill={hoverIdx === idx ? '#2563eb' : '#ffffff'}
              stroke="#2563eb"
              strokeWidth={2}
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
            />

            {/* X-axis labels (render every alternate for spacing) */}
            {idx % 2 === 0 && (
              <text
                x={p.x}
                y={height - 8}
                className="text-[10px] fill-gray-500 font-medium"
                textAnchor="middle"
              >
                {p.month}
              </text>
            )}
          </g>
        ))}
      </svg>

      {hoverIdx !== null && (
        <div className="absolute top-1/2 left-1/2 p-2 bg-gray-900/95 text-white text-[11px] rounded-md shadow-lg border border-gray-700 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10 transition-all">
          <p className="font-semibold text-gray-300 border-b border-gray-700 pb-0.5 mb-1 text-center font-display">
            Tháng {data[hoverIdx].month.replace('T', '')}
          </p>
          <p className="flex justify-between gap-4">
            <span>Doanh thu:</span>
            <span className="font-semibold text-gray-300">
              {data[hoverIdx].revenue.toLocaleString('vi-VN')} ₫
            </span>
          </p>
          <p className="flex justify-between gap-4">
            <span>Chi phí:</span>
            <span className="font-semibold text-red-300">
              {data[hoverIdx].expense.toLocaleString('vi-VN')} ₫
            </span>
          </p>
          <p className="flex justify-between gap-4 border-t border-gray-700 pt-0.5 mt-0.5 font-bold">
            <span>Lợi nhuận ròng:</span>
            <span className="text-emerald-400">
              {points[hoverIdx].val.toLocaleString('vi-VN')} ₫
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

// 3. Donut Ring Chart (Cost Breakdown)
interface DonutData {
  label: string;
  value: number;
  color: string;
}
export const DonutChart: React.FC<{ data: DonutData[] }> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  // SVG calculations
  const size = 150;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 justify-center">
      {/* SVG Ring container */}
      <div className="relative w-[150px] h-[150px]">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Base track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {data.map((d, i) => {
            const percentage = (d.value / total) * 100;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -currentOffset;
            currentOffset += (percentage / 100) * circumference;

            const isHovered = hoveredIdx === i;

            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${center} ${center})`}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {hoveredIdx !== null ? data[hoveredIdx].label : 'Tổng số'}
          </span>
          <span className="text-lg font-bold text-gray-800 font-display">
            {hoveredIdx !== null ? `${data[hoveredIdx].value}%` : `${total}%`}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="flex-1 space-y-1.5 w-full">
        {data.map((d, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-1 rounded-md transition-colors text-xs ${
              hoveredIdx === i ? 'bg-gray-50' : ''
            }`}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full transition-transform"
                style={{
                  backgroundColor: d.color,
                  transform: hoveredIdx === i ? 'scale(1.2)' : 'none',
                }}
              ></span>
              <span className="text-gray-600 font-medium">{d.label}</span>
            </div>
            <span className="text-gray-800 font-bold font-mono">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Semi-Circle Gauge Chart
export const SemiCircleGauge: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const center = size / 2;
  const circumference = Math.PI * radius; // 180 degrees
  const strokeDashoffset = circumference - (Math.min(value, 100) / 100) * circumference;

  let color = '#16a34a'; // Green
  if (value < 70) color = '#dc2626'; // Red
  else if (value < 85) color = '#d97706'; // Amber

  return (
    <div className="flex flex-col items-center justify-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
      <div className="relative w-[160px] h-[100px] overflow-hidden">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Base background arc */}
          <path
            d={`M ${strokeWidth},${center} A ${radius},${radius} 0 0,1 ${size - strokeWidth},${center}`}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Value colored arc */}
          <path
            d={`M ${strokeWidth},${center} A ${radius},${radius} 0 0,1 ${size - strokeWidth},${center}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Text over values */}
        <div className="absolute bottom-1 inset-x-0 flex flex-col items-center">
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight font-display">
            {value}%
          </span>
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

// 5. Funnel Chart (e.g., Candidates Pipeline Stage Analysis)
interface FunnelStage {
  stage: string;
  count: number;
}
export const FunnelChart: React.FC<{ data: FunnelStage[] }> = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.count));

  return (
    <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm space-y-2">
      <span className="text-xs text-gray-500 font-bold block mb-1">Pipeline Tuyển dụng ứng viên</span>
      {data.map((d, idx) => {
        const pct = maxVal > 0 ? (d.count / maxVal) * 100 : 0;
        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 font-medium text-[11px]">{d.stage}</span>
              <span className="text-gray-900 font-bold font-mono bg-slate-100 px-1.5 py-0.5 rounded-sm">
                {d.count} người
              </span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 6. Inline Sparkline for Table data
export const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  if (!data || data.length === 0) return null;
  const width = 60;
  const height = 20;
  const max = Math.max(...data);
  const min = Math.min(...data);

  const stepX = width / (data.length - 1);
  const points = data
    .map((val, idx) => {
      const x = idx * stepX;
      const y = max === min ? height / 2 : height - ((val - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke="#2563eb" strokeWidth="1.5" points={points} />
    </svg>
  );
};

// 7. Attendance Calendar Heatmap (7x4 Grid for 28 Days)
interface HeatmapCell {
  day: number;
  status: 'present' | 'absent' | 'late' | 'leave' | 'holiday' | 'wfh' | 'none';
  dateStr: string;
}
export const AttendanceHeatmap: React.FC<{ cells: HeatmapCell[] }> = ({ cells }) => {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
      <span className="text-xs text-gray-500 font-bold block mb-2.5">Nhiệt ẩm Lịch học & Làm việc (Heatmap)</span>
      <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[9px] text-gray-400 font-bold">
        <span>T2</span>
        <span>T3</span>
        <span>T4</span>
        <span>T5</span>
        <span>T6</span>
        <span>T7</span>
        <span>CN</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => {
          let bgClass = 'bg-gray-100 text-gray-400';
          let title = `Ngày ${c.day}: Không có dữ liệu`;

          if (c.status === 'present') {
            bgClass = 'bg-emerald-500 hover:bg-emerald-600 text-white';
            title = `${c.dateStr}: Có mặt (Đúng giờ)`;
          } else if (c.status === 'late') {
            bgClass = 'bg-amber-400 hover:bg-amber-500 text-white';
            title = `${c.dateStr}: Đi muộn / Học muộn`;
          } else if (c.status === 'absent') {
            bgClass = 'bg-rose-500 hover:bg-rose-600 text-white';
            title = `${c.dateStr}: Vắng mặt không lý do`;
          } else if (c.status === 'leave') {
            bgClass = 'bg-blue-400 hover:bg-blue-500 text-white';
            title = `${c.dateStr}: Nghỉ phép (Có lý do)`;
          } else if (c.status === 'holiday') {
            bgClass = 'bg-gray-300 hover:bg-gray-400 text-gray-700';
            title = `${c.dateStr}: Ngày lễ / Cuối tuần`;
          } else if (c.status === 'wfh') {
            bgClass = 'bg-indigo-400 hover:bg-indigo-500 text-white';
            title = `${c.dateStr}: Làm việc từ xa (WFH)`;
          }

          return (
            <div
              key={i}
              className={`w-full aspect-square flex items-center justify-center text-[10px] font-bold rounded-sm cursor-pointer transition-colors ${bgClass}`}
              title={title}
            >
              {c.day > 0 ? c.day : ''}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-3 text-[9px] text-gray-500 font-semibold border-t border-gray-100 pt-2">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs"></span> Đủ
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-amber-400 rounded-xs"></span> Muộn
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-rose-500 rounded-xs"></span> Vắng
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-blue-400 rounded-xs"></span> Phép
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-indigo-400 rounded-xs"></span> WFH
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-gray-300 rounded-xs"></span> Lễ
        </span>
      </div>
    </div>
  );
};
