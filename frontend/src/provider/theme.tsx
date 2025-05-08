import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';

// 创建认证上下文
interface ThemeContextType {
}

const defaultTheme: ThemeContextType = {}

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

// 认证提供者组件
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [logged, setLogged] = useState(true);

  return (
    <ThemeContext.Provider value={{ logged, setLogged }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用认证的Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }
  return context;
}
