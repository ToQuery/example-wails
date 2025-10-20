import {Menu} from "@/components/sidebar/sidebar";
import React from "react";
import {Route} from "react-router-dom";
import {SettingRouters} from "../../config/routes";
import SettingLeft from "@/components/setting/setting-left";

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
                    element={<SettingLeft menus={route.children} />}
                >
                    {renderSettingRoutes(route.children, fullPath)}
                </Route>
            );
        }

        // 普通路由
        return <Route key={fullPath} path={fullPath} element={route.page} />;
    });
}
