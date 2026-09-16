import { 
  PricebookItem, 
  RulebookEntry, 
  ProjectBaseline, 
  MaterialRequestRecord, 
  MaterialIssueRecord,
  MaterialConsumptionRecord 
} from '../types/portal';

export const SYNTHETIC_DATA_BANNER = "SYNTHETIC / NON-CANONICAL DEMO DATA (PORTAL READ MODEL)";

/**
 * 1. RULEBOOK
 * All waste thresholds and units must strictly originate from approved project standards.
 */
export const MOCK_RULEBOOK: RulebookEntry[] = [
  {
    ruleId: 'RB-HVAC-01',
    system: 'HVAC',
    title: 'Galvanized Sheet Duct Standard Allowance',
    approvedWasteRatePercentage: 4.5,
    unitConversionRatio: 1.0,
    unitFrom: 'm2',
    unitTo: 'm2',
    gateCriteria: 'Requests exceeding baseline + 4.5% require MEP Lead review.',
  },
  {
    ruleId: 'RB-ELE-02',
    system: 'ELECTRICAL',
    title: 'Copper Core Power Cable Pulling Waste Allowance',
    approvedWasteRatePercentage: 3.0,
    unitConversionRatio: 1.0,
    unitFrom: 'm',
    unitTo: 'm',
    gateCriteria: 'Cable cuts must be logged with drum remainder logs.',
  },
  {
    ruleId: 'RB-PLUMB-03',
    system: 'PLUMBING',
    title: 'PPR Hot/Cold Pipe Jointing Allowance',
    approvedWasteRatePercentage: 5.0,
    unitConversionRatio: 1.0,
    unitFrom: 'm',
    unitTo: 'm',
    gateCriteria: 'Requires pressure test certificate before final material sign-off.',
  }
];

/**
 * 2. PRICEBOOK
 * Only VERIFIED items with non-expired dates are eligible for official cost calculations.
 */
export const MOCK_PRICEBOOK: PricebookItem[] = [
  {
    id: 'PB-001',
    itemCode: 'MAT-PPR-32',
    itemName: 'PPR Hot & Cold Water Pipe 32mm PN20',
    specification: 'DIN 8077/8078 Polypropylene Random Copolymer',
    brand: 'Georg Fischer / Aquasystem',
    supplier: 'Golden Yangon Hardware & Engineering Supplies',
    quotedPrice: 14.50,
    verifiedPrice: 13.80,
    currency: 'USD',
    effectiveDate: '2026-01-01',
    expiryDate: '2026-12-31',
    evidenceRef: 'PO-2026-0182-SIGNED.pdf',
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'PB-002',
    itemCode: 'MAT-CBL-4CX16',
    itemName: 'XLPE Insulated Armoured Cable 4C x 16mm2',
    specification: 'IEC 60502-1 600/1000V Cu/XLPE/SWA/PVC',
    brand: 'Mandalay Copper Tech',
    supplier: 'Apex Electrical Distro Co., Ltd.',
    quotedPrice: 28.00,
    verifiedPrice: 26.50,
    currency: 'USD',
    effectiveDate: '2026-02-15',
    expiryDate: '2026-08-15',
    evidenceRef: 'QUOTE-APX-8821.pdf',
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'PB-003',
    itemCode: 'MAT-VAV-BOX-400',
    itemName: 'Pressure Independent VAV Terminal Box 400 CFM',
    specification: 'Aero-acoustic attenuated with DDC controller',
    brand: 'Titus / Carrier',
    supplier: 'Global HVAC Direct',
    quotedPrice: 320.00,
    verifiedPrice: null,
    currency: 'USD',
    effectiveDate: '2026-03-01',
    expiryDate: '2026-05-01',
    evidenceRef: 'PRELIM-BID-VAV.msg',
    verificationStatus: 'UNVERIFIED',
  }
];

/**
 * 3. PROJECT BASELINE
 * Approved BOQs with formal revision tracking and approved dates.
 */
