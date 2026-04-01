"use client";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  DashboardIcon,
  UsersIcon,
  TrendUpIcon,
  DollarIcon,
  ChartIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import {
  dashboardMetrics,
  monthlyMetrics,
  affiliates,
  activityLogs,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/data/mockData";

const kpiCards = [
  {
    label: "Total Affiliates",
    value: formatNumber(dashboardMetrics.totalAffiliates),
    growth: 8.2,
    icon: UsersIcon,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    label: "Active Affiliates",
    value: formatNumber(dashboardMetrics.activeAffiliates),
    growth: 5.4,
    icon: UsersIcon,
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    label: "Total FTD",
    value: formatNumber(dashboardMetrics.totalFTD),
    growth: 12.5,
    icon: TrendUpIcon,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    label: "Total NGR",
    value: formatCurrency(dashboardMetrics.totalNGR),
    growth: 15.3,
    icon: DollarIcon,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    label: "Total Revenue",
    value: formatCurrency(dashboardMetrics.totalRevenue),
    growth: 14.8,
    icon: ChartIcon,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    label: "Commissions Paid",
    value: formatCurrency(dashboardMetrics.totalCommissionsPaid),
    growth: 9.7,
    icon: DollarIcon,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    label: "Avg CPA",
    value: `$${dashboardMetrics.avgCPA.toFixed(2)}`,
    growth: 3.1,
    icon: TrendUpIcon,
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    label: "Conversion Rate",
    value: formatPercent(dashboardMetrics.avgConversionRate),
    growth: 2.8,
    icon: ChartIcon,
    gradient: "from-teal-500 to-cyan-600",
  },
];

const quickActions = [
  {
    label: "Manage Affiliates",
    href: "/affiliates",
    icon: UsersIcon,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    label: "Campaigns",
    href: "/campaigns",
    icon: DashboardIcon,
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    label: "View Reports",
    href: "/reports",
    icon: ChartIcon,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    label: "Financial Closing",
    href: "/financial",
    icon: DollarIcon,
    gradient: "from-amber-500 to-orange-600",
  },
];

const activityDotColor: Record<string, string> = {
  affiliate: "bg-violet-500",
  campaign: "bg-cyan-500",
  financial: "bg-emerald-500",
  system: "bg-gray-400",
};

const tierBadgeColor: Record<string, string> = {
  Bronze: "bg-orange-100 text-orange-800",
  Silver: "bg-gray-100 text-gray-800",
  Gold: "bg-yellow-100 text-yellow-800",
  Platinum: "bg-blue-100 text-blue-800",
  Diamond: "bg-purple-100 text-purple-800",
};

export default function Home() {
  const topAffiliates = [...affiliates]
    .sort((a, b) => b.totalFTD - a.totalFTD)
    .slice(0, 5);

  const maxRegistrations = Math.max(
    ...monthlyMetrics.map((m) => m.registrations)
  );

  const recentActivity = activityLogs.slice(0, 7);

  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Sidebar />
      <main className="page-container">
        {/* Page Header */}
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">
              Overview of your affiliate operations
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>{dateString}</span>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="stat-card">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <TrendUpIcon className="w-3 h-3" />+
                    {card.growth.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-3">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Monthly Performance Chart + Top Affiliates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Performance Chart */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Monthly Performance
            </h2>
            <div className="space-y-3">
              {monthlyMetrics.map((m) => {
                const barWidth = (m.registrations / maxRegistrations) * 100;
                return (
                  <div key={m.month} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-500 w-8 shrink-0">
                      {m.month}
                    </span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-14 text-right shrink-0">
                      {formatNumber(m.ftd)} FTD
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Affiliates Table */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Top Affiliates
            </h2>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Tier</th>
                    <th>FTD</th>
                    <th>QFTD</th>
                    <th>NGR</th>
                    <th>Model</th>
                  </tr>
                </thead>
                <tbody>
                  {topAffiliates.map((aff, idx) => (
                    <tr key={aff.id}>
                      <td className="font-semibold text-gray-900">
                        #{idx + 1}
                      </td>
                      <td>
                        <Link
                          href={`/affiliates/${aff.id}`}
                          className="text-primary-600 hover:text-primary-800 font-medium hover:underline"
                        >
                          {aff.name}
                        </Link>
                      </td>
                      <td>{aff.country}</td>
                      <td>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tierBadgeColor[aff.tier]}`}
                        >
                          {aff.tier}
                        </span>
                      </td>
                      <td className="font-medium">
                        {formatNumber(aff.totalFTD)}
                      </td>
                      <td>{formatNumber(aff.totalQFTD)}</td>
                      <td className="font-medium">
                        {formatCurrency(aff.ngr)}
                      </td>
                      <td>{aff.commissionModel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="mt-1.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${activityDotColor[log.type]}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {log.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{log.detail}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 flex-1">
                      {action.label}
                    </span>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
