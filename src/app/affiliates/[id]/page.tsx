import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  ArrowRightIcon,
  TrendUpIcon,
  DollarIcon,
  UsersIcon,
  GlobeIcon,
  MapPinIcon,
  LinkIcon,
  ShieldIcon,
  CalendarIcon,
  CheckIcon,
} from "@/components/Icons";
import {
  affiliates,
  campaigns,
  financialRecords,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/data/mockData";

export function generateStaticParams() {
  return affiliates.map((a) => ({ id: a.id.toString() }));
}

const tierColors: Record<string, string> = {
  Bronze: "bg-orange-100 text-orange-800",
  Silver: "bg-gray-200 text-gray-800",
  Gold: "bg-yellow-100 text-yellow-800",
  Platinum: "bg-blue-100 text-blue-800",
  Diamond: "bg-purple-100 text-purple-800",
};

const statusColors: Record<string, string> = {
  active: "badge-active",
  pending: "badge-pending",
  inactive: "badge-inactive",
};

const campaignStatusColors: Record<string, string> = {
  active: "bg-accent-100 text-accent-800",
  paused: "bg-yellow-100 text-yellow-800",
  expired: "bg-gray-100 text-gray-800",
};

const financialStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  paid: "bg-accent-100 text-accent-800",
  disputed: "bg-red-100 text-red-800",
};

export default async function AffiliateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const affiliate = affiliates.find((a) => a.id === parseInt(id));

  if (!affiliate) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="page-container flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Affiliate not found</h1>
            <p className="text-gray-500 mb-6">
              The affiliate you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/affiliates" className="gradient-btn inline-block">
              Back to Affiliates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const affiliateCampaigns = campaigns.filter((c) => c.affiliateId === affiliate.id);
  const affiliateFinancials = financialRecords.filter((r) => r.affiliateId === affiliate.id);

  const initials = affiliate.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="page-container flex-1">
        {/* Back Navigation */}
        <Link
          href="/affiliates"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowRightIcon className="w-4 h-4 rotate-180" />
          <span>Back to Affiliates</span>
        </Link>

        {/* Profile Header Card */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold shrink-0">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{affiliate.name}</h1>
                <p className="text-sm text-gray-500 mt-0.5">{affiliate.email}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <MapPinIcon className="w-4 h-4" />
                    {affiliate.country}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4" />
                    {affiliate.registrationDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={statusColors[affiliate.status]}>
                {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tierColors[affiliate.tier]}`}
              >
                {affiliate.tier}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                {affiliate.commissionModel}
              </span>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Registrations</span>
              <UsersIcon className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(affiliate.totalRegistrations)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total FTD</span>
              <TrendUpIcon className="w-5 h-5 text-accent-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(affiliate.totalFTD)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total QFTD</span>
              <CheckIcon className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(affiliate.totalQFTD)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Deposits</span>
              <DollarIcon className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(affiliate.totalDeposits)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">NGR</span>
              <GlobeIcon className="w-5 h-5 text-indigo-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(affiliate.ngr)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</span>
              <DollarIcon className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(affiliate.revenue)}</p>
          </div>
        </div>

        {/* Commission Details Card */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-primary-500" />
            Commission Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Model</p>
              <p className="text-sm font-medium text-gray-900">{affiliate.commissionModel}</p>
            </div>
            {(affiliate.commissionModel === "CPA" || affiliate.commissionModel === "Hybrid") && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">CPA Value</p>
                <p className="text-sm font-medium text-gray-900">{formatCurrency(affiliate.cpaValue)}</p>
              </div>
            )}
            {(affiliate.commissionModel === "RevShare" || affiliate.commissionModel === "Hybrid") && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">RevShare %</p>
                <p className="text-sm font-medium text-gray-900">{formatPercent(affiliate.revSharePercent)}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Carry Over</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  affiliate.carryOver ? "bg-accent-100 text-accent-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {affiliate.carryOver ? "Yes" : "No"}
              </span>
            </div>
            {affiliate.baseline > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Baseline</p>
                <p className="text-sm font-medium text-gray-900">{formatCurrency(affiliate.baseline)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Linked Houses */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-primary-500" />
            Linked Houses
          </h2>
          <div className="flex flex-wrap gap-2">
            {affiliate.houses.map((house) => (
              <span
                key={house}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700"
              >
                {house}
              </span>
            ))}
          </div>
        </div>

        {/* Active Offers */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendUpIcon className="w-5 h-5 text-primary-500" />
            Active Offers
          </h2>
          <div className="space-y-3">
            {affiliate.offers.map((offer) => (
              <div key={offer} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gradient-primary shrink-0" />
                <span className="text-sm text-gray-700">{offer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Identifiers */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-primary-500" />
            Identifiers
          </h2>
          <div className="flex flex-wrap gap-2">
            {affiliate.identifiers.map((identifier) => (
              <span
                key={identifier}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-mono font-medium bg-gray-100 text-gray-700"
              >
                {identifier}
              </span>
            ))}
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="card mb-6">
          <div className="p-6 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary-500" />
              Campaigns
            </h2>
          </div>
          {affiliateCampaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Campaign Name</th>
                    <th>Operator</th>
                    <th>Status</th>
                    <th>Clicks</th>
                    <th>Registrations</th>
                    <th>FTD</th>
                    <th>Conversion Rate</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateCampaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="font-medium text-gray-900">{campaign.name}</td>
                      <td>{campaign.operator}</td>
                      <td>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            campaignStatusColors[campaign.status]
                          }`}
                        >
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </td>
                      <td>{formatNumber(campaign.clicks)}</td>
                      <td>{formatNumber(campaign.registrations)}</td>
                      <td>{formatNumber(campaign.ftd)}</td>
                      <td>{formatPercent(campaign.conversionRate)}</td>
                      <td>
                        <span className="text-xs text-gray-500 font-mono truncate block max-w-[200px]" title={campaign.trackingLink}>
                          {campaign.trackingLink}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 pb-6 text-sm text-gray-500">No campaigns found for this affiliate.</div>
          )}
        </div>

        {/* Financial History */}
        <div className="card mb-6">
          <div className="p-6 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarIcon className="w-5 h-5 text-primary-500" />
              Financial History
            </h2>
          </div>
          {affiliateFinancials.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Registrations</th>
                    <th>FTD</th>
                    <th>QFTD</th>
                    <th>NGR</th>
                    <th>Commission</th>
                    <th>Carry Over</th>
                    <th>Final Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateFinancials.map((record) => (
                    <tr key={record.id}>
                      <td className="font-medium text-gray-900">{record.month}</td>
                      <td>{formatNumber(record.registrations)}</td>
                      <td>{formatNumber(record.ftd)}</td>
                      <td>{formatNumber(record.qftd)}</td>
                      <td>{formatCurrency(record.ngr)}</td>
                      <td>{formatCurrency(record.totalCommission)}</td>
                      <td>{formatCurrency(record.carryOver)}</td>
                      <td className="font-medium text-gray-900">{formatCurrency(record.finalAmount)}</td>
                      <td>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            financialStatusColors[record.status]
                          }`}
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 pb-6 text-sm text-gray-500">No financial records found for this affiliate.</div>
          )}
        </div>
      </div>
    </div>
  );
}
