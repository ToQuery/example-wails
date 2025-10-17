import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar/sidebar";
import {MainRouters} from "../../config/routes";
import WindowTitle from "@/components/ui/window-title";

function Layout() {
    return (
        <div className="flex h-screen w-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* 左侧固定导航栏 */}
            <Sidebar menus={MainRouters} />

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
