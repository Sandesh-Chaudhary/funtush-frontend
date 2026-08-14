"use client";

import { useTheme } from "@/context/theme";
import CompassIcon from "@mui/icons-material/Explore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export interface ActiveTrek {
  id: string;
  name: string;
  guide_name: string;
  location_name: string;
  lat: number;
  lng: number;
  last_ping: string;
  has_sos: boolean;
  elevation?: string;
  progressText?: string;
  progressPercentage?: number;
}

interface ActiveTrekListProps {
  treks: ActiveTrek[];
  selectedTrekId: string | null;
  onSelectTrek: (id: string) => void;
}

export function ActiveTrekList({
  treks,
  selectedTrekId,
  onSelectTrek,
}: ActiveTrekListProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`h-full w-full min-w-0 rounded-xl border p-3 shadow-sm transition-colors sm:p-4 ${
        isDark
          ? "border-neutral-800 bg-neutral-900 text-neutral-100"
          : "border-neutral-200 bg-white text-neutral-800"
      }`}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3
          className={`min-w-0 text-sm font-bold ${
            isDark ? "text-neutral-100" : "text-neutral-800"
          }`}
        >
          Active Treks
        </h3>

        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-xs ${
            isDark
              ? "bg-neutral-800 text-neutral-300"
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {treks.length} Live
        </span>
      </div>

      {/* Trek List */}
      <div className="max-h-[360px] space-y-2 overflow-y-auto pr-0.5 sm:pr-1">
        {treks.map((trek) => {
          const isSelected = selectedTrekId === trek.id;

          return (
            <div
              key={trek.id}
              onClick={() => onSelectTrek(trek.id)}
              className={`w-full min-w-0 cursor-pointer select-none rounded-lg border p-2.5 text-left transition-all sm:p-3 ${
                isSelected
                  ? isDark
                    ? "border-primary-500 bg-primary-950"
                    : "border-primary-300 bg-primary-50"
                  : trek.has_sos
                  ? isDark
                    ? "border-danger-800 bg-danger-900/30 hover:bg-danger-900/50"
                    : "border-danger-200 bg-danger-50 hover:bg-danger-100"
                  : isDark
                  ? "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800"
                  : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
              }`}
            >
              {/* Trek Information */}
              <div className="flex min-w-0 items-start gap-2">
                {/* Icon */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border sm:h-9 sm:w-9 ${
                    trek.has_sos
                      ? isDark
                        ? "border-danger-800 bg-danger-900 text-danger-400"
                        : "border-danger-200 bg-danger-50 text-danger-600"
                      : isDark
                      ? "border-neutral-700 bg-neutral-800 text-success-400"
                      : "border-success-200 bg-success-50 text-success-600"
                  }`}
                >
                  {trek.has_sos ? (
                    <WarningAmberIcon sx={{ fontSize: 17 }} />
                  ) : (
                    <CompassIcon sx={{ fontSize: 17 }} />
                  )}
                </div>

                {/* Trek Details */}
                <div className="min-w-0 flex-1">
                  {/* Trek name + guide */}
                  <h4
                    className={`truncate text-[11px] font-bold leading-4 sm:text-xs ${
                      trek.has_sos
                        ? isDark
                          ? "text-danger-400"
                          : "text-danger-600"
                        : isDark
                        ? "text-neutral-100"
                        : "text-neutral-800"
                    }`}
                    title={`${trek.name} — ${trek.guide_name}`}
                  >
                    {trek.name}

                    <span
                      className={`font-medium ${
                        isDark
                          ? "text-neutral-300"
                          : "text-neutral-600"
                      }`}
                    >
                      {" "}
                      — {trek.guide_name}
                    </span>
                  </h4>

                  {/* Status + Location */}
                  <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[9px] sm:text-[10px]">
                    {trek.has_sos ? (
                      <span className="shrink-0 font-bold uppercase tracking-wide text-danger-500">
                        SOS ACTIVE
                      </span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1 font-semibold text-success-500">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-success-500" />
                        LIVE
                      </span>
                    )}

                    <span
                      className={
                        isDark
                          ? "text-neutral-600"
                          : "text-neutral-300"
                      }
                    >
                      •
                    </span>

                    <span
                      className={`min-w-0 truncate font-mono ${
                        isDark
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      }`}
                      title={trek.elevation || trek.location_name}
                    >
                      {trek.elevation || trek.location_name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5">
                <div
                  className={`h-1.5 w-full overflow-hidden rounded-full ${
                    isDark
                      ? "bg-neutral-800"
                      : "bg-neutral-100"
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${
                      trek.has_sos
                        ? "bg-danger-500"
                        : "bg-primary-500"
                    }`}
                    style={{
                      width: `${trek.progressPercentage ?? 65}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-1.5 flex min-w-0 items-center justify-between gap-2 pt-1 text-[9px] sm:mt-2 sm:text-[10px]">
                <span
                  className={`min-w-0 truncate font-medium ${
                    isDark
                      ? "text-neutral-400"
                      : "text-neutral-500"
                  }`}
                  title={trek.progressText || "Day 4 of 12"}
                >
                  {trek.progressText || "Day 4 of 12"}
                </span>

                <span
                  className={`shrink-0 italic ${
                    isDark
                      ? "text-neutral-500"
                      : "text-neutral-400"
                  }`}
                >
                  {trek.last_ping}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}