"use client";

import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/theme";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function BlogFilter() {
  const { isDark } = useTheme();

  const inputClass = isDark
    ? "border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500/20"
    : "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500/20";

  const selectClass = isDark
    ? "border-neutral-700 bg-neutral-900 text-neutral-200 focus:border-primary-500 focus:ring-primary-500/20"
    : "border-neutral-300 bg-white text-neutral-700 focus:border-primary-500 focus:ring-primary-500/20";

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="relative flex items-center">
          <SearchIcon
            sx={{ fontSize: 17 }}
            className={`pointer-events-none absolute left-3.5 ${
              isDark
                ? "text-neutral-500"
                : "text-neutral-400"
            }`}
          />

          <Input
            id="search"
            placeholder="Search blogs"
            className={`w-full rounded-xl border py-3 pl-10 pr-4 text-xs shadow-sm focus:ring-2 ${inputClass}`}
          />
        </div>

        {/* Category */}
        <select
          id="category"
          defaultValue=""
          className={`w-full cursor-pointer rounded-xl border px-3.5 py-3 text-xs shadow-sm outline-none transition-colors focus:ring-2 ${selectClass}`}
        >
          <option value="" disabled>
            Category
          </option>

          <option value="festival">
            Festival
          </option>

          <option value="announcement">
            Announcement
          </option>

          <option value="event">
            Event
          </option>

          <option value="notice">
            Notice
          </option>
        </select>

        {/* Status */}
        <select
          id="status"
          defaultValue=""
          className={`w-full cursor-pointer rounded-xl border px-3.5 py-3 text-xs shadow-sm outline-none transition-colors focus:ring-2 ${selectClass}`}
        >
          <option value="" disabled>
            Status
          </option>

          <option value="enabled">
            Enabled
          </option>

          <option value="disabled">
            Disabled
          </option>
        </select>

        {/* Date */}
        <div className="relative flex items-center">
          <Input
            id="date"
            type="date"
            className={`w-full rounded-xl border py-3 pl-4 pr-10 text-xs shadow-sm focus:ring-2 ${inputClass}`}
          />

          <CalendarTodayIcon
            sx={{ fontSize: 16 }}
            className={`pointer-events-none absolute right-3.5 ${
              isDark
                ? "text-neutral-500"
                : "text-neutral-400"
            }`}
          />
        </div>

        {/* Sort By */}
        <select
          id="sortBy"
          defaultValue=""
          className={`w-full cursor-pointer rounded-xl border px-3.5 py-3 text-xs shadow-sm outline-none transition-colors focus:ring-2 ${selectClass}`}
        >
          <option value="" disabled>
            Sort By
          </option>

          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="title-asc">
            Title (A–Z)
          </option>

          <option value="title-desc">
            Title (Z–A)
          </option>

          <option value="updated">
            Recently Updated
          </option>
        </select>
      </div>
    </div>
  );
}