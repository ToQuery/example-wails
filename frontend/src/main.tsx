import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {GlobalProvider} from "@/provider/global-provider";
import Layout from "@/components/layout";
import SettingTopLayout from "@/components/setting-top-layout";

// 导入i18n配置
import './i18n';
import './style.css'
import {MainRouters, SettingRouters} from "../config/routes";
import NotFound from "@/pages/NotFound";
import {renderMainRoutes, renderSettingRoutes} from "@/lib/route";

const container = document.getElementById('root')

const root = createRoot(container!)


root.render(
    <React.StrictMode>
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        {renderMainRoutes(MainRouters)}
                    </Route>
                    <Route path='/setting' element={<SettingTopLayout/>}>
                        {renderSettingRoutes(SettingRouters)}
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    </React.StrictMode>
)
