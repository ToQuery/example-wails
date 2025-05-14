import React from "react";
import ThemeMode from "@/components/sidebar/theme-mode";
import LanguageSwitch from "@/components/sidebar/language-switch";
import Home from "@/pages/Home";
import User from "@/pages/User";
import Browser from "@/pages/Browser";
import Setting from "@/pages/Setting";

// 定义 menu 类型
export interface Menu {
    name: string;
    path?: string;
    icon?: string;
    render?: React.ReactNode;
    page?: React.ReactNode;
    footer?: boolean;
    hidden?: boolean;
}

// 侧边栏导航
export const routers: Menu[] = [
    {name: 'menu.home', path: "/", page: <Home/>, icon: "material-symbols:home-app-logo"},
    {name: 'menu.user', path: "/user", page: <User/>, icon: "material-symbols:supervisor-account-outline-rounded"},
    {name: 'menu.url', path: "/browser?url=https://toquery.github.io", page: <Browser/>, icon: "simple-icons:curl"},
    {name: 'menu.browser', path: "https://toquery.github.io", icon: "simple-icons:firefoxbrowser"},
    {name: "menu.dark", render: <ThemeMode/>, footer: true, hidden: false},
    {name: "menu.language", render: <LanguageSwitch/>, footer: true, hidden: false},
    {name: 'menu.setting', path: "/setting", page: <Setting/>, icon: "material-symbols:settings", footer: true},
];
