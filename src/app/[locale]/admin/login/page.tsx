import { Suspense } from "react";
import AdminLoginClient from "@/components/AdminLoginClient";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginClient />
    </Suspense>
  );
}
