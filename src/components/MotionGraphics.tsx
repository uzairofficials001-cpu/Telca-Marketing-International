import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Users, Target, ShieldCheck, Zap } from 'lucide-react';

export const PerformanceDataLineMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`p-5 rounded-2xl bg-[#101B35] text-white border border-white/10 shadow-xl ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#356DFF]">
            Quantitative Performance Tracking
          </span>
          <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-2">
            <span>Multi-Touch ROAS &amp; Acquisition Velocity</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-semibold">
              +142% EFFICIENCY
            </span>
          </div>
        </div>
        <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-[#356DFF] flex items-center justify-center">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      {/* SVG Chart with Animated Path */}
      <div className="pt-4 relative h-36">
        <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
          {/* Subtle Grid Lines */}
          <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <line x1="0" y1="110" x2="500" y2="110" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

          {/* Fill Gradient Area under Curve */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#356DFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#356DFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 10 100 Q 120 95, 200 65 T 360 40 T 490 15 L 490 115 L 10 115 Z"
            fill="url(#chartGradient)"
          />

          {/* Animated Stroke Path */}
          <motion.path
            d="M 10 100 Q 120 95, 200 65 T 360 40 T 490 15"
            fill="none"
            stroke="#356DFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          {/* Data Nodes */}
          {[
            { cx: 10, cy: 100, label: 'W1: Setup' },
            { cx: 200, cy: 65, label: 'W4: Testing' },
            { cx: 360, cy: 40, label: 'W8: Scale' },
            { cx: 490, cy: 15, label: 'W12: 3.8x ROAS' }
          ].map((pt, i) => (
            <g key={i}>
              <motion.circle
                cx={pt.cx}
                cy={pt.cy}
                r={5}
                fill="#FFFFFF"
                stroke="#356DFF"
                strokeWidth={2.5}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4 + i * 0.25 }}
              />
              <text
                x={pt.cx}
                y={pt.cy - 12}
                textAnchor={i === 3 ? 'end' : i === 0 ? 'start' : 'middle'}
                fill="#94A3B8"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="600"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span>Disciplined CPA Hygiene</span>
        <span className="font-mono text-slate-300">Target CAC: -$34.20 over 90-day cycle</span>
      </div>
    </div>
  );
};

export const ConversionFunnelMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  const stages = [
    { name: '1. Targeted Impression Reach', value: '1.2M High-Intent Impressions', pct: '100%', bg: 'bg-[#356DFF]' },
    { name: '2. Qualified Click-Through', value: '48,000 Visitors to Landing Assets', pct: '75%', bg: 'bg-[#4B7CFF]' },
    { name: '3. Strategic Inquiry & Booking', value: '2,840 Discovery Sessions Scheduled', pct: '52%', bg: 'bg-[#678FFF]' },
    { name: '4. Verified Client Acquisition', value: '380 High-LTV Active Partnerships', pct: '32%', bg: 'bg-[#795BFF]' }
  ];

  return (
    <div className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#356DFF]">
            Conversion Architecture
          </span>
          <h4 className="text-sm font-bold text-[#101B35]">
            Full-Funnel Campaign Progression
          </h4>
        </div>
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#356DFF] flex items-center justify-center">
          <Target className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {stages.map((stage, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-slate-800">
              <span>{stage.name}</span>
              <span className="text-slate-500 font-mono text-[11px]">{stage.value}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${stage.bg} rounded-full`}
                initial={{ width: shouldReduceMotion ? stage.pct : '0%' }}
                whileInView={{ width: stage.pct }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: idx * 0.18, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Every funnel stage calibrated with server-side pixel tracking &amp; UTM hygiene.</span>
      </div>
    </div>
  );
};

export const WorkflowConnectedNodesMotion: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`p-6 rounded-2xl bg-[#101B35] text-white border border-white/10 shadow-xl ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#356DFF]">
            Autonomous Systems
          </span>
          <h4 className="text-sm font-bold text-white">
            n8n &amp; CRM Intelligent Lead Routing
          </h4>
        </div>
        <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-[#795BFF] flex items-center justify-center">
          <Zap className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 py-4 text-center text-xs">
        {[
          { label: 'Multi-Ad Form Ingestion', desc: 'Meta, Google & LinkedIn Webhooks', num: '01' },
          { label: 'Data Validation', desc: 'Spam filter & enrichment check', num: '02' },
          { label: 'CRM Sync', desc: 'Instant HubSpot / Salesforce lead creation', num: '03' },
          { label: 'Speed-to-Lead Alert', desc: 'Real-time Slack notification < 60s', num: '04' }
        ].map((node, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 relative">
            <span className="text-[#356DFF] font-black text-xs block mb-1">{node.num}</span>
            <div className="font-bold text-white text-xs">{node.label}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{node.desc}</div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/10 text-center text-[11px] text-slate-400">
        Reduces inquiry turnaround from 24 hours down to under 60 seconds.
      </div>
    </div>
  );
};
