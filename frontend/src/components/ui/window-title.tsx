import {Icon} from "@iconify/react";
import React from "react";
import {ExampleService} from '../../../bindings/example-wails/internal/service';
import {cn} from "@/lib/utils";
import {DefaultBgClass} from "@/provider/config";
import {useLocation} from "react-router-dom";
import {routers} from "@/../config/routes";
import {useTranslation} from 'react-i18next';
import {Menu} from "@/components/sidebar/sidebar";

// 接收 props
interface WindowTitleProps {
}

function WindowTitle(props: WindowTitleProps) {
    console.log("WindowTitle", props);

    const windowName = 'main';
    const { t } = useTranslation();
    const location = useLocation();

    // 根据当前路径获取路由信息
    const getCurrentRoute = (): Menu | undefined => {
        // 移除查询参数，只保留路径部分
        const pathname = location.pathname;
        return routers.find(route => route.path === pathname || (pathname === '/' && route.path === '/'));
    };

    // 获取当前路由
    const currentRoute = getCurrentRoute();

    // 获取标题
    const getTitle = (): string => {
        if (currentRoute && currentRoute.name) {
            return t(currentRoute.name);
        }
        return t('app.title', '应用');
    };

    // 是否非 Mac 平台
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    // 窗口最大化/还原
    const toggleMaximize = () => {
        console.log("toggleMaximize");
        ExampleService.WebviewWindowMaximize(windowName);
    };
    return (<>
        {/* 标题栏 --wails-draggable：窗口可拖动 */}
        <header className={cn("flex flex-row justify-between h-12", DefaultBgClass)}
                style={{"--wails-draggable": "drag"} as React.CSSProperties}>
            <div className='flex justify-start items-center px-2 text-xl font-medium text-black dark:text-white space-x-2'>
                <Icon icon='material-symbols:side-navigation' className='text-xl hidden'/>
                <span>{getTitle()}</span>
            </div>
            {/* windows 定制化窗口按钮 */}
            {isNotMac ? (
                <div className="flex justify-end flex-0 text-xl ">
                    <button
                        className="w-12 flex flex-col items-center justify-center hover:bg-[#E9E9E9] dark:hover:bg-[#2D2D2D] hover:text-gray-500"
                        onClick={() => ExampleService.WebviewWindowMinimize(windowName)}
                    >
                        <Icon icon="mdi:window-minimize"/>
                    </button>
                    <button
                        className="w-12 flex flex-col items-center justify-center hover:bg-blue-500 hover:text-white dark:hover:bg-[#2D2D2D]"
                        onClick={toggleMaximize}
                    >
                        <Icon icon="mdi:window-maximize"/>
                    </button>
                    <button
                        className="w-12 flex flex-col items-center justify-center hover:bg-red-500 hover:text-white"
                        onClick={() => ExampleService.WebviewWindowClose(windowName)}
                    >
                        <Icon icon="mdi:close"/>
                    </button>
                </div>
            ) : <></>}
        </header>
    </>);
}

export default WindowTitle;
