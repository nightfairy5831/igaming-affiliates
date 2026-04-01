export interface Affiliate {
  id: number;
  name: string;
  email: string;
  status: "active" | "pending" | "inactive";
  registrationDate: string;
  houses: string[];
  offers: string[];
  identifiers: string[];
  country: string;
  totalFTD: number;
  totalQFTD: number;
  totalRegistrations: number;
  totalDeposits: number;
  ngr: number;
  revenue: number;
  commissionModel: "CPA" | "RevShare" | "Hybrid";
  cpaValue: number;
  revSharePercent: number;
  carryOver: boolean;
  baseline: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
}

export interface Campaign {
  id: number;
  name: string;
  affiliateId: number;
  affiliateName: string;
  operator: string;
  trackingLink: string;
  status: "active" | "paused" | "expired";
  clicks: number;
  registrations: number;
  ftd: number;
  qftd: number;
  deposits: number;
  ngr: number;
  conversionRate: number;
  createdAt: string;
  expiresAt: string;
}

export interface FinancialRecord {
  id: number;
  affiliateId: number;
  affiliateName: string;
  month: string;
  registrations: number;
  ftd: number;
  qftd: number;
  deposits: number;
  ngr: number;
  cpaEarnings: number;
  revShareEarnings: number;
  totalCommission: number;
  carryOver: number;
  adjustments: number;
  finalAmount: number;
  status: "pending" | "approved" | "paid" | "disputed";
  paymentDate: string | null;
}

export interface DashboardMetrics {
  totalAffiliates: number;
  activeAffiliates: number;
  totalRegistrations: number;
  totalFTD: number;
  totalQFTD: number;
  totalDeposits: number;
  totalNGR: number;
  totalRevenue: number;
  totalCommissionsPaid: number;
  avgCPA: number;
  avgConversionRate: number;
  monthlyGrowth: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "analyst" | "affiliate";
  permissions: string[];
  lastLogin: string;
  status: "active" | "inactive";
}

export interface ActivityLog {
  id: number;
  action: string;
  user: string;
  detail: string;
  timestamp: string;
  type: "affiliate" | "campaign" | "financial" | "system";
}

export const dashboardMetrics: DashboardMetrics = {
  totalAffiliates: 847,
  activeAffiliates: 612,
  totalRegistrations: 284563,
  totalFTD: 42839,
  totalQFTD: 31247,
  totalDeposits: 18742650,
  totalNGR: 4235890,
  totalRevenue: 8471780,
  totalCommissionsPaid: 1892340,
  avgCPA: 45.80,
  avgConversionRate: 15.04,
  monthlyGrowth: 12.5,
};

export const monthlyMetrics = [
  { month: "Jan", registrations: 21450, ftd: 3218, qftd: 2350, deposits: 1420300, ngr: 320100, revenue: 640200, commissions: 142800 },
  { month: "Feb", registrations: 19870, ftd: 2981, qftd: 2178, deposits: 1315600, ngr: 296800, revenue: 593600, commissions: 132400 },
  { month: "Mar", registrations: 24300, ftd: 3645, qftd: 2662, deposits: 1608700, ngr: 363000, revenue: 726000, commissions: 162000 },
  { month: "Apr", registrations: 22180, ftd: 3327, qftd: 2429, deposits: 1468200, ngr: 331200, revenue: 662400, commissions: 147800 },
  { month: "May", registrations: 26540, ftd: 3981, qftd: 2907, deposits: 1756400, ngr: 396300, revenue: 792600, commissions: 176800 },
  { month: "Jun", registrations: 28900, ftd: 4335, qftd: 3165, deposits: 1912500, ngr: 431400, revenue: 862800, commissions: 192500 },
  { month: "Jul", registrations: 25620, ftd: 3843, qftd: 2806, deposits: 1696100, ngr: 382700, revenue: 765400, commissions: 170800 },
  { month: "Aug", registrations: 23450, ftd: 3518, qftd: 2568, deposits: 1552300, ngr: 350200, revenue: 700400, commissions: 156300 },
  { month: "Sep", registrations: 27100, ftd: 4065, qftd: 2968, deposits: 1793600, ngr: 404700, revenue: 809400, commissions: 180600 },
  { month: "Oct", registrations: 24890, ftd: 3734, qftd: 2726, deposits: 1647800, ngr: 371800, revenue: 743600, commissions: 165900 },
  { month: "Nov", registrations: 29460, ftd: 4419, qftd: 3226, deposits: 1949500, ngr: 439800, revenue: 879600, commissions: 196200 },
  { month: "Dec", registrations: 30803, ftd: 4773, qftd: 3262, deposits: 2121650, ngr: 546890, revenue: 1096180, commissions: 168230 },
];

