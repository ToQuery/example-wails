import React from "react";

import {Menu} from "@/components/sidebar/sidebar";
import ThemeMode from "@/components/sidebar/theme-mode";
import LanguageSwitcher from "@/components/sidebar/language-switcher";
import SidebarStyleSwitcher from "@/components/sidebar/sidebar-style-switcher";

import HomePage from "@/pages/HomePage";
import ClientPage from "@/pages/ClientPage";
import FilePage from "@/pages/FilePage";
import BrowserPage from "@/pages/BrowserPage";
import InfoPage from "@/pages/InfoPage";
import ExamplePage from "@/pages/ExamplePage";
import SettingGeneralPage from "@/pages/settings/SettingGeneralPage";
import SettingAdvancedMenu1 from "@/pages/settings/SettingAdvancedMenu1";
import SettingInfo from "@/pages/settings/SettingInfo";
import SettingAdvancedMenu2 from "@/pages/settings/SettingAdvancedMenu2";


// 侧边栏导航
export const MainRouters: Menu[] = [
    {name: 'menu.home', path: "/", page: <HomePage/>, icon: "material-symbols:home-app-logo"},
    {name: 'menu.client', path: "/client", page: <ClientPage/>, icon: "uil:desktop"},
    {name: 'menu.file', path: "/file", page: <FilePage/>, icon: "material-symbols:files"},
    {name: 'menu.example', path: "/example", page: <ExamplePage/>, icon: "material-symbols:featured-play-list-outline"},
    {name: 'menu.browser', path: "https://github.com/toquery/example-wails", icon: "simple-icons:firefoxbrowser"},
    {name: 'menu.url', path: "/browser?url=https://github.com/toquery/example-wails", page: <BrowserPage/>, icon: "simple-icons:curl", hidden: true},
    {name: "menu.dark", render: <ThemeMode/>, footer: true, hidden: false},
    {name: "menu.language", render: <LanguageSwitcher/>, footer: true, hidden: false},
    {name: 'menu.sidebar-style', render: <SidebarStyleSwitcher/>, footer: true, hidden: true},
    {name: 'menu.info', path: "/info", page: <InfoPage/>, icon: "material-symbols:info-outline", footer: true},
];

export const SettingRouters: Menu[] =  [
    {
        name: 'menu.setting.general',
        path: "/setting/general",
        page: <SettingGeneralPage/>,
        icon: "material-symbols:settings",
    },
    {
        name: 'menu.setting.advanced',
        path: "/setting/advanced",
        icon: "material-symbols:read-more-rounded",
        children: [
            {
                name: 'menu.setting.advanced.menu1',
                path: "/setting/advanced/menu1",
                page: <SettingAdvancedMenu1/>,
                icon: "material-symbols:timer-1-rounded",
            },
            {
                name: 'menu.setting.advanced.menu2',
                path: "/setting/advanced/menu2",
                page: <SettingAdvancedMenu2/>,
                icon: "material-symbols:timer-2-rounded",
            },
        ],
    },
    {
        name: 'menu.setting.info',
        icon: "material-symbols:info-outline",
        path: "/setting/info",
        page: <SettingInfo />,
    },
];
