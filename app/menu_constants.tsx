import { SideNavItemGroup } from "@/types/type";
import { BsEnvelope, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestionCircle } from "react-icons/bs";
import { FaHammer } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { IoConstruct } from "react-icons/io5";



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
    {
        title: "",
        menuList: [{
            title: 'Descartados',
            path: '/dashboard//Discarted',
            icon: <BsHouseDoor size={20} />,
        }]
    },
   
];