export const affiliates: Affiliate[] = [
  {
    id: 1, name: "BetPromo Brasil", email: "contato@betpromobr.com", status: "active",
    registrationDate: "2024-03-15", houses: ["Bet365", "Betano", "Sportingbet"],
    offers: ["Welcome Bonus 100%", "Free Bet R$50"], identifiers: ["BPBR001", "BPBR002", "BPBR003"],
    country: "Brazil", totalFTD: 8420, totalQFTD: 6150, totalRegistrations: 56200,
    totalDeposits: 3750000, ngr: 846000, revenue: 1692000,
    commissionModel: "Hybrid", cpaValue: 55, revSharePercent: 30, carryOver: true, baseline: 0, tier: "Diamond",
  },
  {
    id: 2, name: "ApostasTop", email: "admin@apostastop.com", status: "active",
    registrationDate: "2024-05-22", houses: ["Betano", "KTO", "Pixbet"],
    offers: ["Cashback 20%", "Deposit Match"], identifiers: ["AT001", "AT002"],
    country: "Brazil", totalFTD: 5630, totalQFTD: 4110, totalRegistrations: 37500,
    totalDeposits: 2510000, ngr: 566000, revenue: 1132000,
    commissionModel: "RevShare", cpaValue: 0, revSharePercent: 35, carryOver: false, baseline: 5000, tier: "Platinum",
  },
  {
    id: 3, name: "iGaming Media MX", email: "ops@igamingmx.com", status: "active",
    registrationDate: "2024-01-10", houses: ["Caliente", "Codere", "Betway"],
    offers: ["Bono Bienvenida", "Giro Gratis"], identifiers: ["IGMX01", "IGMX02", "IGMX03", "IGMX04"],
    country: "Mexico", totalFTD: 6890, totalQFTD: 5030, totalRegistrations: 45900,
    totalDeposits: 3070000, ngr: 692000, revenue: 1384000,
    commissionModel: "CPA", cpaValue: 42, revSharePercent: 0, carryOver: false, baseline: 0, tier: "Gold",
  },
  {
    id: 4, name: "BettingGuru CO", email: "info@bettingguru.co", status: "active",
    registrationDate: "2024-07-08", houses: ["Betplay", "Rivalo", "1xBet"],
    offers: ["Welcome CPA", "Rev Share Premium"], identifiers: ["BGCO01", "BGCO02"],
    country: "Colombia", totalFTD: 3250, totalQFTD: 2374, totalRegistrations: 21650,
    totalDeposits: 1450000, ngr: 327000, revenue: 654000,
    commissionModel: "Hybrid", cpaValue: 38, revSharePercent: 25, carryOver: true, baseline: 3000, tier: "Silver",
  },
  {
    id: 5, name: "CasinoLinks AR", email: "soporte@casinolinks.ar", status: "pending",
    registrationDate: "2025-01-15", houses: ["Codere", "Bet365"],
    offers: ["Bono 50%"], identifiers: ["CLAR01"],
    country: "Argentina", totalFTD: 1820, totalQFTD: 1330, totalRegistrations: 12130,
    totalDeposits: 812000, ngr: 183000, revenue: 366000,
    commissionModel: "CPA", cpaValue: 35, revSharePercent: 0, carryOver: false, baseline: 0, tier: "Bronze",
  },
  {
    id: 6, name: "SlotMaster PE", email: "admin@slotmaster.pe", status: "active",
    registrationDate: "2024-09-20", houses: ["Betsson", "Inkabet", "Doradobet"],
    offers: ["Welcome Pack", "Loyalty Bonus"], identifiers: ["SMPE01", "SMPE02", "SMPE03"],
    country: "Peru", totalFTD: 4120, totalQFTD: 3008, totalRegistrations: 27460,
    totalDeposits: 1835000, ngr: 414000, revenue: 828000,
    commissionModel: "RevShare", cpaValue: 0, revSharePercent: 32, carryOver: true, baseline: 4000, tier: "Gold",
  },
  {
    id: 7, name: "GambleAds CL", email: "team@gambleads.cl", status: "inactive",
    registrationDate: "2024-02-28", houses: ["Betway", "Coolbet"],
    offers: ["Standard CPA"], identifiers: ["GACL01"],
    country: "Chile", totalFTD: 980, totalQFTD: 715, totalRegistrations: 6530,
    totalDeposits: 436000, ngr: 98000, revenue: 196000,
    commissionModel: "CPA", cpaValue: 30, revSharePercent: 0, carryOver: false, baseline: 0, tier: "Bronze",
  },
  {
    id: 8, name: "PlayPartners EC", email: "hello@playpartners.ec", status: "active",
    registrationDate: "2024-11-05", houses: ["Betcris", "1xBet", "Betano"],
    offers: ["Premium CPA", "VIP Rev Share"], identifiers: ["PPEC01", "PPEC02"],
    country: "Ecuador", totalFTD: 2750, totalQFTD: 2008, totalRegistrations: 18330,
    totalDeposits: 1225000, ngr: 276000, revenue: 552000,
    commissionModel: "Hybrid", cpaValue: 40, revSharePercent: 28, carryOver: false, baseline: 2500, tier: "Silver",
  },
  {
    id: 9, name: "WinTraffic UY", email: "ops@wintraffic.uy", status: "active",
    registrationDate: "2024-06-18", houses: ["Superbets", "Betsson"],
    offers: ["CPA Standard", "Rev Share Plus"], identifiers: ["WTUY01", "WTUY02"],
    country: "Uruguay", totalFTD: 1950, totalQFTD: 1424, totalRegistrations: 13000,
    totalDeposits: 870000, ngr: 196000, revenue: 392000,
    commissionModel: "RevShare", cpaValue: 0, revSharePercent: 30, carryOver: true, baseline: 2000, tier: "Silver",
  },
  {
    id: 10, name: "LatamBets BO", email: "info@latambets.bo", status: "pending",
    registrationDate: "2025-02-01", houses: ["Meridianbet"],
    offers: ["Intro CPA"], identifiers: ["LBBO01"],
    country: "Bolivia", totalFTD: 620, totalQFTD: 453, totalRegistrations: 4130,
    totalDeposits: 276000, ngr: 62000, revenue: 124000,
    commissionModel: "CPA", cpaValue: 28, revSharePercent: 0, carryOver: false, baseline: 0, tier: "Bronze",
  },
];

