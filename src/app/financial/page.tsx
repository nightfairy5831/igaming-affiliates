"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  DollarIcon,
  CalendarIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
  DownloadIcon,
  FilterIcon,
  TrendUpIcon,
  DocumentIcon,
} from "@/components/Icons";
import {
  financialRecords,
  affiliates,
  formatCurrency,
  formatNumber,
} from "@/data/mockData";

const monthLabels: Record<string, string> = {
  "2025-12": "Dec 2025",
  "2026-01": "Jan 2026",
  "2026-02": "Feb 2026",
};

const statusBadge: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  disputed: "bg-red-100 text-red-800",
};

export default function FinancialPage() {
  const [selectedMonth, setSelectedMonth] = useState<
    "all" | "2025-12" | "2026-01" | "2026-02"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "pending" | "approved" | "paid" | "disputed"
  >("all");
  const [selectedAffiliate, setSelectedAffiliate] = useState<string>("all");

  // Filter records
  const filteredRecords = financialRecords.filter((record) => {
    if (selectedMonth !== "all" && record.month !== selectedMonth) return false;
    if (selectedStatus !== "all" && record.status !== selectedStatus)
      return false;
    if (
      selectedAffiliate !== "all" &&
      record.affiliateId.toString() !== selectedAffiliate
    )
      return false;
    return true;
  });

  // Summary calculations
  const totalPending = financialRecords
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.finalAmount, 0);
  const totalApproved = financialRecords
    .filter((r) => r.status === "approved")
    .reduce((sum, r) => sum + r.finalAmount, 0);
  const totalPaid = financialRecords
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + r.finalAmount, 0);
  const totalAdjustments = financialRecords.reduce(
    (sum, r) => sum + r.adjustments,
    0
  );

  // Monthly breakdown from filtered records
  const uniqueMonths = Array.from(
    new Set(filteredRecords.map((r) => r.month))
  ).sort();

  const monthlyBreakdown = uniqueMonths.map((month) => {
    const monthRecords = filteredRecords.filter((r) => r.month === month);
    return {
      month,
      label: monthLabels[month] || month,
      count: monthRecords.length,
      totalCommission: monthRecords.reduce(
        (sum, r) => sum + r.totalCommission,
        0
      ),
      totalCarryOver: monthRecords.reduce((sum, r) => sum + r.carryOver, 0),
      totalAdjustments: monthRecords.reduce((sum, r) => sum + r.adjustments, 0),
      totalFinalAmount: monthRecords.reduce((sum, r) => sum + r.finalAmount, 0),
    };
  });

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Financial Closing</h1>
            <p className="page-subtitle">
              Monthly commission calculation, validation and payment control
            </p>
          </div>
          <button className="gradient-btn-sm flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total Pending */}
          <div className="stat-card">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-white" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                Pending
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-3">Total Pending</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(totalPending)}
            </p>
          </div>

          {/* Total Approved */}
          <div className="stat-card">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-white" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Approved
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-3">Total Approved</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(totalApproved)}
            </p>
          </div>

          {/* Total Paid */}
          <div className="stat-card">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <DollarIcon className="w-5 h-5 text-white" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                Paid
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-3">Total Paid</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(totalPaid)}
            </p>
          </div>

          {/* Total Adjustments */}
          <div className="stat-card">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                <TrendUpIcon className="w-5 h-5 text-white" />
              </div>
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  totalAdjustments < 0
                    ? "text-red-600 bg-red-50"
                    : "text-gray-600 bg-gray-50"
                }`}
              >
                Adjustments
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-3">Total Adjustments</p>
            <p
              className={`text-2xl font-bold mt-1 ${
                totalAdjustments < 0 ? "text-red-600" : "text-gray-900"
              }`}
            >
              {formatCurrency(totalAdjustments)}
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="card p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FilterIcon className="w-4 h-4" />
              <span className="font-medium">Filters:</span>
            </div>

            <select
              className="filter-select"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value as
                    | "all"
                    | "2025-12"
                    | "2026-01"
                    | "2026-02"
                )
              }
            >
              <option value="all">All Months</option>
              <option value="2025-12">Dec 2025</option>
              <option value="2026-01">Jan 2026</option>
              <option value="2026-02">Feb 2026</option>
            </select>

            <select
              className="filter-select"
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(
                  e.target.value as
                    | "all"
                    | "pending"
                    | "approved"
                    | "paid"
                    | "disputed"
                )
              }
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
              <option value="disputed">Disputed</option>
            </select>

            <select
              className="filter-select"
              value={selectedAffiliate}
              onChange={(e) => setSelectedAffiliate(e.target.value)}
            >
              <option value="all">All Affiliates</option>
              {affiliates.map((aff) => (
                <option key={aff.id} value={aff.id.toString()}>
                  {aff.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Financial Records Table */}
        <div className="card mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DocumentIcon className="w-5 h-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Financial Records
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {filteredRecords.length} record
                {filteredRecords.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Affiliate Name</th>
                  <th>Month</th>
                  <th>Registrations</th>
                  <th>FTD</th>
                  <th>QFTD</th>
                  <th>NGR</th>
                  <th>CPA Earnings</th>
                  <th>RevShare Earnings</th>
                  <th>Total Commission</th>
                  <th>Carry Over</th>
                  <th>Adjustments</th>
                  <th>Final Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="font-medium text-gray-900">
                      {record.affiliateName}
                    </td>
                    <td>{monthLabels[record.month] || record.month}</td>
                    <td>{formatNumber(record.registrations)}</td>
                    <td>{formatNumber(record.ftd)}</td>
                    <td>{formatNumber(record.qftd)}</td>
                    <td>{formatCurrency(record.ngr)}</td>
                    <td>{formatCurrency(record.cpaEarnings)}</td>
                    <td>{formatCurrency(record.revShareEarnings)}</td>
                    <td>{formatCurrency(record.totalCommission)}</td>
                    <td
                      className={
                        record.carryOver < 0 ? "text-red-600 font-medium" : ""
                      }
                    >
                      {formatCurrency(record.carryOver)}
                    </td>
                    <td
                      className={
                        record.adjustments < 0
                          ? "text-red-600 font-medium"
                          : ""
                      }
                    >
                      {formatCurrency(record.adjustments)}
                    </td>
                    <td className="font-bold text-gray-900">
                      {formatCurrency(record.finalAmount)}
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusBadge[record.status]
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {record.status === "pending" && (
                        <button className="gradient-btn-sm flex items-center gap-1 text-xs">
                          <CheckIcon className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      )}
                      {record.status === "paid" && (
                        <span className="text-sm text-green-600 font-medium">
                          Paid
                        </span>
                      )}
                      {record.status === "approved" && (
                        <span className="text-sm text-blue-600 font-medium">
                          Approved
                        </span>
                      )}
                      {record.status === "disputed" && (
                        <span className="text-sm text-red-600 font-medium flex items-center gap-1">
                          <XIcon className="w-3.5 h-3.5" />
                          Disputed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={14} className="text-center py-8 text-gray-400">
                      No records found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Breakdown Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Monthly Breakdown
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {monthlyBreakdown.map((mb) => (
              <div
                key={mb.month}
                className="rounded-xl border border-gray-200 p-5 bg-gray-50/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{mb.label}</h3>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
                    {mb.count} record{mb.count !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Commission</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(mb.totalCommission)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Carry Over</span>
                    <span
                      className={`font-medium ${
                        mb.totalCarryOver < 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {formatCurrency(mb.totalCarryOver)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Adjustments</span>
                    <span
                      className={`font-medium ${
                        mb.totalAdjustments < 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {formatCurrency(mb.totalAdjustments)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-700">
                        Total Final Amount
                      </span>
                      <span className="font-bold text-gray-900">
                        {formatCurrency(mb.totalFinalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {monthlyBreakdown.length === 0 && (
              <div className="col-span-3 text-center py-8 text-gray-400">
                No monthly data available for the selected filters.
              </div>
            )}
          </div>
        </div>

        {/* Business Rules Reference Card */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <DollarIcon className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Business Rules Reference
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Carry Over
              </h4>
              <p className="text-xs text-gray-500">
                Negative NGR carried to next month
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Baseline
              </h4>
              <p className="text-xs text-gray-500">
                Minimum NGR threshold required
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Min QFTD
              </h4>
              <p className="text-xs text-gray-500">
                10 QFTD required for qualification
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Payment Threshold
              </h4>
              <p className="text-xs text-gray-500">
                Minimum $100 for payout
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
