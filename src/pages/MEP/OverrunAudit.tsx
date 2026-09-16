import React, { useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ShieldAlert,
  Search
} from 'lucide-react';
import { 
  MaterialRequestRecord, 
  MaterialIssueRecord, 
  MaterialConsumptionRecord 
} from '../../types/portal';
import { MOCK_PROJECT_BASELINES } from '../../data/mockPortalData';
import { 
  calculateRequestVariance, 
  calculateIssueVariance, 
  calculateConsumptionVariance, 
  calculateCostVariance 
} from '../../utils/varianceCalculator';

interface OverrunAuditProps {
  requests: MaterialRequestRecord[];
  issues: MaterialIssueRecord[];
  consumptions: MaterialConsumptionRecord[];
}

export const OverrunAudit: React.FC<OverrunAuditProps> = ({
  requests,
  issues,
  consumptions,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState(MOCK_PROJECT_BASELINES[0].projectId);
  const project = MOCK_PROJECT_BASELINES.find(p => p.projectId === selectedProjectId) || MOCK_PROJECT_BASELINES[0];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Four-Dimensional Overrun & Variance Audit
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Mathematical breakdown across Request, Issue, Consumption, and Cost variances. Handled for zero denominators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-zinc-400">Project:</label>
          <select 
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-zinc-950 border border-zinc-700/80 text-zinc-200 text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            {MOCK_PROJECT_BASELINES.map(p => (
              <option key={p.projectId} value={p.projectId}>{p.projectId}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Variance Dimension Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3">
          <div className="text-zinc-400 font-semibold mb-1">1. Request Variance</div>
          <div className="text-[11px] text-zinc-500">(Requested - Baseline) / Baseline</div>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3">
          <div className="text-zinc-400 font-semibold mb-1">2. Issue Variance</div>
          <div className="text-[11px] text-zinc-500">(Issued - Approved Req) / Req</div>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3">
          <div className="text-zinc-400 font-semibold mb-1">3. Consumption Variance</div>
          <div className="text-[11px] text-zinc-500">(Consumed - Baseline Cons) / Cons</div>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3">
          <div className="text-zinc-400 font-semibold mb-1">4. Cost Variance</div>
          <div className="text-[11px] text-zinc-500">(Actual Cost - Budget) / Budget</div>
        </div>
      </div>

      {/* Main Audit Matrix Table */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5">
        <div className="overflow-x-auto rounded-lg border border-zinc-800/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800/80 uppercase">
              <tr>
                <th className="px-4 py-3">BOQ Code</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-3 py-3 text-right">Baseline Qty</th>
                <th className="px-3 py-3 text-center">Req Variance</th>
                <th className="px-3 py-3 text-center">Issue Variance</th>
                <th className="px-3 py-3 text-center">Cons Variance</th>
                <th className="px-3 py-3 text-center">Cost Variance</th>
                <th className="px-3 py-3 text-center">Audit Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
              {project.items.map((item) => {
                // Aggregated quantities for this project and BOQ code
                const itemRequests = requests.filter(r => r.projectId === selectedProjectId && r.boqCode === item.boqCode);
                const totalRequested = itemRequests.reduce((sum, r) => sum + r.requestedQty, 0);
                const approvedRequestsTotal = itemRequests
                  .filter(r => r.status === 'APPROVED')
                  .reduce((sum, r) => sum + r.requestedQty, 0);

                const itemIssues = issues.filter(i => i.projectId === selectedProjectId && i.boqCode === item.boqCode);
                const totalIssued = itemIssues.reduce((sum, i) => sum + i.issuedQty, 0);

                const itemConsumptions = consumptions.filter(c => c.projectId === selectedProjectId && c.boqCode === item.boqCode);
                const totalConsumed = itemConsumptions.reduce((sum, c) => sum + c.actualConsumedQty, 0);

                // Variances computed strictly via utility
                const reqVar = calculateRequestVariance(totalRequested, item.approvedQty);
                const issVar = calculateIssueVariance(totalIssued, approvedRequestsTotal);
                const conVar = calculateConsumptionVariance(totalConsumed, item.approvedQty);

                const actualCostEstimate = totalIssued * item.approvedUnitCost;
                const costVar = calculateCostVariance(actualCostEstimate, item.totalBudgetCost);

                const hasWarning = 
                  reqVar.status === 'NO_BASELINE' ||
                  issVar.status === 'REVIEW_REQUIRED' ||
                  (reqVar.percentage || 0) > 0 ||
                  (issVar.percentage || 0) > 0;

                return (
                  <tr key={item.boqCode} className="hover:bg-zinc-900/50">
                    <td className="px-4 py-3 font-semibold text-emerald-400">{item.boqCode}</td>
                    <td className="px-4 py-3 font-sans max-w-xs">
                      <div className="text-zinc-200 font-medium truncate" title={item.description}>
                        {item.description}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right">
                      {item.approvedQty} <span className="text-zinc-500">{item.unit}</span>
                    </td>

                    {/* Request Variance Cell */}
                    <td className="px-3 py-3 text-center">
                      {reqVar.status === 'NO_BASELINE' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          NO_BASELINE
                        </span>
                      ) : (
                        <span className={`font-semibold ${
                          (reqVar.percentage || 0) > 0 ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {(reqVar.percentage || 0) > 0 ? '+' : ''}{reqVar.percentage}%
                        </span>
                      )}
                    </td>

                    {/* Issue Variance Cell */}
                    <td className="px-3 py-3 text-center">
                      {issVar.status === 'REVIEW_REQUIRED' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          REVIEW_REQUIRED
                        </span>
                      ) : (
                        <span className={`font-semibold ${
                          (issVar.percentage || 0) > 0 ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {(issVar.percentage || 0) > 0 ? '+' : ''}{issVar.percentage}%
                        </span>
                      )}
                    </td>

                    {/* Consumption Variance Cell */}
                    <td className="px-3 py-3 text-center">
                      {conVar.status === 'NO_BASELINE' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          NO_BASELINE
                        </span>
                      ) : (
                        <span className={`font-semibold ${
                          (conVar.percentage || 0) > 0 ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {(conVar.percentage || 0) > 0 ? '+' : ''}{conVar.percentage}%
                        </span>
                      )}
                    </td>

                    {/* Cost Variance Cell */}
                    <td className="px-3 py-3 text-center">
                      {costVar.status === 'NO_BASELINE' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          NO_BASELINE
                        </span>
                      ) : (
                        <span className={`font-semibold ${
                          (costVar.percentage || 0) > 0 ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {(costVar.percentage || 0) > 0 ? '+' : ''}{costVar.percentage}%
                        </span>
                      )}
                    </td>

                    {/* Verdict */}
                    <td className="px-3 py-3 text-center">
                      {hasWarning ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <AlertTriangle className="w-3 h-3" />
                          FLAGGED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          COMPLIANT
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
