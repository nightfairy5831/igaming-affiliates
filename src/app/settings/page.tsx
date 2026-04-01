"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
  LinkIcon,
  CheckIcon,
  XIcon,
  PlusIcon,
  EyeIcon,
  GlobeIcon,
  DownloadIcon,
} from "@/components/Icons";
import { businessRules, users } from "@/data/mockData";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"rules" | "users" | "integrations">("rules");

  const tabs = [
    { key: "rules" as const, label: "Business Rules", icon: ShieldIcon },
    { key: "users" as const, label: "Users & Access", icon: UsersIcon },
    { key: "integrations" as const, label: "Integrations", icon: LinkIcon },
  ];

  const roleColors: Record<string, string> = {
    admin: "bg-violet-100 text-violet-800",
    manager: "bg-cyan-100 text-cyan-800",
    analyst: "bg-emerald-100 text-emerald-800",
    affiliate: "bg-orange-100 text-orange-800",
  };

  const integrations = [
    {
      name: "Spreadsheet Import/Export",
      description: "CSV/XLSX data import and export",
      status: "active",
      statusLabel: "Active",
      icon: DownloadIcon,
      actionLabel: "Configure",
    },
    {
      name: "REST API",
      description: "External API for data access",
      status: "active",
      statusLabel: "Active",
      icon: GlobeIcon,
      actionLabel: "Configure",
    },
    {
      name: "Operator APIs",
      description: "Direct integration with operator platforms",
      status: "pending",
      statusLabel: "In Development",
      icon: LinkIcon,
      actionLabel: "Coming Soon",
    },
    {
      name: "Payment Gateway",
      description: "Automated commission payments",
      status: "inactive",
      statusLabel: "Planned",
      icon: ShieldIcon,
      actionLabel: "Coming Soon",
    },
    {
      name: "Webhook Notifications",
      description: "Real-time event notifications",
      status: "active",
      statusLabel: "Active",
      icon: SettingsIcon,
      actionLabel: "Configure",
    },
    {
      name: "Data Warehouse",
      description: "BigQuery/Snowflake export",
      status: "inactive",
      statusLabel: "Planned",
      icon: GlobeIcon,
      actionLabel: "Coming Soon",
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">
            Configure business rules, access control, and integrations
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b border-gray-200 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-primary-500 text-primary-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Business Rules Tab */}
        {activeTab === "rules" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {businessRules.map((rule) => (
                <div key={rule.id} className="card p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{rule.description}</p>
                      <span className="inline-block mt-3 bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full">
                        {rule.appliesTo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {rule.status === "active" ? (
                        <>
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                          <span className="badge-active">Active</span>
                        </>
                      ) : (
                        <>
                          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                          <span className="badge-inactive">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="gradient-btn-outline flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                Add New Rule
              </button>
            </div>
          </div>
        )}

        {/* Users & Access Tab */}
        {activeTab === "users" && (
          <div>
            <div className="flex items-center justify-end mb-4">
              <button className="gradient-btn-sm flex items-center gap-2">
                <PlusIcon className="w-4 h-4" />
                Add User
              </button>
            </div>

            <div className="card overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th>Last Login</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}
                        >
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.map((perm) => (
                            <span
                              key={perm}
                              className="bg-gray-100 rounded text-xs px-2 py-0.5 text-gray-700"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <span className={user.status === "active" ? "badge-active" : "badge-inactive"}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="text-gray-400 hover:text-primary-600 transition-colors">
                          <EyeIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Role Permissions Reference */}
            <div className="card p-5 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Role Permissions Reference</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-violet-50 border border-violet-100">
                  <p className="text-sm font-semibold text-violet-800">Admin</p>
                  <p className="text-xs text-violet-600 mt-1">Full access</p>
                </div>
                <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-100">
                  <p className="text-sm font-semibold text-cyan-800">Manager</p>
                  <p className="text-xs text-cyan-600 mt-1">Affiliates, Campaigns, Reports, Financial</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                  <p className="text-sm font-semibold text-emerald-800">Analyst</p>
                  <p className="text-xs text-emerald-600 mt-1">Reports, Campaigns</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
                  <p className="text-sm font-semibold text-orange-800">Affiliate</p>
                  <p className="text-xs text-orange-600 mt-1">Own dashboard only</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === "integrations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {integrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <div key={integration.name} className="card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span
                      className={
                        integration.status === "active"
                          ? "badge-active"
                          : integration.status === "pending"
                            ? "badge-pending"
                            : "badge-inactive"
                      }
                    >
                      {integration.statusLabel}
                    </span>
                    <button
                      className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        integration.status === "active"
                          ? "text-primary-600 hover:bg-primary-50"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={integration.status !== "active"}
                    >
                      {integration.actionLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
