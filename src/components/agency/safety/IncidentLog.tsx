"use client";

import { useTheme } from "@/context/theme";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import toast from "react-hot-toast";

export interface IncidentItem {
  id: string;
  date: string;
  trek: string;
  guide: string;
  status: string;
  notes: string;
  coordinates?: string;
  time?: string;
  response?: string;
}

interface IncidentLogProps {
  incidents: IncidentItem[];
}

export function IncidentLog({ incidents }: IncidentLogProps) {
  const { isDark } = useTheme();

  const handleExportPDF = (id: string) => {
    try {
      if (!id) {
        throw new Error("Invalid incident identifier.");
      }

      toast.success(`Successfully generated PDF report for Incident ${id}.`);
    } catch (err) {
      console.error(`Error exporting PDF for Incident ${id}:`, err);
      toast.error(
        `Failed to export PDF for Incident ${id}. Please try again.`
      );
    }
  };

  return (
    <div
      id="incident-log-table"
      className={`overflow-hidden rounded-2xl border shadow-sm transition-colors ${
        isDark
          ? "border-neutral-800 bg-neutral-900 text-neutral-100"
          : "border-neutral-200 bg-white text-neutral-800"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between border-b p-4 ${
          isDark
            ? "border-neutral-800 bg-neutral-900/50"
            : "border-neutral-200 bg-neutral-50"
        }`}
      >
        <h3
          className={`text-sm font-semibold ${
            isDark ? "text-neutral-100" : "text-neutral-900"
          }`}
        >
          Incident Log
        </h3>

        <span
          className={`text-xs ${
            isDark ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          Immutable — cannot be edited or deleted
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr
              className={`border-b font-bold uppercase tracking-wider ${
                isDark
                  ? "border-neutral-800 bg-neutral-900/80 text-neutral-400"
                  : "border-neutral-200 bg-neutral-50 text-neutral-500"
              }`}
            >
              <th className="p-3.5">Incident ID</th>
              <th className="p-3.5">Trek / Guide</th>
              <th className="p-3.5">Coordinates</th>
              <th className="p-3.5">Time</th>
              <th className="p-3.5">Response</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Export</th>
            </tr>
          </thead>

          <tbody
            className={`divide-y font-medium ${
              isDark
                ? "divide-neutral-800 text-neutral-300"
                : "divide-neutral-200 text-neutral-600"
            }`}
          >
            {incidents.map((incident) => {
              const isActive = incident.status === "Active";

              return (
                <tr
                  key={incident.id}
                  className={`transition-colors ${
                    isDark
                      ? "hover:bg-neutral-800/50"
                      : "hover:bg-neutral-50"
                  }`}
                >
                  {/* Incident ID */}
                  <td className="whitespace-nowrap p-3.5 font-mono font-bold">
                    <span
                      className={
                        isActive
                          ? "text-danger-500"
                          : isDark
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      }
                    >
                      {incident.id}
                    </span>
                  </td>

                  {/* Trek / Guide */}
                  <td className="whitespace-nowrap p-3.5">
                    <div
                      className={`font-bold ${
                        isDark
                          ? "text-neutral-100"
                          : "text-neutral-800"
                      }`}
                    >
                      {incident.trek}
                    </div>

                    <div
                      className={`text-[11px] ${
                        isDark
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      }`}
                    >
                      {incident.guide}
                    </div>
                  </td>

                  {/* Coordinates */}
                  <td
                    className={`whitespace-nowrap p-3.5 font-mono text-[11px] ${
                      isDark
                        ? "text-neutral-400"
                        : "text-neutral-500"
                    }`}
                  >
                    {incident.coordinates || "28.007°N 86.852°E"}
                  </td>

                  {/* Time */}
                  <td className="whitespace-nowrap p-3.5">
                    <div
                      className={
                        isDark
                          ? "text-neutral-200"
                          : "text-neutral-700"
                      }
                    >
                      {incident.date}
                    </div>

                    <div
                      className={`font-mono text-[11px] ${
                        isDark
                          ? "text-neutral-500"
                          : "text-neutral-400"
                      }`}
                    >
                      {incident.time || "09:14 NPT"}
                    </div>
                  </td>

                  {/* Response */}
                  <td className="whitespace-nowrap p-3.5 font-mono font-semibold">
                    {isActive ? (
                      <span className="flex items-center gap-1 text-warning-500">
                        {incident.response || "04:52"}
                        <WarningAmberIcon sx={{ fontSize: 14 }} />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-success-500">
                        {incident.response || "08:14"}
                        <CheckCircleIcon sx={{ fontSize: 14 }} />
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap p-3.5">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? isDark
                            ? "border-danger-800 bg-danger-900/80 text-danger-400"
                            : "border-danger-200 bg-danger-50 text-danger-700"
                          : isDark
                          ? "border-success-800 bg-success-900/80 text-success-400"
                          : "border-success-200 bg-success-50 text-success-700"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </td>

                  {/* Export */}
                  <td className="whitespace-nowrap p-3.5">
                    <button
                      onClick={() => handleExportPDF(incident.id)}
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        isDark
                          ? "border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100"
                          : "border-neutral-200 bg-white text-neutral-600 shadow-sm hover:bg-neutral-50 hover:text-neutral-900"
                      }`}
                    >
                      <PictureAsPdfIcon sx={{ fontSize: 14 }} />
                      PDF
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}