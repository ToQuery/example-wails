import {useLocation, useNavigate} from "react-router-dom";
import {Icon} from "@iconify/react";
import {useTranslation} from 'react-i18next';
import React from "react";

import {useGlobalSidebarStyle} from "@/provider/global-provider";

import {Browser} from "@wailsio/runtime";
import classNames from "classnames";
import {ui} from "@/const/ui";

export type SidebarStyle = {
    code: string;
    label: string;
    icon: string;
};

export const sidebarStyleIcon: SidebarStyle = {
    code: 'icon',
    label: '图标模式',
    icon: 'material-symbols:view-headline'
};

export const sidebarStyleRow: SidebarStyle = {
    code: 'row', label: '列表模式', icon: 'material-symbols:view-sidebar'
};

export const sidebarStyleGrid: SidebarStyle = {
    code: 'grid',
    label: '网格模式',
    icon: 'material-symbols:view-module-outline'
}

export const SidebarStyles: SidebarStyle[] = [sidebarStyleIcon, sidebarStyleRow, sidebarStyleGrid];

// 定义 menu 类型
export interface Menu {
    name: string;
    path?: string;
    icon?: string;
    render?: React.ReactNode;
    page?: React.ReactNode;
    children?: Menu[];
    footer?: boolean;
    hidden?: boolean;
}

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
                     widthClass = 'min-w-[75px] w-[75px]',
                     bgColorClass = ui.theme.defaultBgClass,
                     activeClass = classNames(ui.theme.defaultActiveBgClass, ui.theme.defaultActiveTextClass),
                 }: SidebarProps) {

    const navigate = useNavigate()
    const location = useLocation();
    const {t} = useTranslation();

    const [configSidebarStyle,] = useGlobalSidebarStyle();

    if (!sideBarStyle) {
        sideBarStyle = configSidebarStyle;
    }


    // 是否非 Mac 平台
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    const handleMenuItemClick = (menu: Menu) => {
        const path = menu.path
        if (path) {
            if (path.startsWith("http://") || path.startsWith("https://")) {
                Browser.OpenURL(path)
            } else {
                navigate(path);
            }
        }
    }

    const menuItemNode = (index: number, menu: Menu) => {
        let isActive = false;
        const path = menu.path

        if (path && !path.startsWith("http://") && !path.startsWith("https://")) {
            const url = new URL(path, window.location.origin);
            isActive = location.pathname == url.pathname || location.pathname == menu.path;
        }

        const menuItemStyle = classNames('flex items-center min-h-[40px]', ui.theme.defaultHoverBgClass, ui.theme.defaultHoverTextClass);

        let node: React.ReactNode = <></>
        switch (sideBarStyle.code) {
            case 'icon': {
                node = menu.render
                    ? <li key={menu.name} className={classNames(menuItemStyle, 'justify-center')}>{menu.render}</li>
                    : <li key={menu.name}
                          className={classNames(menuItemStyle, isActive ? activeClass : '', 'justify-center')}
                          onClick={() => handleMenuItemClick(menu)}>
                        {menu.icon && <Icon icon={menu.icon}/>}
                    </li>
                break;
            }
            case 'row': {
                node =
                    menu.render
                        ? <li key={menu.name} className={classNames(menuItemStyle, 'justify-center')}>{menu.render}</li>
                        : <li key={menu.name}
                              className={classNames(menuItemStyle, isActive ? activeClass : '', 'flex-row pl-[20px]')}
                              onClick={() => handleMenuItemClick(menu)}>
                            {menu.icon && <Icon icon={menu.icon} className='text-xl'/>}
                            <span className='text-sm ml-1.5'>{t(menu.name)}</span>
                        </li>;
                break;
            }
            case 'grid': {
                const rowDoubleClass = classNames(menuItemStyle, 'flex-col justify-center py-2');
                node = menu.render
                    ? <li key={menu.name} className={rowDoubleClass}>{menu.render}</li>
                    : <li key={menu.name} className={classNames(rowDoubleClass, isActive ? activeClass : '')}
                          onClick={() => handleMenuItemClick(menu)}>
                        {menu.icon && <Icon className='text-xl' icon={menu.icon}/>}
                        <span className='text-xs mt-1'>{t(menu.name)}</span>
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
                className={classNames("flex flex-col justify-between items-center text-center select-none z-20", widthClass, bgColorClass)}
                style={{"--wails-draggable": "drag"} as React.CSSProperties}
            >
                <ul
                    className={classNames("w-full overflow-y-auto mt-11", isNotMac ? '' : '')}>
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
