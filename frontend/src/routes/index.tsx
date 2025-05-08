
import React from "react";
import DarkMode from "../components/DarkMode";

// 定义 menu 类型
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
    { text: "", path: "", icon: "", footer: true, node: <DarkMode/>, hidden: false },
    { text: "设置", path: "/setting", icon: "material-symbols:settings", footer: true },
];
