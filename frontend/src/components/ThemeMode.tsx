import {useEffect, useState} from 'react';
import {Icon} from '@iconify/react';
import {useTranslation} from 'react-i18next';

type ThemeMode = 1 | 2 | 3;

const themeAuto: ThemeMode = 1;
const themeLight: ThemeMode = 2;
const themeDark: ThemeMode = 3;

function ThemeMode() {
    const {t} = useTranslation();
    const [themeMode, setThemeMode] = useState<ThemeMode>(themeAuto);

    // 初始化时检查当前主题
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // 监听系统主题变化
        const handleChange = (e: MediaQueryListEvent) => {
            const isDark = e.matches
            console.log('handleChange isDark =', isDark);
            
            if (isDark) {
                setThemeMode(themeDark);
                document.documentElement.classList.add('dark');
            }else {
                setThemeMode(themeLight);
                document.documentElement.classList.remove('dark');
            }
        };
        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);

    // 切换暗黑模式
    const toggleDark = () => {
        const isDark = document.documentElement.classList.contains('dark');

        if (isDark) {
            setThemeMode(themeLight);
            document.documentElement.classList.remove('dark');
        }else {
            setThemeMode(themeDark);
            document.documentElement.classList.add('dark');
        }

    };

    const themeModeIcon = () => {
        let themeModeIcon = <Icon icon="icon-park:refresh"/>;
        switch (themeMode) {
            case themeAuto: {
                themeModeIcon = <Icon icon="icon-park:refresh-one"/>;
                break;
            }
            case themeLight: {
                themeModeIcon = <Icon icon="icon-park:dark-mode" />;
                break;
            }
            case themeDark: {
                themeModeIcon = <Icon icon="icon-park:sun-one" />;
                break;
            }
            default: {
                themeModeIcon = <Icon icon="icon-park:refresh"/>;
                break;
            }
        }
        return themeModeIcon;
    }

    const themeModeText = () => {
        let themeModeText = t('common.theme.auto');
        switch (themeMode) {
            case themeAuto: {
                themeModeText = t('common.theme.auto');
                break;
            }
            case themeLight: {
                themeModeText = t('common.theme.dark');
                break;
            }
            case themeDark: {
                themeModeText = t('common.theme.light');
                break;
            }
            default: {
                themeModeText = t('common.theme.auto');
                break;
            }
        }
        return themeModeText;
    };

    return (
        <button
            onClick={toggleDark}
            className="text-2xl hover:rotate-6"
            title={themeModeText()}
            aria-label={themeModeText()}
        >
            {themeModeIcon()}
        </button>
    );
}

export default ThemeMode;
