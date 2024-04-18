import { SideNavItemGroup } from "@/types/type";
import { BsEnvelope, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestionCircle } from "react-icons/bs";
import { FaHammer } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { IoConstruct } from "react-icons/io5";
import { useMemo } from "react";
import { useSession } from "next-auth/react"; // Importa useSession de next-auth/react

const { data: session } = useSession();  // Usa useSession para acceder a la sesión actual


export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "",
        menuList: [{
            title: 'Entrada',
            path: '/dashboard/newreport',
            icon: <BiSolidReport size={20} />,
        }]
    },

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
    // {
    //     title: "",
    //     menuList: [{
    //         title: 'Descartados',
    //         path: '/dashboard//Discarted',
    //         icon: <BsHouseDoor size={20} />,
    //     }]
    // },
   
];


export const menuItems = useMemo(() => {
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
                title: 'Entrada',
                path: '/dashboard/reportsmantenimiento',
                icon: <IoConstruct size={20} />,
            }]
        },

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
                    title: 'Entrada',
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