export const MOCK_PROJECT_BASELINES: ProjectBaseline[] = [
  {
    projectId: 'PRJ-YGN-2026-01',
    projectName: 'Yangon Landmark Tower - MEP Package A',
    boqRevision: 'Rev.C (Final IFC)',
    approvedDate: '2026-01-20',
    approvedBy: 'U Kyaw Swar (Lead MEP Consultant)',
    linkedVO: ['VO-01-CHW-REBOOT', 'VO-03-TRANSFORMER-RELOC'],
    status: 'ACTIVE_BASELINE',
    items: [
      {
        boqCode: 'BOQ-M-101',
        description: 'PPR Water Pipe 32mm PN20 Riser and Branch Distribution',
        specification: 'DIN 8077/8078 PN20 with acoustic insulation brackets',
        unit: 'm',
        approvedQty: 1200,
        approvedUnitCost: 13.80,
        totalBudgetCost: 16560.00,
      },
      {
        boqCode: 'BOQ-E-205',
        description: 'XLPE Copper Armoured Power Feeder 4C x 16mm2',
        specification: 'Cu/XLPE/SWA/PVC 0.6/1kV installed on cable tray',
        unit: 'm',
        approvedQty: 850,
        approvedUnitCost: 26.50,
        totalBudgetCost: 22525.00,
      },
      {
        boqCode: 'BOQ-H-302',
        description: 'Chilled Water Fan Coil Unit (FCU) - 2.5 TR Ceiling Concealed',
        specification: 'Low noise EC motor, 3-speed controller',
        unit: 'nos',
        approvedQty: 48,
        approvedUnitCost: 450.00,
        totalBudgetCost: 21600.00,
      },
      {
        boqCode: 'BOQ-NEW-VO',
        description: 'Emergency Basement Sump Drainage Line (Extra Works Pending VO)',
        specification: 'Heavy duty ductile iron pipe',
        unit: 'm',
        approvedQty: 0, // Deliberate 0 baseline for testing denominator = 0
        approvedUnitCost: 0,
        totalBudgetCost: 0,
      }
    ]
  },
  {
    projectId: 'PRJ-MDY-2026-03',
    projectName: 'Mandalay Logistics Cold Storage Hub',
    boqRevision: 'Rev.A (Tender Stage)',
    approvedDate: '2026-02-10',
    approvedBy: 'Daw Nilar Win (Chief Quantity Surveyor)',
    linkedVO: [],
    status: 'ACTIVE_BASELINE',
    items: [
      {
        boqCode: 'BOQ-M-501',
        description: 'Insulated Ammonia Refrigeration Piping 4-inch Sch 40',
        specification: 'ASTM A106 Grade B Seamless with PIR insulation',
        unit: 'm',
        approvedQty: 640,
        approvedUnitCost: 88.00,
        totalBudgetCost: 56320.00,
      }
    ]
  }
];

/**
 * 4. RUNTIME DATA (Requests, Issues, Consumption)
 */
export const INITIAL_MOCK_REQUESTS: MaterialRequestRecord[] = [
  {
    requestId: 'MR-2026-001',
    projectId: 'PRJ-YGN-2026-01',
    boqCode: 'BOQ-M-101',
    itemName: 'PPR Water Pipe 32mm PN20',
    requestedQty: 400,
    unit: 'm',
    requestor: 'Ko Aung (Site MEP Foreman)',
    requestDate: '2026-03-02',
    status: 'APPROVED',
    notes: 'For Floors 4-6 riser installation.',
  },
  {
    requestId: 'MR-2026-002',
    projectId: 'PRJ-YGN-2026-01',
    boqCode: 'BOQ-E-205',
    itemName: 'XLPE Copper Armoured Power Feeder 4C x 16mm2',
    requestedQty: 950, // Exceeds baseline of 850
    unit: 'm',
    requestor: 'Lin Naing (Electrical Lead)',
    requestDate: '2026-03-05',
    status: 'SUBMITTED',
    notes: 'Routing extended due to architectural partition adjustment.',
  },
  {
    requestId: 'MR-2026-003',
    projectId: 'PRJ-YGN-2026-01',
    boqCode: 'BOQ-NEW-VO',
    itemName: 'Emergency Basement Sump Drainage Line',
    requestedQty: 65, // Item has baseline = 0
    unit: 'm',
    requestor: 'Ko Zaw (Plumbing Engineer)',
    requestDate: '2026-03-10',
    status: 'SUBMITTED',
    notes: 'Urgent drainage for dewatering pit.',
  }
];

export const INITIAL_MOCK_ISSUES: MaterialIssueRecord[] = [
  {
    issueId: 'MI-2026-001',
    requestId: 'MR-2026-001',
    projectId: 'PRJ-YGN-2026-01',
    boqCode: 'BOQ-M-101',
    issuedQty: 420, // 20m higher than approved 400
    unit: 'm',
    issuer: 'Warehouse Admin - U Soe',
    issueDate: '2026-03-04',
    status: 'APPROVED',
  }
];

export const INITIAL_MOCK_CONSUMPTION: MaterialConsumptionRecord[] = [
  {
    consumptionId: 'MC-2026-001',
    projectId: 'PRJ-YGN-2026-01',
    boqCode: 'BOQ-M-101',
    actualConsumedQty: 415,
    unit: 'm',
    measuredDate: '2026-03-12',
    status: 'APPROVED',
  }
];
