import { INFRASTRUCTURE, CRON_JOBS } from '../data';
import { motion } from 'motion/react';
import { Terminal, Globe, Route, Server, Clock } from 'lucide-react';

export default function Infrastructure() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-800/50 pb-6">
        <div className="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase mb-3 opacity-80">
          System Core
        </div>
        <h2 className="text-4xl font-bold text-zinc-100 tracking-tight mb-2">
          LONN HTET BROTHER
          <span className="block text-xl font-medium text-zinc-400 mt-1">Construction Co., Ltd.</span>
        </h2>
        <div className="flex items-center gap-4 mt-6">
          <h1 className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            System Infrastructure
          </h1>
          <span className="text-zinc-600 text-xs font-mono">System components, ports, and external access configuration</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Running Methods */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-medium text-zinc-100">Running Methods</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase mb-2">Start Bots</p>
              <div className="bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-sm text-emerald-400">
                {INFRASTRUCTURE.startBots}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase mb-2">Canvas Service</p>
              <div className="bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-sm text-blue-400">
                {INFRASTRUCTURE.canvasService}
              </div>
            </div>
          </div>
        </div>

        {/* External Access */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium text-zinc-100">External Access URLs</h3>
          </div>
          <div className="space-y-3">
            {INFRASTRUCTURE.externalAccess.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded">
                <span className="text-sm font-medium text-zinc-300">{item.name}</span>
                <a href={item.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-blue-400 hover:underline truncate max-w-[200px] md:max-w-xs">
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* NGINX Routes */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Route className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-medium text-zinc-100">NGINX Routes</h3>
          </div>
          <div className="space-y-2">
            {INFRASTRUCTURE.nginxRoutes.map((route, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded">
                <span className="text-sm font-mono text-purple-400 w-20">{route.path}</span>
                <span className="text-zinc-600">→</span>
                <span className="text-sm text-zinc-300">{route.target}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cron Jobs */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-medium text-zinc-100">Scheduled Tasks (Cron)</h3>
          </div>
          <div className="space-y-3">
            {CRON_JOBS.map((job, i) => (
              <div key={i} className="p-4 bg-zinc-950 border border-zinc-800 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-200">{job.name}</span>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">{job.schedule}</span>
                </div>
                <p className="text-xs text-zinc-500 font-mono">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
