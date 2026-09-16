import React, { useState } from 'react';
import { 
  Calculator, 
  FileEdit, 
  PackageCheck, 
  RotateCcw, 
  Activity, 
  DollarSign, 
  BarChart3, 
  FileSpreadsheet 
} from 'lucide-react';
import { 
  MaterialRequestRecord, 
  MaterialIssueRecord, 
  MaterialConsumptionRecord 
} from '../../types/portal';
import { 
  INITIAL_MOCK_REQUESTS, 
  INITIAL_MOCK_ISSUES, 
  INITIAL_MOCK_CONSUMPTION, 
  SYNTHETIC_DATA_BANNER 
} from '../../data/mockPortalData';
import { BOQEstimation } from './BOQEstimation';
import { MaterialRequest } from './MaterialRequest';
import { MaterialIssue } from './MaterialIssue';
import { OverrunAudit } from './OverrunAudit';
import { SubmoduleSkeleton } from './SubmoduleSkeleton';

type MEPSubmodule = 
  | 'boq' 
  | 'mr' 
  | 'mi' 
  | 'return' 
  | 'progress' 
  | 'budget' 
  | 'overrun' 
  | 'vo';

export const MEP: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<MEPSubmodule>('boq');

  // Local state flow for Phase 1 demo without writing to remote database
  const [requests, setRequests] = useState<MaterialRequestRecord[]>(INITIAL_MOCK_REQUESTS);
  const [issues, setIssues] = useState<MaterialIssueRecord[]>(INITIAL_MOCK_ISSUES);
  const [consumptions, setConsumptions] = useState<MaterialConsumptionRecord[]>(INITIAL_MOCK_CONSUMPTION);

  const handleNewRequest = (newReq: MaterialRequestRecord) => {
    setRequests(prev => [newReq, ...prev]);
  };

  const handleNewIssue = (newIss: MaterialIssueRecord) => {
    setIssues(prev => [newIss, ...prev]);
  };

  const SUBMODULES = [
    { id: 'boq', label: 'BOQ Estimation', icon: Calculator, status: 'Active' },
    { id: 'mr', label: 'Material Request', icon: FileEdit, status: 'Active' },
    { id: 'mi', label: 'Material Issue', icon: PackageCheck, status: 'Active' },
    { id: 'overrun', label: 'Overrun Audit', icon: BarChart3, status: 'Active' },
    { id: 'return', label: 'Material Return', icon: RotateCcw, status: 'Skeleton' },
    { id: 'progress', label: 'Installation Progress', icon: Activity, status: 'Skeleton' },
    { id: 'budget', label: 'Budget vs Actual', icon: DollarSign, status: 'Skeleton' },
    { id: 'vo', label: 'Variation / VO', icon: FileSpreadsheet, status: 'Skeleton' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Synthetic Banner */}
      <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400/90 flex items-center justify-between">
        <span>⚠ {SYNTHETIC_DATA_BANNER}</span>
        <span className="text-zinc-500">MEP Engine Read Model & Submission Frontend</span>
      </div>

      <div className="border-b border-zinc-800/60 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
            Technical Operations
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">MEP Operations & Quantity Engineering</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Baseline allocation, verified price auditing, and four-dimensional variance governance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>LHB_MEP_ENGINE (v1.0.0__DEV Backend)</span>
        </div>
      </div>

      {/* Submodule Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-800/70 scrollbar-none">
        {SUBMODULES.map((sub) => {
          const Icon = sub.icon;
          const isActive = activeSubTab === sub.id;
          const isSkeleton = sub.status === 'Skeleton';

          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id as MEPSubmodule)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sub.label}</span>
              {isSkeleton && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-500 border border-zinc-700/50">
                  Phase 2
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Submodule Content Panels */}
      <div>
        {activeSubTab === 'boq' && <BOQEstimation />}
        {activeSubTab === 'mr' && (
          <MaterialRequest 
            requests={requests} 
            onSubmitNewRequest={handleNewRequest} 
          />
        )}
        {activeSubTab === 'mi' && (
          <MaterialIssue 
            requests={requests} 
            issues={issues} 
            onSubmitNewIssue={handleNewIssue} 
          />
        )}
        {activeSubTab === 'overrun' && (
          <OverrunAudit 
            requests={requests} 
            issues={issues} 
            consumptions={consumptions} 
          />
        )}

        {/* Skeletons */}
        {activeSubTab === 'return' && (
          <SubmoduleSkeleton 
            title="Material Return Handling"
            subsystem="Warehouse Management"
            description="Reconciliation and return registration for surplus pipes, wiring cut-offs, and salvageable fittings back into project stock."
            keyFields={['Return Voucher ID', 'Original Issue Reference', 'Reusable vs Scrap Qty', 'Storekeeper Inspection']}
          />
        )}
        {activeSubTab === 'progress' && (
          <SubmoduleSkeleton 
            title="Physical Installation Progress"
            subsystem="Site Engineering"
            description="Progress claim verification by floor, system risers, and test pressure milestones to prevent over-billing."
            keyFields={['Zone / Level ID', 'Physical % Installed', 'Hydro/Megger Test Certificate', 'Site Inspector Sign-off']}
          />
        )}
        {activeSubTab === 'budget' && (
          <SubmoduleSkeleton 
            title="Budget vs Actual Variance Ledger"
            subsystem="Cost Control"
            description="High-level project gross financial performance tracking matching baseline contracts against actual procurement costs."
            keyFields={['Committed Cost', 'Actual Incurred Cost', 'Forecast at Completion', 'Cost Performance Index (CPI)']}
          />
        )}
        {activeSubTab === 'vo' && (
          <SubmoduleSkeleton 
            title="Variation Orders (VO) Management"
            subsystem="Commercial & Contracts"
            description="Formal tracking of client-instructed site deviations, architect sketches, and quantity additions to update project baselines."
            keyFields={['VO Notice Reference', 'Architect Instruction (AI)', 'Estimated Addition Qty', 'Client Approval Status']}
          />
        )}
      </div>
    </div>
  );
};
