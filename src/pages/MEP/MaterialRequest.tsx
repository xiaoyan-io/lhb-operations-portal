import React, { useState } from 'react';
import { 
  FileEdit, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  History,
  Plus
} from 'lucide-react';
import { MaterialRequestRecord, SubmissionLifecycleStatus } from '../../types/portal';
import { MOCK_PROJECT_BASELINES } from '../../data/mockPortalData';
import { calculateRequestVariance } from '../../utils/varianceCalculator';

interface MaterialRequestProps {
  requests: MaterialRequestRecord[];
  onSubmitNewRequest: (req: MaterialRequestRecord) => void;
}

export const MaterialRequest: React.FC<MaterialRequestProps> = ({
  requests,
  onSubmitNewRequest,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState(MOCK_PROJECT_BASELINES[0].projectId);
  const [selectedBoqCode, setSelectedBoqCode] = useState(MOCK_PROJECT_BASELINES[0].items[0].boqCode);
  const [requestedQty, setRequestedQty] = useState<number>(50);
  const [requestorName, setRequestorName] = useState('Site MEP Engineer');
  const [notes, setNotes] = useState('');
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const currentProject = MOCK_PROJECT_BASELINES.find(p => p.projectId === selectedProjectId) || MOCK_PROJECT_BASELINES[0];
  const currentItem = currentProject.items.find(it => it.boqCode === selectedBoqCode) || currentProject.items[0];

  // Evaluate baseline availability
  const baselineQty = currentItem.approvedQty;
  const varianceEval = calculateRequestVariance(requestedQty, baselineQty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: MaterialRequestRecord = {
      requestId: `MR-${Date.now().toString().slice(-4)}`,
      projectId: selectedProjectId,
      boqCode: selectedBoqCode,
      itemName: currentItem.description,
      requestedQty: Number(requestedQty),
      unit: currentItem.unit,
      requestor: requestorName,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'SUBMITTED', // Strictly initialized as SUBMITTED (never automatically CANONICAL)
      notes: notes || 'Standard site material requisition',
    };

    onSubmitNewRequest(newRecord);
    setSubmissionFeedback(`Request ${newRecord.requestId} recorded in state with status: SUBMITTED.`);
    setTimeout(() => setSubmissionFeedback(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Requisition Submission Interface */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/60">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-emerald-400" />
              Site Material Request (MR Submission Interface)
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Submission Lifecycle: SUBMITTED → REVIEWED → APPROVED / REJECTED (Canonical status reserved for ALAN backend)
            </p>
          </div>
        </div>

        {submissionFeedback && (
          <div className="mb-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {submissionFeedback}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Target Project</label>
              <select
                value={selectedProjectId}
                onChange={(e) => {
                  setSelectedProjectId(e.target.value);
                  const p = MOCK_PROJECT_BASELINES.find(proj => proj.projectId === e.target.value);
                  if (p && p.items.length > 0) setSelectedBoqCode(p.items[0].boqCode);
                }}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                {MOCK_PROJECT_BASELINES.map(p => (
                  <option key={p.projectId} value={p.projectId}>{p.projectId} - {p.projectName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">BOQ Line Item</label>
              <select
                value={selectedBoqCode}
                onChange={(e) => setSelectedBoqCode(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                {currentProject.items.map(it => (
                  <option key={it.boqCode} value={it.boqCode}>
                    [{it.boqCode}] {it.description.substring(0, 36)}... (Approved: {it.approvedQty} {it.unit})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Baseline Allocation Callout */}
          <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500">Approved Baseline:</span>
              <div className="text-zinc-200 font-semibold">{baselineQty} {currentItem.unit}</div>
            </div>
            <div>
              <span className="text-zinc-500">Rate Benchmark:</span>
              <div className="text-zinc-200">${currentItem.approvedUnitCost.toFixed(2)} USD</div>
            </div>
            <div>
              <span className="text-zinc-500">Request Evaluation:</span>
              <div className={`font-semibold ${
                varianceEval.status === 'NO_BASELINE' 
                  ? 'text-amber-400' 
                  : (varianceEval.percentage || 0) > 0 
                  ? 'text-red-400' 
                  : 'text-emerald-400'
              }`}>
                {varianceEval.status === 'NO_BASELINE' 
                  ? 'NO_BASELINE' 
                  : `${(varianceEval.percentage || 0) > 0 ? '+' : ''}${varianceEval.percentage}%`}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Quantity to Request</label>
              <input
                type="number"
                min="1"
                value={requestedQty}
                onChange={(e) => setRequestedQty(Math.max(1, Number(e.target.value)))}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Requestor Identity</label>
              <input
                type="text"
                value={requestorName}
                onChange={(e) => setRequestorName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Justification Notes</label>
              <input
                type="text"
                placeholder="Installation location or riser reference"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="text-[11px] text-zinc-500 font-mono">
              Note: Submitting registers a record with status <strong className="text-zinc-400">SUBMITTED</strong>.
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Material Request
            </button>
          </div>
        </form>
      </div>

      {/* Requisition Log (Read Model) */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            Material Request Register (Read Model)
          </h3>
          <span className="text-xs font-mono text-zinc-500">{requests.length} Records</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-800/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800/80 uppercase">
              <tr>
                <th className="px-4 py-3">Request ID</th>
                <th className="px-4 py-3">Project / BOQ</th>
                <th className="px-4 py-3">Item Description</th>
                <th className="px-4 py-3 text-right">Qty</th>
                <th className="px-4 py-3">Requestor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Lifecycle Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
              {requests.map((r) => (
                <tr key={r.requestId} className="hover:bg-zinc-900/40">
                  <td className="px-4 py-3 font-semibold text-emerald-400">{r.requestId}</td>
                  <td className="px-4 py-3">
                    <div className="text-zinc-300">{r.projectId}</div>
                    <div className="text-[10px] text-zinc-500">{r.boqCode}</div>
                  </td>
                  <td className="px-4 py-3 font-sans text-zinc-200">{r.itemName}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {r.requestedQty} <span className="text-zinc-500">{r.unit}</span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{r.requestor}</td>
                  <td className="px-4 py-3 text-zinc-500">{r.requestDate}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      r.status === 'APPROVED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : r.status === 'SUBMITTED'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {r.status}
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
