import React from "react";
import ThemeMode from "@/components/sidebar/theme-mode";
import LanguageSwitcher from "@/components/sidebar/language-switcher";
import Home from "@/pages/Home";
import File from "@/pages/File";
import Browser from "@/pages/Browser";
import Setting from "@/pages/Setting";
import Example from "@/pages/Example";
import SidebarStyleSwitcher from "@/components/sidebar/sidebar-style-switcher";
import {Menu} from "@/components/sidebar/sidebar";


// 侧边栏导航
export const routers: Menu[] = [
    {name: 'menu.home', path: "/", page: <Home/>, icon: "material-symbols:home-app-logo"},
    {name: 'menu.file', path: "/file", page: <File/>, icon: "material-symbols:files"},
    {name: 'menu.example', path: "/example", page: <Example/>, icon: "material-symbols:featured-play-list-outline"},
    {name: 'menu.browser', path: "https://github.com/toquery/example-wails", icon: "simple-icons:firefoxbrowser"},
    {name: 'menu.url', path: "/browser?url=https://github.com/toquery/example-wails", page: <Browser/>, icon: "simple-icons:curl", hidden: true},
    {name: "menu.dark", render: <ThemeMode/>, footer: true, hidden: false},
    {name: "menu.language", render: <LanguageSwitcher/>, footer: true, hidden: false},
    {name: 'menu.sidebar-style', render: <SidebarStyleSwitcher/>, footer: true, hidden: true},
    {name: 'menu.setting', path: "/setting", page: <Setting/>, icon: "material-symbols:settings", footer: true},
];
