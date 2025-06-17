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
import {MainRouters, SettingRouters} from "../config/routes";
import SettingLeft from "@/components/setting/setting-left";
import NotFound from "@/pages/NotFound";

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        {MainRouters.filter(router => router.path && router.page).map((route: Menu) => (
                            <Route key={route.name} path={route.path} element={route.page}/>
                        ))}
                    </Route>
                    <Route path='/setting' element={<SettingLayout/>}>
                        {SettingRouters.map((route: Menu) => {
                            console.log('setting routers', route);
                            let menuItem = <></>;
                            if (route.children && route.children.length > 0) {
                                console.log('setting routers children', route);
                                menuItem = <Route key={route.name} path={route.path}
                                                  element={<SettingLeft menus={route.children}/>}>
                                    {route.children.map((child: Menu) => (
                                        <Route key={child.name} path={child.path} element={child.page}/>
                                    ))}
                                </Route>;
                            } else {
                                menuItem = <Route key={route.name} path={route.path} element={route.page}/>
                            }
                            return menuItem;
                        })}
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    </React.StrictMode>
)
