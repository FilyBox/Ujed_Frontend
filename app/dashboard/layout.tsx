"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Loader from "@/components/ui/Loader";

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
    <SidebarProvider className='h-full overflow-hidden'>
      <AppSidebar />
      <SidebarInset className='min-h-0 overflow-hidden flex flex-col'>
        <header className='flex h-11 shrink-0 md:hidden block items-center gap-2 border-b bg-white px-4'>
          <SidebarTrigger className='-ml-1' />
        </header>
        <div className='flex-1 overflow-y-auto p-4 bg-gray-50'>
          {modal}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
