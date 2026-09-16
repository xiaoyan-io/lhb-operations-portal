import React from 'react';
import { Layers } from 'lucide-react';

interface SubmoduleSkeletonProps {
  title: string;
  subsystem: string;
  description: string;
  keyFields: string[];
}

export const SubmoduleSkeleton: React.FC<SubmoduleSkeletonProps> = ({
  title,
  subsystem,
  description,
  keyFields,
}) => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-8 text-center flex flex-col items-center">
      <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-emerald-400 mb-4">
        <Layers className="w-6 h-6" />
      </div>
      <div className="text-xs font-mono text-emerald-400 uppercase mb-1">{subsystem}</div>
      <h3 className="text-lg font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-xs text-zinc-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      <div className="w-full max-w-md bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-4 text-left mb-6">
        <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
          Design Schema Preview (Phase 2 Interface)
        </div>
        <div className="grid grid-cols-2 gap-2">
          {keyFields.map((f, i) => (
            <div key={i} className="text-xs font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1.5 rounded border border-zinc-800/60">
              • {f}
            </div>
          ))}
        </div>
      </div>

      <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
        <span>UI Skeleton Reserved</span>
        <span>•</span>
        <span>Awaiting Phase 2 ALAN Runtime Integration</span>
      </div>
    </div>
  );
};
