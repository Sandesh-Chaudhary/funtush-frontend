"use client";

import { QuillEditor } from "./QuillEditor";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

interface BlogEditorSectionProps {
  title: string;
  setTitle: (val: string) => void;

  subtitle: string;
  setSubtitle: (val: string) => void;

  htmlContent: string;
  setHtmlContent: (val: string) => void;

  errors: {
    title: string;
    subtitle: string;
    content: string;
  };
}

export function BlogEditorSection({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  htmlContent,
  setHtmlContent,
  errors,
}: BlogEditorSectionProps) {
  const { isDark } = useTheme();

  /*
   * Global theme colors
   *
   * Light:
   * - Card: white
   * - Text: neutral-900
   * - Border: neutral-200
   *
   * Dark:
   * - Card: neutral-900
   * - Text: neutral-50
   * - Border: neutral-700
   */

  const cardClass = isDark
    ? "bg-neutral-900 text-neutral-50 border-neutral-700"
    : "bg-white text-neutral-900 border-neutral-200";

  const inputClass = isDark
    ? "border-neutral-700 bg-neutral-800 text-neutral-50 placeholder-neutral-500 focus:border-primary-400 focus:ring-primary-400"
    : "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500";

  const errorInputClass =
    "border-danger-500 focus:border-danger-500 focus:ring-danger-500";

  return (
    <Card
      className={`
        lg:col-span-2
        ${cardClass}
        rounded-2xl
        border
        p-6
        shadow-sm
      `}
    >
      {/* =====================================================
          BLOG TITLE
          ===================================================== */}

      <div className="space-y-1.5">
        <label className="block text-xs font-bold">
          Blog Title{" "}
          <span className="text-danger-500">*</span>
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title..."
          className={`
            w-full
            rounded-xl
            border
            px-3.5
            py-3
            text-xs
            shadow-sm
            focus:outline-none
            focus:ring-2
            transition-colors
            ${errors.title ? errorInputClass : inputClass}
          `}
        />
        {errors.title && (
          <p className="text-xs text-danger-500">
            {errors.title}
          </p>
        )}
      </div>

      {/* =====================================================
          SUB TITLE
          ===================================================== */}

      <div className="mt-4 space-y-1.5">
        <label className="block text-xs font-bold">
          Sub title{" "}
          <span className="text-danger-500">*</span>
        </label>

        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Enter sub title..."
          className={`
            w-full
            rounded-xl
            border
            px-3.5
            py-3
            text-xs
            shadow-sm
            focus:outline-none
            focus:ring-2
            transition-colors
            ${errors.subtitle ? errorInputClass : inputClass}
          `}
        />
        {errors.subtitle && (
          <p className="text-xs text-danger-500">
            {errors.subtitle}
          </p>
        )}
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold">
            Content{" "}
            <span className="text-danger-500">*</span>
          </label>

          <button
            type="button"
            className={`
              flex
              items-center
              gap-1.5
              text-[11px]
              font-medium
              transition-colors
              ${
                isDark
                  ? "text-primary-400 hover:text-primary-300"
                  : "text-primary-500 hover:text-primary-600"
              }
            `}
          >
            <SparklesIcon
              style={{ fontSize: 14 }}
            />

            Copy-writing tips
          </button>
        </div>

        <div
          className={
            errors.content
              ? "rounded-xl border border-danger-500"
              : ""
          }
        >
          <QuillEditor
            content={htmlContent}
            onChange={setHtmlContent}
          />
        </div>

        {errors.content && (
          <p className="text-xs text-danger-500">
            {errors.content}
          </p>
        )}
      </div>
    </Card>
  );
}