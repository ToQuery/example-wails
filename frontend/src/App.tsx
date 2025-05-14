import {Route, Routes} from 'react-router-dom';

// 视图组件
import SideBar from "@/components/sidebar/sidebar";
import WindowTitle from "@/components/ui/window-title";
import {Menu, routers} from "@/routes";
import React from "react";
import { useTranslation } from 'react-i18next';

function App() {
  // 初始化i18n翻译
  const { t } = useTranslation();

  return (<>
    <main className="flex w-screen h-screen">
      <SideBar menus={routers} />

      {/* 内容面板 */}
      <div className="w-full  h-full bg-white dark:bg-gray-900/90">

        <WindowTitle />

        {/* 路由内容 */}
        <div className="p-4 w-full h-full">
          <Routes>
            {routers.filter(router => router.path && router.page).map((route: Menu) => (
                <Route path={route.path} element={route.page} />
            ))}
          </Routes>
        </div>
      </div>
    </main>
  </>);
}

export default App
