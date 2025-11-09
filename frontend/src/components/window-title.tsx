import {Icon} from "@iconify/react";
import React from "react";
import {ExampleService} from '../../bindings/example-wails/internal/service';

import {useMatches} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import classNames from "classnames";
import {ui} from "@/const/ui";
import {Menu} from "@/router/type";

// 接收 props
interface WindowTitleProps {
}

function WindowTitle(props: WindowTitleProps) {
    console.log("WindowTitle", props);

    const windowName = 'main';
    const { t } = useTranslation();

    const matches = useMatches();
    // console.info("WindowTitle matches", matches);

    const current = matches[matches.length - 1]; // 当前匹配到的最后一个路由
    // console.info("WindowTitle current", current);

    // 获取标题
    const getTitle = (): string => {
        const routeInfo = current.handle as Menu; // 在构建路由时存储自定义信息
        return t(routeInfo.name, '应用');
    };

    // 是否非 Mac 平台
    // const isNotMac = !System.IsMac(); //
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    // 窗口最大化/还原
    const toggleMaximize = () => {
        console.log("toggleMaximize");
        ExampleService.WebviewWindowMaximize(windowName);
    };
    return (<>
        {/* 标题栏 --wails-draggable：窗口可拖动 */}
        <header className={classNames("flex flex-row justify-between h-11", ui.theme.defaultBgClass)}
                style={{"--wails-draggable": "drag"} as React.CSSProperties}>
            <div className='flex justify-start items-center px-2 font-medium text-black dark:text-white space-x-2'>
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