export const campaigns: Campaign[] = [
  { id: 1, name: "Bet365 Brazil Launch", affiliateId: 1, affiliateName: "BetPromo Brasil", operator: "Bet365", trackingLink: "https://track.affiliatehub.com/c/bp001-b365-br", status: "active", clicks: 145200, registrations: 12450, ftd: 1868, qftd: 1363, deposits: 824500, ngr: 186000, conversionRate: 8.57, createdAt: "2024-04-01", expiresAt: "2026-04-01" },
  { id: 2, name: "Betano Welcome Promo", affiliateId: 1, affiliateName: "BetPromo Brasil", operator: "Betano", trackingLink: "https://track.affiliatehub.com/c/bp001-betano-br", status: "active", clicks: 98700, registrations: 8930, ftd: 1340, qftd: 978, deposits: 591400, ngr: 133400, conversionRate: 9.05, createdAt: "2024-05-15", expiresAt: "2026-05-15" },
  { id: 3, name: "KTO Cashback Special", affiliateId: 2, affiliateName: "ApostasTop", operator: "KTO", trackingLink: "https://track.affiliatehub.com/c/at001-kto-br", status: "active", clicks: 67300, registrations: 5480, ftd: 822, qftd: 600, deposits: 363200, ngr: 81900, conversionRate: 8.14, createdAt: "2024-06-01", expiresAt: "2026-06-01" },
  { id: 4, name: "Caliente Mexico Q4", affiliateId: 3, affiliateName: "iGaming Media MX", operator: "Caliente", trackingLink: "https://track.affiliatehub.com/c/igmx01-cal-mx", status: "active", clicks: 112400, registrations: 9870, ftd: 1481, qftd: 1081, deposits: 653800, ngr: 147500, conversionRate: 8.78, createdAt: "2024-10-01", expiresAt: "2026-03-31" },
  { id: 5, name: "Betplay Colombia Slots", affiliateId: 4, affiliateName: "BettingGuru CO", operator: "Betplay", trackingLink: "https://track.affiliatehub.com/c/bgco01-bplay-co", status: "active", clicks: 43200, registrations: 3560, ftd: 534, qftd: 390, deposits: 236100, ngr: 53200, conversionRate: 8.24, createdAt: "2024-08-01", expiresAt: "2026-08-01" },
  { id: 6, name: "Pixbet Weekend Rush", affiliateId: 2, affiliateName: "ApostasTop", operator: "Pixbet", trackingLink: "https://track.affiliatehub.com/c/at001-pix-br", status: "paused", clicks: 34100, registrations: 2890, ftd: 434, qftd: 317, deposits: 191700, ngr: 43200, conversionRate: 8.47, createdAt: "2024-09-15", expiresAt: "2025-12-31" },
  { id: 7, name: "Betsson Peru Launch", affiliateId: 6, affiliateName: "SlotMaster PE", operator: "Betsson", trackingLink: "https://track.affiliatehub.com/c/smpe01-bsson-pe", status: "active", clicks: 56800, registrations: 4780, ftd: 717, qftd: 523, deposits: 317400, ngr: 71600, conversionRate: 8.42, createdAt: "2024-10-20", expiresAt: "2026-10-20" },
  { id: 8, name: "1xBet Ecuador Sports", affiliateId: 8, affiliateName: "PlayPartners EC", operator: "1xBet", trackingLink: "https://track.affiliatehub.com/c/ppec01-1xbet-ec", status: "active", clicks: 38900, registrations: 3240, ftd: 486, qftd: 355, deposits: 214700, ngr: 48400, conversionRate: 8.33, createdAt: "2024-12-01", expiresAt: "2026-12-01" },
  { id: 9, name: "Codere Argentina Promo", affiliateId: 5, affiliateName: "CasinoLinks AR", operator: "Codere", trackingLink: "https://track.affiliatehub.com/c/clar01-codere-ar", status: "paused", clicks: 21500, registrations: 1780, ftd: 267, qftd: 195, deposits: 118300, ngr: 26700, conversionRate: 8.28, createdAt: "2025-01-20", expiresAt: "2026-01-20" },
  { id: 10, name: "Superbets Uruguay Special", affiliateId: 9, affiliateName: "WinTraffic UY", operator: "Superbets", trackingLink: "https://track.affiliatehub.com/c/wtuy01-sb-uy", status: "active", clicks: 28600, registrations: 2380, ftd: 357, qftd: 261, deposits: 158200, ngr: 35700, conversionRate: 8.32, createdAt: "2024-07-15", expiresAt: "2026-07-15" },
];

