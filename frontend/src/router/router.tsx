import React from "react";
import {createBrowserRouter, Outlet, Route, RouteObject} from "react-router-dom";
import {MainRouters, SettingRouters} from "../../config/routes";
import Layout from "@/components/layout";
import SettingTopLayout from "@/components/setting-top-layout";
import NotFound from "@/pages/NotFound";
import {Menu} from "@/router/type";


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

// 辅助函数：判断外链
function isExternal(path: string): boolean {
    return /^https?:\/\//.test(path);
}

// 辅助函数：标准化路径
function normalizePath(path: string): string {
    return path.replace(/\/{2,}/g, "/").replace(/\/$/, "");
}


/**
 * 把树形 routes 扁平化成 RouteObject 数组，保留完整路径。
 * @param routes Menu[]
 */
export function buildRouteObjects(routes: Menu[]): RouteObject[] {
    const out: RouteObject[] = routes
        .filter(route => route.path && !isExternal(route.path))
        .map((route) => {
            const routeObj: RouteObject = {};

            // path（去掉重复斜杠）
            routeObj.path = normalizePath(route.path!);
            routeObj.handle = route;

            // 如果有子路由
            if (route.children && route.children.length > 0) {
                routeObj.element = route.layout ? route.layout : <Outlet />;
                routeObj.children = [];

                const children: RouteObject[] = [];
                // 默认页作为 index
                if (route.page) {
                    children.push({
                        index: true,
                        element: route.page,
                        handle: route,
                    });
                }
                children.push(...buildRouteObjects(route.children));
                // 递归处理子路由
                routeObj.children = children;
            } else {
                // 没有 children，则普通页面
                if (route.page) {
                    routeObj.element = route.page;
                }
            }

            return routeObj;
        });

    console.log('buildRouteObjects out', out.length);
    return out;
}

const routerConfig = [
    {
        path: "/",
        element: <Layout />,
        children: buildRouteObjects(MainRouters),
        loader: () => ({ menus: MainRouters }),
    },
    {
        path: "/setting",
        element: <SettingTopLayout />,
        children: buildRouteObjects(SettingRouters),
        loader: () => ({ menus: SettingRouters }),
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

console.log('routerConfig', routerConfig);
export const router = createBrowserRouter(routerConfig);
