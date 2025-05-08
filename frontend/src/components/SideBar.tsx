import {Link, useLocation} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Menu} from "../routes";
import React from "react";
import {cn} from "../lib/utils";

// 接收 props
interface SideBarProps {
    menus: Menu[];
    widthClass?: string;
    bgColorClass?: string;
    activeClass?: string;
}

// 侧边栏导航激活样式
const defaultActiveClass = 'text-blue-600 dark:text-blue-400';

function SideBar({
                     menus,
                     widthClass = 'w-[80px]',
                     bgColorClass = 'bg-gray-100 dark:bg-slate-900/80',
                     activeClass = defaultActiveClass
                 }: SideBarProps) {

    const location = useLocation();

    return (
        <>
            {/* 侧边栏导航 */}
            <nav
                className={cn("flex-none flex flex-col justify-between items-center text-center select-none z-20", widthClass, bgColorClass)}
                style={{"--wails-draggable": "drag"} as React.CSSProperties}
            >
                <div className="mt-14 my-4 flex flex-col gap-6 text-2xl text-gray-500 dark:text-gray-200">
                    {menus.filter(menu => !menu.hidden && !menu.footer).map((item) => (
                        <Link
                            key={item.text}
                            to={item.path}
                            className={location.pathname === item.path ? activeClass : ''}
                        >
                            <Icon icon={item.icon}/>
                        </Link>
                    ))}
                </div>
                <div className="my-4 flex flex-col gap-4 text-2xl text-gray-500 dark:text-gray-200">
                    {menus.filter(menu => !menu.hidden && menu.footer).map((menu) => (
                        menu.node ? menu.node :
                            <Link
                                key={menu.text}
                                to={menu.path}
                                className={location.pathname === menu.path ? activeClass : ''}
                            >
                                <Icon icon={menu.icon}/>
                            </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}

export default SideBar;
