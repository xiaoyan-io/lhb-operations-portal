import { motion } from 'motion/react';
import { ArrowRight, Wrench, PackageSearch, Calculator, FileText } from 'lucide-react';

export default function EventRouting() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-800/50 pb-6">
        <div className="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase mb-3 opacity-80">
          Operational Flow
        </div>
        <h2 className="text-4xl font-bold text-zinc-100 tracking-tight mb-2">
          LONN HTET BROTHER
          <span className="block text-xl font-medium text-zinc-400 mt-1">Construction Co., Ltd.</span>
        </h2>
        <div className="flex items-center gap-4 mt-6">
          <h1 className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Workflow Orchestration
          </h1>
          <span className="text-zinc-600 text-xs font-mono">3D Agent routing via OpenClaw Gateway</span>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 mb-12">
        <h3 className="text-lg font-medium text-zinc-100 mb-8">Example Workflow: Issue Resolution</h3>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 hidden md:block">
            <motion.div
              className="absolute top-1/2 left-0 w-3 h-3 bg-emerald-500 rounded-full -translate-y-1/2 shadow-[0_0_15px_rgba(16,185,129,1)]"
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {/* Step 1 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative group hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <Wrench className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-sm font-medium text-zinc-200 mb-1">1. Engineering</h4>
              <p className="text-xs text-zinc-500 font-mono mb-3">lhb-engbot</p>
              <p className="text-sm text-zinc-400">Receives an issue report from the site.</p>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 bg-zinc-900 rounded-full border border-zinc-800 z-20">
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative group hover:border-amber-500/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                <PackageSearch className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-sm font-medium text-zinc-200 mb-1">2. Procurement</h4>
              <p className="text-xs text-zinc-500 font-mono mb-3">lhb-procbot</p>
              <p className="text-sm text-zinc-400">Checks material availability and sourcing options.</p>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 bg-zinc-900 rounded-full border border-zinc-800 z-20">
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative group hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <Calculator className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-sm font-medium text-zinc-200 mb-1">3. CFO</h4>
              <p className="text-xs text-zinc-500 font-mono mb-3">lhb-finbot</p>
              <p className="text-sm text-zinc-400">Estimates cost and evaluates financial risk.</p>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 bg-zinc-900 rounded-full border border-zinc-800 z-20">
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative group hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="text-sm font-medium text-zinc-200 mb-1">4. Executive Command Assistant</h4>
              <p className="text-xs text-zinc-500 font-mono mb-3">boss</p>
              <p className="text-sm text-zinc-400">Produces a final summary for the Executive Command.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8">
        <h3 className="text-lg font-medium text-zinc-100 mb-6">Network Collaboration Principles</h3>
        <ul className="space-y-4 text-zinc-400 text-sm">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
            <p><strong className="text-zinc-200 font-medium">Autonomous Monitoring:</strong> Each department bot continuously monitors its specific data sources (e.g., markdown files) and communication channels.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
            <p><strong className="text-zinc-200 font-medium">Signal Routing:</strong> When a bot detects an event outside its domain, it routes a structured signal to the appropriate department bot via the OpenClaw Gateway.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
            <p><strong className="text-zinc-200 font-medium">Executive Aggregation:</strong> The Executive Command Assistant (`boss`) subscribes to high-priority alerts from all agents to compile daily radar briefings and situation summaries.</p>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
