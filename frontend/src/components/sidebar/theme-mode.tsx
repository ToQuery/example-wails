import {useEffect} from 'react';
import {Icon} from '@iconify/react';
import {useTranslation} from 'react-i18next';
import {useConfigThemeModel} from "@/provider/config";

type ThemeMode = 'auto' | 'light' | 'dark';

export const themeModeAuto: ThemeMode = 'auto';
const themeModeLight: ThemeMode = 'light';
const themeModeDark: ThemeMode = 'dark';

function ThemeMode() {
    const {t} = useTranslation();
    const [themeMode, setThemeMode] = useConfigThemeModel();

    // 初始化时检查当前主题
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // 监听系统主题变化
        const handleChange = (e: MediaQueryListEvent) => {
            const isDark = e.matches
            console.log('handleChange isDark =', isDark);

            if (isDark) {
                setThemeMode(themeModeDark);
                document.documentElement.classList.add('dark');
            } else {
                setThemeMode(themeModeLight);
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
            setThemeMode(themeModeLight);
            document.documentElement.classList.remove('dark');
        } else {
            setThemeMode(themeModeDark);
            document.documentElement.classList.add('dark');
        }

    };

    const themeModeIcon = () => {
        let themeModeIcon = <Icon icon="icon-park:refresh"/>;
        switch (themeMode) {
            case themeModeAuto: {
                themeModeIcon = <Icon icon="icon-park:refresh-one"/>;
                break;
            }
            case themeModeLight: {
                themeModeIcon = <Icon icon="icon-park:dark-mode"/>;
                break;
            }
            case themeModeDark: {
                themeModeIcon = <Icon icon="icon-park:sun-one"/>;
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
            case themeModeAuto: {
                themeModeText = t('common.theme.auto');
                break;
            }
            case themeModeLight: {
                themeModeText = t('common.theme.dark');
                break;
            }
            case themeModeDark: {
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
