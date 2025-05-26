import {Outlet} from "react-router-dom";
import Sidebar from "@/components/sidebar/sidebar";
import {routers} from "../../config/routes";
import WindowTitle from "@/components/ui/window-title";
import React from "react";

function Layout() {
    return (
        <div className="flex min-w-screen min-h-screen overflow-hidden">
            {/* 固定在左侧的侧边栏 */}
            <Sidebar menus={routers}/>

            {/* 内容面板 */}
            <div className="flex flex-col w-screen h-screen bg-white dark:bg-gray-900/90">
                {/* 固定在顶部的标题栏 */}
                <div className="sticky top-0 z-10">
                    <WindowTitle/>
                </div>

                {/* 路由内容 - 可滚动区域 */}
                <main className="overflow-auto h-full">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}

export default Layout;
