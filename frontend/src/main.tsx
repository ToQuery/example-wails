import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './style.css'
import App from './App'
import {ConfigProvider} from "@/provider/config";
// 导入i18n配置
import './i18n';

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <ConfigProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>
)
