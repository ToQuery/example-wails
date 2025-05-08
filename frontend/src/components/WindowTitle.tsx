import {Quit, WindowMaximise, WindowMinimise, WindowUnmaximise} from "../../wailsjs/runtime";
import {Icon} from "@iconify/react";
import React, {useState} from "react";

// 接收 props
interface WindowTitleProps {
}

function WindowTitle(props: WindowTitleProps) {
    console.log("WindowTitle", props);
    const [isMaximised, setIsMaximised] = useState(false);

    // 是否非 Mac 平台
    const isNotMac = navigator.userAgent.toUpperCase().indexOf('MAC') < 0;

    // 窗口最大化/还原
    const toggleMaximize = () => {
        if (isMaximised) {
            WindowUnmaximise();
            setIsMaximised(false);
        } else {
            WindowMaximise();
            setIsMaximised(true);
        }
    };
    return (<>
        {/* 标题栏 --wails-draggable：窗口可拖动 */}
        <div className="" style={{"--wails-draggable": "drag"} as React.CSSProperties}>
            {/* windows 定制化窗口按钮 */}
            {isNotMac ? (
                <div className="flex h-10 justify-end flex-0 h-full text-xl ">
                    <button
                        className="w-10 flex flex-col items-center justify-center hover:bg-[#E9E9E9] dark:hover:bg-[#2D2D2D] hover:text-gray-500"
                        onClick={WindowMinimise}
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
                        onClick={Quit}
                    >
                        <Icon icon="mdi:close"/>
                    </button>
                </div>
            ) : <></>}
        </div>
    </>);
}

export default WindowTitle;
