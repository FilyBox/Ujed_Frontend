"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BiSolidReport } from "react-icons/bi";
import { FaHammer } from "react-icons/fa";
import { IoConstruct } from "react-icons/io5";
import { FiUser, FiLogOut, FiChevronsDown, FiHome } from "react-icons/fi";
import { authClient, rolesOf } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = {
  admin: [
    { title: "Dashboard", path: "/dashboard", icon: FiHome, exact: true },
    {
      title: "Entrada",
      path: "/dashboard/newreport",
      icon: BiSolidReport,
      exact: false,
    },
    {
      title: "Obras",
      path: "/dashboard/reportsobras",
      icon: FaHammer,
      exact: false,
    },
    {
      title: "Mantenimiento",
      path: "/dashboard/reportsmantenimiento",
      icon: IoConstruct,
      exact: false,
    },
  ],
  mantenimiento: [
    { title: "Dashboard", path: "/dashboard", icon: FiHome, exact: true },
    {
      title: "Mantenimiento",
      path: "/dashboard/reportsmantenimiento",
      icon: IoConstruct,
      exact: false,
    },
  ],
  obras: [
    { title: "Dashboard", path: "/dashboard", icon: FiHome, exact: true },
    {
      title: "Obras",
      path: "/dashboard/reportsobras",
      icon: FaHammer,
      exact: false,
    },
  ],
};

export function AppSidebar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useSidebar();

  const navItems = useMemo(() => {
    const role = session?.user?.roles ?? "";
    const r = rolesOf(role);
    if (r.includes("admin")) return NAV_ITEMS.admin;
    if (r.includes("mantenimiento")) return NAV_ITEMS.mantenimiento;
    if (r.includes("obras")) return NAV_ITEMS.obras;
    return [];
  }, [session?.user?.roles]);

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <Sidebar collapsible='icon'>
      {/* Logo */}
      <SidebarHeader className='border-b border-sidebar-border h-14 justify-center px-3'>
        <Link href='/dashboard' className='flex items-center'>
          {open ? (
            <Image
              src='/Images/Logo.svg'
              alt='UJED'
              width={130}
              height={32}
              priority
              className='object-contain'
            />
          ) : (
            <div className='w-8 h-8 bg-[#B11830] rounded-md flex items-center justify-center text-white text-sm font-bold'>
              U
            </div>
          )}
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.path
                  : pathname === item.path ||
                    pathname.startsWith(item.path + "/");
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link href={item.path}>
                        <Icon size={18} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User footer */}
      <SidebarFooter className='border-t border-sidebar-border'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  tooltip={session?.user?.name ?? "Usuario"}
                  className='data-[state=open]:bg-sidebar-accent'
                >
                  <div className='w-7 h-7 rounded-full bg-[#B11830] flex items-center justify-center text-white text-xs font-semibold shrink-0'>
                    {initials}
                  </div>
                  <div className='flex flex-col text-left leading-tight min-w-0 flex-1'>
                    <span className='font-medium text-sm truncate'>
                      {session?.user?.name ?? "Usuario"}
                    </span>
                    <span className='text-xs text-muted-foreground truncate'>
                      {session?.user?.email ?? ""}
                    </span>
                  </div>
                  <FiChevronsDown
                    size={14}
                    className='shrink-0 text-muted-foreground'
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' align='start' className='w-52'>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/profile")}
                >
                  <FiUser size={14} className='mr-2' />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='text-red-600 focus:text-red-600 focus:bg-red-50'
                  onClick={async () => {
                    await authClient.signOut();
                    router.push("/login");
                    router.refresh();
                  }}
                >
                  <FiLogOut size={14} className='mr-2' />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
