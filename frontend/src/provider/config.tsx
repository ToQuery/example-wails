import React, {createContext, ReactNode, useContext, useState} from 'react';
import {SidebarStyle} from "@/components/sidebar/sidebar";
import ThemeMode, {themeModeAuto} from "@/components/sidebar/theme-mode";
import DialogUpdate, {UpdateInfo} from "@/components/biz/dialog-update";
import {ExampleService} from "../../bindings/example-wails/internal/service";
import {Events} from "@wailsio/runtime";
import {Event} from "@/const";
import {UpdateInfoModel} from "../../bindings/example-wails/internal/model";


// 侧边栏导航激活样式
export const DefaultBgClass = 'text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-slate-900';
export const DefaultActiveClass = 'text-blue-600 dark:text-blue-500';

export const DefaultBg = 'bg-blue-600 dark:text-blue-500';

// 配置上下文
interface ConfigContextType {
    // 原有配置
    sidebarStyle: SidebarStyle;
    setSidebarStyle: (style: SidebarStyle) => void;
    windowTitle: string;
    setWindowTitle: (windowTitle: string) => void;
    themeModel: ThemeMode;
    setThemeModel: (themeModel: ThemeMode) => void;

    // 更新相关配置
    showUpdateDialog: boolean,
    setShowUpdateDialog: (showUpdateDialog: boolean) => void;
    updateInfo: UpdateInfo;
    setUpdateInfo: (updateInfo: UpdateInfo) => void;
    checkForUpdates: () => void;
}

const defaultConfig: ConfigContextType = {
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
    const [sidebarStyle, setSidebarStyle] = useState<SidebarStyle>(defaultConfig.sidebarStyle);
    const [windowTitle, setWindowTitle] = useState<string>(defaultConfig.windowTitle);
    const [themeModel, setThemeModel] = useState<ThemeMode>(defaultConfig.themeModel);

    // 更新相关状态
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo>(defaultConfig.updateInfo);
    const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);

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


    return (
        <ConfigContext.Provider value={{
            sidebarStyle,
            setSidebarStyle,
            windowTitle,
            setWindowTitle,
            themeModel,
            setThemeModel,
            // 更新相关配置
            showUpdateDialog,
            setShowUpdateDialog,
            updateInfo,
            checkForUpdates,
            setUpdateInfo,
        }}>
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

export function useConfigThemeModel(): [ThemeMode, (style: ThemeMode) => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfigThemeModel must be used within a ConfigProvider');
    }
    return [context.themeModel, context.setThemeModel];
}

// 使用更新功能的Hook
export function useConfigUpdate(): [boolean, (showUpdateDialog: boolean) => void, UpdateInfo, (style: UpdateInfo) => void, () => void] {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useUpdate must be used within a ConfigProvider');
    }
    return [context.showUpdateDialog, context.setShowUpdateDialog, context.updateInfo, context.setUpdateInfo, context.checkForUpdates];
}
