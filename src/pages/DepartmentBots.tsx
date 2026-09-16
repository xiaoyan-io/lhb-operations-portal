import { DEPARTMENTS } from '../data';
import { motion } from 'motion/react';
import { Server, Folder, Activity, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DepartmentBots() {
  const [botStatuses, setBotStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/bots/status')
      .then(res => res.json())
      .then(data => {
        if (data.mock && data.data) {
          setBotStatuses(data.data);
        } else if (data.success && data.data) {
          // If real, we need to map the output lines to bots.
          // This is a simplified mapping assuming the output order matches or we can parse it.
          // For now, if we get raw lines, we might just set them all to active if they exist.
          const statuses: Record<string, string> = {};
          DEPARTMENTS.forEach((dept, index) => {
            statuses[`openclaw-gateway-${dept.bot}`] = data.data[index] || 'unknown';
          });
          setBotStatuses(statuses);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-800/50 pb-6">
        <div className="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase mb-3 opacity-80">
          Agent Network
        </div>
        <h2 className="text-4xl font-bold text-zinc-100 tracking-tight mb-2">
          LONN HTET BROTHER
          <span className="block text-xl font-medium text-zinc-400 mt-1">Construction Co., Ltd.</span>
        </h2>
        <div className="flex items-center gap-4 mt-6">
          <h1 className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Agent Network
          </h1>
          <span className="text-zinc-600 text-xs font-mono">Active 3D agents managing corporate operations</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPARTMENTS.map((dept, i) => {
          const status = botStatuses[`openclaw-gateway-${dept.bot}`] || dept.status;
          const isRunning = status === 'active' || status === 'running';

          return (
            <motion.div 
              key={dept.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 hover:border-emerald-500/30 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-zinc-100">{dept.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Terminal className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs font-mono text-zinc-400">{dept.bot}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${isRunning ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isRunning ? 'text-emerald-400' : 'text-red-400'}`}>
                    {status}
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-400 mb-6 min-h-[40px]">
                {dept.purpose}
              </p>

              <div className="space-y-3 pt-4 border-t border-zinc-800/50">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Server className="w-3.5 h-3.5" />
                    <span>Port</span>
                  </div>
                  <span className="font-mono text-zinc-300">{dept.port}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Folder className="w-3.5 h-3.5" />
                    <span>Data Folder</span>
                  </div>
                  <span className="font-mono text-zinc-300 truncate max-w-[150px]" title={dept.folder}>
                    {dept.folder}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Uptime</span>
                  </div>
                  <span className={`font-mono ${isRunning ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {isRunning ? '99.9%' : '0.0%'}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
