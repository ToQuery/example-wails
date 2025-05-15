import {Link, useLocation} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Menu} from "@/routes";
import {useTranslation} from 'react-i18next';
import React from "react";
import {cn} from "@/lib/utils";

// 接收 props
interface SideBarProps {
    menus: Menu[];
    hiddenText?: boolean;
    widthClass?: string;
    bgColorClass?: string;
    activeClass?: string;
}

// 侧边栏导航激活样式
const defaultBgClass = 'bg-gray-100 dark:bg-slate-900/80';
const defaultActiveClass = 'text-blue-600 dark:text-blue-400';

function Sidebar({
                     menus,
                     hiddenText = false,
                     widthClass = 'w-[80px]',
                     bgColorClass = defaultBgClass,
                     activeClass = defaultActiveClass
                 }: SideBarProps) {

    const location = useLocation();
    const {t} = useTranslation();

    // 是否非 Mac 平台
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    const menuItem = (menu: Menu) => {
        let isActive = false;
        if (menu.path) {
            const url = new URL(menu.path, window.location.origin);
            isActive = location.pathname == url.pathname || location.pathname == menu.path;
        }

        return menu.render
            ? <div key={menu.name} className=''>{menu.render}</div>
            : <Link
                key={menu.name}
                to={menu.path!}
                className={cn(isActive ? activeClass : '', 'flex flex-col items-center justify-center')}
            >
                {menu.icon && <Icon icon={menu.icon}/>}
                {!hiddenText && <p className='text-sm mt-1'>{t(menu.name)}</p>}
            </Link>;
    }

    return (
        <>
            {/* 侧边栏导航 --wails-draggable：窗口可拖动 */}
            <nav
                className={cn("flex-none flex flex-col justify-between items-center text-center select-none z-20", widthClass, bgColorClass)}
                style={{"--wails-draggable": "drag"} as React.CSSProperties}
            >
                <div
                    className={cn("my-4 flex flex-col gap-6 text-2xl text-gray-500 dark:text-gray-200", isNotMac ? '' : 'mt-10')}>
                    {menus.filter(menu => !menu.hidden && !menu.footer).map((menu) => menuItem(menu))}
                </div>
                <div
                    className="mb-3 my-4 flex flex-col gap-4 text-2xl text-gray-500 dark:text-gray-200 items-center justify-center">
                    {menus.filter(menu => !menu.hidden && menu.footer).map((menu) => menuItem(menu))}
                </div>
            </nav>
        </>
    );
}

export default Sidebar;
