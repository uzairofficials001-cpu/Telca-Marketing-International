import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// 1. SMOOTH ANIMATED KPI COUNTER
// ============================================================================
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 750
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    if (target === 0) {
      setDisplay(0);
      return;
    }
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

// ============================================================================
// 2. ANIMATED MULTI-SERIES TRAFFIC & LEAD VELOCITY AREA CHART
// ============================================================================
export interface DailySeriesPoint {
  date: string;
  label: string;
  pageviews: number;
  clicks: number;
  leads: number;
  consultations?: number;
  audits?: number;
  plans?: number;
}

interface AnimatedTrafficLeadChartProps {
  data: DailySeriesPoint[];
  height?: number;
}

export const AnimatedTrafficLeadChart: React.FC<AnimatedTrafficLeadChartProps> = ({
  data,
  height = 240
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [visibleSeries, setVisibleSeries] = useState({
    pageviews: true,
    clicks: true,
    leads: true
  });

  const safeData = data && data.length > 0
    ? data
    : [
        { date: '1', label: 'Day 1', pageviews: 0, clicks: 0, leads: 0 },
        { date: '2', label: 'Today', pageviews: 0, clicks: 0, leads: 0 }
      ];

  const width = 760;
  const padLeft = 36;
  const padRight = 18;
  const padTop = 18;
  const padBottom = 32;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxTraffic = Math.max(
    4,
    ...safeData.map(d =>
      Math.max(
        visibleSeries.pageviews ? d.pageviews : 0,
        visibleSeries.clicks ? d.clicks : 0,
        visibleSeries.leads ? d.leads * 5 : 0
      )
    )
  );

  const getX = (idx: number) => {
    if (safeData.length <= 1) return padLeft + chartW / 2;
    return padLeft + (idx / (safeData.length - 1)) * chartW;
  };

  const getY = (val: number) => {
    const ratio = Math.min(1, Math.max(0, val / maxTraffic));
    return padTop + chartH - ratio * chartH;
  };

  const buildSmoothPath = (points: Array<{ x: number; y: number }>) => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const pvPoints = safeData.map((d, i) => ({ x: getX(i), y: getY(d.pageviews) }));
  const clickPoints = safeData.map((d, i) => ({ x: getX(i), y: getY(d.clicks) }));
  const leadPoints = safeData.map((d, i) => ({ x: getX(i), y: getY(d.leads * 5) }));

  const pvLine = buildSmoothPath(pvPoints);
  const pvArea = pvPoints.length > 0
    ? `${pvLine} L ${pvPoints[pvPoints.length - 1].x} ${padTop + chartH} L ${pvPoints[0].x} ${padTop + chartH} Z`
    : '';
  const clickLine = buildSmoothPath(clickPoints);
  const leadLine = buildSmoothPath(leadPoints);

  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const activePoint = hoveredIdx !== null ? safeData[hoveredIdx] : null;

  return (
    <div className="space-y-3">
      {/* Legend & Series Toggle Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setVisibleSeries(s => ({ ...s, pageviews: !s.pageviews }))}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition-all ${
              visibleSeries.pageviews
                ? 'bg-blue-50 border-blue-200 text-[#356DFF]'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#356DFF]" />
            <span>Page Views</span>
          </button>

          <button
            type="button"
            onClick={() => setVisibleSeries(s => ({ ...s, clicks: !s.clicks }))}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition-all ${
              visibleSeries.clicks
                ? 'bg-violet-50 border-violet-200 text-[#795BFF]'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#795BFF]" />
            <span>Button &amp; CTA Clicks</span>
          </button>

          <button
            type="button"
            onClick={() => setVisibleSeries(s => ({ ...s, leads: !s.leads }))}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition-all ${
              visibleSeries.leads
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Leads Captured (5x scale)</span>
          </button>
        </div>

        {activePoint && (
          <div className="px-3 py-1 rounded-lg bg-[#101B35] text-white font-semibold flex items-center gap-3 shadow-sm">
            <span className="text-slate-300">{activePoint.label}</span>
            <span className="text-blue-300">{activePoint.pageviews} views</span>
            <span className="text-violet-300">{activePoint.clicks} clicks</span>
            <span className="text-emerald-300">{activePoint.leads} leads</span>
          </div>
        )}
      </div>

      {/* Responsive Animated SVG Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none overflow-visible"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="telcaPvArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#356DFF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#356DFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines */}
          {yTicks.map((ratio, idx) => {
            const y = padTop + chartH - ratio * chartH;
            const val = Math.round(maxTraffic * ratio);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray={ratio === 0 ? undefined : '4 4'}
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Pageviews Area Fill */}
          {visibleSeries.pageviews && pvArea && (
            <motion.path
              d={pvArea}
              fill="url(#telcaPvArea)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            />
          )}

          {/* Pageviews Smooth Line */}
          {visibleSeries.pageviews && pvLine && (
            <motion.path
              d={pvLine}
              fill="none"
              stroke="#356DFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          )}

          {/* Clicks Smooth Line */}
          {visibleSeries.clicks && clickLine && (
            <motion.path
              d={clickLine}
              fill="none"
              stroke="#795BFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, ease: 'easeOut', delay: 0.1 }}
            />
          )}

          {/* Leads Smooth Line */}
          {visibleSeries.leads && leadLine && (
            <motion.path
              d={leadLine}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
            />
          )}

          {/* Hover Crosshair */}
          {hoveredIdx !== null && (
            <line
              x1={getX(hoveredIdx)}
              y1={padTop}
              x2={getX(hoveredIdx)}
              y2={padTop + chartH}
              stroke="#94A3B8"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* Interactive Data Nodes & X-Axis Labels */}
          {safeData.map((d, i) => {
            const x = getX(i);
            const showLabel =
              safeData.length <= 8 ||
              i === 0 ||
              i === safeData.length - 1 ||
              i % Math.ceil(safeData.length / 6) === 0;
            const isHovered = hoveredIdx === i;

            return (
              <g key={d.date + i}>
                {showLabel && (
                  <text
                    x={x}
                    y={height - 8}
                    textAnchor="middle"
                    className={`text-[10px] font-medium ${isHovered ? 'fill-[#101B35] font-bold' : 'fill-slate-400'}`}
                  >
                    {d.label}
                  </text>
                )}

                {visibleSeries.pageviews && (
                  <circle
                    cx={x}
                    cy={getY(d.pageviews)}
                    r={isHovered ? 5 : 2.5}
                    className="fill-[#356DFF] stroke-white"
                    strokeWidth={isHovered ? 2 : 1}
                  />
                )}
                {visibleSeries.clicks && (
                  <circle
                    cx={x}
                    cy={getY(d.clicks)}
                    r={isHovered ? 4.5 : 2.2}
                    className="fill-[#795BFF] stroke-white"
                    strokeWidth={isHovered ? 2 : 1}
                  />
                )}
                {visibleSeries.leads && (
                  <circle
                    cx={x}
                    cy={getY(d.leads * 5)}
                    r={isHovered ? 5 : 2.5}
                    className="fill-emerald-500 stroke-white"
                    strokeWidth={isHovered ? 2 : 1}
                  />
                )}

                {/* Invisible wide hover target */}
                <rect
                  x={x - chartW / Math.max(safeData.length * 2, 4)}
                  y={padTop}
                  width={chartW / Math.max(safeData.length, 2)}
                  height={chartH}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// ============================================================================
// 3. ANIMATED LEAD SOURCE DONUT RING CHART
// ============================================================================
export interface LeadTypeSlice {
  type: string;
  label: string;
  color: string;
  count: number;
  pipelineValue: number;
  share: number;
}

interface AnimatedLeadSourceDonutProps {
  slices: LeadTypeSlice[];
  onSelectType?: (type: string) => void;
}

export const AnimatedLeadSourceDonut: React.FC<AnimatedLeadSourceDonutProps> = ({
  slices,
  onSelectType
}) => {
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const total = slices.reduce((acc, s) => acc + s.count, 0);
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;
  const activeSlice = slices.find(s => s.type === hoveredType) || null;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Donut Ring */}
      <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="16"
          />
          {total > 0 &&
            slices.map((slice, idx) => {
              if (slice.count === 0) return null;
              const segLen = (slice.count / total) * circumference;
              const dashArray = `${Math.max(0, segLen - 2)} ${circumference}`;
              const offset = -cumulativeOffset;
              cumulativeOffset += segLen;
              const isHovered = hoveredType === slice.type;

              return (
                <motion.circle
                  key={slice.type}
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={isHovered ? 20 : 16}
                  strokeDasharray={dashArray}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredType(slice.type)}
                  onMouseLeave={() => setHoveredType(null)}
                  onClick={() => onSelectType?.(slice.type)}
                />
              );
            })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 pointer-events-none">
          <span className="text-2xl font-black text-[#101B35] leading-none">
            {activeSlice ? activeSlice.count : total}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
            {activeSlice ? `${activeSlice.share}%` : 'Total Leads'}
          </span>
        </div>
      </div>

      {/* Interactive Legend List */}
      <div className="flex-1 w-full space-y-2 text-xs">
        {slices.map((slice) => {
          const isHovered = hoveredType === slice.type;
          return (
            <button
              key={slice.type}
              type="button"
              onMouseEnter={() => setHoveredType(slice.type)}
              onMouseLeave={() => setHoveredType(null)}
              onClick={() => onSelectType?.(slice.type)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-left ${
                isHovered
                  ? 'bg-slate-50 border-slate-300 shadow-xs'
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="font-semibold text-slate-800 truncate">{slice.label}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {slice.pipelineValue > 0 && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    ${slice.pipelineValue.toLocaleString()}
                  </span>
                )}
                <span className="font-black text-[#101B35] tabular-nums w-6 text-right">
                  {slice.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 4. ANIMATED CONVERSION FUNNEL CHART
// ============================================================================
interface FunnelStage {
  stage: string;
  count: number;
  rate: number;
}

export const AnimatedConversionFunnel: React.FC<{ stages: FunnelStage[] }> = ({ stages }) => {
  const colors = ['#101B35', '#254EDB', '#356DFF', '#795BFF', '#10B981'];

  return (
    <div className="space-y-3">
      {stages.map((st, idx) => (
        <div key={st.stage} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                {idx + 1}
              </span>
              <span className="font-bold text-slate-800">{st.stage}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-[#101B35] tabular-nums">{st.count}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 tabular-nums">
                {st.rate}%
              </span>
            </div>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(st.count > 0 ? 6 : 0, st.rate)}%` }}
              transition={{ duration: 0.75, delay: idx * 0.08, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: colors[idx % colors.length] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// 5. ANIMATED HORIZONTAL BAR LEADERBOARD
// ============================================================================
export interface HorizontalBarItem {
  label: string;
  sublabel?: string;
  value: number;
  valueDisplay: string;
  color?: string;
}

export const AnimatedHorizontalBars: React.FC<{
  items: HorizontalBarItem[];
  emptyMessage?: string;
  defaultColor?: string;
}> = ({ items, emptyMessage = 'No data recorded yet.', defaultColor = '#356DFF' }) => {
  if (!items || items.length === 0) {
    return <p className="text-xs text-slate-400 text-center py-6">{emptyMessage}</p>;
  }

  const maxVal = Math.max(1, ...items.map(i => i.value));

  return (
    <div className="space-y-2.5">
      {items.map((item, idx) => {
        const pct = Math.max(item.value > 0 ? 8 : 0, Math.round((item.value / maxVal) * 100));
        return (
          <div key={item.label + idx} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-semibold text-slate-800 truncate">{item.label}</span>
                {item.sublabel && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium shrink-0">
                    {item.sublabel}
                  </span>
                )}
              </div>
              <span className="font-bold text-[#101B35] tabular-nums shrink-0">
                {item.valueDisplay}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.65, delay: idx * 0.05, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color || defaultColor }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
