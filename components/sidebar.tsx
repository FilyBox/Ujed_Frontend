'use client'
import { useSession } from "next-auth/react"; // Importa useSession de next-auth/react
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import SideBarMenuGroup from './sidebar-menu-group';
import { SideBarLogo } from './sidebar-logo';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { SideNavItemGroup } from "@/types/type";
import { FaHammer } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { IoConstruct } from "react-icons/io5";
export const SideBar = () => {
    
    const { data: session } = useSession();  // Usa useSession para acceder a la sesión actual
    const [mounted, setMounted] = useState(false);
    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();

    const asideStyle = classNames(" sidebar overflow-y-auto overflow-x-auto fixed bg-sidebar h-full shadow-sm shadow-slate-500/40 transition duration-300 ease-in-out z-[99999]",
        {
            ["md:w-[17rem] md:block hidden"]: !toggleCollapse,
            ["sm:w-[5.4rem] md:left-0 left-[-100%] md:block hidden"]: toggleCollapse,
        });

    useEffect(() => setMounted(true), []);
    
    const menuItems = useMemo(() => {
        let items:SideNavItemGroup[] = [];
    
        if (session?.user?.roles.includes('admin')) {
            items = [
                { title: "",
                menuList: [{
                    title: 'Entrada',
                    path: '/dashboard/newreport',
                    icon: <BiSolidReport size={20} />,
                }] },
    
            {
                title: "",
                menuList: [{
                    title: 'Obras',
                    path: '/dashboard/reportsobras',
                    icon: <FaHammer size={20} />,
                }]
            },
    
    {
        title: "",
        menuList: [{
            title: 'Mantenimiento',
            path: '/dashboard/reportsmantenimiento',
            icon: <IoConstruct size={20} />,
        }]
    },
            ];
        } else if (session?.user?.roles.includes('mantenimiento')) {
            items = [
                {
                    title: "",
                    menuList: [{
                        title: 'Mantenimiento',
                        path: '/dashboard/reportsmantenimiento',
                        icon: <IoConstruct size={20} />,
                    }]
                },
            ];
        } else if (session?.user?.roles.includes('obras')) {
            items = [
                {
                    title: "",
                    menuList: [{
                        title: 'Obras',
                        path: '/dashboard/reportsobras',
                        icon: <FaHammer size={20} />,
                    }]
                },
            ];
        }
    
        return items;
    }, [session?.user?.roles]);

    return (
        <aside className={asideStyle}>
        <div className="sidebar-top relative px-3 flex flex-col gap-5 items-center p-5 justify-end">
            {mounted && <SideBarLogo />}
        </div>
        <nav className="flex flex-col transition duration-300 ease-in-out">
            <div className="flex flex-col px-6">
                {menuItems.map((item, idx) => (
                    <SideBarMenuGroup key={idx} menuGroup={item} />
                ))}
            </div>
        </nav>
    </aside>
    );
}
