import {Route, Routes} from 'react-router-dom';

// 视图组件
import SideBar, {SideBarModelArray} from "@/components/sidebar/sidebar";
import WindowTitle from "@/components/ui/window-title";
import {Menu, routers} from "@/routes";
import React from "react";
import {Icon} from "@iconify/react";

function App() {
  const [sideBarModelIndex, setSideBarModelIndex] = React.useState(1);


  return (<>
    <main className="flex h-screen">
      <SideBar menus={routers} sideBarModel={SideBarModelArray[sideBarModelIndex]} />

      {/* 内容面板 */}
      <div className="w-full  bg-white dark:bg-gray-900/90">

        <WindowTitle />

        {/* 路由内容 */}
        <main className="p-4 ">
          <Icon icon='material-symbols:side-navigation' onClick={() => setSideBarModelIndex((sideBarModelIndex + 1) % 3)} />
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
