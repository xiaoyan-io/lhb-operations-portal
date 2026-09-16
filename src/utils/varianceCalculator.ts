import { VarianceCalculationResult } from '../types/portal';

/**
 * Robust Variance Calculator for LHB MEP Operations Engine
 * 
 * Rules:
 * 1. Request Variance = (Requested Qty - Available Baseline Qty) / Available Baseline Qty
 *    If Available Baseline Qty <= 0: return NO_BASELINE
 * 2. Issue Variance = (Issued Qty - Approved Request Qty) / Approved Request Qty
 *    If Approved Request Qty <= 0: return REVIEW_REQUIRED
 * 3. Consumption Variance = (Actual Consumed Qty - Approved Baseline Consumption Qty) / Approved Baseline Consumption Qty
 *    If Approved Baseline Consumption Qty <= 0: return NO_BASELINE
 * 4. Cost Variance = (Actual Cost - Approved Budget Cost) / Approved Budget Cost
 *    If Approved Budget Cost <= 0: return NO_BASELINE
 */

export function calculateRequestVariance(
  requestedQty: number,
  availableBaselineQty: number
): VarianceCalculationResult {
  const delta = requestedQty - availableBaselineQty;

  if (availableBaselineQty <= 0) {
    return {
      varianceValue: delta,
      percentage: null,
      status: 'NO_BASELINE',
      interpretation: 'No approved baseline allocation registered for this line item.',
    };
  }

  const ratio = (delta / availableBaselineQty) * 100;
  return {
    varianceValue: delta,
    percentage: Math.round(ratio * 100) / 100,
    status: 'COMPUTED',
    interpretation: ratio > 0 ? `Over baseline by ${ratio.toFixed(1)}%` : 'Within approved limits',
  };
}

export function calculateIssueVariance(
  issuedQty: number,
  approvedRequestQty: number
): VarianceCalculationResult {
  const delta = issuedQty - approvedRequestQty;

  if (approvedRequestQty <= 0) {
    return {
      varianceValue: delta,
      percentage: null,
      status: 'REVIEW_REQUIRED',
      interpretation: 'Dispatched without approved Material Request authorization.',
    };
  }

  const ratio = (delta / approvedRequestQty) * 100;
  return {
    varianceValue: delta,
    percentage: Math.round(ratio * 100) / 100,
    status: 'COMPUTED',
    interpretation: ratio > 0 ? `Over-issued by ${ratio.toFixed(1)}%` : 'Issued strictly as approved',
  };
}

export function calculateConsumptionVariance(
  actualConsumedQty: number,
  approvedBaselineConsumptionQty: number
): VarianceCalculationResult {
  const delta = actualConsumedQty - approvedBaselineConsumptionQty;

  if (approvedBaselineConsumptionQty <= 0) {
    return {
      varianceValue: delta,
      percentage: null,
      status: 'NO_BASELINE',
      interpretation: 'No baseline consumption schedule defined.',
    };
  }

  const ratio = (delta / approvedBaselineConsumptionQty) * 100;
  return {
    varianceValue: delta,
    percentage: Math.round(ratio * 100) / 100,
    status: 'COMPUTED',
    interpretation: ratio > 0 ? `Excess consumption of ${ratio.toFixed(1)}% detected` : 'Normal consumption rate',
  };
}

export function calculateCostVariance(
  actualCost: number,
  approvedBudgetCost: number
): VarianceCalculationResult {
  const delta = actualCost - approvedBudgetCost;

  if (approvedBudgetCost <= 0) {
    return {
      varianceValue: delta,
      percentage: null,
      status: 'NO_BASELINE',
      interpretation: 'Line item lacks an approved budget allocation.',
    };
  }

  const ratio = (delta / approvedBudgetCost) * 100;
  return {
    varianceValue: delta,
    percentage: Math.round(ratio * 100) / 100,
    status: 'COMPUTED',
    interpretation: ratio > 0 ? `Over budget by ${ratio.toFixed(1)}%` : 'Under/on budget',
  };
}
