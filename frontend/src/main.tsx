import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './style.css'
import {ConfigProvider} from "@/provider/config";
// 导入i18n配置
import './i18n';
import Layout from "@/components/layout";
import {routers} from "../config/routes";
import {Menu} from "@/components/sidebar/sidebar";

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <ConfigProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />} >
                        {routers.filter(router => router.path && router.page).map((route: Menu) => (
                            <Route key={route.name} path={route.path} element={route.page} />
                        ))}
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>
)
