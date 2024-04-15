"use client";
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import { SideNavItem } from '@/types/type';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { BsChevronRight } from 'react-icons/bs';

export const SideBarMenuItem = ({ item }: { item: SideNavItem }) => {

    const { toggleCollapse } = useSideBarToggle();

    const pathname = usePathname();

    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    const inactiveLink = classNames("flex items-center min-h-[40px] h-full text-sidebar-foreground bg-gray-200 hover:bg-red-600 hover:text-white px-4  rounded-full transition duration-200",
        { ["justify-center"]: toggleCollapse }
    );

    const activeLink = classNames("min-h-[40px]  text-sidebar-muted-foreground bg-red-700 text-white border-[3px] border-black");

    const navMenuDropdownItem = "text-red px-4 hover:text-sidebar-muted-foreground transition duration-200 rounded-md"

    const dropdownMenuHeaderLink = classNames(inactiveLink,
        {
            ["bg-sidebar-muted rounded-b-none"]: subMenuOpen
        }
    );
    return (
        <>
            <Link href={item.path} className={`${inactiveLink} ${item.path === pathname ? activeLink : ''}`}>
                    <div className='min-w-[20px]'>{item.icon}</div>

                    <div className="flex w-full justify-center items-center">
                    {!toggleCollapse && (<span className=" leading-6 font-semibold">{item.title}</span>)}

                    </div>
            </Link>
        </>
    );
};