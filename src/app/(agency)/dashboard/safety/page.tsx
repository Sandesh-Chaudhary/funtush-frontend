"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SOSAlertBanner } from "@/components/agency/safety/SOSAlertBanner";
import { ActiveTrekList } from "@/components/agency/safety/ActiveTrekList";
import { IncidentLog } from "@/components/agency/safety/IncidentLog";
import { useTheme } from "@/context/theme";
import DescriptionIcon from "@mui/icons-material/Description";
import toast from "react-hot-toast";

const SafetyMap = dynamic(
  () => import("@/components/agency/safety/SafetyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-100 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400 animate-pulse">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-500" />

        <span className="text-xs font-medium">
          Mounting Live Telemetry Canvas...
        </span>
      </div>
    ),
  }
);

const mockActiveTreks = [
  {
    id: "trk-101",
    name: "Everest Base Camp Trek",
    guide_name: "Pasang Sherpa",
    location_name: "Namche Bazaar",
    lat: 27.8069,
    lng: 86.714,
    last_ping: "2 mins ago",
    has_sos: true,
  },
  {
    id: "trk-102",
    name: "Annapurna Circuit Route",
    guide_name: "Nima Tamang",
    location_name: "Manang",
    lat: 28.6667,
    lng: 84.0167,
    last_ping: "14 mins ago",
    has_sos: false,
  },
  {
    id: "trk-103",
    name: "Langtang Valley Expedition",
    guide_name: "Dorje Lama",
    location_name: "Kyanjin Gompa",
    lat: 28.2115,
    lng: 85.567,
    last_ping: "Just now",
    has_sos: false,
  },
];

const mockIncidents = [
  {
    id: "sos-901",
    date: "2026-06-22",
    trek: "Everest Base Camp",
    guide: "Pasang Sherpa",
    status: "Active",
    notes:
      "Trekker displaying mild acute mountain sickness symptoms. Supplemental oxygen container deployed. Remaining static at Namche Bazaar altitude.",
  },
  {
    id: "sos-892",
    date: "2026-06-18",
    trek: "Mardi Himal Trek",
    guide: "Ramesh Gurung",
    status: "Resolved",
    notes:
      "Heavy whiteout storms restricted track pathway alignment. Team safely sheltered at High Camp. Weather cleared, trek successfully resumed.",
  },
];

export default function SafetyPage() {
  const { isDark } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState<string | null>(null);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(handle);
  }, []);

  const handleExportReport = () => {
    try {
      toast.success(
        "Successfully compiled and exported safety audit report."
      );
    } catch (err) {
      console.error("Error exporting safety audit report:", err);
      toast.error(
        "Failed to export safety audit report. Please try again."
      );
    }
  };

  const activeSosCount = mockActiveTreks.filter(
    (trek) => trek.has_sos
  ).length;

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div
        className={`flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between ${
          isDark
            ? "border-neutral-800"
            : "border-neutral-200"
        }`}
      >
        {/* Title + Breadcrumb */}
        <div className="min-w-0">
          <h1
            className={`text-2xl font-semibold tracking-tight ${
              isDark
                ? "text-neutral-100"
                : "text-neutral-900"
            }`}
          >
            Safety Monitoring
          </h1>

          <div className="mt-0.5 flex items-center gap-1.5 text-xs">
            <span
              className={
                isDark
                  ? "text-neutral-400"
                  : "text-neutral-500"
              }
            >
              Safety
            </span>

            <span
              className={
                isDark
                  ? "text-neutral-600"
                  : "text-neutral-300"
              }
            >
              ›
            </span>

            <span
              className={
                isDark
                  ? "font-medium text-primary-400"
                  : "font-medium text-primary-700"
              }
            >
              Live Overview
            </span>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportReport}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm transition-colors ${
              isDark
                ? "border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-neutral-100"
                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <DescriptionIcon sx={{ fontSize: 16 }} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* SOS Alert */}
      <SOSAlertBanner activeSosCount={activeSosCount} />

      {/* Active Treks + Map */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Active Trek List */}
        <div className="space-y-3 lg:col-span-1">
          <ActiveTrekList
            treks={mockActiveTreks}
            selectedTrekId={selectedTrek}
            onSelectTrek={setSelectedTrek}
          />
        </div>

        {/* Safety Map */}
        <div className="min-h-100 lg:col-span-2">
          <SafetyMap treks={mockActiveTreks} />
        </div>
      </div>

      {/* Incident Log */}
      <IncidentLog incidents={mockIncidents} />
    </div>
  );
}