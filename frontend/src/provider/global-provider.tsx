import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {SidebarStyle} from "@/components/sidebar/sidebar";
import ThemeMode, {themeModeAuto, themeModeDark, themeModeLight} from "@/components/sidebar/theme-mode";
import DialogUpdate from "@/components/biz/dialog-update";
import {ExampleService} from "../../bindings/example-wails/internal/service";
import {Events} from "@wailsio/runtime";
import {Event} from "@/const";
import {
    BaseExchange,
    LaunchResModel,
    WailsAppInfoModel,
    WailsUpdateModel
} from "../../bindings/example-wails/internal/model";
import Dialog from "@/components/biz/dialog";
import {useTranslation} from "react-i18next";
import DialogNetworkError from "@/components/biz/dialog-network-error";
import DialogLanguage from "@/components/biz/dialog-language";


// 配置上下文
interface GlobalContextType {
    appInfo: WailsAppInfoModel;
    setAppInfo: (appInfo: WailsAppInfoModel) => void;
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
    language: string;
    handleLanguage: (language: string) => void;
    setDialogLanguage: (loading: boolean) => void;

    //
    dialog: boolean;
    setDialog: (loading: boolean) => void;
    setDialogContent: (dialogContent: React.ReactNode) => void;

    // 更新相关配置
    updateInfo: WailsUpdateModel;
    handleDialogUpdate: (updateInfo: WailsUpdateModel) => void;
    checkForUpdates: () => void;
}

