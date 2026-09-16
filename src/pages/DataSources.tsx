import { DATA_SOURCES } from '../data';
import { motion } from 'motion/react';
import { FileText, Database, Layout, ArrowRight, Code } from 'lucide-react';

export default function DataSources() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-800/50 pb-6">
        <div className="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase mb-3 opacity-80">
          Intelligence Pipeline
        </div>
        <h2 className="text-4xl font-bold text-zinc-100 tracking-tight mb-2">
          LONN HTET BROTHER
          <span className="block text-xl font-medium text-zinc-400 mt-1">Construction Co., Ltd.</span>
        </h2>
        <div className="flex items-center gap-4 mt-6">
          <h1 className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Data Intelligence
          </h1>
          <span className="text-zinc-600 text-xs font-mono">Data pipeline from markdown files to dashboard views</span>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 mb-12">
        <h3 className="text-lg font-medium text-zinc-100 mb-8">Data Pipeline</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-6 text-center relative w-full">
            <FileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h4 className="font-medium text-zinc-200">Source Files</h4>
            <p className="text-xs text-zinc-500 font-mono mt-1">.md files</p>
          </div>
          
          <ArrowRight className="w-6 h-6 text-zinc-600 rotate-90 md:rotate-0" />
          
          <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-6 text-center relative w-full">
            <Code className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <h4 className="font-medium text-zinc-200">data.py</h4>
            <p className="text-xs text-zinc-500 font-mono mt-1">Python script</p>
          </div>

          <ArrowRight className="w-6 h-6 text-zinc-600 rotate-90 md:rotate-0" />

          <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-6 text-center relative w-full">
            <Database className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h4 className="font-medium text-zinc-200">data.json</h4>
            <p className="text-xs text-zinc-500 font-mono mt-1">JSON output</p>
          </div>

          <ArrowRight className="w-6 h-6 text-zinc-600 rotate-90 md:rotate-0" />

          <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-6 text-center relative w-full">
            <Layout className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h4 className="font-medium text-zinc-200">index.html</h4>
            <p className="text-xs text-zinc-500 font-mono mt-1">Dashboard UI</p>
          </div>
        </div>
      </div>

      {/* Metrics Mapping */}
      <h3 className="text-xl font-medium text-zinc-100 mb-6">Metrics Mapping</h3>
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/50 bg-zinc-950/50">
              <th className="p-4 text-sm font-medium text-zinc-400">Metric</th>
              <th className="p-4 text-sm font-medium text-zinc-400">Source Path</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {DATA_SOURCES.map((source, i) => (
              <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                <td className="p-4 text-sm font-medium text-zinc-200">{source.metric}</td>
                <td className="p-4 text-sm font-mono text-zinc-400">{source.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