export const financialRecords: FinancialRecord[] = [
  { id: 1, affiliateId: 1, affiliateName: "BetPromo Brasil", month: "2025-12", registrations: 4850, ftd: 728, qftd: 531, deposits: 322300, ngr: 72700, cpaEarnings: 29205, revShareEarnings: 21810, totalCommission: 51015, carryOver: 0, adjustments: -1200, finalAmount: 49815, status: "paid", paymentDate: "2026-01-15" },
  { id: 2, affiliateId: 2, affiliateName: "ApostasTop", month: "2025-12", registrations: 3240, ftd: 486, qftd: 355, deposits: 215200, ngr: 48500, cpaEarnings: 0, revShareEarnings: 16975, totalCommission: 16975, carryOver: -3200, adjustments: 0, finalAmount: 13775, status: "paid", paymentDate: "2026-01-15" },
  { id: 3, affiliateId: 3, affiliateName: "iGaming Media MX", month: "2025-12", registrations: 3960, ftd: 594, qftd: 434, deposits: 262700, ngr: 59300, cpaEarnings: 18228, revShareEarnings: 0, totalCommission: 18228, carryOver: 0, adjustments: 500, finalAmount: 18728, status: "paid", paymentDate: "2026-01-15" },
  { id: 4, affiliateId: 4, affiliateName: "BettingGuru CO", month: "2025-12", registrations: 1870, ftd: 281, qftd: 205, deposits: 124200, ngr: 28000, cpaEarnings: 7790, revShareEarnings: 7000, totalCommission: 14790, carryOver: 0, adjustments: 0, finalAmount: 14790, status: "approved", paymentDate: null },
  { id: 5, affiliateId: 5, affiliateName: "CasinoLinks AR", month: "2025-12", registrations: 1050, ftd: 158, qftd: 115, deposits: 69800, ngr: 15700, cpaEarnings: 4025, revShareEarnings: 0, totalCommission: 4025, carryOver: 0, adjustments: 0, finalAmount: 4025, status: "pending", paymentDate: null },
  { id: 6, affiliateId: 6, affiliateName: "SlotMaster PE", month: "2025-12", registrations: 2370, ftd: 356, qftd: 260, deposits: 157600, ngr: 35500, cpaEarnings: 0, revShareEarnings: 11360, totalCommission: 11360, carryOver: -1800, adjustments: 0, finalAmount: 9560, status: "approved", paymentDate: null },
  { id: 7, affiliateId: 1, affiliateName: "BetPromo Brasil", month: "2026-01", registrations: 5120, ftd: 768, qftd: 561, deposits: 339800, ngr: 76600, cpaEarnings: 30855, revShareEarnings: 22980, totalCommission: 53835, carryOver: 0, adjustments: 0, finalAmount: 53835, status: "approved", paymentDate: null },
  { id: 8, affiliateId: 2, affiliateName: "ApostasTop", month: "2026-01", registrations: 3480, ftd: 522, qftd: 381, deposits: 231200, ngr: 52100, cpaEarnings: 0, revShareEarnings: 18235, totalCommission: 18235, carryOver: 0, adjustments: -800, finalAmount: 17435, status: "pending", paymentDate: null },
  { id: 9, affiliateId: 3, affiliateName: "iGaming Media MX", month: "2026-01", registrations: 4200, ftd: 630, qftd: 460, deposits: 278500, ngr: 62800, cpaEarnings: 19320, revShareEarnings: 0, totalCommission: 19320, carryOver: 0, adjustments: 0, finalAmount: 19320, status: "pending", paymentDate: null },
  { id: 10, affiliateId: 8, affiliateName: "PlayPartners EC", month: "2026-01", registrations: 1580, ftd: 237, qftd: 173, deposits: 104900, ngr: 23700, cpaEarnings: 6920, revShareEarnings: 6636, totalCommission: 13556, carryOver: 0, adjustments: 0, finalAmount: 13556, status: "pending", paymentDate: null },
  { id: 11, affiliateId: 1, affiliateName: "BetPromo Brasil", month: "2026-02", registrations: 5380, ftd: 807, qftd: 589, deposits: 357100, ngr: 80500, cpaEarnings: 32395, revShareEarnings: 24150, totalCommission: 56545, carryOver: 0, adjustments: 0, finalAmount: 56545, status: "pending", paymentDate: null },
  { id: 12, affiliateId: 6, affiliateName: "SlotMaster PE", month: "2026-01", registrations: 2510, ftd: 377, qftd: 275, deposits: 166800, ngr: 37600, cpaEarnings: 0, revShareEarnings: 12032, totalCommission: 12032, carryOver: 0, adjustments: 0, finalAmount: 12032, status: "pending", paymentDate: null },
];

