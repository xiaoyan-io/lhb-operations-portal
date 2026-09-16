import { DEPARTMENTS } from '../data';
import { motion } from 'motion/react';
import { MessageCircle, Send, Users, ShieldAlert } from 'lucide-react';

export default function Communication() {
  const bossBot = DEPARTMENTS.find(d => d.id === 'boss');
  const otherBots = DEPARTMENTS.filter(d => d.id !== 'boss');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-800/50 pb-6">
        <div className="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase mb-3 opacity-80">
          Communication Layer
        </div>
        <h2 className="text-4xl font-bold text-zinc-100 tracking-tight mb-2">
          LONN HTET BROTHER
          <span className="block text-xl font-medium text-zinc-400 mt-1">Construction Co., Ltd.</span>
        </h2>
        <div className="flex items-center gap-4 mt-6">
          <h1 className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Communications Hub
          </h1>
          <span className="text-zinc-600 text-xs font-mono">Mapping of Telegram bots to department profiles</span>
        </div>
      </div>

      {/* Chairman Assistant Highlight */}
      {bossBot && (
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-emerald-500/30 rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldAlert className="w-32 h-32 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-100">Executive Command Assistant</h2>
                <p className="text-emerald-400/80 text-sm font-mono mt-1">{bossBot.tg}</p>
              </div>
            </div>
            
            <p className="text-zinc-300 max-w-2xl mb-8 leading-relaxed">
              The primary interface for the Executive Command. This bot aggregates intelligence from all other department agents, provides daily radar briefings, and can trigger company-wide decisions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-950/50 rounded-lg p-4 border border-zinc-800/50">
                <h4 className="text-xs font-mono text-zinc-500 uppercase mb-2">Capabilities</h4>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Company Employee Search</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Secretary Reply</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Decision Trigger</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Situation Summary</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Department Bots Grid */}
      <h3 className="text-xl font-medium text-zinc-100 mt-12 mb-6">Department Channels</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherBots.map((dept, i) => (
          <motion.div 
            key={dept.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 flex items-start gap-4"
          >
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 mt-1">
              <Send className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-medium text-zinc-100">{dept.name}</h4>
              <p className="text-sm font-mono text-blue-400/80 mt-1 mb-3">{dept.tg}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {dept.bot}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
