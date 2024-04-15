import { useTheme } from "next-themes";
import Image from "next/image"
import Link from "next/link";

export const SideBarLogo=()=>
{
    const { theme } = useTheme();
return <Link href={{
    pathname: '/dashboard',
    
  }}><Image width={35} alt="" className="sm:w-[15rem] w-[20rem]"
  height={35} src="/Images/Logo.svg"/></Link> 
}          