export const users: User[] = [
  { id: 1, name: "Carlos Mendes", email: "carlos@affiliatehub.com", role: "admin", permissions: ["all"], lastLogin: "2026-03-31 14:30", status: "active" },
  { id: 2, name: "Ana Rodrigues", email: "ana@affiliatehub.com", role: "manager", permissions: ["affiliates", "campaigns", "reports", "financial"], lastLogin: "2026-03-31 10:15", status: "active" },
  { id: 3, name: "Pedro Santos", email: "pedro@affiliatehub.com", role: "analyst", permissions: ["reports", "campaigns"], lastLogin: "2026-03-30 16:45", status: "active" },
  { id: 4, name: "Maria Lima", email: "maria@affiliatehub.com", role: "manager", permissions: ["affiliates", "campaigns", "reports"], lastLogin: "2026-03-29 09:20", status: "active" },
  { id: 5, name: "Lucas Ferreira", email: "lucas@affiliatehub.com", role: "analyst", permissions: ["reports"], lastLogin: "2026-03-28 11:00", status: "inactive" },
];

export const activityLogs: ActivityLog[] = [
  { id: 1, action: "Affiliate Approved", user: "Ana Rodrigues", detail: "CasinoLinks AR approved and activated", timestamp: "2026-03-31 14:22", type: "affiliate" },
  { id: 2, action: "Campaign Created", user: "Pedro Santos", detail: "New campaign 'Betano Summer 2026' for BetPromo Brasil", timestamp: "2026-03-31 13:45", type: "campaign" },
  { id: 3, action: "Financial Closing", user: "Carlos Mendes", detail: "February 2026 closing initiated for 8 affiliates", timestamp: "2026-03-31 11:30", type: "financial" },
  { id: 4, action: "Commission Adjusted", user: "Ana Rodrigues", detail: "ApostasTop Jan 2026 adjustment: -$800 (invalid QFTD)", timestamp: "2026-03-31 10:15", type: "financial" },
  { id: 5, action: "Link Generated", user: "Pedro Santos", detail: "New tracking link for iGaming Media MX - Caliente MX", timestamp: "2026-03-30 16:40", type: "campaign" },
  { id: 6, action: "Affiliate Registered", user: "System", detail: "LatamBets BO submitted registration application", timestamp: "2026-03-30 14:10", type: "affiliate" },
  { id: 7, action: "Payment Processed", user: "Carlos Mendes", detail: "Dec 2025 payments sent: 3 affiliates, total $82,318", timestamp: "2026-03-30 09:30", type: "financial" },
  { id: 8, action: "Carry Over Applied", user: "System", detail: "Negative carry over of -$3,200 applied to ApostasTop Dec 2025", timestamp: "2026-03-29 18:00", type: "financial" },
  { id: 9, action: "Campaign Paused", user: "Maria Lima", detail: "Pixbet Weekend Rush paused due to low conversion", timestamp: "2026-03-29 15:20", type: "campaign" },
  { id: 10, action: "Permissions Updated", user: "Carlos Mendes", detail: "Lucas Ferreira access restricted to reports only", timestamp: "2026-03-28 11:45", type: "system" },
];