const defaultConfig: GlobalContextType = {
    appInfo: {
        name: 'example-wails',
        cnName: 'example-wails',
        description: 'example-wails',
        version: 'v0.0.0',
        versionCode: 0,
        buildId: '0x000000',
        buildTime: 'unknown',
    },
    setAppInfo: function (appInfo: WailsAppInfoModel): void {
        console.log('setAppInfo', appInfo);
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
    handleLanguage: (language: string) => {
        console.log('setLanguage', language);
    },
    setDialogLanguage: (loading: boolean) => {
        console.log('setDialogLanguage', loading);
    },

    dialog: false,
    setDialog: (loading: boolean) => {
        console.log('setLoading', loading);
    },
    setDialogContent: (dialogContent: React.ReactNode) => {
        console.log('setDialogContent', dialogContent);
    },

    // 更新相关默认值
    updateInfo: {
        version: '',
        versionCode: 0,
        forceUpdate: false,
        changelog: '',
        downloadUrl: '',
    },
    handleDialogUpdate: (updateInfo: WailsUpdateModel) => {
        console.log('setUpdateInfo', updateInfo);
    },
    checkForUpdates: () => {
        console.log('checkForUpdates');
    },
}

const GlobalContext = createContext<GlobalContextType>(defaultConfig);

// 配置提供者组件
export function GlobalProvider({children}: { children: ReactNode }) {
    const {i18n} = useTranslation();

    const [appInfo, setAppInfo] = useState<WailsAppInfoModel>(defaultConfig.appInfo);
    const [sidebarStyle, setSidebarStyle] = useState<SidebarStyle>(defaultConfig.sidebarStyle);
    const [windowTitle, setWindowTitle] = useState<string>(defaultConfig.windowTitle);
    const [themeModel, setThemeModelState] = useState<ThemeMode>(defaultConfig.themeModel);
    const [dialog, setDialog] = useState<boolean>(defaultConfig.dialog);
    const [diaLogContent, setDialogContent] = useState<React.ReactNode>();

    // 更新相关状态
    const [updateInfo, setUpdateInfoState] = useState<WailsUpdateModel>(defaultConfig.updateInfo);

    // 更新相关状态
    const [language, setLanguageState] = useState<string>(defaultConfig.language);

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
    const handleLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setLanguageState(lang);
    };

    const handleDialogUpdate = (updateInfo: WailsUpdateModel) => {
        setDialogContent(<DialogUpdate updateInfo={updateInfo} onClose={() => setDialog(false)}/>)
        setUpdateInfoState(updateInfo);
    };

    const setDialogNetworkErr = () => {
        setDialogContent(<DialogNetworkError onRetry={() => {}}/>)
    };

    const setDialogLanguage = (loading: boolean) => {
        if (loading) {
            setDialogContent(
                <DialogLanguage language={language} onChangeLanguage={(lang) => {
                    handleLanguage(lang);
                    setDialog(false);
                }} onClose={() => setDialog(false)}/>
            );
        } else {
            setDialogContent(undefined);
        }

        setDialog(true);
    };

    const handleParseAppLaunch = (baseExchange: BaseExchange<LaunchResModel>) => {
        console.log('handleParseAppLaunch', baseExchange);
        if (baseExchange.success || !baseExchange.data) {
            setDialogNetworkErr();
            setDialog(true);
            return;
        }

        const data = baseExchange.data;
        // 配置信息

        // 更新细腻洗
        if (data.update) {
            handleDialogUpdate(data.update);
            setDialog(true);
            return;
        }
        setDialog(false);
        return;
    };

    const loadingLaunch = () => {
        ExampleService.AppLaunch().then((baseExchange) => {
            handleParseAppLaunch(baseExchange);
        });
    };

    const loadingAppInfo = () => {
        ExampleService.GetAppInfo().then((baseExchange) => {
            if (baseExchange.success && baseExchange.data) {
                const appInfo = baseExchange.data;
                console.log('ConfigProvider GetAppInfo', appInfo);
                setAppInfo(appInfo);
            }

        });
    };

    // 检查更新函数
    const checkForUpdates = () => {
        ExampleService.AppCheckUpdate().then((baseExchange) => {
            const updateInfo= baseExchange.data;
            if (updateInfo) {
                handleDialogUpdate(updateInfo);
                setDialog(true);
            }
        });
    };

    const handleThemeChange = (e: MediaQueryListEvent) => {
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

    useEffect(() => {
        console.log('ConfigProvider useEffect');
        // 获取应用信息
        loadingAppInfo();

        // 主题
        // document.documentElement.classList.add('dark');

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // 监听系统主题变化
        darkModeMediaQuery.addEventListener('change', handleThemeChange);
        return () => darkModeMediaQuery.removeEventListener('change', handleThemeChange);
    }, []);

    useEffect(() => {
        console.log('ConfigProvider i18n.language', i18n.language);
        handleLanguage(i18n.language);
    }, [i18n.language]);

    useEffect(() => {
        if (!dialog) {
            setDialogContent(undefined);
        }
    }, [dialog]);

    useEffect(() => {
        listerEvent();
        return () => {
            Events.Off(Event.events.AppUpdate);
        }
    }, []);

    const listerEvent = () => {
        Events.On(Event.events.AppUpdate, function (event) {
            console.log(Event.events.AppUpdate, event);
            const eventDatas: WailsUpdateModel[] = event.data;
            const eventData: WailsUpdateModel = eventDatas[0];
            console.log(Event.events.AppUpdate + " data ", eventData);
            handleDialogUpdate(eventData);
            setDialog(true);
        });
    }

    const value = {
        appInfo,
        setAppInfo,
        sidebarStyle,
        setSidebarStyle,
        windowTitle,
        setWindowTitle,
        themeModel,
        setThemeModel,
        dialog,
        setDialog,
        setDialogContent,

        // 语言相关配置
        language,
        handleLanguage,
        setDialogLanguage,

        // 更新相关配置
        updateInfo,
        checkForUpdates,
        handleDialogUpdate,
    };

    return (
        <GlobalContext.Provider value={value}>

            <Dialog show={dialog} contentNode={diaLogContent}/>
            {children}
        </GlobalContext.Provider>
    );
}

// 使用配置的Hook
export function useGlobal() {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}

export function useGlobalAppInfo(): [WailsAppInfoModel, (appInfo: WailsAppInfoModel) => void] {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return [context.appInfo, context.setAppInfo];
}

export function useGlobalSidebarStyle(): [SidebarStyle, (style: SidebarStyle) => void] {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useConfigSidebarStyle must be used within a ConfigProvider');
    }
    return [context.sidebarStyle, context.setSidebarStyle];
}

export function useGlobalWindowTitle(): [string, (windowTitle: string) => void] {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useConfigWindowTitle must be used within a ConfigProvider');
    }
    return [context.windowTitle, context.setWindowTitle];
}

export function useGlobalLanguage(): [boolean, (showLanguageDialog: boolean) => void, string, (language: string) => void] {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useConfigLanguage must be used within a ConfigProvider');
    }
    return [context.dialog, context.setDialogLanguage, context.language, context.handleLanguage];
}

export function useGlobalThemeModel(): [ThemeMode, (style: ThemeMode) => void] {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useConfigThemeModel must be used within a ConfigProvider');
    }
    return [context.themeModel, context.setThemeModel];
}

export function useGlobalDialog(): [boolean, (dialog: boolean) => void, (dialogContent: React.ReactNode) => void] {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useConfigLoading must be used within a ConfigProvider');
    }
    return [context.dialog, context.setDialog, context.setDialogContent];
}

// 使用更新功能的Hook
export function useGlobalUpdate(): [boolean, (showUpdateDialog: boolean) => void, WailsUpdateModel, (style: WailsUpdateModel) => void, () => void] {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useUpdate must be used within a ConfigProvider');
    }
    return [context.dialog, context.setDialog, context.updateInfo, context.handleDialogUpdate, context.checkForUpdates];
}
