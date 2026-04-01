"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  SearchIcon,
  FilterIcon,
  PlusIcon,
  LinkIcon,
  CopyIcon,
  EyeIcon,
  TrendUpIcon,
  CampaignIcon,
} from "@/components/Icons";
import {
  campaigns,
  operators,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/data/mockData";

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "active" | "paused" | "expired"
  >("all");
  const [selectedOperator, setSelectedOperator] = useState<string>("all");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      searchQuery === "" ||
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.affiliateName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || campaign.status === selectedStatus;

    const matchesOperator =
      selectedOperator === "all" || campaign.operator === selectedOperator;

    return matchesSearch && matchesStatus && matchesOperator;
  });

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgConversionRate =
    campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.conversionRate, 0) /
        campaigns.length
      : 0;

  const top3ByFtd = [...campaigns]
    .sort((a, b) => b.ftd - a.ftd)
    .slice(0, 3);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  const truncateLink = (link: string) => {
    if (link.length > 40) {
      return link.substring(0, 37) + "...";
    }
    return link;
  };

  const getStatusBadge = (status: "active" | "paused" | "expired") => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        );
      case "paused":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Paused
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Expired
          </span>
        );
    }
  };

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Campaigns &amp; Links</h1>
            <p className="page-subtitle">
              Manage tracking campaigns and generate links
            </p>
          </div>
          <button className="gradient-btn-sm flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            New Campaign
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 font-medium">
                Total Campaigns
              </span>
              <CampaignIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {totalCampaigns}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 font-medium">
                Active Campaigns
              </span>
              <EyeIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {activeCampaigns}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 font-medium">
                Total Clicks
              </span>
              <LinkIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(totalClicks)}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 font-medium">
                Avg Conversion Rate
              </span>
              <TrendUpIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatPercent(avgConversionRate)}
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns or affiliates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input w-full pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value as "all" | "active" | "paused" | "expired"
                  )
                }
                className="filter-select"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="expired">Expired</option>
              </select>
            </div>

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

            <span className="text-sm text-gray-500 ml-auto">
              Showing {filteredCampaigns.length} campaigns
            </span>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="card overflow-hidden mb-8">
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
                  <th>QFTD</th>
                  <th>Conversion Rate</th>
                  <th>NGR</th>
                  <th>Tracking Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td>
                      <div>
                        <span className="font-semibold text-gray-900">
                          {campaign.name}
                        </span>
                        <span className="block text-xs text-gray-400">
                          {campaign.affiliateName}
                        </span>
                      </div>
                    </td>
                    <td>{campaign.operator}</td>
                    <td>{getStatusBadge(campaign.status)}</td>
                    <td>{formatNumber(campaign.clicks)}</td>
                    <td>{formatNumber(campaign.registrations)}</td>
                    <td>{formatNumber(campaign.ftd)}</td>
                    <td>{formatNumber(campaign.qftd)}</td>
                    <td>{formatPercent(campaign.conversionRate)}</td>
                    <td>{formatCurrency(campaign.ngr)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-mono">
                          {truncateLink(campaign.trackingLink)}
                        </span>
                        <button
                          onClick={() => handleCopyLink(campaign.trackingLink)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                          title="Copy tracking link"
                        >
                          <CopyIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCampaigns.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-gray-400">
                      No campaigns found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Performance Summary Card */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Campaign Performance Summary
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Top 3 campaigns by First Time Deposits
          </p>
          <div className="space-y-4">
            {top3ByFtd.map((campaign, index) => (
              <div
                key={campaign.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{campaign.name}</p>
                  <p className="text-xs text-gray-400">
                    {campaign.affiliateName} - {campaign.operator}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">
                    {formatNumber(campaign.ftd)} FTD
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatPercent(campaign.conversionRate)} conv. |{" "}
                    {formatCurrency(campaign.ngr)} NGR
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