export const operators = ["Bet365", "Betano", "Sportingbet", "KTO", "Pixbet", "Caliente", "Codere", "Betway", "Betplay", "Rivalo", "1xBet", "Betsson", "Inkabet", "Doradobet", "Betcris", "Superbets", "Coolbet", "Meridianbet"];

export const countries = ["Brazil", "Mexico", "Colombia", "Argentina", "Peru", "Chile", "Ecuador", "Uruguay", "Bolivia"];

export const businessRules = [
  { id: 1, name: "Carry Over", description: "Negative NGR balance is carried forward to the next month", status: "active", appliesTo: "RevShare & Hybrid" },
  { id: 2, name: "Non Carry Over", description: "Negative balances reset to zero each month", status: "active", appliesTo: "CPA only" },
  { id: 3, name: "Baseline", description: "Minimum NGR threshold before commissions are calculated", status: "active", appliesTo: "RevShare & Hybrid" },
  { id: 4, name: "Minimum QFTD", description: "Affiliate must generate at least 10 QFTD per month to qualify", status: "active", appliesTo: "All models" },
  { id: 5, name: "Hybrid CPA + Rev", description: "Combined CPA per QFTD plus revenue share percentage on NGR", status: "active", appliesTo: "Hybrid only" },
  { id: 6, name: "Tiered CPA", description: "CPA value increases based on monthly QFTD volume tiers", status: "active", appliesTo: "CPA & Hybrid" },
  { id: 7, name: "Fraud Detection", description: "Automatic flagging of suspicious registration patterns", status: "active", appliesTo: "All models" },
  { id: 8, name: "Payment Threshold", description: "Minimum $100 commission balance required for payout", status: "active", appliesTo: "All models" },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
