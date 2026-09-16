import React from 'react';
import { Construction, ArrowLeft, Clock } from 'lucide-react';
import { SYNTHETIC_DATA_BANNER } from '../data/mockPortalData';

interface PlaceholderPageProps {
  title: string;
  category: string;
  description: string;
  plannedFeatures: string[];
  onBackToHome?: () => void;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  category,
  description,
  plannedFeatures,
  onBackToHome,
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Synthetic Banner */}
      <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400/90 flex items-center justify-between">
        <span>⚠ {SYNTHETIC_DATA_BANNER}</span>
        <span className="text-zinc-500">Read Model & Submission Interface</span>
      </div>

      <div className="border-b border-zinc-800/60 pb-5 flex items-center justify-between">
        <div>
          <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
            {category}
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">{title}</h1>
        </div>
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
        )}
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
          <Construction className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-200 mb-2">{title} Module</h2>
        <p className="text-zinc-400 text-sm max-w-md mb-6 leading-relaxed">
          {description}
        </p>

        <div className="w-full max-w-lg bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-5 text-left mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            Phase 2 Scope & Capabilities
          </div>
          <ul className="space-y-2 text-xs text-zinc-400 font-sans">
            {plannedFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 mt-1.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-zinc-500 font-mono">
          Submission state lifecycle will route directly to ALAN System runtime during Phase 2.
        </div>
      </div>
    </div>
  );
};
