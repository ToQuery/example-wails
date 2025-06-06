import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {SidebarStyle} from "@/components/sidebar/sidebar";
import ThemeMode, {themeModeAuto, themeModeDark, themeModeLight} from "@/components/sidebar/theme-mode";
import DialogUpdate, {UpdateInfo} from "@/components/biz/dialog-update";
import {ExampleService} from "../../bindings/example-wails/internal/service";
import {Events} from "@wailsio/runtime";
import {Event} from "@/const";
import {UpdateInfoModel} from "../../bindings/example-wails/internal/model";
import Loading from "@/components/biz/loading";
import {useTranslation} from "react-i18next";


// 侧边栏导航激活样式
export const DefaultBgClass = 'text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-slate-900';
export const DefaultActiveClass = 'text-blue-600 dark:text-blue-500';

export const DefaultBg = 'bg-blue-600 dark:text-blue-500';

export type AppInfo = {
    name: string;
    version: string;
    versionCode: number;
    buildId: string;
    buildTime: string;
}

// 配置上下文
interface ConfigContextType {
    appInfo: AppInfo;
    setAppInfo: (appInfo: AppInfo) => void;
    // 侧边栏
    sidebarStyle: SidebarStyle;
    setSidebarStyle: (style: SidebarStyle) => void;
    // 标题
    windowTitle: string;
    setWindowTitle: (windowTitle: string) => void;
    // 主题
    themeModel: ThemeMode;
    setThemeModel: (themeModel: ThemeMode) => void;
    // 语言相关配置
    showLanguageDialog: boolean;
    setShowLanguageDialog: (showLanguageDialog: boolean) => void;
    language: string;
    setLanguage: (language: string) => void;

    //
    loading: boolean;
    setLoading: (loading: boolean) => void;

    // 更新相关配置
    showUpdateDialog: boolean,
    setShowUpdateDialog: (showUpdateDialog: boolean) => void;
    updateInfo: UpdateInfo;
    setUpdateInfo: (updateInfo: UpdateInfo) => void;
    checkForUpdates: () => void;
}

const defaultConfig: ConfigContextType = {
    appInfo: {
        name: 'example-wails',
        version: 'v0.0.0',
        versionCode: 0,
        buildId: '0x000001',
        buildTime: 'unknown',
    },
    setAppInfo: function (appInfo: AppInfo): void {
        throw new Error('Function not implemented.');
    },
    setSidebarStyle(style: SidebarStyle): void {
        console.log('setSidebarStyle', style);
    },
    sidebarStyle: {
        code: 'grid',
        label: '网格模式',
        icon: 'material-symbols:view-module-outline'
    },
    windowTitle: 'Wails And React',
    setWindowTitle(windowTitle: string): void {
        console.log('setWindowTitle', windowTitle);
    },
    themeModel: themeModeAuto,
    setThemeModel(themeModel: ThemeMode): void {
        console.log('setThemeModel', themeModel);
    },

    language: 'zh-CN',
    setLanguage: (language: string) => {
        console.log('setLanguage', language);
    },
    showLanguageDialog: false,
    setShowLanguageDialog: (showLanguageDialog: boolean) => {
        console.log('showLanguageDialog', showLanguageDialog);
    },

    loading: false,
    setLoading: (loading: boolean) => {
        console.log('setLoading', loading);
    },
    // 更新相关默认值
    showUpdateDialog: false,
    setShowUpdateDialog: (showUpdateDialog: boolean) => {
        console.log('showUpdateDialog', showUpdateDialog);
    },
    updateInfo: {
        version: '',
        versionCode: 0,
        forceUpdate: false,
        changelog: '',
        downloadUrl: '',
    },
    setUpdateInfo: (updateInfo: UpdateInfo) => {
        console.log('setUpdateInfo', updateInfo);
    },
    checkForUpdates: () => {
        console.log('checkForUpdates');
    },
}

const ConfigContext = createContext<ConfigContextType>(defaultConfig);

