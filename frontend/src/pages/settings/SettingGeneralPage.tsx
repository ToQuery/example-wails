import React from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useGlobalClientBuild, useGlobalThemeModel, useGlobalUpdate, useGlobalLanguage } from '@/provider/global-provider';
import { languages } from '@/i18n';
import { themeModeOptions } from '@/components/sidebar/theme-mode';
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function SettingGeneralPage() {
    const { t } = useTranslation();
    const [clientBuild] = useGlobalClientBuild();
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
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.version')}: {clientBuild?.version}</p>
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
                                <Button key={item.code} onClick={() => setThemeModel(item)} variant={item.code === themeModel.code ? 'default' : 'outline'} >
                                    <Icon icon={item.icon} className="mr-2" />
                                    {t(item.name)}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* 语言设置 */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.language')}</h3>
                        <Select value={language} onValueChange={(val) => setLanguage(val)} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem key={lang.code} value={lang.code}>{lang.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}
