import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  // 初始化时检查当前主题
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches || document.documentElement.classList.contains('dark'));

    // 监听系统主题变化
    const handleChange = (e: MediaQueryListEvent) => {
      console.log('handleChange', e.matches);
      setIsDark(e.matches);
    };
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 切换暗黑模式
  const toggleDark = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleDark} className="text-2xl mt-1 hover:rotate-6">
        {isDark ? (
            <Icon icon="icon-park:dark-mode" />
        ) : (
            <Icon icon="icon-park:sun-one" />
        )}
    </button>
  );
}

export default DarkMode;
