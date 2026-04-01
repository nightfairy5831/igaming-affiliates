"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  ChartIcon,
  FilterIcon,
  DownloadIcon,
  CalendarIcon,
  TrendUpIcon,
  TrendDownIcon,
  UsersIcon,
  DollarIcon,
} from "@/components/Icons";
import {
  dashboardMetrics,
  monthlyMetrics,
  affiliates,
  campaigns,
  financialRecords,
  operators,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/data/mockData";

type ReportType = "overview" | "affiliates" | "campaigns" | "operators";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "all" | "2025-12" | "2026-01" | "2026-02"
  >("all");
  const [selectedAffiliate, setSelectedAffiliate] = useState<string>("all");
  const [selectedOperator, setSelectedOperator] = useState<string>("all");
  const [reportType, setReportType] = useState<ReportType>("overview");

  const tabs: { key: ReportType; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "affiliates", label: "By Affiliate" },
    { key: "campaigns", label: "By Campaign" },
    { key: "operators", label: "By Operator" },
  ];

  const tierColors: Record<string, string> = {
    Diamond: "bg-violet-100 text-violet-800",
    Platinum: "bg-cyan-100 text-cyan-800",
    Gold: "bg-yellow-100 text-yellow-800",
    Silver: "bg-gray-100 text-gray-800",
    Bronze: "bg-orange-100 text-orange-800",
  };

  const maxRegistrations = Math.max(
    ...monthlyMetrics.map((m) => m.registrations)
  );

  // Group campaigns by operator for the operators tab
  const operatorStats = operators.map((op) => {
    const opCampaigns = campaigns.filter((c) => c.operator === op);
    return {
      name: op,
      totalCampaigns: opCampaigns.length,
      totalClicks: opCampaigns.reduce((sum, c) => sum + c.clicks, 0),
      totalRegistrations: opCampaigns.reduce(
        (sum, c) => sum + c.registrations,
        0
      ),
      totalFTD: opCampaigns.reduce((sum, c) => sum + c.ftd, 0),
      totalNGR: opCampaigns.reduce((sum, c) => sum + c.ngr, 0),
    };
  });

  const filteredOperatorStats = operatorStats.filter(
    (o) => o.totalCampaigns > 0
  );

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Reports &amp; Analytics</h1>
            <p className="page-subtitle">
              Detailed performance analysis with advanced filters
            </p>
          </div>
          <button className="gradient-btn-sm flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Report Type Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setReportType(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                reportType === tab.key
                  ? "bg-gradient-primary text-white rounded-lg"
                  : "bg-white text-gray-600 rounded-lg hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) =>
                  setSelectedPeriod(
                    e.target.value as
                      | "all"
                      | "2025-12"
                      | "2026-01"
                      | "2026-02"
                  )
                }
                className="filter-select"
              >
                <option value="all">All Time</option>
                <option value="2025-12">Dec 2025</option>
                <option value="2026-01">Jan 2026</option>
                <option value="2026-02">Feb 2026</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-gray-400" />
              <select
                value={selectedAffiliate}
                onChange={(e) => setSelectedAffiliate(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Affiliates</option>
                {affiliates.map((aff) => (
                  <option key={aff.id} value={String(aff.id)}>
                    {aff.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4 text-gray-400" />
              <select
                value={selectedOperator}
                onChange={(e) => setSelectedOperator(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Operators</option>
                {operators.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {reportType === "overview" && (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Registrations
                  </span>
                  <UsersIcon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(dashboardMetrics.totalRegistrations)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendUpIcon className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    +{formatPercent(dashboardMetrics.monthlyGrowth)}
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total FTD
                  </span>
                  <ChartIcon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(dashboardMetrics.totalFTD)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendUpIcon className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    +8.3%
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total QFTD
                  </span>
                  <ChartIcon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(dashboardMetrics.totalQFTD)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendUpIcon className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    +7.1%
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Deposits
                  </span>
                  <DollarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardMetrics.totalDeposits)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendUpIcon className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    +11.2%
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total NGR
                  </span>
                  <DollarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardMetrics.totalNGR)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendUpIcon className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    +9.8%
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Revenue
                  </span>
                  <DollarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardMetrics.totalRevenue)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendUpIcon className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    +{formatPercent(dashboardMetrics.monthlyGrowth)}
                  </span>
                </div>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Trends
              </h2>
              <div className="space-y-3">
                {monthlyMetrics.map((m) => (
                  <div
                    key={m.month}
                    className="flex items-center gap-4"
                  >
                    <span className="w-10 text-sm font-medium text-gray-600 shrink-0">
                      {m.month}
                    </span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${(m.registrations / maxRegistrations) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-20 text-sm text-gray-700 text-right shrink-0">
                      {formatNumber(m.registrations)}
                    </span>
                    <span className="w-16 text-sm text-gray-500 text-right shrink-0">
                      {formatNumber(m.ftd)} FTD
                    </span>
                    <span className="w-24 text-sm font-medium text-gray-900 text-right shrink-0">
                      {formatCurrency(m.ngr)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* By Affiliate Tab */}
        {reportType === "affiliates" && (
          <div className="card overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Tier</th>
                  <th>Registrations</th>
                  <th>FTD</th>
                  <th>QFTD</th>
                  <th>NGR</th>
                  <th>Revenue</th>
                  <th>Commission Model</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((aff) => (
                  <tr key={aff.id}>
                    <td>
                      <p className="font-medium text-gray-900">{aff.name}</p>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tierColors[aff.tier]}`}
                      >
                        {aff.tier}
                      </span>
                    </td>
                    <td>{formatNumber(aff.totalRegistrations)}</td>
                    <td>{formatNumber(aff.totalFTD)}</td>
                    <td>{formatNumber(aff.totalQFTD)}</td>
                    <td>{formatCurrency(aff.ngr)}</td>
                    <td>{formatCurrency(aff.revenue)}</td>
                    <td>{aff.commissionModel}</td>
                    <td>
                      {aff.ngr > 300000 ? (
                        <div className="flex items-center gap-1">
                          <TrendUpIcon className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-600 font-medium">
                            High
                          </span>
                        </div>
                      ) : aff.ngr < 100000 ? (
                        <div className="flex items-center gap-1">
                          <TrendDownIcon className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-red-600 font-medium">
                            Low
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-gray-400" />
                          <span className="text-xs text-gray-500 font-medium">
                            Neutral
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* By Campaign Tab */}
        {reportType === "campaigns" && (
          <div className="card overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Affiliate</th>
                  <th>Operator</th>
                  <th>Clicks</th>
                  <th>Registrations</th>
                  <th>FTD</th>
                  <th>Conversion Rate</th>
                  <th>NGR</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((camp) => (
                  <tr key={camp.id}>
                    <td>
                      <p className="font-medium text-gray-900">{camp.name}</p>
                    </td>
                    <td>{camp.affiliateName}</td>
                    <td>{camp.operator}</td>
                    <td>{formatNumber(camp.clicks)}</td>
                    <td>{formatNumber(camp.registrations)}</td>
                    <td>{formatNumber(camp.ftd)}</td>
                    <td>{formatPercent(camp.conversionRate)}</td>
                    <td>{formatCurrency(camp.ngr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* By Operator Tab */}
        {reportType === "operators" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOperatorStats.map((op) => (
              <div key={op.name} className="stat-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {op.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Campaigns</span>
                    <span className="text-sm font-medium text-gray-900">
                      {op.totalCampaigns}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Clicks</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatNumber(op.totalClicks)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Total Registrations
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatNumber(op.totalRegistrations)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total FTD</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatNumber(op.totalFTD)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-sm font-medium text-gray-700">
                      Total NGR
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatCurrency(op.totalNGR)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
