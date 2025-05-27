import React from 'react';
import {Icon} from '@iconify/react';
import {useConfigAppInfo, useConfigLanguage, useConfigThemeModel, useConfigUpdate} from "@/provider/config";
import {languages} from "@/i18n";
import {Browser} from "@wailsio/runtime";
import {themeModeOptions} from "@/components/sidebar/theme-mode";

import {useTranslation} from "react-i18next";
import {UI} from "@/const";
import classNames from "classnames";

// 设置页面组件
export default function Setting() {

    const {t} = useTranslation();

    const [appInfo, ] = useConfigAppInfo();

    const [isCheckingUpdate, setIsCheckingUpdate] = React.useState(false);
    const [themeModel, setThemeModel] = useConfigThemeModel();
    const [showUpdateDialog, setShowUpdateDialog, updateInfo, setUpdateInfo, checkForUpdates] = useConfigUpdate();
    const [showModal, setShowModal, language, setLanguage] = useConfigLanguage();



    return (
        <div className="px-6 py-4 mx-auto">

            {/* 标题 */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-500">
                    {t('page.setting.title')}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{t('page.setting.subtitle')}</p>
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
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('page.setting.app.title')}</h2>
                            <p className="text-gray-500 dark:text-gray-300">{t('page.setting.app.subtitle')}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{t('page.setting.current_version')}</div>
                        <div className="text-lg font-semibold text-gray-800 dark:text-white">{appInfo?.version}</div>
                    </div>
                </div>
            </div>

            {/* 版本信息和更新 */}
            <div
                className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold flex items-center text-gray-800 dark:text-white">
                        <Icon icon="mdi:update" className="mr-2 text-blue-500"/>
                        {t('page.setting.version_and_updates')}
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{t('page.setting.check_updates')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('page.setting.check_updates_desc')}</p>
                        </div>
                        <button
                            onClick={checkForUpdates}
                            disabled={isCheckingUpdate}
                            className={UI.ui.btn}
                        >
                            <div className="flex items-center">
                                {isCheckingUpdate ? (
                                    <>
                                        <Icon icon="eos-icons:loading" className="mr-1 animate-spin"/>
                                        {t('page.setting.checking_updates')}
                                    </>
                                ) : (
                                    <>
                                        <Icon icon="mdi:refresh" className="mr-1"/>
                                        {t('page.setting.check_updates')}
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
                        {t('page.setting.theme_settings')}
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{t('page.setting.dark_mode')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('page.setting.theme_switch_desc')}</p>
                        </div>
                        <div className="flex space-x-2">

                            {themeModeOptions.map((item) => {
                                return <button
                                    key={item.code}
                                    onClick={() => setThemeModel(item)}
                                    className={classNames("px-4 py-2 rounded-lg  transition-colors", item.code == themeModel.code ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600')}>
                                    <div className="flex items-center">
                                        <Icon icon={item.icon} className="mr-1"/>
                                        {item.code == themeModel.code ? t(item.name) : t(item.label)}
                                    </div>
                                </button>;
                            })}

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
                        {t('page.setting.language_settings')}
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{t('page.setting.interface_language')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('page.setting.language_switch_desc')}</p>
                        </div>
                        <div className="relative">
                            <select
                                onChange={(e) => setLanguage(e.target.value)}
                                className="appearance-none bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white px-4 py-2 pr-8 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                                ))}
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
                        {t('page.setting.about')}
                    </h2>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {t('page.setting.about_description')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => Browser.OpenURL("https://wails.io")}
                                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-800 dark:text-white">
                            <Icon icon="simple-icons:wails" className="mr-2"/>
                            {t('page.setting.wails_website')}
                        </button>
                        <button onClick={() => Browser.OpenURL("https://github.com/ToQuery/example-wails")}
                                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-800 dark:text-white">
                            <Icon icon="mdi:github" className="mr-2"/>
                            GitHub
                        </button>
                        <button
                            onClick={() => Browser.OpenURL("https://v3alpha.wails.io/getting-started/installation/")}
                            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-800 dark:text-white">
                            <Icon icon="mdi:book-open-variant" className="mr-2"/>
                            {t('page.setting.documentation')}
                        </button>
                    </div>
                </div>
            </div>

            {/* 版权信息 */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-12 mb-6">
                <div className="flex items-center justify-center mb-2">
                    <Icon icon="mdi:copyright" className="mr-1"/>
                    2023 {t('page.setting.wails_example_app')}
                </div>
                <div>{t('page.setting.built_with_wails_react')}</div>
            </div>
        </div>
    );
}
