import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import {SidebarStyle} from "@/components/sidebar/sidebar";


// 侧边栏导航激活样式
export const DefaultBgClass = 'text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-slate-900';
export const DefaultActiveClass = 'text-blue-600 dark:text-blue-500';

// 配置上下文
interface ConfigContextType {
  sidebarStyle: SidebarStyle;
  setSidebarStyle: (style: SidebarStyle) => void;
  windowTitle: string;
  setWindowTitle: (windowTitle: string) => void;
}

const defaultConfig: ConfigContextType = {
  setSidebarStyle(style: SidebarStyle): void {
    console.log('setSidebarStyle', style);
  },
  sidebarStyle: {
    code: 'row-double',
    label: '网格模式',
    icon: 'material-symbols:view-module-outline'
  },
  windowTitle: 'Wails And React',
  setWindowTitle(windowTitle: string): void {
    console.log('setWindowTitle', windowTitle);
  },
}

const ConfigContext = createContext<ConfigContextType>(defaultConfig);

// 配置提供者组件
export function ConfigProvider({ children }: { children: ReactNode }) {
  const [sidebarStyle, setSidebarStyle] = useState<SidebarStyle>(defaultConfig.sidebarStyle);
  const [windowTitle, setWindowTitle] = useState<string>(defaultConfig.windowTitle);

  return (
    <ConfigContext.Provider value={{
      sidebarStyle,
      setSidebarStyle,
      windowTitle,
      setWindowTitle,
    }}>
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
    throw new Error('useConfigSidebarStyle must be used within a ConfigProvider');
  }
  return [context.windowTitle, context.setWindowTitle];
}

export function useTheme() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ConfigProvider');
  }
  return context;
}
