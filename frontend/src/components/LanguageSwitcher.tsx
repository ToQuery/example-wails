import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'zh-CN' ? 'en-US' : 'zh-CN';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <button onClick={toggleLanguage} className="text-2xl hover:rotate-6">
      {currentLang === 'zh-CN' ? (
        <Icon icon="emojione:flag-for-china" />
      ) : (
        <Icon icon="emojione:flag-for-united-states" />
      )}
    </button>
  );
}

export default LanguageSwitcher;
