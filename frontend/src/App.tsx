import {Route, Routes} from 'react-router-dom';

// 视图组件
import Sidebar from "@/components/sidebar/sidebar";
import WindowTitle from "@/components/ui/window-title";
import {Menu, routers} from "@/routes";
import React from "react";

function App() {

  return (<>
    <div className="flex h-screen overflow-hidden">
      {/* 固定在左侧的侧边栏 */}
      <Sidebar menus={routers} />

      {/* 内容面板 */}
      <div className="flex flex-col w-full bg-white dark:bg-gray-900/90">
        {/* 固定在顶部的标题栏 */}
        <div className="sticky top-0 z-10">
          <WindowTitle />
        </div>

        {/* 路由内容 - 可滚动区域 */}
        <main className="flex-1 p-4 overflow-auto">
          <Routes>
            {routers.filter(router => router.path && router.page).map((route: Menu) => (
                <Route key={route.name} path={route.path} element={route.page} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  </>);
}

export default App
