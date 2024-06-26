'use client'
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import classNames from 'classnames';
import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
    
    const { toggleCollapse } = useSideBarToggle();
    const bodyStyle = classNames("bg-background flex flex-col pr-6 mt-20 pb-10 sm:mt-16 py-4 p-4 h-full overflow-y-auto",
        {
            ["pl-[1rem] md:pl-[19rem]"]: !toggleCollapse,
            ["pl-[1rem] md:pl-[6.4rem]"]: toggleCollapse,
        });

    return (
        <div className={bodyStyle}>
            {children}
        </div>
    );
}