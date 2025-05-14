import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Icon} from '@iconify/react';

const LANGUAGES = [
    {code: 'zh-CN', label: '简体中文', icon: 'emojione:flag-for-china'},
    {code: 'zh-HK', label: '繁體中文', icon: 'emojione:flag-for-hong-kong-sar-china'},
    {code: 'en-US', label: 'English', icon: 'emojione:flag-for-united-states'}
];

function LanguageSwitcher() {
    const {i18n} = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);

    const handleChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
        setShowModal(false);
    };

    return (
        <>
            <button onClick={() => setShowModal(true)} className="text-2xl hover:rotate-6">
                <Icon icon={LANGUAGES.find(l => l.code === currentLang)?.icon || 'emojione:flag-for-china'}/>
            </button>
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm dark:bg-black/30"
                    onClick={(e) => {
                        // 仅当点击的是背景层而不是内容时关闭
                        if (e.target === e.currentTarget) {
                            setShowModal(false);
                        }
                    }}
                >
                    <div className="bg-gray dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[500px]">
                        <div className="mb-4 text-sm font-bold text-center">选择语言</div>
                        <div className="space-y-2">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleChange(lang.code)}
                                    className={`flex items-center w-full px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${currentLang === lang.code ? 'bg-blue-100 dark:bg-blue-900 font-bold' : ''}`}
                                >
                                    <Icon icon={lang.icon} className="mr-2"/> <span
                                    className='text-sm'>{lang.label}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            className="mt-4 w-full text-sm text-gray-700 hover:text-gray-900 dark:hover:text-gray-300"
                            onClick={() => setShowModal(false)}>取消
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LanguageSwitcher;
