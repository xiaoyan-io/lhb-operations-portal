import { useState } from 'react';
import { 
  Home as HomeIcon, 
  CheckSquare, 
  Building2, 
  MapPin, 
  Wrench, 
  ShoppingCart, 
  CreditCard, 
  FileText, 
  AlertCircle, 
  Bell, 
  LogOut,
  Shield,
  ChevronDown,
  ChevronUp,
  Server,
  Bot,
  MessageSquare,
  Database,
  GitMerge,
  LayoutDashboard
} from 'lucide-react';
import { useFirebase } from './context/FirebaseContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { cn } from './lib/utils';
import { Logo } from './components/Logo';
import { PlaceholderPage } from './components/PlaceholderPage';

// Phase 1 Employee Core Pages
import Home from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Documents } from './pages/Documents';
import { MEP } from './pages/MEP';

// Preserved Legacy Technical View Components (Isolated to UI Admin Group)
import DepartmentBots from './pages/DepartmentBots';
import Communication from './pages/Communication';
import DataSources from './pages/DataSources';
import EventRouting from './pages/EventRouting';
import Infrastructure from './pages/Infrastructure';

// Employee Primary Navigation (10 Business Items)
const EMPLOYEE_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon, implemented: true },
  { id: 'tasks', label: 'My Tasks', icon: CheckSquare, implemented: false },
  { id: 'projects', label: 'Projects', icon: Building2, implemented: true },
  { id: 'site-updates', label: 'Site Updates', icon: MapPin, implemented: false },
  { id: 'mep', label: 'MEP', icon: Wrench, implemented: true },
  { id: 'purchasing', label: 'Purchasing', icon: ShoppingCart, implemented: false },
  { id: 'expenses', label: 'Expenses', icon: CreditCard, implemented: false },
  { id: 'documents', label: 'Documents', icon: FileText, implemented: true },
  { id: 'issues', label: 'Issues', icon: AlertCircle, implemented: false },
  { id: 'notifications', label: 'Notifications', icon: Bell, implemented: false },
];

// Preserved Legacy Admin / Automation Runtime Views (UI-Level Access Only)
const LEGACY_ADMIN_ITEMS = [
  { id: 'admin-bots', label: 'Department Bots', icon: Bot },
  { id: 'admin-comm', label: 'Communication Hub', icon: MessageSquare },
  { id: 'admin-data', label: 'Data Sources Pipeline', icon: Database },
  { id: 'admin-routing', label: 'Workflow Orchestration', icon: GitMerge },
  { id: 'admin-infra', label: 'System Infrastructure', icon: Server },
];

