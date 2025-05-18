import React from 'react';
import {Icon} from '@iconify/react';
import {useConfigUpdate} from "@/provider/config";

// 设置页面组件
export default function Setting() {
    const appVersion = "v1.0.0";

    const [isCheckingUpdate, setIsCheckingUpdate] = React.useState(false);
    const [showUpdateDialog, setShowUpdateDialog, updateInfo, setUpdateInfo , checkForUpdates] = useConfigUpdate();


    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* 标题 */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-500">
                    应用设置
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">自定义您的应用体验</p>
            </div>

            {/* 应用信息 */}
            <div
                className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div
                            className="w-16 h-16 mr-4 bg-white dark:bg-slate-900 rounded-xl shadow-md flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                            <Icon icon="fluent:app-title-24-filled" className="text-4xl text-blue-500"/>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Wails 应用</h2>
                            <p className="text-gray-500 dark:text-gray-300">基于 Wails 和 React 构建</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">当前版本</div>
                        <div className="text-lg font-semibold text-gray-800 dark:text-white">{appVersion}</div>
                    </div>
                </div>
            </div>

            {/* 版本信息和更新 */}
            <div
                className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold flex items-center text-gray-800 dark:text-white">
                        <Icon icon="mdi:update" className="mr-2 text-blue-500"/>
                        版本与更新
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">检查更新</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">检查是否有新版本可用</p>
                        </div>
                        <button
                            onClick={checkForUpdates}
                            disabled={isCheckingUpdate}
                            className={`px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
                        >
                            <div className="flex items-center">
                                {isCheckingUpdate ? (
                                    <>
                                        <Icon icon="eos-icons:loading" className="mr-1 animate-spin"/>
                                        检查中...
                                    </>
                                ) : (
                                    <>
                                        <Icon icon="mdi:refresh" className="mr-1"/>
                                        检查更新
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* 主题设置 */}
            <div
                className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold flex items-center text-gray-800 dark:text-white">
                        <Icon icon="mdi:theme-light-dark" className="mr-2 text-blue-500"/>
                        主题设置
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">深色模式</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">切换应用的显示主题</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                                <div className="flex items-center">
                                    <Icon icon="mdi:white-balance-sunny" className="mr-1"/>
                                    浅色
                                </div>
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                                <div className="flex items-center">
                                    <Icon icon="mdi:weather-night" className="mr-1"/>
                                    深色
                                </div>
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                                <div className="flex items-center">
                                    <Icon icon="mdi:theme-light-dark" className="mr-1"/>
                                    自动
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 语言设置 */}
            <div
                className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold flex items-center text-gray-800 dark:text-white">
                        <Icon icon="mdi:translate" className="mr-2 text-blue-500"/>
                        语言设置
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">界面语言</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">选择应用的显示语言</p>
                        </div>
                        <div className="relative">
                            <select
                                className="appearance-none bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white px-4 py-2 pr-8 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="zh-CN">简体中文</option>
                                <option value="en-US">English</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                                <Icon icon="mdi:chevron-down"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 关于 */}
            <div
                className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold flex items-center text-gray-800 dark:text-white">
                        <Icon icon="mdi:information" className="mr-2 text-blue-500"/>
                        关于
                    </h2>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        这是一个使用 Wails 和 React 构建的桌面应用程序示例。Wails 提供了一种使用 Go 和 Web 技术构建桌面应用的简单方法。
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="https://wails.io" target="_blank" rel="noopener noreferrer"
                           className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-800 dark:text-white">
                            <Icon icon="simple-icons:wails" className="mr-2"/>
                            Wails 官网
                        </a>
                        <a href="https://github.com/wailsapp/wails" target="_blank" rel="noopener noreferrer"
                           className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-800 dark:text-white">
                            <Icon icon="mdi:github" className="mr-2"/>
                            GitHub
                        </a>
                        <a href="https://wails.io/docs/" target="_blank" rel="noopener noreferrer"
                           className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-800 dark:text-white">
                            <Icon icon="mdi:book-open-variant" className="mr-2"/>
                            文档
                        </a>
                    </div>
                </div>
            </div>

            {/* 版权信息 */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-12 mb-6">
                <div className="flex items-center justify-center mb-2">
                    <Icon icon="mdi:copyright" className="mr-1"/>
                    2023 Wails 示例应用
                </div>
                <div>使用 Wails 和 React 构建</div>
            </div>
        </div>
    );
}
