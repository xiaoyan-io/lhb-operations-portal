export const DEPARTMENTS = [
  { id: 'boss', name: 'Executive Command', bot: 'boss', port: 18789, status: 'running', tg: '@yanmemos_bot', purpose: 'Chairman assistant', folder: 'skills-chairman' },
  { id: 'biz', name: 'Business Intelligence', bot: 'lhb-bizbot', port: 18808, status: 'running', tg: '@LHB_BIZ_bot', purpose: 'Business development & opportunities', folder: 'company/Business' },
  { id: 'fin', name: 'Financial Operations', bot: 'lhb-finbot', port: 18792, status: 'running', tg: '@LHB_FIN_bot', purpose: 'Financial tracking & receivables', folder: 'company/CFO' },
  { id: 'wh', name: 'Logistics Control', bot: 'lhb-whbot', port: 18799, status: 'running', tg: '@LHB_WH_bot', purpose: 'Inventory management', folder: 'company/Warehouse' },
  { id: 'proc', name: 'Supply Chain Operations', bot: 'lhb-procbot', port: 18796, status: 'running', tg: '@LHB_PROC_bot', purpose: 'Material sourcing & purchasing', folder: 'company/Procurement' },
  { id: 'hr', name: 'Human Capital', bot: 'lhb-hrbot', port: 18791, status: 'running', tg: '@LHB_HR_bot', purpose: 'Employee roster & CHO duties', folder: 'company/CHO' },
  { id: 'eng', name: 'Engineering', bot: 'lhb-engbot', port: 18793, status: 'running', tg: '@LHB_ENG_bot', purpose: 'Project execution & technical', folder: 'company/Engineering' },
  { id: 'crm', name: 'CRM', bot: 'lhb-csmbot', port: 18818, status: 'running', tg: '@rayoop_bot', purpose: 'Customer relations', folder: 'company/CRM' },
  { id: 'admin', name: 'Admin', bot: 'lhb-adminbot', port: 18802, status: 'running', tg: '@LHB_ADMIN_bot', purpose: 'General administration', folder: 'company/Admin' },
  { id: 'mgmt', name: 'Management', bot: 'lhb-mgmtbot', port: 18812, status: 'running', tg: '@LHB_MGMT_bot', purpose: 'COO & Operations', folder: 'company/COO' },
];

export const CRON_JOBS = [
  { name: 'Dashboard Data Refresh', schedule: '*/15 * * *', description: 'refresh every 15 minutes' },
  { name: 'Daily Changelog', schedule: '30 21 * *', description: 'daily change push' },
  { name: 'Daily Radar Briefing', schedule: '30 8 * *', description: 'daily radar briefing' },
];

export const DATA_SOURCES = [
  { metric: 'Employee count', source: 'company/CHO/employee-roster.md' },
  { metric: 'Projects', source: 'company/Business/opportunities.md' },
  { metric: 'Inventory', source: 'company/Warehouse/inventory.md' },
  { metric: 'Receivables', source: 'company/CFO/receivables.md' },
  { metric: 'Bot status', source: 'systemctl --user is-active' },
];

export const INFRASTRUCTURE = {
  startBots: 'systemctl --user start openclaw-gateway-*',
  canvasService: 'python3 -m http.server 18788',
  externalAccess: [
    { name: 'Dashboard', url: 'https://atlas.networkio.nyc.mn/canvas/' },
    { name: 'Settings', url: 'https://atlas.networkio.nyc.mn/canvas/settings.html' },
    { name: 'Gateway', url: 'https://atlas.networkio.nyc.mn/' },
  ],
  nginxRoutes: [
    { path: '/', target: 'OpenClaw Gateway (18789)' },
    { path: '/ws', target: 'OpenClaw Gateway WS' },
    { path: '/api', target: 'OpenClaw Gateway API' },
    { path: '/canvas', target: 'Canvas Dashboard (18788)' },
  ]
};
