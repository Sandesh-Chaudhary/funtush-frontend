"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import StaffForm from "@/components/agency/staff/StaffForm";
import { useStaff } from "@/hooks/useStaff";

export default function NewStaffPage() {
  const { addStaff } = useStaff();
  const router = useRouter();

  const handleSave = (data: Parameters<typeof addStaff>[0]) => {
    addStaff(data);
    router.push("/dashboard/staff");
  };

  return (
    <div className="mx-auto w-full max-w-6xl py-6">
      <div className="mb-6">
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <Link href="/dashboard">Dashboard</Link>
          <ChevronRight size={15} />
          <Link href="/dashboard/staff">Staff</Link>
          <ChevronRight size={15} />
          <strong className="text-primary-900">New staff</strong>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900">Add staff</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Create a staff account and assign its role and access.
        </p>
      </div>
      <StaffForm onSave={handleSave} />
    </div>
  );
}
