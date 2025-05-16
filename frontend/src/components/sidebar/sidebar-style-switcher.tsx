import {useState} from 'react';
import {Icon} from '@iconify/react';
import {useTranslation} from 'react-i18next';
import {useConfigSidebarStyle} from '@/provider/config';
import {SidebarStyle, SidebarStyles} from './sidebar';

interface SidebarStyleSwitcherProps {
    onChange?: (index: number) => void;
}

function SidebarStyleSwitcher(props: SidebarStyleSwitcherProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [sidebarStyle, setSidebarStyle] = useConfigSidebarStyle();

    const handleChange = (style: SidebarStyle, index: number) => {
        setShowDropdown(false);

        // 使用全局状态管理更新侧边栏样式
        setSidebarStyle(style);

        // 如果提供了 onChange 回调，也调用它
        if (props.onChange) {
            props.onChange(index);
        }
    };

    return (
        <div className="relative  w-full">
            <button
                onClick={() => setShowDropdown(true)}
                className="flex flex-row items-center justify-center w-full "
            >
                <Icon icon={sidebarStyle.icon}/>
                <span className="text-sm ml-1">{sidebarStyle.label}</span>
            </button>

            {showDropdown && (
                <div
                    className="absolute left-0 bottom-full mb-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-0 min-w-[160px] overflow-hidden z-50"
                    onClick={(e) => {
                        // 仅当点击的是背景层而不是内容时关闭
                        if (e.target === e.currentTarget) {
                            setShowDropdown(false);
                        }
                    }}
                >
                    <div className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
                        {SidebarStyles.map((style, index) => (
                            <button
                                key={style.code}
                                onClick={() => handleChange(style, index)}
                                className={`flex items-center w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${style.code === sidebarStyle.code ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''}`}
                            >
                                <Icon icon={style.icon} className="mr-3 text-xl"/>
                                <span className="text-sm">{style.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SidebarStyleSwitcher;
