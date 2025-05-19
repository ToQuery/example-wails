import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Icon} from '@iconify/react';
import Loading from "@/components/biz/loading";
import {languages} from "@/i18n";
import {useConfigLanguage} from "@/provider/config";

function DialogLanguage() {
    const {i18n} = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);
    const [showModal, setShowModal, language, setLanguage] = useConfigLanguage();


    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);

    const handleChange = (lang: string) => {
        setLanguage(lang);
        setShowModal(false);
    };

    const contentNode: React.ReactNode = <>
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm dark:bg-black/30"
            onClick={(e) => {
                // 仅当点击的是背景层而不是内容时关闭
                if (e.target === e.currentTarget) {
                    setShowModal(false);
                }
            }}
        >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[300px]">
                <div className="mb-4 text-sm font-bold text-center">选择语言</div>
                <div className="space-y-2">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => handleChange(lang.code)}
                            className={`flex items-center w-full px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${language === lang.code ? 'bg-blue-100 dark:bg-blue-900 font-bold' : ''}`}
                        >
                            <Icon icon={lang.icon} className="mr-2"/> <span
                            className='text-sm'>{lang.label}</span>
                        </button>
                    ))}
                </div>
                <button
                    className="mt-4 w-full text-sm text-gray-500 hover:text-gray-900  dark:hover:text-gray-300"
                    onClick={() => setShowModal(false)}>取消
                </button>
            </div>
        </div>
    </>

    return ( <Loading show={showModal} contentNode={contentNode} />
    );
}

export default DialogLanguage;
