// 定义 menu item 类型
import React from "react";
import DarkMode from "../components/DarkMode";

export interface Menu {
    text: string;
    path: string;
    icon: string;
    hidden?: boolean;
    node?: React.ReactNode;
    footer?: boolean;
}

// 侧边栏导航
export const Menus: Menu[] = [
    { text: "首页", path: "/home", icon: "material-symbols:home-app-logo" },
    { text: "用户", path: "/user", icon: "material-symbols:supervisor-account-outline-rounded" },
    { text: "模式", path: "/dark-model", icon: "", footer: true, node: <DarkMode/>, hidden: true },
    { text: "设置", path: "/setting", icon: "material-symbols:menu-rounded", footer: true },
];
