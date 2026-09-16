import React from 'react';
import { 
  Building2, 
  Calendar, 
  FileCheck, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  DollarSign,
  CheckCircle2,
  Clock,
  FileCode,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { MOCK_PROJECT_BASELINES, SYNTHETIC_DATA_BANNER } from '../data/mockPortalData';
import { getMdsPortalData } from '../adapters/mdsPortalAdapter';

interface ProjectsProps {
  onNavigateToMEP?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigateToMEP }) => {
  const mdsData = getMdsPortalData();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Synthetic Banner */}
      <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400/90 flex items-center justify-between">
        <span>⚠ {SYNTHETIC_DATA_BANNER}</span>
        <span className="text-zinc-500">MDS v1.0 Baseline Read Model (Zero-Write Guard Active)</span>
      </div>

      <div className="border-b border-zinc-800/60 pb-5">
        <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
          Corporate Operations
        </div>
        <h1 className="text-2xl font-bold text-zinc-100">Project Master Register</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Canonical project baselines, verified financial commitments, and authorized milestone schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Real 53x26B Canonical Project Baseline Card */}
        <div className="bg-zinc-900/60 border border-emerald-500/30 rounded-xl p-6 transition-all shadow-lg shadow-black/40">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5 mb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  CANONICAL: {mdsData.projectId}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  MDS v1.0
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  READ-ONLY / ZERO-WRITE
                </span>
              </div>
              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                {mdsData.projectName}
              </h2>
              <div className="text-xs font-mono text-zinc-400 mt-1">
                Client: <span className="text-zinc-200">{mdsData.clientName}</span> • Location: <span className="text-zinc-200">{mdsData.location}</span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <div className="text-xs text-zinc-500 font-mono uppercase">Total Contract Value</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                {mdsData.contract.totalContractFormatted}
              </div>
              <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                519,900,000 MMK Fixed Sum
              </div>
            </div>
          </div>

          {/* Financial Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs font-mono">
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-3.5">
              <div className="text-zinc-500 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified Received Remittance
              </div>
              <div className="text-zinc-100 font-bold text-sm">{mdsData.contract.receivedFormatted}</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">
                {mdsData.contract.completionRatePercentage}% of Contract Ceiling
              </div>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-3.5">
              <div className="text-zinc-500 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Outstanding Balance
              </div>
              <div className="text-zinc-100 font-bold text-sm">{mdsData.contract.pendingFormatted}</div>
              <div className="text-[11px] text-amber-400 mt-0.5">
                Remaining Under Milestones M04-M06
              </div>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-3.5">
              <div className="text-zinc-500 flex items-center gap-1.5 mb-1">
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
                Engineering Drawing Baselines
              </div>
              <div className="text-zinc-100 font-bold text-sm">
                {mdsData.drawings.referenceOnlyCount} Drawings <span className="text-amber-400 text-xs">(REFERENCE ONLY)</span>
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Approved Baseline Count: 0
              </div>
            </div>
          </div>

          {/* Milestones Schedule Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-semibold text-zinc-300">Contractual Payment Milestones Schedule</span>
              <span className="text-zinc-500">MDS v1.0 Schedule Matrix</span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-zinc-800/70 bg-zinc-950/50">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800/80 uppercase">
                  <tr>
                    <th className="px-4 py-2.5">Milestone</th>
                    <th className="px-4 py-2.5">Scope Description</th>
                    <th className="px-4 py-2.5 text-right">% Split</th>
                    <th className="px-4 py-2.5 text-right">Target Amount (MMK)</th>
                    <th className="px-4 py-2.5 text-center">Remittance Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                  {mdsData.milestones.map((m) => {
                    const isM04 = m.milestoneId === 'M04';

                    return (
                      <tr key={m.milestoneId} className={isM04 ? 'bg-amber-950/15' : 'hover:bg-zinc-900/40'}>
                        <td className="px-4 py-3 font-semibold text-emerald-400">{m.milestoneId}</td>
                        <td className="px-4 py-3 font-sans">
                          <div className="text-zinc-200 font-medium">{m.name}</div>
                          {m.statusDetail && (
                            <div className="text-[11px] text-amber-300/90 mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>{m.statusDetail}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right text-zinc-400">{m.percentage}%</td>
                        <td className="px-4 py-3 text-right font-semibold text-zinc-100">{m.amountFormatted}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${m.statusBadgeClass}`}>
                            {m.displayStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 Reference Drawings List */}
          <div className="mb-4 bg-zinc-950/60 border border-zinc-800/70 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 text-xs font-mono">
              <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                Registered Drawing Files (4 Items)
              </span>
              <span className="text-amber-400/90 text-[11px]">
                Classification: REFERENCE_ONLY (Formal sign-off pending)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mdsData.drawings.items.map((dwg) => (
                <div 
                  key={dwg.drawingId}
                  className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/60 text-xs font-mono flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-zinc-200 truncate">{dwg.title}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{dwg.drawingId} • {dwg.version}</div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
                    {dwg.classification}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-zinc-800/70 text-xs font-mono text-zinc-500 gap-2">
            <div>
              Runtime Guard: <strong className="text-zinc-400">{mdsData.runtimeGuard.canonicalSource}</strong> • Write: <strong className="text-zinc-400">{mdsData.runtimeGuard.productionWrite}</strong>
            </div>
            {onNavigateToMEP && (
              <button
                onClick={onNavigateToMEP}
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Navigate to MEP Operations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Existing Baseline Projects (Read-Only) */}
        {MOCK_PROJECT_BASELINES.map((project) => {
          const totalBudget = project.items.reduce((acc, it) => acc + it.totalBudgetCost, 0);

          return (
            <div 
              key={project.projectId}
              className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 transition-all hover:border-zinc-700/80"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-5 mb-5">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {project.projectId}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {project.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-100 mt-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-400" />
                    {project.projectName}
                  </h2>
                </div>

                <div className="text-left md:text-right">
                  <div className="text-xs text-zinc-500 font-mono uppercase">Approved BOQ Budget</div>
                  <div className="text-2xl font-bold font-mono text-zinc-100">
                    ${totalBudget.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                  </div>
                </div>
              </div>

              {/* Baseline Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs font-mono">
                <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-lg p-3">
                  <div className="text-zinc-500 flex items-center gap-1.5 mb-1">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                    BOQ Revision
                  </div>
                  <div className="text-zinc-200 font-semibold">{project.boqRevision}</div>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-lg p-3">
                  <div className="text-zinc-500 flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    Approval Date
                  </div>
                  <div className="text-zinc-200 font-semibold">{project.approvedDate}</div>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-lg p-3">
                  <div className="text-zinc-500 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Authorized By
                  </div>
                  <div className="text-zinc-200 font-semibold truncate" title={project.approvedBy}>
                    {project.approvedBy}
                  </div>
                </div>
              </div>

              {/* Baseline Items Table */}
              <div className="overflow-x-auto rounded-lg border border-zinc-800/60 bg-zinc-950/40 mb-4">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800/80 uppercase">
                    <tr>
                      <th className="px-4 py-2.5">Code</th>
                      <th className="px-4 py-2.5">Description</th>
                      <th className="px-4 py-2.5 text-right">Approved Qty</th>
                      <th className="px-4 py-2.5 text-right">Unit Rate</th>
                      <th className="px-4 py-2.5 text-right">Total Budget</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                    {project.items.map((item) => (
                      <tr key={item.boqCode} className="hover:bg-zinc-800/20">
                        <td className="px-4 py-3 font-semibold text-emerald-400">{item.boqCode}</td>
                        <td className="px-4 py-3 font-sans">
                          <div className="text-zinc-200 font-medium">{item.description}</div>
                          <div className="text-[11px] text-zinc-500">{item.specification}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {item.approvedQty} <span className="text-zinc-500">{item.unit}</span>
                        </td>
                        <td className="px-4 py-3 text-right">${item.approvedUnitCost.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-zinc-100">
                          ${item.totalBudgetCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  Linked Variations (VOs): {project.linkedVO.length > 0 ? project.linkedVO.join(', ') : 'None registered'}
                </div>
                {onNavigateToMEP && (
                  <button
                    onClick={onNavigateToMEP}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                  >
                    Open in MEP Operations
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

