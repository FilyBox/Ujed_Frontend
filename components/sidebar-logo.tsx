import { useTheme } from "next-themes";
import Image from "next/image"

export const SideBarLogo=()=>
{
    const { theme } = useTheme();
return <Image width={35} alt="" className="sm:w-[15rem] w-[20rem]"
height={35} src="/Images/Logo.svg"/>
}          
