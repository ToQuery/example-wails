import React from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'

import {GlobalProvider} from "@/provider/global-provider";

// 导入i18n配置
import './i18n';
import './style.css'
import {router} from "@/lib/route";

const container = document.getElementById('root')

const root = createRoot(container!)


root.render(
    <React.StrictMode>
        <GlobalProvider>
            <RouterProvider router={router}/>
        </GlobalProvider>
    </React.StrictMode>
)
