import React from 'react';
import { FileText, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { SYNTHETIC_DATA_BANNER } from '../data/mockPortalData';

interface DocumentItem {
  id: string;
  category: 'Approved Standards' | 'Technical References' | 'Project Specifications';
  title: string;
  code: string;
  revision: string;
  effectiveDate: string;
  status: 'CURRENT' | 'ARCHIVED';
  description: string;
}

const DOCUMENTS_LIST: DocumentItem[] = [
  {
    id: 'DOC-01',
    category: 'Approved Standards',
    title: 'Approved Standards / Technical References - General MEP Installation Standards',
    code: 'LHB-STD-MEP-001',
    revision: 'Rev.2',
    effectiveDate: '2026-01-01',
    status: 'CURRENT',
    description: 'General installation clearances, testing procedures, and quality sign-off gates across all MEP disciplines.',
  },
  {
    id: 'DOC-02',
    category: 'Project Specifications',
    title: 'HVAC Ductwork & Chilled Water Piping Technical Specification',
    code: 'SPEC-YGN-HVAC-01',
    revision: 'Rev.B',
    effectiveDate: '2026-01-15',
    status: 'CURRENT',
    description: 'Approved materials, sheet thickness schedules, insulation requirements, and hydro-testing criteria.',
  },
  {
    id: 'DOC-03',
    category: 'Project Specifications',
    title: 'Low Voltage Electrical Distribution & Cable Containment Specification',
    code: 'SPEC-YGN-ELE-02',
    revision: 'Rev.A',
    effectiveDate: '2026-01-20',
    status: 'CURRENT',
    description: 'Armoured cable sizing conventions, tray installation standards, and earthing bonding schedules.',
  },
  {
    id: 'DOC-04',
    category: 'Approved Standards',
    title: 'Approved Standards / Technical References - Plumbing & Drainage Pressure Testing',
    code: 'LHB-STD-PLM-004',
    revision: 'Rev.1',
    effectiveDate: '2025-11-01',
    status: 'CURRENT',
    description: 'Hydrostatic pressure hold durations, gauge calibrations, and joint inspection checklists for potable & drainage systems.',
  }
];

export const Documents: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Synthetic Banner */}
      <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400/90 flex items-center justify-between">
        <span>⚠ {SYNTHETIC_DATA_BANNER}</span>
        <span className="text-zinc-500">Read-Only Document Index</span>
      </div>

      <div className="border-b border-zinc-800/60 pb-5">
        <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
          Technical Repository
        </div>
        <h1 className="text-2xl font-bold text-zinc-100">Approved Documents & References</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Standard operational specifications, approved technical references, and project engineering schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DOCUMENTS_LIST.map((doc) => (
          <div 
            key={doc.id}
            className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {doc.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {doc.status}
                </span>
              </div>

              <h2 className="text-base font-semibold text-zinc-100 mb-1 flex items-start gap-2">
                <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>{doc.title}</span>
              </h2>

              <p className="text-xs text-zinc-400 font-sans mt-2 mb-4 leading-relaxed">
                {doc.description}
              </p>
            </div>

            <div className="border-t border-zinc-800/60 pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div>
                <span>Ref: <strong className="text-zinc-300">{doc.code}</strong></span>
                <span className="mx-2">•</span>
                <span>{doc.revision}</span>
              </div>

              <button 
                onClick={() => alert(`Read model placeholder: Document [${doc.code}] is securely referenced in ALAN system repository.`)}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>View Spec</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
