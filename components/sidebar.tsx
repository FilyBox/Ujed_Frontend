'use client'
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import SideBarMenuGroup from './sidebar-menu-group';
import { SideBarLogo } from './sidebar-logo';
import { BsList } from "react-icons/bs"; // Asegúrate de tener esta importación
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SIDENAV_ITEMS } from '@/app/menu_constants';

export const SideBar = () => {
    
    const [mounted, setMounted] = useState(false);
    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();

    const asideStyle = classNames(" sidebar overflow-y-auto overflow-x-auto fixed bg-sidebar h-full shadow-sm shadow-slate-500/40 transition duration-300 ease-in-out z-[99999]",
        {
            ["md:w-[17rem] md:block hidden"]: !toggleCollapse,
            ["sm:w-[5.4rem] md:left-0 left-[-100%] md:block hidden"]: toggleCollapse,
        });

    const toggleButton = () => {
        invokeToggleCollapse();
    };

    useEffect(() => setMounted(true), []);

    return (
        <aside className={asideStyle}>
            <div className=''>
            
            </div>
            
            <div className="sidebar-top relative px-3 flex flex-col gap-5 items-center p-5 justify-end">
            

                {mounted && <SideBarLogo />}
                {/* <button onClick={toggleButton} className=" shrink-btn float-end bg-gray-400 text-sidebar-muted-foreground hover:bg-foreground hover:text-background rounded-md w-[30px] h-[30px] flex items-center justify-center shadow-md shadow-black/10  transition duration-300 ease-in-out">
                    <BsList />
                </button> */}
            </div>
            
            <nav className="flex flex-col transition duration-300 ease-in-out">
                <div className="flex flex-col px-6">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <SideBarMenuGroup key={idx} menuGroup={item} />;
                    })}
                </div>
            </nav>
        </aside>
    )
}