// 配置提供者组件
export function ConfigProvider({children}: { children: ReactNode }) {
    const {i18n} = useTranslation();

    const [appInfo, setAppInfo] = useState<AppInfo>(defaultConfig.appInfo);
    const [sidebarStyle, setSidebarStyle] = useState<SidebarStyle>(defaultConfig.sidebarStyle);
    const [windowTitle, setWindowTitle] = useState<string>(defaultConfig.windowTitle);
    const [themeModel, setThemeModelState] = useState<ThemeMode>(defaultConfig.themeModel);
    const [loading, setLoading] = useState<boolean>(defaultConfig.loading);

    // 更新相关状态
    const [language, setLanguageState] = useState<string>(defaultConfig.language);
    const [showLanguageDialog, setShowLanguageDialog] = useState<boolean>(defaultConfig.showLanguageDialog);

    // 包装 setLanguage 函数，使其同时调用 i18n.changeLanguage
    const setThemeModel = (themeModel: ThemeMode) => {
        setThemeModelState(themeModel);
        switch (themeModel) {
            case themeModeAuto: {
                document.documentElement.classList.remove('dark');
                break;
            }
            case themeModeLight: {
                document.documentElement.classList.remove('dark');
                break;
            }
            case themeModeDark: {
                const isDark = document.documentElement.classList.contains('dark');
                if (!isDark) {
                    document.documentElement.classList.add('dark');
                }
                break;
            }
            default: {
                document.documentElement.classList.remove('dark');
                break;
            }
        }
    };

    // 包装 setLanguage 函数，使其同时调用 i18n.changeLanguage
    const setLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setLanguageState(lang);
    };

    // 更新相关状态
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo>(defaultConfig.updateInfo);
    const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(defaultConfig.showUpdateDialog);

    const getAppInfo = () => {
        ExampleService.GetAppInfo().then(async (appInfo) => {
            console.log('ConfigProvider GetAppInfo', appInfo);
            setAppInfo({
                name: "example-wails",
                version: appInfo.Version,
                versionCode: appInfo.VersionCode,
                buildId: appInfo.BuildId,
                buildTime: appInfo.BuildTime,
            });
        });
    };

    // 检查更新函数
    const checkForUpdates = () => {
        ExampleService.AppCheckUpdate().then((updateInfo) => {
            if (updateInfo) {
                setUpdateInfo({
                    version: updateInfo.Version,
                    versionCode: updateInfo.VersionCode,
                    forceUpdate: updateInfo.ForceUpdate,
                    changelog: updateInfo.Changelog,
                    downloadUrl: updateInfo.DownloadUrl,
                });
                setShowUpdateDialog(true);
            }
        });
    };

    useEffect(() => {
        getAppInfo();
    }, []);

    useEffect(() => {
        console.log('ConfigProvider i18n.language', i18n.language);
        setLanguage(i18n.language);
    }, [i18n.language]);

    // 初始化时检查当前主题
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // 监听系统主题变化
        const handleChange = (e: MediaQueryListEvent) => {
            const isDark = e.matches
            console.log('ConfigProvider handleChange isDark =', isDark);

            if (isDark) {
                setThemeModel(themeModeDark);
                document.documentElement.classList.add('dark');
            } else {
                setThemeModel(themeModeLight);
                document.documentElement.classList.remove('dark');
            }
        };
        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);

    Events.On(Event.events.AppUpdate, function (event) {
        console.log(Event.events.AppUpdate, event);
        const eventDatas: UpdateInfoModel[] = event.data;
        const eventData: UpdateInfoModel = eventDatas[0];
        console.log(Event.events.AppUpdate + " data ", eventData);
        setUpdateInfo({
            version: eventData.Version,
            versionCode: eventData.VersionCode,
            forceUpdate: eventData.ForceUpdate,
            changelog: eventData.Changelog,
            downloadUrl: eventData.DownloadUrl,
        });
        setShowUpdateDialog(true);
    });


    const value = {
        appInfo,
        setAppInfo,
        sidebarStyle,
        setSidebarStyle,
        windowTitle,
        setWindowTitle,
        themeModel,
        setThemeModel,
        loading,
        setLoading,

        // 语言相关配置
        showLanguageDialog,
        setShowLanguageDialog,
        language,
        setLanguage,
        // 更新相关配置
        showUpdateDialog,
        setShowUpdateDialog,
        updateInfo,
        checkForUpdates,
        setUpdateInfo,
    };

    return (
        <ConfigContext.Provider value={value}>

            <Loading show={loading}/>
            <DialogUpdate/>
            {children}
        </ConfigContext.Provider>
    );
}

// 使用配置的Hook
export function useConfig() {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}

export function useConfigAppInfo(): [AppInfo, (appInfo: AppInfo) => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return [context.appInfo, context.setAppInfo];
}

export function useConfigSidebarStyle(): [SidebarStyle, (style: SidebarStyle) => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfigSidebarStyle must be used within a ConfigProvider');
    }
    return [context.sidebarStyle, context.setSidebarStyle];
}

export function useConfigWindowTitle(): [string, (windowTitle: string) => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfigWindowTitle must be used within a ConfigProvider');
    }
    return [context.windowTitle, context.setWindowTitle];
}

export function useConfigLanguage(): [boolean, (showLanguageDialog: boolean) => void, string, (language: string) => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfigLanguage must be used within a ConfigProvider');
    }
    return [context.showLanguageDialog, context.setShowLanguageDialog, context.language, context.setLanguage];
}

export function useConfigThemeModel(): [ThemeMode, (style: ThemeMode) => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfigThemeModel must be used within a ConfigProvider');
    }
    return [context.themeModel, context.setThemeModel];
}

export function useConfigLoading(): [boolean, (loading: boolean) => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfigLoading must be used within a ConfigProvider');
    }
    return [context.loading, context.setLoading];
}

// 使用更新功能的Hook
export function useConfigUpdate(): [boolean, (showUpdateDialog: boolean) => void, UpdateInfo, (style: UpdateInfo) => void, () => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useUpdate must be used within a ConfigProvider');
    }
    return [context.showUpdateDialog, context.setShowUpdateDialog, context.updateInfo, context.setUpdateInfo, context.checkForUpdates];
}
