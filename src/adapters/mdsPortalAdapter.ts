import rawMdsData from '../data/53x26B_MDS_CANONICAL_BASELINE_v1.0.json';

export interface MilestoneViewModel {
  milestoneId: string;
  name: string;
  percentage: number;
  amount: number;
  amountFormatted: string;
  status: string;
  displayStatus: string;
  statusBadgeClass: string;
  paidDate?: string;
  statusDetail?: string;
  claimTriggerAllowed: boolean;
  evidenceRef?: string;
}

export interface DrawingViewModel {
  drawingId: string;
  title: string;
  classification: string;
  version: string;
  date: string;
  isCanonical: boolean;
}

export interface PortalReadModel {
  projectId: string;
  projectName: string;
  clientName: string;
  location: string;
  currency: string;
  contract: {
    totalContractValue: number;
    receivedAmount: number;
    pendingBalance: number;
    completionRatePercentage: number;
    totalContractFormatted: string;
    receivedFormatted: string;
    pendingFormatted: string;
  };
  drawings: {
    canonicalApprovedCount: number;
    referenceOnlyCount: number;
    disclaimer: string;
    items: DrawingViewModel[];
  };
  milestones: MilestoneViewModel[];
  runtimeGuard: {
    readOnly: boolean;
    productionWrite: string;
    canonicalSource: string;
    lastSyncUtc: string;
  };
}

/**
 * Maps milestone status to user-friendly label and styling classes.
 * Specifically handles M04 "NOT_VERIFIED" as "Not Verified / Precondition Evidenced"
 */
export function mapMilestoneStatus(status: string): { label: string; badgeClass: string } {
  switch (status) {
    case 'VERIFIED_RECEIVED':
      return {
        label: 'Verified / Remitted',
        badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      };
    case 'NOT_VERIFIED':
      return {
        label: 'Not Verified / Precondition Evidenced',
        badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
      };
    case 'PENDING_SCHEDULE':
      return {
        label: 'Pending Schedule',
        badgeClass: 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
      };
    default:
      return {
        label: status,
        badgeClass: 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
      };
  }
}

/**
 * Formats a currency value with comma separators
 */
export function formatCurrency(amount: number, currency: string = 'MMK'): string {
  return `${amount.toLocaleString()} ${currency}`;
}

/**
 * Pure adapter function returning the read-only portal view model
 */
export function getMdsPortalData(): PortalReadModel {
  const data = rawMdsData;

  const milestones: MilestoneViewModel[] = data.milestones.map((m) => {
    const { label, badgeClass } = mapMilestoneStatus(m.status);
    return {
      milestoneId: m.milestone_id,
      name: m.name,
      percentage: m.percentage,
      amount: m.amount,
      amountFormatted: formatCurrency(m.amount, data.currency),
      status: m.status,
      displayStatus: label,
      statusBadgeClass: badgeClass,
      paidDate: m.paid_date,
      statusDetail: m.status_detail,
      claimTriggerAllowed: !!m.claim_trigger_allowed,
      evidenceRef: m.evidence_ref
    };
  });

  const drawings: DrawingViewModel[] = data.drawings.list.map((d) => ({
    drawingId: d.drawing_id,
    title: d.title,
    classification: d.classification,
    version: d.version,
    date: d.date,
    isCanonical: d.classification !== 'REFERENCE_ONLY'
  }));

  return {
    projectId: data.project_id,
    projectName: data.project_name,
    clientName: data.client_name,
    location: data.location,
    currency: data.currency,
    contract: {
      totalContractValue: data.contract.total_contract_value,
      receivedAmount: data.contract.received_amount,
      pendingBalance: data.contract.pending_balance,
      completionRatePercentage: data.contract.completion_rate_percentage,
      totalContractFormatted: formatCurrency(data.contract.total_contract_value, data.currency),
      receivedFormatted: formatCurrency(data.contract.received_amount, data.currency),
      pendingFormatted: formatCurrency(data.contract.pending_balance, data.currency)
    },
    drawings: {
      canonicalApprovedCount: data.drawings.canonical_approved_drawings_count,
      referenceOnlyCount: data.drawings.reference_only_drawings_count,
      disclaimer: data.drawings.disclaimer,
      items: drawings
    },
    milestones,
    runtimeGuard: {
      readOnly: data.runtime_guard.read_only,
      productionWrite: data.runtime_guard.production_write,
      canonicalSource: data.runtime_guard.canonical_source,
      lastSyncUtc: data.runtime_guard.last_sync_utc
    }
  };
}
