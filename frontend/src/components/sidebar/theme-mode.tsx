import {useEffect} from 'react';
import {Icon} from '@iconify/react';
import {useTranslation} from 'react-i18next';
import {useConfigThemeModel} from "@/provider/config";

type ThemeMode = 'auto' | 'light' | 'dark';

export const themeModeAuto: ThemeMode = 'auto';
export const themeModeLight: ThemeMode = 'light';
export const themeModeDark: ThemeMode = 'dark';

function ThemeMode() {
    const {t} = useTranslation();
    const [themeModel, setThemeModel] = useConfigThemeModel();

    // 切换暗黑模式
    const toggleDark = () => {
        const isDark = document.documentElement.classList.contains('dark');

        if (isDark) {
            setThemeModel(themeModeLight);
            document.documentElement.classList.remove('dark');
        } else {
            setThemeModel(themeModeDark);
            document.documentElement.classList.add('dark');
        }

    };

    const themeModeIcon = () => {
        let themeModeIcon = <Icon icon="icon-park:refresh"/>;
        switch (themeModel) {
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
        switch (themeModel) {
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
