import {Icon} from "@iconify/react";
import React, {useState} from "react";
import { CoreService } from '../../../bindings/example-wails/internal/service';

// 接收 props
interface WindowTitleProps {
}

function WindowTitle(props: WindowTitleProps) {
    console.log("WindowTitle", props);
    const [isMaximised, setIsMaximised] = useState(false);

    // 是否非 Mac 平台
    const isNotMac = true; //navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    // 窗口最大化/还原
    const toggleMaximize = () => {
        console.log("toggleMaximize", isMaximised);
        CoreService.Maximize();
    };
    return (<>
        {/* 标题栏 --wails-draggable：窗口可拖动 */}
        <div className="" style={{"--wails-draggable": "drag"} as React.CSSProperties}>
            {/* windows 定制化窗口按钮 */}
            {isNotMac ? (
                <div className="flex h-10 justify-end flex-0 text-xl ">
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
        </div>
    </>);
}

export default WindowTitle;
