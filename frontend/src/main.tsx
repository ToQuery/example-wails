import React from 'react'
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import App from './App'
import {ThemeProvider} from "./provider/theme";
// 导入i18n配置
import './i18n';

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
)
