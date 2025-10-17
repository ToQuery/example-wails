import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Icon} from "@iconify/react";
import {useTranslation} from "react-i18next";
import {Browser, System} from "@wailsio/runtime";
import classNames from "classnames";
import {useGlobalSidebarStyle} from "@/provider/global-provider";
import {ui} from "@/const/ui";

// ======================
// Sidebar 样式模式定义
// ======================
export type SidebarStyle = {
    code: string;
    label: string;
    icon: string;
};

export const sidebarStyleIcon: SidebarStyle = {
    code: "icon",
    label: "图标模式",
    icon: "material-symbols:view-headline",
};

export const sidebarStyleRow: SidebarStyle = {
    code: "row",
    label: "列表模式",
    icon: "material-symbols:view-sidebar",
};

export const sidebarStyleGrid: SidebarStyle = {
    code: "grid",
    label: "网格模式",
    icon: "material-symbols:view-module-outline",
};

export const SidebarStyles: SidebarStyle[] = [
    sidebarStyleIcon,
    sidebarStyleRow,
    sidebarStyleGrid,
];

// ======================
// Menu 类型定义
// ======================
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

// ======================
// Sidebar 组件
// ======================
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
                     widthClass = "w-[80px] min-w-[80px]",
                     bgColorClass = ui.theme.defaultBgClass,
                     activeClass = classNames(
                         ui.theme.defaultActiveBgClass,
                         ui.theme.defaultActiveTextClass
                     ),
                 }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();
    const [configSidebarStyle] = useGlobalSidebarStyle();

    if (!sideBarStyle) sideBarStyle = configSidebarStyle;

    // ======================
    // 菜单点击逻辑
    // ======================
    const handleMenuItemClick = (menu: Menu) => {
        const path = menu.path;
        if (!path) return;

        if (path.startsWith("http://") || path.startsWith("https://")) {
            Browser.OpenURL(path);
        } else {
            navigate(path);
        }
    };

    // ======================
    // 单个菜单渲染
    // ======================
    const menuItemNode = (index: number, menu: Menu) => {
        const path = menu.path;
        let isActive = false;

        if (path && !path.startsWith("http://") && !path.startsWith("https://")) {
            const url = new URL(path, window.location.origin);
            isActive =
                location.pathname === url.pathname || location.pathname === menu.path;
        }

        const menuItemBase = classNames(
            "flex items-center min-h-[40px] cursor-pointer transition-all duration-200 ease-in-out",
            ui.theme.defaultHoverBgClass,
            ui.theme.defaultHoverTextClass
        );

        if (menu.render) {
            return <li key={menu.name} className={classNames(menuItemBase, 'justify-center')}>{menu.render}</li>
        }

        let node: React.ReactNode;

        switch (sideBarStyle.code) {
            case "icon":
                node = <li
                        key={menu.name}
                        className={classNames(
                            menuItemBase,
                            "justify-center text-lg",
                            isActive && activeClass
                        )}
                        onClick={() => handleMenuItemClick(menu)}
                    >
                        {menu.icon && <Icon icon={menu.icon}/>}
                    </li>;
                break;

            case "row":
                node = <li
                        key={menu.name}
                        className={classNames(
                            menuItemBase,
                            "flex-row px-4 text-sm justify-start space-x-2",
                            isActive && activeClass
                        )}
                        onClick={() => handleMenuItemClick(menu)}
                    >
                        {menu.icon && <Icon icon={menu.icon} className="text-xl"/>}
                        <span>{t(menu.name)}</span>
                    </li>;
                break;

            case "grid":
                node = <li
                        key={menu.name}
                        className={classNames(
                            menuItemBase,
                            "flex-col justify-center py-2 text-xs",
                            isActive && activeClass
                        )}
                        onClick={() => handleMenuItemClick(menu)}
                    >
                        {menu.icon && <Icon className="text-xl" icon={menu.icon}/>}
                        <span className="mt-1">{t(menu.name)}</span>
                    </li>;
                break;

            default:
                node = <></>;
        }

        return node;
    };

    return (
        <aside
            className={classNames(
                "flex flex-col justify-between select-none text-center z-30 border-r border-gray-200 dark:border-gray-800",
                widthClass,
                bgColorClass
            )}
            style={{"--wails-draggable": "drag"} as React.CSSProperties}
        >
            {/* 顶部 Logo 区域 */}
            <div className='h-11'></div>

            {/* 菜单主体（可滚动） */}
            <div
                className="flex-1 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                <ul
                    className={classNames(
                        "space-y-1",
                        System.IsMac() ? "" : ""
                    )}
                >
                    {menus
                        .filter((menu) => !menu.hidden && !menu.footer)
                        .map((menu, index) => menuItemNode(index, menu))}
                </ul>
            </div>

            {/* 底部菜单区 */}
            <div className="w-full border-t border-gray-200 dark:border-gray-800 py-3">
                <ul className="space-y-1">
                    {menus
                        .filter((menu) => !menu.hidden && menu.footer)
                        .map((menu, index) => menuItemNode(index, menu))}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
