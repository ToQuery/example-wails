import {Link, useLocation} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Menu} from "@/routes";
import React from "react";
import {cn} from "@/lib/utils";

type SideBarDisplayModel = "icon" | "row" | "two-row";

// 接收 props
interface SideBarProps {
    logo?: string | React.JSX.Element;
    menus: Menu[];
    hiddenText?: boolean;
    widthClass?: string;
    bgColorClass?: string;
    activeClass?: string;
}

// 侧边栏导航激活样式
const defaultActiveClass = 'text-blue-600 dark:text-blue-400';

function SideBar({
                     logo,
                     menus,
                     hiddenText = false,
                     widthClass = 'w-[80px]',
                     bgColorClass = 'bg-gray-100 dark:bg-slate-900/80',
                     activeClass = defaultActiveClass
                 }: SideBarProps) {

    const location = useLocation();

    // 是否非 Mac 平台
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;
    let logoNode: React.JSX.Element = <></>;
    if (logo) {
        if (logo instanceof String) {
            logoNode = <Icon icon={logo.toString()}/>
        }
    }

    return (
        <>
            {/* 侧边栏导航 --wails-draggable：窗口可拖动 */}
                <nav
                    className={cn("flex-none flex flex-col justify-between items-center text-center select-none z-20", widthClass, bgColorClass)}
                    style={{"--wails-draggable": "drag"} as React.CSSProperties}
                >
                    <div className={cn("my-4 flex flex-col gap-6 text-2xl text-gray-500 dark:text-gray-200", isNotMac ? '' : 'mt-14')}>
                        <div className='items-center justify-center'>{logoNode}</div>
                        {menus.filter(menu => !menu.hidden && !menu.footer).map((menu) => (
                            <Link
                                key={menu.text}
                                to={menu.path}
                                className={cn(location.pathname === menu.path ? activeClass : '', 'flex flex-col items-center justify-center')}
                            >
                                <Icon icon={menu.icon}/>
                                {!hiddenText && <p className={cn("text-sm", 'mt-1')}>{menu.text}</p>}
                            </Link>
                        ))}
                    </div>
                    <div
                        className="mb-6 my-4 flex flex-col gap-4 text-2xl text-gray-500 dark:text-gray-200 items-center justify-center">
                        {menus.filter(menu => !menu.hidden && menu.footer).map((menu) => (
                            menu.node ? <div className=''>{menu.node}</div> :
                                <Link
                                    key={menu.text}
                                    to={menu.path}
                                    className={cn(location.pathname === menu.path ? activeClass : '', 'flex flex-col items-center justify-center')}
                                >
                                    <Icon icon={menu.icon}/>
                                    {!hiddenText && <p className="text-sm mt-1">{menu.text}</p>}
                                </Link>
                        ))}
                    </div>
                </nav>
        </>
    );
}

export default SideBar;
