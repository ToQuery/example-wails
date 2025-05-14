import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言资源
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';
import zhHK from './locales/zh-HK';

const resources = {
  'zh-CN': zhCN,
  'zh-HK': zhHK,
  'en-US': enUS,
};

i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 将i18n实例传递给react-i18next
  .use(initReactI18next)
  // 初始化i18n
  .init({
    resources,
    fallbackLng: 'zh-CN', // 默认语言
    debug: false, // 开发环境可以设为true
    interpolation: {
      escapeValue: false, // 不转义特殊字符
    },
  });

export default i18n;
