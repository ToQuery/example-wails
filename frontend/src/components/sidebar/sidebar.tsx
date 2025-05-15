import {Link, useLocation, useNavigate, useRoutes} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Menu} from "@/routes";
import {useTranslation} from 'react-i18next';
import React from "react";
import {cn} from "@/lib/utils";

type SideBarModel = 'icon' | 'row' | 'row-double';
export const SideBarModelArray: SideBarModel[]  = ['icon', 'row', 'row-double'];

// 接收 props
interface SideBarProps {
    menus: Menu[];
    sideBarModel?: SideBarModel;
    widthClass?: string;
    bgColorClass?: string;
    activeClass?: string;
}

const defaultSideBarModel: SideBarModel = 'row-double';
// 侧边栏导航激活样式
const defaultBgClass = 'bg-gray-100 dark:bg-slate-900/80';
const defaultActiveClass = 'text-blue-600 dark:text-blue-500';

function Sidebar({
                     menus,
                     sideBarModel = defaultSideBarModel,
                     widthClass = 'w-[120px]',
                     bgColorClass = defaultBgClass,
                     activeClass = defaultActiveClass
                 }: SideBarProps) {

    const navigate = useNavigate()
    const location = useLocation();
    const {t} = useTranslation();

    // 是否非 Mac 平台
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    const menuItemNode = (index: number, menu: Menu) => {
        let isActive = false;
        if (menu.path) {
            const url = new URL(menu.path, window.location.origin);
            isActive = location.pathname == url.pathname || location.pathname == menu.path;
        }

        const menuItemStyle = 'flex items-center min-h-[40px] hover:bg-gray-200 dark:hover:bg-gray-900';

        let node: React.ReactNode = <></>
        switch (sideBarModel) {
            case 'icon': {
                node =  menu.render
                    ? <li key={menu.name} className={cn(menuItemStyle, 'justify-center')}>{menu.render}</li>
                    : <li key={menu.name} className={cn(menuItemStyle, isActive ? activeClass : '', 'justify-center')} onClick={() => navigate(menu.path!)}>
                        {menu.icon && <Icon icon={menu.icon}/>}
                    </li>
                break;
            }
            case 'row': {
                node =
                    menu.render
                        ? <li key={menu.name} className={cn(menuItemStyle, 'justify-center')}>{menu.render}</li>
                        : <li key={menu.name} className={cn(menuItemStyle, isActive ? activeClass : '', 'flex-row pl-[20px]')} onClick={() => navigate(menu.path!)}>
                            {menu.icon && <Icon icon={menu.icon} className='text-xl' />}
                            <span className='text-sm ml-1.5'>{t(menu.name)}</span>
                        </li>;
                break;
            }
            case 'row-double': {
                const rowDoubleClass = cn(menuItemStyle, 'flex-col justify-center py-2');
                node = menu.render
                    ? <li key={menu.name} className={rowDoubleClass}>{menu.render}</li>
                    : <li key={menu.name} className={cn(rowDoubleClass, isActive ? activeClass : '')} onClick={() => navigate(menu.path!)}>
                        {menu.icon && <Icon icon={menu.icon}/>}
                        <span className='text-sm mt-1'>{t(menu.name)}</span>
                    </li>;
                break;
            }
        }

        return node;
    }

    return (
        <>
            {/* 侧边栏导航 --wails-draggable：窗口可拖动 */}
            <aside
                className={cn("flex flex-col justify-between items-center text-center select-none z-20 text-2xl text-gray-500 dark:text-gray-200", widthClass, bgColorClass)}
                style={{"--wails-draggable": "drag"} as React.CSSProperties}
            >
                <ul
                    className={cn("w-full overflow-y-auto", isNotMac ? '' : 'mt-10')}>
                    {menus.filter(menu => !menu.hidden && !menu.footer).map((menu, index) => menuItemNode(index, menu))}
                </ul>
                <ul
                    className="w-full  my-3">
                    {menus.filter(menu => !menu.hidden && menu.footer).map((menu, index) => menuItemNode(index, menu))}
                </ul>
            </aside>
        </>
    );
}

export default Sidebar;
