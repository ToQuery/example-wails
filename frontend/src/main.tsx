import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {GlobalProvider} from "@/provider/global-provider";
import Layout from "@/components/layout";
import {Menu} from "@/components/sidebar/sidebar";
import SettingLayout from "@/components/setting-layout";

// 导入i18n配置
import './i18n';
import './style.css'
import {routers} from "../config/routes";

const container = document.getElementById('root')

const root = createRoot(container!)

const layoutMap = new Map<string, Menu[]>();

routers.forEach((menu) => {
    const layout = menu.layout ?? 'layout';

    if (!layoutMap.has(layout)) {
        layoutMap.set(layout, []);
    }
    layoutMap.get(layout)!.push(menu);
});

const getLayout = (layoutName: string) => {
    let layout = <Layout/>;
    switch (layoutName) {
        case 'layout': {
            layout = <Layout/>;
            break;
        }
        case 'setting': {
            layout = <SettingLayout/>;
            break;
        }
        default:
            layout = <Layout/>;
    }
    return layout;
}

root.render(
    <React.StrictMode>
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    {Array.from(layoutMap.entries()).map(([layoutName, menu]) => {
                        return (<Route element={getLayout(layoutName)}>
                            {menu.filter(router => router.path && router.page).map((route: Menu) => (
                                <Route key={route.name} path={route.path} element={route.page}/>
                            ))}
                        </Route>);
                    })}
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    </React.StrictMode>
)
