import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { MOCK_PROJECT_BASELINES, MOCK_PRICEBOOK, MOCK_RULEBOOK } from '../../data/mockPortalData';
import { PricebookItem } from '../../types/portal';

export const BOQEstimation: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(MOCK_PROJECT_BASELINES[0].projectId);
  const [searchTerm, setSearchTerm] = useState('');

  const project = MOCK_PROJECT_BASELINES.find(p => p.projectId === selectedProjectId) || MOCK_PROJECT_BASELINES[0];

  // Helper to test if a Pricebook item is usable in Phase 1: VERIFIED + valid date
  const isUsablePrice = (item: PricebookItem): boolean => {
    if (item.verificationStatus !== 'VERIFIED') return false;
    if (!item.verifiedPrice) return false;
    const now = new Date('2026-09-15'); // Controlled current date
    const start = new Date(item.effectiveDate);
    const end = new Date(item.expiryDate);
    return now >= start && now <= end;
  };

  const verifiedPrices = MOCK_PRICEBOOK.filter(isUsablePrice);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            BOQ Estimation & Baseline Schedule
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Read-only examination of approved project baselines coupled with verified market cost benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-zinc-400">Active Project:</label>
          <select 
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-zinc-950 border border-zinc-700/80 text-zinc-200 text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            {MOCK_PROJECT_BASELINES.map(p => (
              <option key={p.projectId} value={p.projectId}>{p.projectId} - {p.projectName.substring(0, 24)}...</option>
            ))}
          </select>
        </div>
      </div>

      {/* Baseline Overview Card */}
      <div className="bg-zinc-950/50 border border-zinc-800/70 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-800/60 text-xs font-mono">
          <div>
            <span className="text-zinc-500">BOQ Revision: </span>
            <span className="text-emerald-400 font-bold">{project.boqRevision}</span>
          </div>
          <div>
            <span className="text-zinc-500">Approved Date: </span>
            <span className="text-zinc-200">{project.approvedDate}</span>
          </div>
          <div>
            <span className="text-zinc-500">Approved By: </span>
            <span className="text-zinc-200">{project.approvedBy}</span>
          </div>
          <div>
            <span className="text-zinc-500">Total Lines: </span>
            <span className="text-zinc-200">{project.items.length} Items</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter BOQ code or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Table of Baseline Items */}
        <div className="overflow-x-auto rounded-lg border border-zinc-800/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800/80 uppercase">
              <tr>
                <th className="px-4 py-3">BOQ Code</th>
                <th className="px-4 py-3">Description & Specification</th>
                <th className="px-4 py-3 text-right">Approved Qty</th>
                <th className="px-4 py-3 text-right">Approved Rate</th>
                <th className="px-4 py-3 text-right">Total Budget</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
              {project.items
                .filter(it => 
                  it.boqCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  it.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <tr key={item.boqCode} className="hover:bg-zinc-900/40">
                    <td className="px-4 py-3 font-semibold text-emerald-400">{item.boqCode}</td>
                    <td className="px-4 py-3 font-sans">
                      <div className="text-zinc-200 font-medium">{item.description}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">{item.specification}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.approvedQty} <span className="text-zinc-500">{item.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-right">${item.approvedUnitCost.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-zinc-100">
                      ${item.totalBudgetCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        BASELINE LOCKED
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Pricebook Reference Panel */}
      <div className="bg-zinc-900/30 border border-zinc-800/70 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verified Pricebook Matrix (Active Benchmarks)
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Strict Rule: Official cost computations only consume items with <code className="text-emerald-400 font-mono">VERIFIED</code> status and active effective dates.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-500">{verifiedPrices.length} Active Verified Items</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_PRICEBOOK.map((pb) => {
            const isUsable = isUsablePrice(pb);

            return (
              <div 
                key={pb.id}
                className={`p-3.5 rounded-lg border text-xs font-mono transition-all ${
                  isUsable 
                    ? 'bg-zinc-950/60 border-zinc-800/80 text-zinc-300' 
                    : 'bg-zinc-950/30 border-zinc-800/40 text-zinc-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-emerald-400/90">{pb.itemCode}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    pb.verificationStatus === 'VERIFIED'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {pb.verificationStatus}
                  </span>
                </div>

                <div className="text-zinc-200 font-sans font-medium text-xs mb-1">{pb.itemName}</div>
                <div className="text-[11px] text-zinc-400 mb-2">Supplier: {pb.supplier}</div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-zinc-800/60">
                  <div>
                    <span className="text-zinc-500">Quoted: </span>
                    <span>${pb.quotedPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Verified: </span>
                    <span className="font-bold text-emerald-400">
                      {pb.verifiedPrice ? `$${pb.verifiedPrice.toFixed(2)}` : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-zinc-500 flex items-center justify-between">
                  <span>Valid: {pb.effectiveDate} to {pb.expiryDate}</span>
                  <span>Doc: {pb.evidenceRef}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
