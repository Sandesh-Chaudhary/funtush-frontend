"use client";

import { useTheme } from "@/context/theme";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface QuillEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export function QuillEditor({ content, onChange }: QuillEditorProps) {
    const { isDark } = useTheme();

    const modules = useMemo(() => ({
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "code"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["blockquote", "code-block"],
            ["link", "image", "formula"],
            ["clean"],
        ],
    }), []);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "code",
        "list",
        "blockquote",
        "link",
        "image",
        "color",
        "background",
        "align",
        "code-block",
        "formula",
        "indent",
        "direction",
        "size",
    ];

    // Dynamic classes matching your theme variables
    const containerClass = isDark
        ? "bg-[#0d1b32] text-slate-200 quill-dark"
        : "bg-white text-neutral-800 border border-neutral-300 shadow-sm quill-light";

    return (
        <div className={`rounded-xl overflow-hidden transition-colors duration-200 ${containerClass}`}>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder="Write something amazing..."
                className="min-h-[28rem] flex flex-col"
            />

            {/* Global style overrides to seamlessly map Quill onto your Light/Dark Tailwind palette */}
            <style jsx global>{`
                .quill-dark .ql-toolbar.ql-snow {
                    background-color: #111B3A;
                    border-color: #1E293B;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                }
                .quill-light .ql-toolbar.ql-snow {
                    background-color: #f7f7f7;
                    border-color: #e5e5e5;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                }
                .quill-dark .ql-container.ql-snow {
                    border: none;
                    color: #cbd5e1;
                }
                .quill-light .ql-container.ql-snow {
                    border: none;
                    color: #262626;
                }
                .quill-dark .ql-stroke {
                    stroke: #94a3b8 !important;
                }
                .quill-dark .ql-fill {
                    fill: #94a3b8 !important;
                }
                .quill-dark .ql-picker {
                    color: #94a3b8 !important;
                }
                .quill-dark .ql-picker-options {
                    background-color: #162947 !important;
                    border-color: #233a5e !important;
                }
                .ql-editor {
                    min-h: 250px;
                    font-size: 0.875rem;
                    line-height: 1.6;
                }
                .ql-editor.ql-blank::before {
                    color: #9ca3af !important;
                    font-style: normal !important;
                }
            `}</style>
        </div>
    );
}