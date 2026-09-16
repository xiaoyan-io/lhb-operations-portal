import React, { useState } from 'react';
import { 
  PackageCheck, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  History,
  FileCheck
} from 'lucide-react';
import { MaterialRequestRecord, MaterialIssueRecord } from '../../types/portal';
import { calculateIssueVariance } from '../../utils/varianceCalculator';

interface MaterialIssueProps {
  requests: MaterialRequestRecord[];
  issues: MaterialIssueRecord[];
  onSubmitNewIssue: (issue: MaterialIssueRecord) => void;
}

export const MaterialIssue: React.FC<MaterialIssueProps> = ({
  requests,
  issues,
  onSubmitNewIssue,
}) => {
  // Only APPROVED requests are valid candidates for issuing
  const approvedRequests = requests.filter(r => r.status === 'APPROVED');

  const [selectedRequestId, setSelectedRequestId] = useState<string>(
    approvedRequests[0]?.requestId || ''
  );
  const [issuedQty, setIssuedQty] = useState<number>(
    approvedRequests[0]?.requestedQty || 0
  );
  const [issuerName, setIssuerName] = useState('Warehouse Storekeeper - U Soe');
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const activeRequest = approvedRequests.find(r => r.requestId === selectedRequestId);
  const approvedQty = activeRequest?.requestedQty || 0;

  // Real-time calculation of Issue Variance
  const varianceEval = calculateIssueVariance(issuedQty, approvedQty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRequest) return;

    const newIssue: MaterialIssueRecord = {
      issueId: `MI-${Date.now().toString().slice(-4)}`,
      requestId: activeRequest.requestId,
      projectId: activeRequest.projectId,
      boqCode: activeRequest.boqCode,
      issuedQty: Number(issuedQty),
      unit: activeRequest.unit,
      issuer: issuerName,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'SUBMITTED', // Phase 1 Submission lifecycle
    };

    onSubmitNewIssue(newIssue);
    setSubmissionFeedback(`Issue dispatch ${newIssue.issueId} logged with status: SUBMITTED.`);
    setTimeout(() => setSubmissionFeedback(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Material Dispatch Form */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/60">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-400" />
              Material Issue Dispatch (Storekeeper Record)
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Dispatch verified against approved Material Requests. Tracks Issue Variance real-time.
            </p>
          </div>
        </div>

        {submissionFeedback && (
          <div className="mb-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {submissionFeedback}
          </div>
        )}

        {approvedRequests.length === 0 ? (
          <div className="p-6 text-center text-xs font-mono text-zinc-500 bg-zinc-950/40 rounded-xl border border-zinc-800/60">
            No APPROVED Material Requests are currently awaiting warehouse dispatch.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Approved Request ID</label>
                <select
                  value={selectedRequestId}
                  onChange={(e) => {
                    setSelectedRequestId(e.target.value);
                    const req = approvedRequests.find(r => r.requestId === e.target.value);
                    if (req) setIssuedQty(req.requestedQty);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
                >
                  {approvedRequests.map(r => (
                    <option key={r.requestId} value={r.requestId}>
                      {r.requestId} ({r.projectId} - {r.itemName} | {r.requestedQty} {r.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Authorized Issuer</label>
                <input
                  type="text"
                  value={issuerName}
                  onChange={(e) => setIssuerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Approved vs Issue Evaluation */}
            {activeRequest && (
              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-zinc-500">Approved Allocation:</span>
                  <div className="text-zinc-200 font-semibold">{approvedQty} {activeRequest.unit}</div>
                </div>
                <div>
                  <span className="text-zinc-500">Actual Outflow:</span>
                  <div className="text-zinc-200 font-semibold">{issuedQty} {activeRequest.unit}</div>
                </div>
                <div>
                  <span className="text-zinc-500">Issue Variance:</span>
                  <div className={`font-semibold ${
                    varianceEval.status === 'REVIEW_REQUIRED'
                      ? 'text-amber-400'
                      : (varianceEval.percentage || 0) > 0 
                      ? 'text-red-400' 
                      : 'text-emerald-400'
                  }`}>
                    {varianceEval.status === 'REVIEW_REQUIRED'
                      ? 'REVIEW_REQUIRED'
                      : `${(varianceEval.percentage || 0) > 0 ? '+' : ''}${varianceEval.percentage}%`}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Actual Quantity Issued</label>
                <input
                  type="number"
                  min="1"
                  value={issuedQty}
                  onChange={(e) => setIssuedQty(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-end justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-mono font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Confirm Warehouse Dispatch
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Dispatched Logs Table */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            Material Issue Log (Warehouse Register)
          </h3>
          <span className="text-xs font-mono text-zinc-500">{issues.length} Dispatches</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-800/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800/80 uppercase">
              <tr>
                <th className="px-4 py-3">Issue ID</th>
                <th className="px-4 py-3">Linked MR</th>
                <th className="px-4 py-3">Project / BOQ</th>
                <th className="px-4 py-3 text-right">Issued Qty</th>
                <th className="px-4 py-3">Issuer</th>
                <th className="px-4 py-3">Dispatch Date</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
              {issues.map((iss) => (
                <tr key={iss.issueId} className="hover:bg-zinc-900/40">
                  <td className="px-4 py-3 font-semibold text-emerald-400">{iss.issueId}</td>
                  <td className="px-4 py-3 text-zinc-400">{iss.requestId}</td>
                  <td className="px-4 py-3">
                    <div className="text-zinc-300">{iss.projectId}</div>
                    <div className="text-[10px] text-zinc-500">{iss.boqCode}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {iss.issuedQty} <span className="text-zinc-500">{iss.unit}</span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{iss.issuer}</td>
                  <td className="px-4 py-3 text-zinc-500">{iss.issueDate}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {iss.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
