"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EyeIcon,
  TrendUpIcon,
  UsersIcon,
  DollarIcon,
} from "@/components/Icons";
import {
  affiliates,
  countries,
  formatCurrency,
  formatNumber,
} from "@/data/mockData";

export default function AffiliatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "active" | "pending" | "inactive"
  >("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  const totalAffiliates = affiliates.length;
  const activeCount = affiliates.filter((a) => a.status === "active").length;
  const pendingCount = affiliates.filter((a) => a.status === "pending").length;
  const totalRevenue = affiliates.reduce((sum, a) => sum + a.revenue, 0);

  const filteredAffiliates = affiliates.filter((affiliate) => {
    const matchesSearch =
      searchQuery === "" ||
      affiliate.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || affiliate.status === selectedStatus;
    const matchesCountry =
      selectedCountry === "all" || affiliate.country === selectedCountry;
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const tierColors: Record<string, string> = {
    Diamond: "bg-violet-100 text-violet-800",
    Platinum: "bg-cyan-100 text-cyan-800",
    Gold: "bg-yellow-100 text-yellow-800",
    Silver: "bg-gray-100 text-gray-800",
    Bronze: "bg-orange-100 text-orange-800",
  };

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Affiliates</h1>
            <p className="page-subtitle">
              Manage and monitor all affiliate partners
            </p>
          </div>
          <button className="gradient-btn-sm flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            New Affiliate
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Affiliates
              </span>
              <UsersIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(totalAffiliates)}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Active
              </span>
              <TrendUpIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(activeCount)}
              </p>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Pending
              </span>
              <FilterIcon className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(pendingCount)}
              </p>
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
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
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search affiliates by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input w-full pl-10"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(
                  e.target.value as "all" | "active" | "pending" | "inactive"
                )
              }
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <span className="text-sm text-gray-500 ml-auto">
              Showing {filteredAffiliates.length} affiliates
            </span>
          </div>
        </div>

        {/* Affiliates Table */}
        <div className="card overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Tier</th>
                <th>Model</th>
                <th>FTD</th>
                <th>QFTD</th>
                <th>NGR</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAffiliates.map((affiliate) => (
                <tr key={affiliate.id}>
                  <td>
                    <div>
                      <p className="font-medium text-gray-900">
                        {affiliate.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {affiliate.email}
                      </p>
                    </div>
                  </td>
                  <td>{affiliate.country}</td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tierColors[affiliate.tier]}`}
                    >
                      {affiliate.tier}
                    </span>
                  </td>
                  <td>{affiliate.commissionModel}</td>
                  <td>{formatNumber(affiliate.totalFTD)}</td>
                  <td>{formatNumber(affiliate.totalQFTD)}</td>
                  <td>{formatCurrency(affiliate.ngr)}</td>
                  <td>{formatCurrency(affiliate.revenue)}</td>
                  <td>
                    <span
                      className={
                        affiliate.status === "active"
                          ? "badge-active"
                          : affiliate.status === "pending"
                            ? "badge-pending"
                            : "badge-inactive"
                      }
                    >
                      {affiliate.status.charAt(0).toUpperCase() +
                        affiliate.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/affiliates/${affiliate.id}`}
                      className="text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
