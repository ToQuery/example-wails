import {useLocation, useNavigate} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Menu} from "@/routes";
import {useTranslation} from 'react-i18next';
import React from "react";
import {cn} from "@/lib/utils";
import {DefaultActiveClass, DefaultBgClass, useConfigSidebarStyle} from "@/provider/config";

export type SidebarStyle = {
    code: string;
    label: string;
    icon: string;
};


export const SidebarStyles: SidebarStyle[] = [{
    code: 'icon',
    label: '图标模式',
    icon: 'material-symbols:view-headline'
}, {
    code: 'row', label: '列表模式', icon: 'material-symbols:view-sidebar'
}, {
    code: 'row-double',
    label: '网格模式',
    icon: 'material-symbols:view-module-outline'
}];


export const DefaultSidebarStyle: SidebarStyle = SidebarStyles[2];


// 接收 props
interface SidebarProps {
    menus: Menu[];
    sideBarStyle?: SidebarStyle;
    widthClass?: string;
    bgColorClass?: string;
    activeClass?: string;
}


function Sidebar({
                     menus,
                     sideBarStyle,
                     widthClass = 'min-w-[120px] w-[120px]',
                     bgColorClass = DefaultBgClass,
                     activeClass = DefaultActiveClass
                 }: SidebarProps) {

    const navigate = useNavigate()
    const location = useLocation();
    const {t} = useTranslation();

    const [configSidebarStyle, ] = useConfigSidebarStyle();

    if (!sideBarStyle) {
        sideBarStyle = configSidebarStyle;
    }


    // 是否非 Mac 平台
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    const menuItemNode = (index: number, menu: Menu) => {
        let isActive = false;
        if (menu.path) {
            const url = new URL(menu.path, window.location.origin);
            isActive = location.pathname == url.pathname || location.pathname == menu.path;
        }

        const menuItemStyle = 'flex items-center min-h-[40px] hover:bg-gray-200 dark:hover:bg-gray-700';

        let node: React.ReactNode = <></>
        switch (sideBarStyle.code) {
            case 'icon': {
                node = menu.render
                    ? <li key={menu.name} className={cn(menuItemStyle, 'justify-center')}>{menu.render}</li>
                    : <li key={menu.name} className={cn(menuItemStyle, isActive ? activeClass : '', 'justify-center')}
                          onClick={() => navigate(menu.path!)}>
                        {menu.icon && <Icon icon={menu.icon}/>}
                    </li>
                break;
            }
            case 'row': {
                node =
                    menu.render
                        ? <li key={menu.name} className={cn(menuItemStyle, 'justify-center')}>{menu.render}</li>
                        : <li key={menu.name}
                              className={cn(menuItemStyle, isActive ? activeClass : '', 'flex-row pl-[20px]')}
                              onClick={() => navigate(menu.path!)}>
                            {menu.icon && <Icon icon={menu.icon} className='text-xl'/>}
                            <span className='text-sm ml-1.5'>{t(menu.name)}</span>
                        </li>;
                break;
            }
            case 'row-double': {
                const rowDoubleClass = cn(menuItemStyle, 'flex-col justify-center py-2');
                node = menu.render
                    ? <li key={menu.name} className={rowDoubleClass}>{menu.render}</li>
                    : <li key={menu.name} className={cn(rowDoubleClass, isActive ? activeClass : '')}
                          onClick={() => navigate(menu.path!)}>
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
                className={cn("flex flex-col justify-between items-center text-center select-none z-20 text-2xl ", widthClass, bgColorClass)}
                style={{"--wails-draggable": "drag"} as React.CSSProperties}
            >
                <ul
                    className={cn("w-full overflow-y-auto mt-12", isNotMac ? '' : '')}>
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
