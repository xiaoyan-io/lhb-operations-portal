/**
 * Core types for LHB Employee Operations Portal (Phase 1)
 * NOTE: All data structures adhere to the ALAN SYSTEM read-model and submission interface boundaries.
 */

export type SubmissionLifecycleStatus = 
  | 'SUBMITTED' 
  | 'REVIEWED' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'CANONICAL'; // Read-only lifecycle target; frontend never manually promotes to CANONICAL

export type VerificationStatus = 
  | 'UNVERIFIED' 
  | 'VERIFIED' 
  | 'EXPIRED' 
  | 'REJECTED';

export interface PricebookItem {
  id: string;
  itemCode: string;
  itemName: string;
  specification: string;
  brand: string;
  supplier: string;
  quotedPrice: number;
  verifiedPrice: number | null;
  currency: string;
  effectiveDate: string; // ISO format or YYYY-MM-DD
  expiryDate: string;
  evidenceRef: string;
  verificationStatus: VerificationStatus;
}

export interface RulebookEntry {
  ruleId: string;
  system: 'HVAC' | 'ELECTRICAL' | 'PLUMBING' | 'FIRE_PROTECTION' | 'GENERAL';
  title: string;
  approvedWasteRatePercentage: number; // Must originate from approved project charter/rulebook
  unitConversionRatio: number;
  unitFrom: string;
  unitTo: string;
  gateCriteria: string;
}

export interface BaselineBOQItem {
  boqCode: string;
  description: string;
  specification: string;
  unit: string;
  approvedQty: number;
  approvedUnitCost: number;
  totalBudgetCost: number;
}

export interface ProjectBaseline {
  projectId: string;
  projectName: string;
  boqRevision: string;
  approvedDate: string;
  approvedBy: string;
  linkedVO: string[];
  status: 'ACTIVE_BASELINE' | 'SUPERSEDED' | 'DRAFT';
  items: BaselineBOQItem[];
}

export interface MaterialRequestRecord {
  requestId: string;
  projectId: string;
  boqCode: string;
  itemName: string;
  requestedQty: number;
  unit: string;
  requestor: string;
  requestDate: string;
  status: SubmissionLifecycleStatus;
  notes?: string;
}

export interface MaterialIssueRecord {
  issueId: string;
  requestId: string;
  projectId: string;
  boqCode: string;
  issuedQty: number;
  unit: string;
  issuer: string;
  issueDate: string;
  status: SubmissionLifecycleStatus;
}

export interface MaterialConsumptionRecord {
  consumptionId: string;
  projectId: string;
  boqCode: string;
  actualConsumedQty: number;
  unit: string;
  measuredDate: string;
  status: SubmissionLifecycleStatus;
}

export type VarianceCalculationStatus = 'COMPUTED' | 'NO_BASELINE' | 'REVIEW_REQUIRED';

export interface VarianceCalculationResult {
  varianceValue: number;
  percentage: number | null; // null if denominator is 0
  status: VarianceCalculationStatus;
  interpretation: string;
}
