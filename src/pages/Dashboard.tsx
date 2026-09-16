import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Layers, 
  FileText, 
  DollarSign,
  TrendingUp,
  ArrowRight,
  Shield,
  FileCode,
  Lock
} from 'lucide-react';
import { 
  MOCK_PROJECT_BASELINES, 
  INITIAL_MOCK_REQUESTS, 
  SYNTHETIC_DATA_BANNER 
} from '../data/mockPortalData';
import { getMdsPortalData } from '../adapters/mdsPortalAdapter';

interface HomeProps {
  onNavigateTab: (tabId: string) => void;
}

export default function Home({ onNavigateTab }: HomeProps) {
  const pendingRequests = INITIAL_MOCK_REQUESTS.filter(r => r.status === 'SUBMITTED');
  const mdsData = getMdsPortalData();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Synthetic Banner */}
      <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400/90 flex items-center justify-between">
        <span>⚠ {SYNTHETIC_DATA_BANNER}</span>
        <span className="text-zinc-500">MDS v1.0 Baseline Read-Only Model (ALAN System Boundary)</span>
      </div>

      {/* Header Profile */}
      <div className="border-b border-zinc-800/60 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
            LONN HTET BROTHER Construction Co., Ltd.
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Employee Operations Portal</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Daily site operations, verified project baselines, and canonical read models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('projects')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Projects Register</span>
          </button>
          <button
            onClick={() => onNavigateTab('mep')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            <span>MEP Operations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 53x26B Canonical Project Financial & Progress Overview Banner */}
      <div className="bg-zinc-900/50 border border-zinc-800/90 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-zinc-800/70 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                CANONICAL BASELINE: {mdsData.projectId}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                MDS v1.0
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                READ-ONLY / ZERO WRITE
              </span>
            </div>
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              {mdsData.projectName}
            </h2>
            <div className="text-xs font-mono text-zinc-400 mt-0.5">
              Client: <span className="text-zinc-300">{mdsData.clientName}</span> • Location: <span className="text-zinc-300">{mdsData.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500">Source: {mdsData.runtimeGuard.canonicalSource}</span>
          </div>
        </div>

        {/* 53x26B Real Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1.5">
              <span>Total Contract Value</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {mdsData.contract.totalContractFormatted}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              Fixed Contract Ceiling (519.9M MMK)
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1.5">
              <span>Verified Received</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">
              {mdsData.contract.receivedFormatted}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              Remittance Confirmed ({mdsData.contract.completionRatePercentage}%)
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1.5">
              <span>Pending Balance</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold font-mono text-amber-400">
              {mdsData.contract.pendingFormatted}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              Remaining Outstanding Balance
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1.5">
              <span>Drawings Schedule</span>
              <FileCode className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {mdsData.drawings.referenceOnlyCount} <span className="text-xs text-amber-400/90 font-mono">Reference</span>
            </div>
            <div className="text-[11px] text-zinc-400 font-mono mt-1">
              Canonical Approved: <strong className="text-zinc-200">{mdsData.drawings.canonicalApprovedCount}</strong> (Pending Sign-off)
            </div>
          </div>
        </div>
      </div>

      {/* Operational Highlights & Milestones Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Milestones Schedule (Highlighting M04 NOT_VERIFIED Guard) */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/60">
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Project 53x26B Payment Milestones Schedule
              </h3>
              <span className="text-xs font-mono text-zinc-500">6 Milestones Baseline</span>
            </div>

            <div className="space-y-2.5">
              {mdsData.milestones.map((ms) => {
                const isM04 = ms.milestoneId === 'M04';

                return (
                  <div 
                    key={ms.milestoneId}
                    className={`p-3 rounded-lg border text-xs font-mono transition-all ${
                      isM04 
                        ? 'bg-amber-950/20 border-amber-500/40' 
                        : 'bg-zinc-950/60 border-zinc-800/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-200 min-w-[36px]">{ms.milestoneId}</span>
                        <span className="text-zinc-300 font-sans font-medium">{ms.name}</span>
                        <span className="text-zinc-500">({ms.percentage}%)</span>
                      </div>

                      <div className="flex items-center gap-3 justify-between sm:justify-end">
                        <span className="font-semibold text-zinc-200">{ms.amountFormatted}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] whitespace-nowrap ${ms.statusBadgeClass}`}>
                          {ms.displayStatus}
                        </span>
                      </div>
                    </div>

                    {/* M04 Guard Callout */}
                    {isM04 && (
                      <div className="mt-2 pt-2 border-t border-amber-500/20 text-[11px] text-amber-300/90 font-sans flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>Precondition Evidenced:</strong> Site structural completion inspected, but client remittance is NOT verified. 
                          <span className="text-zinc-400 font-mono block mt-0.5">Claim trigger: DISABLED (Zero write, no payment claim allowed).</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Canonical Runtime: NOT CONNECTED</span>
            <span>Production Write: DISABLED</span>
          </div>
        </div>

        {/* Drawings Reference & Quick Action */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/60">
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                Engineering Drawings
              </h3>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                REFERENCE ONLY
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-mono mb-4 leading-relaxed bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/70">
              {mdsData.drawings.disclaimer}
            </p>

            <div className="space-y-2">
              {mdsData.drawings.items.map(dwg => (
                <div 
                  key={dwg.drawingId}
                  className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60 text-xs font-mono"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-zinc-300">{dwg.drawingId}</span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                      {dwg.classification}
                    </span>
                  </div>
                  <div className="text-zinc-300 font-sans text-xs truncate">
                    {dwg.title}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-1.5">
                    <span>{dwg.version}</span>
                    <span>{dwg.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/60 text-center">
            <button
              onClick={() => onNavigateTab('projects')}
              className="w-full py-2 rounded-lg bg-zinc-800/70 hover:bg-zinc-800 text-xs font-mono text-zinc-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View In Projects Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
