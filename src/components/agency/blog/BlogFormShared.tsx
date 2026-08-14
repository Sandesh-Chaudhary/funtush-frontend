"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useTheme } from "@/context/theme";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

import { BlogEditorSection } from "./BlogEditorSection";
import { BlogPublishSettings } from "./BlogPublishSettings";

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  htmlContent?: string;
  category?: string;
  status: "Published" | "Scheduled" | "Draft";
  publishDate?: string;
  tag?: string;
  photoOption?: "local" | "gallery";
  photoUrl?: string;
  date: string;
  views: number;
}

interface BlogFormSharedProps {
  postId?: string;
}

interface FormErrors {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  publishDate: string;
  photo: string;
}

export function BlogFormShared({
  postId,
}: BlogFormSharedProps) {
  const router = useRouter();

  /* --------------------------------------------------
     Form State
  -------------------------------------------------- */
  const { isDark } = useTheme();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");

  const [publishDate, setPublishDate] = useState(
    "Jul 19, 2026 10:30 AM"
  );

  const [tag, setTag] = useState("");

  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{
    id: string;
    url: string;
    title?: string;
    owner?: string;
  } | null>(null);

  const [photoOption, setPhotoOption] = useState<
    "local" | "gallery"
  >("local");

  /* --------------------------------------------------
     Centralized Errors
  -------------------------------------------------- */

  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    publishDate: "",
    photo: "",
  });

  /* --------------------------------------------------
     Load Existing Blog
  -------------------------------------------------- */

  useEffect(() => {
    if (!postId) return;

    const loadBlog = async () => {
      try {
        const data = localStorage.getItem(
          "funtush_blog_posts"
        );

        if (!data) {
          toast.error("Blog data could not be found.");
          return;
        }

        const posts: BlogPost[] = JSON.parse(data);

        if (!Array.isArray(posts)) {
          toast.error("Invalid blog data.");
          return;
        }

        const target = posts.find(
          (post) => String(post.id) === String(postId)
        );

        if (!target) {
          toast.error("Blog post could not be found.");
          return;
        }

        setTitle(target.title || "");
        setSubtitle(target.subtitle || "");
        setHtmlContent(target.htmlContent || "");
        setCategory(target.category || "");
        setStatus(target.status || "Draft");

        setPublishDate(
          target.publishDate ||
            "Jul 19, 2026 10:30 AM"
        );

        setTag(target.tag || "");
        setPhotoOption(
          target.photoOption || "local"
        );
        if (target.photoUrl) {
          setSelectedGalleryImage({
            id: target.photoUrl,
            url: target.photoUrl,
            title: "",
            owner: "",
          });
        }
      } catch (error) {
        console.error("Failed to load blog:", error);

        toast.error(
          "Failed to load blog details. Please try again."
        );
      }
    };

    loadBlog();
  }, [postId]);

  /* --------------------------------------------------
     Clear Error
  -------------------------------------------------- */

  const clearError = (
    field: keyof FormErrors
  ) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* --------------------------------------------------
     Validation
  -------------------------------------------------- */

  const validateForm = (
    targetStatus: string
  ) => {
    const newErrors: FormErrors = {
      title: "",
      subtitle: "",
      content: "",
      category: "",
      publishDate: "",
      photo: "",
    };

    if (!title.trim()) {
      newErrors.title =
        "Blog title is required.";
    }

    if (!subtitle.trim()) {
      newErrors.subtitle =
        "Subtitle is required.";
    }

    const plainContent = htmlContent
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();

    if (!plainContent) {
      newErrors.content =
        "Blog content is required.";
    }

    if (
      targetStatus === "Published" &&
      !category.trim()
    ) {
      newErrors.category =
        "Category is required before publishing.";
    }

    if (
      targetStatus === "Scheduled" &&
      !publishDate.trim()
    ) {
      newErrors.publishDate =
        "Publish date is required for scheduled posts.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(
      (error) => error !== ""
    );
  };

  /* --------------------------------------------------
     Save / Publish / Schedule
  -------------------------------------------------- */

  const handleSave = (
    e?: React.FormEvent,
    targetStatus?: string
  ) => {
    if (e) {
      e.preventDefault();
    }

    const finalStatus =
      targetStatus || status;

    if (!validateForm(finalStatus)) {
      toast.error(
        "Please fix the highlighted fields."
      );
      return;
    }

    try {
      const currentRecords =
        localStorage.getItem(
          "funtush_blog_posts"
        );

      let recordsList: BlogPost[] = [];

      if (currentRecords) {
        try {
          const parsedRecords =
            JSON.parse(currentRecords);

          if (Array.isArray(parsedRecords)) {
            recordsList = parsedRecords;
          } else {
            toast.error(
              "Invalid saved blog data."
            );
            return;
          }
        } catch (error) {
          console.error(
            "Failed to parse saved blogs:",
            error
          );

          toast.error(
            "Unable to read saved blogs. Please try again."
          );

          return;
        }
      }

      const dateValue = new Date()
        .toISOString()
        .split("T")[0];

      /* --------------------------------------------------
         UPDATE EXISTING BLOG
      -------------------------------------------------- */

      if (postId) {
        const blogExists =
          recordsList.some(
            (item) =>
              String(item.id) ===
              String(postId)
          );

        if (!blogExists) {
          toast.error(
            "The blog you are trying to update could not be found."
          );
          return;
        }

        recordsList = recordsList.map(
          (item) =>
            String(item.id) ===
              String(postId)
              ? {
                  ...item,
                  title: title.trim(),
                  subtitle: subtitle.trim(),
                  htmlContent,
                  category,
                  status:
                    finalStatus as
                      | "Draft"
                      | "Scheduled"
                      | "Published",
                  publishDate,
                  tag,
                  photoOption,
                  photoUrl: photoOption === 'gallery' ? selectedGalleryImage?.url || '' : item.photoUrl || '',
                  date: dateValue,
                }
              : item
        );

        localStorage.setItem(
          "funtush_blog_posts",
          JSON.stringify(recordsList)
        );

        if (finalStatus === "Published") {
          toast.success(
            "Blog published successfully!"
          );
        } else if (
          finalStatus === "Scheduled"
        ) {
          toast.success(
            "Blog scheduled successfully!"
          );
        } else {
          toast.success(
            "Blog saved as draft successfully!"
          );
        }
      }

      /* --------------------------------------------------
         CREATE NEW BLOG
      -------------------------------------------------- */

      else {
        const newPost: BlogPost = {
          id: `post-${Date.now()}`,
          title: title.trim(),
          subtitle: subtitle.trim(),
          htmlContent,
          category,
          status:
            finalStatus as
              | "Draft"
              | "Scheduled"
              | "Published",
          publishDate,
          tag,
          photoOption,
          photoUrl: photoOption === 'gallery' ? selectedGalleryImage?.url || '' : '',
          date: dateValue,
          views: 0,
        };

        recordsList = [
          newPost,
          ...recordsList,
        ];

        localStorage.setItem(
          "funtush_blog_posts",
          JSON.stringify(recordsList)
        );

        if (finalStatus === "Published") {
          toast.success(
            "Blog published successfully!"
          );
        } else if (
          finalStatus === "Scheduled"
        ) {
          toast.success(
            "Blog scheduled successfully!"
          );
        } else {
          toast.success(
            "Blog saved as draft successfully!"
          );
        }
      }

      router.push("/dashboard/blog");
    } catch (error) {
      console.error(
        "Failed to save blog:",
        error
      );

      toast.error(
        "Failed to save the blog. Please try again."
      );
    }
  };

  /* --------------------------------------------------
     Preview
  -------------------------------------------------- */

  const handlePreview = () => {
    const newErrors: FormErrors = {
      title: "",
      subtitle: "",
      content: "",
      category: "",
      publishDate: "",
      photo: "",
    };

    if (!title.trim()) {
      newErrors.title =
        "Blog title is required.";
    }

    if (!subtitle.trim()) {
      newErrors.subtitle =
        "Subtitle is required.";
    }

    const plainContent = htmlContent
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();

    if (!plainContent) {
      newErrors.content =
        "Blog content is required.";
    }

    setErrors(newErrors);

    const hasErrors =
      Object.values(newErrors).some(
        (error) => error !== ""
      );

    if (hasErrors) {
      toast.error(
        "Please fix the highlighted fields before previewing."
      );
      return;
    }

    try {
      localStorage.setItem(
        "funtush_blog_preview",
        JSON.stringify({
          title,
          subtitle,
          htmlContent,
          category,
          status,
          publishDate,
          tag,
          photoOption,
        })
      );

      toast.success(
        "Preview generated successfully!"
      );

      router.push(
        "/dashboard/blog/preview"
      );
    } catch (error) {
      console.error(
        "Preview failed:",
        error
      );

      toast.error(
        "Unable to generate preview. Please try again."
      );
    }
  };

  /* --------------------------------------------------
     Render
  -------------------------------------------------- */

  return (
    <div className="w-full space-y-6">
      {/* Header & Actions */}

     <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
  <div className="min-w-0">
    {/* Breadcrumbs */}

    <div className="flex items-center gap-1 overflow-hidden text-xs sm:text-sm">
      <span
        className={
          isDark
            ? "whitespace-nowrap text-neutral-400"
            : "whitespace-nowrap text-neutral-500"
        }
      >
        Dashboard
      </span>

      <ChevronRightIcon
        className={
          isDark
            ? "shrink-0 text-neutral-500"
            : "shrink-0 text-neutral-400"
        }
        sx={{ fontSize: 18 }}
      />

      <span
        className={
          isDark
            ? "whitespace-nowrap text-neutral-400"
            : "whitespace-nowrap text-neutral-500"
        }
      >
        All Blogs
      </span>

      <ChevronRightIcon
        className={
          isDark
            ? "shrink-0 text-neutral-500"
            : "shrink-0 text-neutral-400"
        }
        sx={{ fontSize: 18 }}
      />

      <span
        className={
          isDark
            ? "whitespace-nowrap font-medium text-neutral-100"
            : "whitespace-nowrap font-medium text-neutral-900"
        }
      >
        {postId ? "Edit Blog" : "Add Blog"}
      </span>
    </div>

    {/* Title */}

    <h1
      className={
        isDark
          ? "mt-2 text-xl font-bold tracking-tight text-neutral-100 sm:text-2xl"
          : "mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl"
      }
    >
      All Blogs
    </h1>

    <p
      className={
        isDark
          ? "text-xs text-neutral-400 sm:text-sm"
          : "text-xs text-neutral-500 sm:text-sm"
      }
    >
      {postId
        ? "Edit and update your blog post"
        : "Create and publish a new blog post"}
    </p>
  </div>

  {/* Actions */}

  <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3 lg:w-auto">
    {/* Save Draft */}

    <button
      type="button"
      onClick={() => handleSave(undefined, "Draft")}
      className={`
        w-full cursor-pointer
        whitespace-nowrap rounded-lg
        border px-4 py-2.5
        text-xs font-semibold
        shadow-sm transition-colors
        sm:w-auto

        ${
          isDark
            ? "border-neutral-700 bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
            : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
        }
      `}
    >
      Save as Draft
    </button>

    {/* Preview */}

    <button
      type="button"
      onClick={handlePreview}
      className={`
        flex w-full cursor-pointer
        items-center justify-center
        gap-2 whitespace-nowrap
        rounded-lg border px-4 py-2.5
        text-xs font-semibold
        shadow-sm transition-colors
        sm:w-auto

        ${
          isDark
            ? "border-neutral-700 bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
            : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
        }
      `}
    >
      <VisibilityIcon sx={{ fontSize: 16 }} />
      Preview
    </button>

    {/* Publish */}

    <button
      type="button"
      onClick={() =>
        handleSave(undefined, "Published")
      }
      className="
        flex w-full cursor-pointer
        items-center justify-center
        gap-2 whitespace-nowrap
        rounded-lg px-5 py-2.5
        text-xs font-semibold
        shadow-sm transition-colors
        sm:w-auto
        bg-primary-500
        text-white
        hover:bg-primary-600
        focus:outline-none
        focus:ring-2
        focus:ring-primary-500/30
      "
    >
      <AddIcon sx={{ fontSize: 16 }} />
      Publish
    </button>
  </div>
</div>

      {/* Main Content */}

      <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-3">
        {/* Editor */}

        <BlogEditorSection
          title={title}
          setTitle={(value) => {
            setTitle(value);
            clearError("title");
          }}
          subtitle={subtitle}
          setSubtitle={(value) => {
            setSubtitle(value);
            clearError("subtitle");
          }}
          htmlContent={htmlContent}
          setHtmlContent={(value) => {
            setHtmlContent(value);
            clearError("content");
          }}
          errors={{
            title: errors.title,
            subtitle: errors.subtitle,
            content: errors.content,
          }}
        />

        {/* Publish Settings */}

        <div className="lg:sticky lg:top-24">
          <BlogPublishSettings
          category={category}
          setCategory={(value) => {
            setCategory(value);
            clearError("category");
          }}
          status={status}
          setStatus={(value) => {
            setStatus(value);

            if (value !== "Scheduled") {
              clearError("publishDate");
            }
          }}
          publishDate={publishDate}
          setPublishDate={(value) => {
            setPublishDate(value);
            clearError("publishDate");
          }}
          tag={tag}
          setTag={setTag}
          photoOption={photoOption}
          setPhotoOption={setPhotoOption}
          errors={errors}
          setErrors={setErrors}
          onSelectGalleryImage={setSelectedGalleryImage}
          selectedGalleryImage={selectedGalleryImage}
          />
        </div>
      </div>
    </div>
  );
}