import {Quit, WindowMaximise, WindowMinimise, WindowUnmaximise} from "../../wailsjs/runtime";
import {Icon} from "@iconify/react";
import {useState} from "react";

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
        {/* windows 定制化窗口按钮 */}
        {isNotMac && (
            <div className="flex h-10 justify-end flex-0">
                <button
                    className="w-10 h-10 text-xl flex flex-col items-center justify-center hover:bg-[#E9E9E9] dark:hover:bg-[#2D2D2D] hover:text-gray-500"
                    onClick={WindowMinimise}
                >
                    <Icon icon="mdi:window-minimize" />
                </button>
                <button
                    className="w-10 h-10 text-xl flex flex-col items-center justify-center hover:bg-[#E9E9E9] dark:hover:bg-[#2D2D2D]"
                    onClick={toggleMaximize}
                >
                    <Icon icon="mdi:window-maximize" />
                </button>
                <button
                    className="w-10 h-10 text-xl flex flex-col items-center justify-center hover:bg-red-500 hover:text-white"
                    onClick={Quit}
                >
                    <Icon icon="mdi:close" />
                </button>
            </div>
        )}
    </>);
}

export default WindowTitle;
