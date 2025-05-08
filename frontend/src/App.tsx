import { Routes, Route } from 'react-router-dom';

// 视图组件
import User from './pages/User';
import Setting from './pages/Setting';
import Index from "./pages/Index";
import SideBar from "./components/SideBar";
import WindowTitle from "./components/WindowTitle";
import {Menus} from "./routes";

function App() {

  return (
    <main className="flex h-screen">

      <SideBar menus={Menus} />

      {/* 内容面板 */}
      <div className="pl-2 w-full bg-white dark:bg-gray-900/90">

        <WindowTitle />

        {/* 路由内容 */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/index" element={<Index />} />
            <Route path="/home" element={<Index />} />
            <Route path="/user" element={<User />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App
