"use client";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import classNames from "classnames";
import { BsList } from "react-icons/bs";
import { useSession, signOut } from "next-auth/react";
import {
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Avatar,
} from "@nextui-org/react";
import { useUserData } from "@/app/api/user/route";
import { useRouter } from 'next/navigation';


export default function Header() {
    const { data: session, status } = useSession();
    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
    const { userData, loading } = useUserData();
    const router = useRouter();

    const sidebarToggle = () => {
        invokeToggleCollapse();
    };
    const headerStyle = classNames("bg-sidebar fixed w-full z-[99997] pr-6 shadow-sm shadow-slate-500/40", {
        ["md:pl-[20rem]"]: !toggleCollapse,
        ["md:pl-[5.6rem]"]: toggleCollapse,
    });

    const handleProfileClick = () => {
        router.push('/dashboard/profile');
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };
    const userName = userData?.name || "Usuario";

    const userNameDisplay = userData?.name ? (userData.name.length > 10 ? `${userData.name.substring(0, 10)}...` : userData.name) : "";

      return (
        <header className={headerStyle}>
            <div className="h-16 flex items-center justify-between">
                <button onClick={sidebarToggle} className="hidden order-1 shrink-btn float-right bg-sidebar-muted text-sidebar-muted-foreground hover:bg-foreground hover:text-background ml-3 rounded-md w-[30px] h-[30px] md:flex items-center justify-center shadow-md shadow-black/10 transition duration-300 ease-in-out">
                    <BsList />
                </button>

                <div className="block md:hidden order-1 ml-3">
                <Dropdown>
                <DropdownTrigger>
                        <Button 
                        variant="bordered" 
                        >
                    <BsList />
                        </Button>
                    </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" className="">
                            <DropdownItem key="newReports" onClick={() => handleNavigation('/dashboard/newreport')}>Todos los reportes</DropdownItem>
                            <DropdownItem key="Dashboard" onClick={() => handleNavigation('/dashboard')}>Dashboard</DropdownItem>
                            <DropdownItem key="Obras" onClick={() => handleNavigation('/dashboard/reportsobras')}>Reportes de Obras</DropdownItem>
                            <DropdownItem key="Mantenimiento" onClick={() => handleNavigation('/dashboard/reportsmantenimiento')}>Reportes de mantenimiento</DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                </div>

                

                <div className="flex items-center justify-between sm:order-2 order-1">

                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="rounded-full w-fit px-0" variant="light">
                                <Chip className="px-1.5 text-black text-xl italic font-light py-3 w-fit rounded-full bg-gray-300">{userNameDisplay}</Chip>
                                <Avatar showFallback src='/Images/Image_UserPlaceholder.png' size="sm" className="" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" className="">
                            <DropdownItem key="options" onClick={handleProfileClick}>Perfil</DropdownItem>
                            <DropdownItem key="close" className="text-danger" color="danger" onClick={() => signOut()}>Cerrar Sesión</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
