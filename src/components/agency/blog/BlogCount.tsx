import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function BlogCount() {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? "bg-neutral-900 text-neutral-100 border-neutral-800"
    : "bg-white text-neutral-900 border-neutral-200";

  const secondaryText = isDark
    ? "text-neutral-400"
    : "text-neutral-500";

  return (
    <div className="w-full space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-xs">
            <span className={secondaryText}>
              Dashboard
            </span>

            <ChevronRightIcon
              className={`h-4 w-4 ${
                isDark
                  ? "text-neutral-600"
                  : "text-neutral-400"
              }`}
            />

            <span
              className={`font-medium ${
                isDark
                  ? "text-neutral-100"
                  : "text-neutral-900"
              }`}
            >
              All Blogs
            </span>
          </div>

          {/* Page Title */}
          <h1
            className={`text-2xl font-bold tracking-tight ${
              isDark
                ? "text-neutral-100"
                : "text-neutral-900"
            }`}
          >
            All Blogs
          </h1>

          <p className={`text-sm ${secondaryText}`}>
            Manage and organize all your blog posts
          </p>
        </div>

        {/* Add Blog Button */}
        <Link
          href="/dashboard/blog/new"
          className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-xs font-semibold shadow-sm transition-colors ${
            isDark
              ? "border-neutral-700 bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
              : "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          Add new Blog
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Blogs */}
        <Card
          className={`flex flex-col justify-between rounded-2xl border p-4 shadow-sm ${cardClass}`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full ${
                isDark
                  ? "bg-primary-900 text-primary-300"
                  : "bg-primary-100 text-primary-700"
              }`}
            >
              <DescriptionIcon sx={{ fontSize: 18 }} />
            </div>

            <div className="pl-2">
              <p
                className={`pl-6 text-xs ${secondaryText}`}
              >
                Total Blogs
              </p>

              <p className="pl-2 text-2xl font-bold">
                248
              </p>
            </div>

            <Image
              src="/vector.png"
              alt="Total blogs growth"
              width={71}
              height={30}
              className="ml-auto object-contain"
            />
          </div>

          <Growth />
        </Card>

        {/* Published */}
        <StatCard
          title="Published"
          value="248"
          image="/green-squiggle.png"
          cardClass={cardClass}
          secondaryText={secondaryText}
          iconClass={
            isDark
              ? "bg-success-900 text-success-300"
              : "bg-success-100 text-success-700"
          }
        />

        {/* Draft */}
        <StatCard
          title="Draft"
          value="248"
          image="/orange-squiggle.png"
          cardClass={cardClass}
          secondaryText={secondaryText}
          iconClass={
            isDark
              ? "bg-warning-900 text-warning-300"
              : "bg-warning-100 text-warning-700"
          }
        />

        {/* Total Views */}
        <StatCard
          title="Total Views"
          value="125.5K"
          image="/blue-squiggle.png"
          cardClass={cardClass}
          secondaryText={secondaryText}
          iconClass={
            isDark
              ? "bg-primary-900 text-primary-300"
              : "bg-primary-100 text-primary-700"
          }
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  image,
  cardClass,
  secondaryText,
  iconClass,
}: {
  title: string;
  value: string;
  image: string;
  cardClass: string;
  secondaryText: string;
  iconClass: string;
}) {
  return (
    <Card
      className={`flex flex-col justify-between rounded-2xl border p-4 shadow-sm ${cardClass}`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full ${iconClass}`}
        >
          <DescriptionIcon sx={{ fontSize: 18 }} />
        </div>

        <div className="pl-2">
          <p
            className={`pl-6 text-xs ${secondaryText}`}
          >
            {title}
          </p>

          <p className="pl-2 text-2xl font-bold">
            {value}
          </p>
        </div>

        <Image
          src={image}
          alt={`${title} chart`}
          width={71}
          height={30}
          className="ml-auto object-contain"
        />
      </div>

      <Growth />
    </Card>
  );
}

function Growth() {
  return (
    <div className="mt-3 flex items-center gap-1.5 text-xs">
      <div
        className="
          flex items-center justify-center
          rounded-full
          bg-success-100
          p-0.5
          text-success-600
          dark:bg-success-900/40
          dark:text-success-400
        "
      >
        <ArrowUpwardIcon sx={{ fontSize: 14 }} />
      </div>

      <span className="font-semibold text-success-600 dark:text-success-400">
        12.5%
      </span>

      <span className="text-neutral-500 dark:text-neutral-400">
        from last month
      </span>
    </div>
  );
}