"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/pagewrapper";
import { SideBar } from "@/components/sidebar";
import Header from "@/components/header";
import Loader from "@/components/ui/Loader";
import { authClient } from "@/lib/auth-client";

/**
 * Client-side route guard. The Better Auth session cookie belongs to the
 * backend origin, so Next.js middleware can't see it — auth checks happen here
 * (UX redirect) while the backend enforces auth on every API call.
 */
export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <Loader />;
  }

  return (
    <>
      {modal}
      <SideBar />
      <div className="flex flex-col h-full w-full bg-gray-100">
        <Header />
        <PageWrapper children={children} />
      </div>
    </>
  );
}
