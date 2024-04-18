import PageWrapper from "@/components/pagewrapper";
import { SideBar } from "@/components/sidebar";
import Header from "@/components/header";
export default function RootLayout({ children, pathname }: { children: React.ReactNode, pathname: string }) {
  
  return (

    <>
    <SideBar />
    <div className="flex flex-col h-full w-full bg-gray-100">
       <Header/>

      <PageWrapper children={children} />
    </div>

  </>
        
  );
}