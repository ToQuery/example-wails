import React from "react";
import ThemeMode from "@/components/sidebar/theme-mode";
import LanguageSwitcher from "@/components/sidebar/language-switcher";
import Home from "@/pages/Home";
import User from "@/pages/User";
import Browser from "@/pages/Browser";
import Setting from "@/pages/Setting";
import Example from "@/pages/Example";
import SidebarStyleSwitcher from "@/components/sidebar/sidebar-style-switcher";

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
    {name: 'menu.example', path: "/example", page: <Example/>, icon: "material-symbols:featured-play-list-outline"},
    {name: 'menu.url', path: "/browser?url=https://toquery.github.io", page: <Browser/>, icon: "simple-icons:curl", hidden: true},
    {name: 'menu.browser', path: "https://toquery.github.io", icon: "simple-icons:firefoxbrowser", hidden: true},
    {name: "menu.dark", render: <ThemeMode/>, footer: true, hidden: false},
    {name: "menu.language", render: <LanguageSwitcher/>, footer: true, hidden: false},
    {name: 'menu.sidebar-style', render: <SidebarStyleSwitcher/>, footer: true, hidden: true},
    {name: 'menu.setting', path: "/setting", page: <Setting/>, icon: "material-symbols:settings", footer: true},
];
