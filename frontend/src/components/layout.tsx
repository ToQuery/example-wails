import React from "react";
import { Outlet, useMatches } from "react-router-dom";
import Sidebar from "@/components/sidebar/sidebar";
import {MainRouters} from "../../config/routes";
import {Menu} from "@/router/type";
import WindowTitle from "@/components/ui/window-title";

function Layout() {
    // 使用useMatches获取路由匹配信息
    const matches = useMatches();
    
    // 尝试从匹配结果中提取菜单数据，如果没有则使用默认的MainRouters
    // 这里我们可以在未来通过其他方式注入菜单数据
    let menuData: Menu[] = MainRouters;
    
    // 如果需要，可以在这里添加逻辑来动态获取菜单数据
    // 例如从用户权限、应用状态等获取
    
    return (
        <div className="flex h-screen w-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* 左侧固定导航栏 - 将菜单数据作为prop传递 */}
            <Sidebar />

            {/* 主体区域 */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* 顶部标题栏 */}
                <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                    <WindowTitle />
                </header>

                {/* 内容区域 */}
                <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
