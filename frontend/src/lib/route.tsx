import React from "react";
import {Route} from "react-router-dom";
import {SettingRouters} from "../../config/routes";
import SettingLeftLayout from "@/components/setting-left-layout";

// ======================
// Menu 类型定义
// ======================
export interface Menu {
    name: string;
    path?: string;
    icon?: string;
    layout?: React.ReactNode;
    render?: React.ReactNode;
    page?: React.ReactNode;
    children?: Menu[];
    footer?: boolean;
    hidden?: boolean;
}

export function joinPaths(parent: string, child: string): string {
    if (!child) return parent || "/";
    // 如果 child 是绝对路径，直接返回（保留用户写的完整路径）
    if (child.startsWith("/")) {
        return child === "/" ? "/" : child.replace(/\/+$/g, ""); // 去掉尾部多余斜杠
    }
    // parent 可能为空或 '/'
    if (!parent || parent === "/") {
        return child.startsWith("/") ? child : `/${child}`;
    }
    // 确保中间只有一个 '/'
    return `${parent.replace(/\/+$/g, "")}/${child.replace(/^\/+/g, "")}`;
}

/**
 * 判断菜单是否选中
 * @param menu Menu 对象
 * @param currentPath 当前 location.pathname
 * @param parentPath
 */
export function isMenuActive(menu: Menu, currentPath: string, parentPath = ""): boolean {
    if (!menu.path) return false;

    // 过滤外部链接
    if (menu.path.startsWith("http://") || menu.path.startsWith("https://")) return false;

    const fullPath = joinPaths(parentPath, menu.path);

    if (currentPath === fullPath) return true;
    // 当前路径和菜单 path 完全匹配
    if (currentPath === menu.path) return true;

    // 如果 menu 有 children，递归检查
    if (menu.children && menu.children.length > 0) {
        const flag = menu.children.some((child) => isMenuActive(child, currentPath, menu.path));
        console.log('menu.children.some', flag);
        return flag;
    }

    return false;
}

/**
 * 把树形 routes 扁平化成 Route 元素数组，保留完整路径。
 * @param routes Menu[]
 * @param parentPath 父路径（调用时不用传，递归内部使用）
 */
export function renderMainRoutes(routes: Menu[], parentPath = ""): React.ReactNode {
    const out: React.ReactNode[] = [];

    routes.forEach((route) => {
        if (!route || !route.path) return;

        // 过滤外部链接
        if (route.path.startsWith("http://") || route.path.startsWith("https://")) {
            return;
        }

        const fullPath = joinPaths(parentPath, route.path);

        // 普通把当前节点作为独立路由渲染
        if (route.page) {
            out.push(<Route key={fullPath} path={fullPath} element={route.page} />);
        }

        // 如果有 children，继续递归，把 parentPath 换成当前的 fullPath
        if (route.children && route.children.length > 0) {
            out.push(...(renderMainRoutes(route.children, fullPath) as React.ReactNode[]));
        }
    });

    return out;
}


export function renderSettingRoutes(routes: Menu[], parentPath = ""): React.ReactNode {
    return routes.map((route) => {
        if (!route.path) return null;

        // 拼接完整路径
        const fullPath = parentPath
            ? `${parentPath.replace(/\/+$/g, "")}/${route.path.replace(/^\/+/g, "")}`
            : route.path;

        // 如果有子菜单
        if (route.children && route.children.length > 0) {
            return (
                <Route
                    key={fullPath}
                    path={fullPath}
                    element={<SettingLeftLayout menus={route.children}/>}
                >
                    {renderSettingRoutes(route.children, fullPath)}
                </Route>
            );
        }

        // 普通路由
        return <Route key={fullPath} path={fullPath} element={route.page} />;
    });
}
