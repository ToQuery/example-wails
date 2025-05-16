import {Route, Routes} from 'react-router-dom';

// 视图组件
import Sidebar from "@/components/sidebar/sidebar";
import WindowTitle from "@/components/ui/window-title";
import {Menu, routers} from "@/routes";
import React from "react";

function App() {

  return (<>
    <main className="flex h-screen">
      <Sidebar menus={routers} />

      {/* 内容面板 */}
      <div className="w-full  bg-white dark:bg-gray-900/90">

        <WindowTitle />

        {/* 路由内容 */}
        <main className="p-4 overflow-auto">
          <Routes>
            {routers.filter(router => router.path && router.page).map((route: Menu) => (
                <Route key={route.name} path={route.path} element={route.page} />
            ))}
          </Routes>
        </main>
      </div>
    </main>
  </>);
}

export default App
