
import React from "react";
import ThemeMode from "@/components/sidebar/theme-mode";
import LanguageSwitch from "@/components/sidebar/language-switch";

// 定义 menu 类型
export interface Menu {
    name: string;
    path?: string;
    icon?: string;
    render?: React.ReactNode;
    footer?: boolean;
    hidden?: boolean;
}

// 侧边栏导航
export const Menus: Omit<Menu, 'text'>[] = [
    { name: 'menu.home', path: "/", icon: "material-symbols:home-app-logo" },
    { name: 'menu.user', path: "/user", icon: "material-symbols:supervisor-account-outline-rounded" },
    { name: "menu.dark", render: <ThemeMode/>, footer: true, hidden: false },
    { name: "menu.language", render: <LanguageSwitch/>, footer: true, hidden: false },
    { name: 'menu.setting', path: "/setting", icon: "material-symbols:settings", footer: true },
];
