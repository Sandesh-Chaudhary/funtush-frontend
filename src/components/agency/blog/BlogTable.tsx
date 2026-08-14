"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  time: string;
  status: "Draft" | "Scheduled" | "Published";
  views: string;
  likes: number;
  thumbnail: string;
}

export default function BlogTable({
  posts,
}: {
  posts: BlogPost[];
}) {
  const { isDark } = useTheme();
  const router = useRouter();

  const cardClass = isDark
    ? "border-neutral-800 bg-neutral-900 text-neutral-100"
    : "border-neutral-200 bg-white text-neutral-900";

  const mutedText = isDark
    ? "text-neutral-400"
    : "text-neutral-500";

  /* ---------------- VIEW BLOG ---------------- */

  const handleView = (blog: BlogPost) => {
    if (!blog?.id) {
      toast.error("Unable to view this blog.");
      return;
    }

    try {
      router.push(`/dashboard/blog/${blog.id}`);
    } catch (error) {
      console.error("View blog error:", error);
      toast.error("Unable to open the blog.");
    }
  };

  /* ---------------- EDIT BLOG ---------------- */

  const handleEdit = (blog: BlogPost) => {
    if (!blog?.id) {
      toast.error("Unable to edit this blog.");
      return;
    }

    try {
      router.push(`/dashboard/blog/${blog.id}/edit`);
    } catch (error) {
      console.error("Edit blog error:", error);
      toast.error("Unable to open the blog editor.");
    }
  };

  /* ---------------- DELETE BLOG ---------------- */

  const handleDelete = (blog: BlogPost) => {
    if (!blog?.id) {
      toast.error("Unable to delete this blog.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const storedPosts = localStorage.getItem(
        "funtush_blog_posts"
      );

      if (!storedPosts) {
        toast.error("Blog could not be found.");
        return;
      }

      const existingPosts: BlogPost[] =
        JSON.parse(storedPosts);

      const blogExists = existingPosts.some(
        (item) => String(item.id) === String(blog.id)
      );

      if (!blogExists) {
        toast.error("Blog could not be found.");
        return;
      }

      const updatedPosts = existingPosts.filter(
        (item) => String(item.id) !== String(blog.id)
      );

      localStorage.setItem(
        "funtush_blog_posts",
        JSON.stringify(updatedPosts)
      );

      toast.success("Blog deleted successfully!");

      router.refresh();
    } catch (error) {
      console.error("Delete blog error:", error);

      toast.error(
        "Failed to delete the blog. Please try again."
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Desktop Header */}
      <Card
        className={`hidden items-center overflow-hidden rounded-2xl border p-4 text-xs font-semibold shadow-sm lg:grid lg:grid-cols-[3.5fr_1fr_1.2fr_1.2fr_1fr_0.8fr_0.8fr_1fr] ${cardClass}`}
      >
        <span>BLOG</span>
        <span>CATEGORY</span>
        <span>AUTHOR</span>
        <span>PUBLISHED DATE</span>
        <span>STATUS</span>
        <span>VIEWS</span>
        <span>COMMENTS</span>
        <span>ACTIONS</span>
      </Card>

      {/* Blog Posts List */}
      {posts?.map((blog) => (
        <Card
          key={blog.id}
          className={`flex flex-col gap-4 overflow-hidden rounded-2xl border p-4 text-xs shadow-sm lg:grid lg:grid-cols-[3.5fr_1fr_1.2fr_1.2fr_1fr_0.8fr_0.8fr_1fr] lg:items-center lg:gap-0 ${cardClass}`}
        >
          {/* Blog Thumbnail, Title & Description */}
          <div className="flex min-w-0 items-center gap-3 pr-2">
            <div className="relative h-[75px] w-[110px] shrink-0">
              <Image
                src={`/${blog.thumbnail}`}
                alt={blog.title}
                fill
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-col justify-center space-y-1">
              <p className="truncate text-xs font-semibold">
                {blog.title}
              </p>

              <p
                className={`truncate text-[11px] ${mutedText}`}
              >
                {blog.description}
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center lg:justify-center">
            <span
              className={`rounded-lg border px-3 py-1 text-[11px] font-bold ${
                isDark
                  ? "border-primary-700 bg-primary-900 text-primary-200"
                  : "border-primary-200 bg-primary-50 text-primary-700"
              }`}
            >
              {blog.category}
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2 lg:justify-center">
            <Image
              src={`/${blog.author.avatar}`}
              alt={blog.author.name}
              width={28}
              height={28}
              className="shrink-0 rounded-full object-cover"
            />

            <span className="truncate text-xs">
              {blog.author.name}
            </span>
          </div>

          {/* Date & Time */}
          <div className="flex justify-between text-xs lg:flex-col lg:items-center lg:justify-center">
            <p className="font-medium">
              {blog.date}
            </p>

            <p
              className={`text-[11px] ${mutedText}`}
            >
              {blog.time}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center lg:justify-center">
            <span
              className={`rounded-lg border px-3 py-1 text-center text-[11px] font-bold ${
                blog.status === "Published"
                  ? isDark
                    ? "border-success-800 bg-success-900/40 text-success-400"
                    : "border-success-200 bg-success-50 text-success-700"
                  : blog.status === "Scheduled"
                  ? isDark
                    ? "border-primary-800 bg-primary-900/40 text-primary-400"
                    : "border-primary-200 bg-primary-50 text-primary-700"
                  : isDark
                  ? "border-warning-800 bg-warning-900/40 text-warning-400"
                  : "border-warning-200 bg-warning-50 text-warning-700"
              }`}
            >
              {blog.status}
            </span>
          </div>

          {/* Views */}
          <div className="flex items-center justify-between text-xs lg:justify-center">
            <span
              className={`lg:hidden ${mutedText}`}
            >
              Views:
            </span>

            <span className="font-semibold">
              {blog.views}
            </span>
          </div>

          {/* Comments */}
          <div className="flex items-center justify-between text-xs lg:justify-center">
            <span
              className={`lg:hidden ${mutedText}`}
            >
              Comments:
            </span>

            <span className="font-semibold">
              {blog.likes}
            </span>
          </div>

          {/* Actions */}
          <div
            className={`flex items-center justify-end gap-1.5 border-t pt-3 lg:justify-center lg:border-t-0 lg:pt-0 ${
              isDark
                ? "border-neutral-800"
                : "border-neutral-200"
            }`}
          >
            {/* View */}
            <button
              type="button"
              aria-label={`View ${blog.title}`}
              onClick={() => handleView(blog)}
              className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                isDark
                  ? "text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <VisibilityIcon sx={{ fontSize: 18 }} />
            </button>

            {/* Edit */}
            <button
              type="button"
              aria-label={`Edit ${blog.title}`}
              onClick={() => handleEdit(blog)}
              className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                isDark
                  ? "text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <EditIcon sx={{ fontSize: 18 }} />
            </button>

            {/* Delete */}
            <button
              type="button"
              aria-label={`Delete ${blog.title}`}
              onClick={() => handleDelete(blog)}
              className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                isDark
                  ? "text-danger-400 hover:bg-danger-900/30"
                  : "text-danger-500 hover:bg-danger-50"
              }`}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </Card>
      ))}

      {/* No Blogs */}
      {(!posts || posts.length === 0) && (
        <Card
          className={`rounded-2xl border p-8 text-center shadow-sm ${cardClass}`}
        >
          <p className="text-sm font-medium">
            No blog posts found.
          </p>

          <p
            className={`mt-1 text-xs ${mutedText}`}
          >
            Try creating a new blog post.
          </p>
        </Card>
      )}
    </div>
  );
}