"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useState } from "react";
import type { Staff } from "@/hooks/useStaff";

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "S";

const createQrCodeMatrix = (value: string, modules = 13) => {
  const seed = Array.from(new TextEncoder().encode(value)).reduce(
    (sum, byte) => (sum * 131 + byte) >>> 0,
    2166136261,
  );
  const matrix = Array.from({ length: modules }, () =>
    Array.from({ length: modules }, () => false),
  );

  const drawFinder = (row: number, column: number) => {
    for (let r = 0; r < 7; r += 1) {
      for (let c = 0; c < 7; c += 1) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[row + r][column + c] = isBorder || isCenter;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, modules - 7);
  drawFinder(modules - 7, 0);

  for (let row = 0; row < modules; row += 1) {
    for (let column = 0; column < modules; column += 1) {
      if (matrix[row][column]) continue;
      matrix[row][column] =
        ((seed >>> ((row * modules + column) % 32)) + row * 3 + column * 5) %
          2 ===
        0;
    }
  }

  return matrix;
};

export default function StaffIdCard({
  staff,
  roleName,
}: {
  staff: Staff;
  roleName: string;
}) {
  const [imageError, setImageError] = useState(false);
  const qrCode = createQrCodeMatrix(`${staff.id}${staff.email}`);

  const downloadIdCard = () => {
    const canvas = document.createElement("canvas");
    const width = 1000;
    const height = 620;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "rgba(15,23,42,0.04)";
    for (let x = 0; x < width; x += 22) {
      for (let y = 0; y < height; y += 22) {
        context.beginPath();
        context.arc(x, y, 1, 0, Math.PI * 2);
        context.fill();
      }
    }

    context.fillStyle = "#0ea5e9";
    context.beginPath();
    context.roundRect(0, 40, 480, 90, [0, 45, 45, 0]);
    context.fill();
    context.fillStyle = "#ffffff";
    context.font = "800 34px sans-serif";
    context.fillText("STAFF ID CARD", 50, 95);
    context.fillStyle = "#0ea5e9";
    context.font = "900 32px sans-serif";
    context.textAlign = "right";
    context.fillText("FUNTUSH", width - 50, 75);
    context.font = "600 12px sans-serif";
    context.fillStyle = "#94a3b8";
    context.fillText("VERIFIED AGENCY STAFF", width - 50, 98);
    context.textAlign = "left";

    context.fillStyle = "#7c3aed";
    context.beginPath();
    context.roundRect(50, 175, 190, 190, 24);
    context.fill();
    context.fillStyle = "#ffffff";
    context.font = "700 72px sans-serif";
    context.textAlign = "center";
    context.fillText(initials(staff.name), 145, 285);
    context.textAlign = "left";

    const rows = [
      ["Name", staff.name],
      ["Role", roleName],
      ["Phone", staff.phone || "Not provided"],
      ["Email", staff.email],
      ["Staff ID", staff.id.toUpperCase()],
      ["Status", staff.active ? "Active" : "Inactive"],
    ];
    rows.forEach(([label, value], index) => {
      const y = 190 + index * 57;
      context.fillStyle = "#0f172a";
      context.font = "700 18px sans-serif";
      context.fillText(label.toUpperCase(), 300, y);
      context.fillStyle = "#64748b";
      context.font = "500 18px sans-serif";
      context.fillText(value, 450, y);
    });

    const cellSize = 10;
    const qrX = 80;
    const qrY = 405;
    qrCode.forEach((row, rowIndex) =>
      row.forEach((filled, columnIndex) => {
        context.fillStyle = filled ? "#0f172a" : "#ffffff";
        context.fillRect(
          qrX + columnIndex * cellSize,
          qrY + rowIndex * cellSize,
          cellSize,
          cellSize,
        );
      }),
    );
    context.strokeStyle = "#cbd5e1";
    context.lineWidth = 2;
    context.strokeRect(
      qrX,
      qrY,
      qrCode.length * cellSize,
      qrCode.length * cellSize,
    );

    const link = document.createElement("a");
    link.download = `${staff.name.toLowerCase().replace(/\s+/g, "-")}-staff-id.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background:radial-gradient(circle_at_20%_20%,#000_1px,transparent_1px)] bg-size-[22px_22px]" />
        <div className="relative flex items-center justify-between gap-4 px-6 pb-12 pt-6 sm:px-8 sm:pt-8">
          <div className="rounded-r-3xl bg-sky-500 py-4 pl-6 pr-8 shadow-lg sm:py-5 sm:pl-8 sm:pr-10">
            <p className="text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
              Staff ID Card
            </p>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-xl font-black tracking-tight text-sky-500 sm:text-2xl">
              FUNTUSH
            </span>
            <span className="text-[9px] uppercase tracking-[0.24em] text-slate-400 sm:text-[10px] sm:tracking-[0.3em]">
              Verified Agency Staff
            </span>
          </div>
        </div>

        <div className="relative grid gap-6 px-6 pb-6 sm:px-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-8">
          <div className="space-y-4">
            <div className="relative h-48 w-48 overflow-hidden rounded-3xl border-4 border-sky-500 bg-violet-600 shadow-md">
              {staff.avatar && !imageError ? (
                <Image
                  src={staff.avatar}
                  alt={staff.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl font-semibold tracking-[0.16em] text-white sm:text-6xl">
                  {initials(staff.name)}
                </div>
              )}
            </div>
            <div className="w-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="inline-grid grid-cols-[repeat(13,minmax(4px,1fr))] gap-0.5">
                {qrCode.flatMap((row, rowIndex) =>
                  row.map((cell, columnIndex) => (
                    <span
                      key={`${rowIndex}-${columnIndex}`}
                      className={
                        cell
                          ? "block h-2 w-2 bg-slate-950"
                          : "block h-2 w-2 bg-white"
                      }
                    />
                  )),
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 self-center sm:space-y-4">
            {[
              { label: "Name", value: staff.name },
              { label: "Role", value: roleName },
              { label: "Phone", value: staff.phone || "Not provided" },
              { label: "Email", value: staff.email },
              { label: "Staff ID", value: staff.id.toUpperCase() },
              { label: "Status", value: staff.active ? "Active" : "Inactive" },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[86px_12px_minmax(0,1fr)] items-baseline gap-2 text-sm sm:grid-cols-[104px_16px_minmax(0,1fr)] sm:text-base"
              >
                <span className="font-semibold uppercase tracking-wide text-slate-900">
                  {row.label}
                </span>
                <span className="text-slate-400">:</span>
                <span className="wrap-break-word font-medium text-slate-700">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={downloadIdCard}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary-900"
      >
        <Download className="h-4 w-4" /> Download ID Card
      </button>
    </div>
  );
}