export function MainLayout() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showAdminMenu, setShowAdminMenu] = useState<boolean>(false);
  const { user } = useFirebase();

  const handleLogout = () => {
    signOut(auth);
  };

  const renderContent = () => {
    switch (activeTab) {
      // 4 Implemented Core Pages
      case 'home':
        return <Home onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'projects':
        return <Projects onNavigateToMEP={() => setActiveTab('mep')} />;
      case 'documents':
        return <Documents />;
      case 'mep':
        return <MEP />;

      // 6 Placeholder Pages (Phase 2 Roadmap)
      case 'tasks':
        return (
          <PlaceholderPage
            title="My Tasks"
            category="Operational Workflow"
            description="Central task desk for approving material requisitions, signing off inspection test records, and acknowledging site memos."
            plannedFeatures={[
              'Pending Material Request (MR) technical approvals',
              'Quality Inspection Request (IR) sign-off alerts',
              'Daily contractor site briefing task assignments',
            ]}
            onBackToHome={() => setActiveTab('home')}
          />
        );
      case 'site-updates':
        return (
          <PlaceholderPage
            title="Site Updates"
            category="Field Reporting"
            description="Daily site diary logging, manpower headcounts by subcontractor, and photo evidence capture."
            plannedFeatures={[
              'Daily site progress diary with geo-tagged photos',
              'Labor & subcontractor manpower roll call',
              'Weather delay & impediment recording',
            ]}
            onBackToHome={() => setActiveTab('home')}
          />
        );
      case 'purchasing':
        return (
          <PlaceholderPage
            title="Purchasing & RFQ"
            category="Procurement Operations"
            description="Purchase Order (PO) creation, vendor price inquiry tracking, and delivery note cross-referencing."
            plannedFeatures={[
              'RFQ distribution to verified suppliers in Pricebook',
              'Commercial bid comparison matrix',
              'PO creation against approved Material Requests',
            ]}
            onBackToHome={() => setActiveTab('home')}
          />
        );
      case 'expenses':
        return (
          <PlaceholderPage
            title="Expenses & Claims"
            category="Field Finance"
            description="Petty cash disbursements, emergency site hardware purchases, and machinery rental settlement receipts."
            plannedFeatures={[
              'Site petty cash claims submission interface',
              'Equipment fuel & generator runtime receipts',
              'Receipt photo capture and VAT invoice verification',
            ]}
            onBackToHome={() => setActiveTab('home')}
          />
        );
      case 'issues':
        return (
          <PlaceholderPage
            title="Site Issues & NCRs"
            category="Quality & Safety"
            description="Non-Conformance Reports (NCR), site safety hazards, and MEP coordination clash resolution."
            plannedFeatures={[
              'Quality deficiency notice (NCR) submission and tracking',
              'Safety hazard tagging with corrective action timestamps',
              'RFI (Request for Information) submission interface',
            ]}
            onBackToHome={() => setActiveTab('home')}
          />
        );
      case 'notifications':
        return (
          <PlaceholderPage
            title="Notifications & Alerts"
            category="System Communication"
            description="Broadcast announcements, material dispatch notices, and critical overrun flags."
            plannedFeatures={[
              'Overrun alert notifications (Request & Issue Variance)',
              'Material ready-for-dispatch alerts from central warehouse',
              'Management circulars and company memos',
            ]}
            onBackToHome={() => setActiveTab('home')}
          />
        );

      // Preserved Legacy Technical Views (UI Admin Group)
      case 'admin-bots':
        return <DepartmentBots />;
      case 'admin-comm':
        return <Communication />;
      case 'admin-data':
        return <DataSources />;
      case 'admin-routing':
        return <EventRouting />;
      case 'admin-infra':
        return <Infrastructure />;

      default:
        return <Home onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-emerald-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800/60 bg-[#0c0c0d] flex flex-col justify-between shrink-0">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Company Branding */}
          <div className="p-5 border-b border-zinc-800/60">
            <div className="flex items-center gap-3 mb-2">
              <Logo className="w-10 h-10 shrink-0" />
              <div className="min-w-0">
                <div className="text-zinc-100 font-bold text-xs tracking-tight truncate">
                  LONN HTET BROTHER
                </div>
                <div className="text-[10px] text-zinc-400 truncate">
                  Construction Co., Ltd.
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block mt-1">
              Employee Operations Portal
            </div>
          </div>

          {/* Primary Employee Navigation */}
          <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto scrollbar-none">
            <div className="text-[10px] font-mono text-zinc-500 uppercase px-2.5 py-1.5 font-semibold">
              Workstation Navigation
            </div>
            {EMPLOYEE_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150",
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {!item.implemented && (
                    <span className="text-[9px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                      P2
                    </span>
                  )}
                </button>
              );
            })}

            {/* Preserved Legacy Admin / Automation Runtime Section (UI-Level Access Only) */}
            <div className="pt-4 mt-2 border-t border-zinc-800/60">
              <button
                onClick={() => setShowAdminMenu(!showAdminMenu)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-[10px] font-mono text-zinc-500 uppercase hover:text-zinc-400 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-zinc-500" />
                  Admin & Automation Runtime
                </span>
                {showAdminMenu ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showAdminMenu && (
                <div className="mt-1 space-y-0.5 pl-2 border-l border-zinc-800/80">
                  <div className="text-[9px] font-mono text-amber-500/80 px-2 py-1">
                    [UI Mode Only - No Backend Auth Claimed]
                  </div>
                  {LEGACY_ADMIN_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-mono transition-colors",
                          isActive
                            ? "bg-zinc-800 text-emerald-400 font-semibold"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* User Identity Footer */}
        <div className="p-3 border-t border-zinc-800/60 bg-zinc-950/40">
          <div className="flex items-center gap-2.5 px-2 py-1.5 mb-1.5">
            <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-emerald-400 border border-emerald-500/20">
              {user?.email ? user.email[0].toUpperCase() : 'E'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-200 truncate">
                {user?.displayName || user?.email || 'LHB Employee'}
              </p>
              <p className="text-[10px] text-zinc-500 truncate font-mono">
                Portal Operator (Read/Submit)
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-2 py-1.5 rounded-lg text-xs font-mono text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Workstation</span>
          </button>
        </div>
      </aside>

      {/* Main Workstation Screen */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0a0a0b]">
        {renderContent()}
      </main>
    </div>
  );
}

export default function App() {
  return <MainLayout />;
}
