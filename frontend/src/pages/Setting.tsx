import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import logo from '../assets/images/logo-universal.png';
import LanguageSwitcher from '../components/sidebar/language-switcher';
import ThemeMode from '../components/sidebar/theme-mode';

function Setting() {
  const { t } = useTranslation();
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(true); // 模拟有新版本
  const appVersion = 'v1.0.0';

  // 模拟检查更新
  const checkForUpdates = () => {
    setIsCheckingUpdate(true);
    // 模拟网络请求
    setTimeout(() => {
      setIsCheckingUpdate(false);
      setHasUpdate(true); // 假设有更新
    }, 1500);
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* 标题和应用信息 */}
      <div className="flex items-center gap-4 pb-4 border-b dark:border-gray-700">
        <img src={logo} alt="logo" className="w-16 h-16 select-none" />
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Example Wails</h1>
          <p className="text-gray-500 dark:text-gray-400">Wails + React + Tailwind CSS</p>
        </div>
      </div>

      {/* 版本信息和更新 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t('menu.setting')}</h2>

        <div className="space-y-6">
          {/* 版本信息 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">{t('page.setting.version', '版本')}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium dark:text-white">{appVersion}</span>
              {hasUpdate && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-full">
                  {t('page.setting.new-version-available', '有新版本')}
                </span>
              )}
            </div>
          </div>

          {/* 检查更新按钮 */}
          <div className="flex justify-end">
            <button
              onClick={checkForUpdates}
              disabled={isCheckingUpdate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingUpdate ? (
                <>
                  <Icon icon="eos-icons:loading" className="animate-spin" />
                  {t('page.setting.checking-updates', '检查更新中...')}
                </>
              ) : (
                <>
                  <Icon icon="mdi:update" />
                  {t('page.setting.check-updates', '检查更新')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 主题设置 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t('page.setting.appearance', '外观')}</h2>

        <div className="space-y-6">
          {/* 主题模式 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">{t('page.setting.theme', '主题')}</span>
            <ThemeMode />
          </div>

          {/* 语言设置 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">{t('page.setting.language', '语言')}</span>
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* 关于 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t('page.setting.about', '关于')}</h2>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>{t('page.setting.description', 'Wails是一个允许你使用Go和Web技术编写桌面应用的项目。')}</p>

          <div className="flex gap-4 pt-2">
            <a
              href="https://wails.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Icon icon="mdi:web" />
              {t('page.setting.official-website', '官方网站')}
            </a>
            <a
              href="https://github.com/wailsapp/wails"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Icon icon="mdi:github" />
              GitHub
            </a>
            <a
              href="https://wails.io/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Icon icon="mdi:file-document-outline" />
              {t('page.setting.documentation', '文档')}
            </a>
          </div>
        </div>
      </div>

      {/* 版权信息 */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm pt-4">
        Wails Example © {new Date().getFullYear()} By ToQuery. {t('page.setting.all-rights-reserved', '保留所有权利')}
      </div>
    </div>
  );
}

export default Setting;
