"use client";

import { useTheme } from "@/context/theme";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldAlertIcon from "@mui/icons-material/ReportProblem";
import toast from "react-hot-toast";

interface SOSAlertBannerProps {
  activeSosCount: number;
  guideName?: string;
  trekName?: string;
  coordinates?: string;
  triggeredBy?: string;
  timer?: string;
  onAcknowledge?: () => void;
  onCallGuide?: () => void;
  onWhatsApp?: () => void;
}

export function SOSAlertBanner({
  activeSosCount,
  guideName = "Bishal Tamang",
  trekName = "EBC — Day 4",
  coordinates = "28.0071°N 86.8524°E 5,364m",
  triggeredBy = "Guide (mobile app)",
  timer = "04:52",
  onAcknowledge,
  onCallGuide,
  onWhatsApp,
}: SOSAlertBannerProps) {
  const { isDark } = useTheme();

  if (activeSosCount === 0) return null;

  const handleAcknowledge = () => {
    try {
      if (onAcknowledge) onAcknowledge();

      toast.success(
        "SOS Alert successfully acknowledged. Response team deployed."
      );
    } catch (err) {
      console.error("Error acknowledging SOS alert:", err);
      toast.error("Failed to acknowledge SOS alert. Please try again.");
    }
  };

  const handleCallGuide = () => {
    try {
      if (onCallGuide) onCallGuide();

      toast.success(`Initiating secure voice link with ${guideName}...`);
    } catch (err) {
      console.error("Error initiating call to guide:", err);
      toast.error("Failed to connect call. Please check the network.");
    }
  };

  const handleWhatsApp = () => {
    try {
      if (onWhatsApp) onWhatsApp();

      toast.success(`Opening emergency chat channel for ${guideName}.`);
    } catch (err) {
      console.error("Error opening WhatsApp messaging channel:", err);
      toast.error("Failed to open WhatsApp messaging channel.");
    }
  };

  return (
    <div
      className={`w-full min-w-0 rounded-xl border p-4 shadow-sm transition-colors ${
        isDark
          ? "border-danger-800 bg-danger-900/40 text-danger-200"
          : "border-danger-200 bg-danger-50 text-danger-900"
      }`}
    >
      {/* Top Header Row */}
      <div
        className={`flex min-w-0 items-center justify-between border-b pb-3 ${
          isDark
            ? "border-danger-800/50"
            : "border-danger-200"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 animate-ping rounded-full bg-danger-600" />

          <div
            className={`flex min-w-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${
              isDark
                ? "text-danger-400"
                : "text-danger-600"
            }`}
          >
            <ShieldAlertIcon sx={{ fontSize: 16 }} />

            <span className="truncate">
              ACTIVE SOS — Respond within 15 minutes
            </span>
          </div>
        </div>

        <div
          className={`shrink-0 font-mono text-sm font-bold ${
            isDark
              ? "text-danger-400"
              : "text-danger-600"
          }`}
        >
          {timer}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 items-center gap-4 pt-3 text-xs sm:grid-cols-2 md:grid-cols-3">
        {/* Guide */}
        <div className="min-w-0">
          <span
            className={`block text-[11px] ${
              isDark
                ? "text-danger-400/70"
                : "text-danger-700/70"
            }`}
          >
            Guide
          </span>

          <span
            className={`text-sm font-bold ${
              isDark
                ? "text-danger-100"
                : "text-danger-950"
            }`}
          >
            {guideName}
          </span>
        </div>

        {/* Trek */}
        <div className="min-w-0">
          <span
            className={`block text-[11px] ${
              isDark
                ? "text-danger-400/70"
                : "text-danger-700/70"
            }`}
          >
            Trek
          </span>

          <span
            className={`text-sm font-bold ${
              isDark
                ? "text-danger-100"
                : "text-danger-950"
            }`}
          >
            {trekName}
          </span>
        </div>

        {/* GPS Coordinates */}
        <div className="min-w-0">
          <span
            className={`block text-[11px] ${
              isDark
                ? "text-danger-400/70"
                : "text-danger-700/70"
            }`}
          >
            GPS Coordinates
          </span>

          <span
            className={`font-mono font-bold ${
              isDark
                ? "text-danger-200"
                : "text-danger-900"
            }`}
          >
            {coordinates}
          </span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="grid grid-cols-1 items-center gap-4 pt-3 text-xs sm:grid-cols-2 md:grid-cols-3">
        {/* Triggered By */}
        <div className="min-w-0">
          <span
            className={`block pb-1 text-[11px] ${
              isDark
                ? "text-danger-400/70"
                : "text-danger-700/70"
            }`}
          >
            Triggered by
          </span>

          <span
            className={`font-semibold ${
              isDark
                ? "text-danger-200"
                : "text-danger-900"
            }`}
          >
            {triggeredBy}
          </span>
        </div>

        {/* Emergency Call */}
        <div>
          <p
            className={`pb-2 text-[11px] ${
              isDark
                ? "text-danger-400/70"
                : "text-danger-700/70"
            }`}
          >
            Emergency call
          </p>

          <span
            className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold ${
              isDark
                ? "border-success-800 bg-success-900/60 text-success-400"
                : "border-success-200 bg-success-50 text-success-700"
            }`}
          >
            <CheckCircleIcon sx={{ fontSize: 14 }} />
            Nepal Police (100)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Acknowledge */}
          <button
            onClick={handleAcknowledge}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors ${
              isDark
                ? "bg-primary-600 hover:bg-primary-700"
                : "bg-primary-600 hover:bg-primary-700"
            }`}
          >
            <CheckCircleIcon sx={{ fontSize: 14 }} />
            Acknowledge
          </button>

          {/* Call Guide */}
          <button
            onClick={handleCallGuide}
            className={`inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm transition-colors sm:w-auto ${
              isDark
                ? "border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <PhoneIcon
              sx={{ fontSize: 14 }}
              className="text-success-600"
            />
            Call Guide
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className={`inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm transition-colors sm:w-auto ${
              isDark
                ? "border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <ChatIcon
              sx={{ fontSize: 14 }}
              className="text-success-500"
            />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}