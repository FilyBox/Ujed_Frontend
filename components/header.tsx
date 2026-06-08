"use client";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import classNames from "classnames";
import { BsList } from "react-icons/bs";
import { authClient, rolesOf } from "@/lib/auth-client";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { NavBarItemGroup } from "@/types/type";

export default function Header() {
  const { data: session } = authClient.useSession();
  const roles = rolesOf(session?.user?.roles);
  const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
  const router = useRouter();

  const sidebarToggle = () => {
    invokeToggleCollapse();
  };
  const headerStyle = classNames(
    "bg-sidebar fixed w-full z-[99997] pr-6 shadow-sm shadow-slate-500/40",
    {
      ["md:pl-[20rem]"]: !toggleCollapse,
      ["md:pl-[5.6rem]"]: toggleCollapse,
    },
  );

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const menuItems = useMemo(() => {
    let items: NavBarItemGroup[] = [];

    if (roles.includes("admin")) {
      items = [
        {
          key: "Dashboard",
          path: "/dashboard",
        },
        {
          key: "Entrada",
          path: "/dashboard/newreport",
        },
        {
          key: "Mantenimiento",
          path: "/dashboard/reportsmantenimiento",
        },
        {
          key: "Obras",
          path: "/dashboard/reportsobras",
        },
      ];
    } else if (roles.includes("mantenimiento")) {
      items = [
        {
          key: "Dashboard",
          path: "/dashboard",
        },
        {
          key: "Mantenimiento",
          path: "/dashboard/reportsmantenimiento",
        },
      ];
    } else if (roles.includes("obras")) {
      items = [
        {
          key: "Dashboard",
          path: "/dashboard",
        },
        {
          key: "Obras",
          path: "/dashboard/reportsobras",
        },
      ];
    } else if (roles.includes("user")) {
      items = [
        {
          key: "dashboard",
          path: "/dashboard/",
        },
      ];
    }

    return items;
  }, [session?.user?.roles]);

  const userNameDisplay = session?.user?.name
    ? session?.user?.name.length > 10
      ? `${session?.user?.name.substring(0, 10)}...`
      : session?.user?.name
    : "Usuario";

  return (
    <header className={headerStyle}>
      <div className='h-16 flex items-center justify-between'>
        <button
          onClick={sidebarToggle}
          className='hidden order-1 shrink-btn float-right bg-sidebar-muted text-sidebar-muted-foreground hover:bg-foreground hover:text-background ml-3 rounded-md w-[30px] h-[30px] md:flex items-center justify-center shadow-md shadow-black/10 transition duration-300 ease-in-out'
        >
          <BsList />
        </button>

        <div className='block md:hidden order-1 ml-3'>
          <Dropdown>
            <DropdownTrigger>
              <Button variant='bordered'>
                <BsList />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions' className=''>
              {menuItems.map((item, key) => (
                <DropdownItem
                  key={key}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.key}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className='flex items-center justify-between sm:order-2 order-1'>
          <Dropdown>
            <DropdownTrigger>
              <Button className='rounded-full w-fit px-0' variant='light'>
                <Chip className='px-1.5 text-black text-xl italic font-light  w-fit rounded-full bg-gray-300'>
                  {session?.user?.name
                    ? session?.user?.name.length > 10
                      ? `${session?.user?.name.substring(0, 10)}...`
                      : session?.user?.name
                    : "Usuario"}
                </Chip>
                <Avatar
                  showFallback
                  src='/Images/Image_UserPlaceholder.png'
                  size='sm'
                  className=''
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions' className=''>
              <DropdownItem key='options' onClick={handleProfileClick}>
                Perfil
              </DropdownItem>
              <DropdownItem
                key='close'
                className='text-danger'
                color='danger'
                onClick={async () => {
                  await authClient.signOut();
                  router.push("/login");
                  router.refresh();
                }}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
