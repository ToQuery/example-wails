import React from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useGlobalAppInfo, useGlobalThemeModel, useGlobalUpdate, useGlobalLanguage } from '@/provider/global-provider';
import { languages } from '@/i18n';
import { themeModeOptions } from '@/components/sidebar/theme-mode';
import classNames from 'classnames';
import {Button} from "@/components/ui/button";

export default function SettingGeneral() {
    const { t } = useTranslation();
    const [appInfo] = useGlobalAppInfo();
    const [isCheckingUpdate, setIsCheckingUpdate] = React.useState(false);
    const [themeModel, setThemeModel] = useGlobalThemeModel();
    const [, , , , checkForUpdates] = useGlobalUpdate();
    const [, , language, setLanguage] = useGlobalLanguage();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('settings.general')}</h1>

            {/* 应用信息 */}
            <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                            <Icon icon="fluent:app-title-24-filled" className="text-2xl text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings.app_info')}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.version')}: {appInfo?.version}</p>
                        </div>
                    </div>
                    <Button onClick={checkForUpdates} >
                        <Icon icon={isCheckingUpdate ? 'eos-icons:loading' : 'mdi:refresh'} className={isCheckingUpdate ? 'animate-spin mr-2' : 'mr-2'} />
                        {t(isCheckingUpdate ? 'settings.checking' : 'settings.check_update')}
                    </Button>
                </div>
            </div>

            {/* 主题设置 */}
            <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('settings.appearance')}</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.theme')}</h3>
                        <div className="flex space-x-2">
                            {themeModeOptions.map((item) => (
                                <button
                                    key={item.code}
                                    onClick={() => setThemeModel(item)}
                                    className={classNames(
                                        "px-4 py-2 rounded-lg transition-colors flex items-center",
                                        item.code === themeModel.code
                                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                                            : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600'
                                    )}
                                >
                                    <Icon icon={item.icon} className="mr-2" />
                                    {t(item.code === themeModel.code ? item.name : item.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 语言设置 */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.language')}</h3>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>{lang.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
