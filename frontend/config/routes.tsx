import React from "react";

import {Menu} from "@/lib/route";
import ThemeMode from "@/components/sidebar/theme-mode";
import LanguageSwitcher from "@/components/sidebar/language-switcher";
import SidebarStyleSwitcher from "@/components/sidebar/sidebar-style-switcher";

import IndexPage from "@/pages/IndexPage";
import ClientPage from "@/pages/ClientPage";
import FilePage from "@/pages/FilePage";
import BrowserPage from "@/pages/BrowserPage";
import InfoPage from "@/pages/InfoPage";
import ExamplePage, {Example1Page, Example2Page} from "@/pages/ExamplePage";
import SettingGeneralPage from "@/pages/settings/SettingGeneralPage";
import SettingAdvancedMenu1 from "@/pages/settings/SettingAdvancedMenu1";
import SettingInfo from "@/pages/settings/SettingInfo";
import SettingAdvancedMenu2 from "@/pages/settings/SettingAdvancedMenu2";


// 侧边栏导航
export const MainRouters: Menu[] = [
    {
        name: 'menu.home',
        path: "/",
        page: <IndexPage/>,
        icon: "material-symbols:home-app-logo",
        hidden: false,
    },
    {name: 'menu.client', path: "/client", page: <ClientPage/>, icon: "uil:desktop", hidden: true,},
    {name: 'menu.file', path: "/file", page: <FilePage/>, icon: "material-symbols:files", hidden: true,},
    {
        name: 'menu.example',
        path: "/example",
        page: <ExamplePage/>,
        icon: "material-symbols:featured-play-list-outline",
        children: [
            {
                name: 'menu.example1',
                path: '1',
                page: <Example1Page/>,
            },
            {
                name: 'menu.example2',
                path: '/example/2',
                page: <Example2Page/>,
            },
        ],
        hidden: false,
    },
    {name: 'menu.browser', path: "https://github.com/toquery/example-wails", icon: "simple-icons:firefoxbrowser", hidden: false, },
    {name: 'menu.url', path: "/browser?url=https://github.com/toquery/example-wails", page: <BrowserPage/>, icon: "simple-icons:curl", hidden: true, },
    {name: "menu.dark", render: <ThemeMode/>, footer: true, hidden: false, },
    {name: "menu.language", render: <LanguageSwitcher/>, footer: true, hidden: false, },
    {name: 'menu.sidebar-style', render: <SidebarStyleSwitcher/>, footer: true, hidden: true, },
    {name: 'menu.info', path: "/info", page: <InfoPage/>, icon: "material-symbols:info-outline", footer: true, hidden: false, },
];

export const SettingRouters: Menu[] =  [
    {
        name: 'menu.setting.general',
        path: "/setting/general",
        page: <SettingGeneralPage/>,
        icon: "material-symbols:settings",
        hidden: false,
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
                hidden: false,
            },
            {
                name: 'menu.setting.advanced.menu2',
                path: "/setting/advanced/menu2",
                page: <SettingAdvancedMenu2/>,
                icon: "material-symbols:timer-2-rounded",
                hidden: false,
            },
        ],
        hidden: false,
    },
    {
        name: 'menu.setting.info',
        icon: "material-symbols:info-outline",
        path: "/setting/info",
        page: <SettingInfo />,
        hidden: false,
    },
];
