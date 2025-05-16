import {Icon} from "@iconify/react";
import React from "react";
import {CoreService} from '../../../bindings/example-wails/internal/service';
import {cn} from "@/lib/utils";
import {DefaultBgClass} from "@/provider/config";

// 接收 props
interface WindowTitleProps {
}

function WindowTitle(props: WindowTitleProps) {
    console.log("WindowTitle", props);

    // 是否非 Mac 平台
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    // 窗口最大化/还原
    const toggleMaximize = () => {
        console.log("toggleMaximize");
        CoreService.Maximize();
    };
    return (<>
        {/* 标题栏 --wails-draggable：窗口可拖动 */}
        <header className={cn("flex flex-row justify-between h-10", DefaultBgClass)}
                style={{"--wails-draggable": "drag"} as React.CSSProperties}>
            <div className='flex justify-start items-center px-2 text-base font-medium text-black space-x-2'>
                <Icon icon='material-symbols:side-navigation' className='text-xl'/>
                <span>窗口标题</span>
            </div>
            {/* windows 定制化窗口按钮 */}
            {isNotMac ? (
                <div className="flex justify-end flex-0 text-xl ">
                    <button
                        className="w-10 flex flex-col items-center justify-center hover:bg-[#E9E9E9] dark:hover:bg-[#2D2D2D] hover:text-gray-500"
                        onClick={() => CoreService.Minimize()}
                    >
                        <Icon icon="mdi:window-minimize"/>
                    </button>
                    <button
                        className="w-10 flex flex-col items-center justify-center hover:bg-blue-500 hover:text-white dark:hover:bg-[#2D2D2D]"
                        onClick={toggleMaximize}
                    >
                        <Icon icon="mdi:window-maximize"/>
                    </button>
                    <button
                        className="w-10 flex flex-col items-center justify-center hover:bg-red-500 hover:text-white"
                        onClick={() => CoreService.Close()}
                    >
                        <Icon icon="mdi:close"/>
                    </button>
                </div>
            ) : <></>}
        </header>
    </>);
}

export default WindowTitle;
