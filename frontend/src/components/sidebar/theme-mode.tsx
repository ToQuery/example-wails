import {Icon} from '@iconify/react';
import {useTranslation} from 'react-i18next';
import {useConfigThemeModel} from "@/provider/config";

type ThemeMode = {
    icon: string;
    code: string;
    name: string;
    label: string;
};

export const themeModeAuto: ThemeMode = {
    icon: 'mdi:theme-light-dark',
    code: 'auto',
    name: 'app.theme.auto',
    label: 'app.theme.auto-label',
};

export const themeModeLight: ThemeMode = {
    icon: 'mdi:white-balance-sunny',
    code: 'light',
    name: 'app.theme.light',
    label: 'app.theme.light-label',
};
export const themeModeDark: ThemeMode = {
    icon: 'mdi:weather-night',
    code: 'dark',
    name: 'app.theme.dark',
    label: 'app.theme.dark-label',
};

export const themeModeOptions: ThemeMode[] = [
    themeModeAuto,
    themeModeLight,
    themeModeDark,
];


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

    return (
        <button
            onClick={toggleDark}
            className="text-2xl hover:rotate-6"
            title={t(themeModel.name)}
            aria-label={t(themeModel.label)}
        >
            <Icon icon={themeModel.icon}/>
        </button>
    );
}

export default ThemeMode;
