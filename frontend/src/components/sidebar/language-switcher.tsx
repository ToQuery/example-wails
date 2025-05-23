import {Icon} from '@iconify/react';
import DialogLanguage from "@/components/biz/dialog-language";
import {useConfigLanguage, useConfigLoading} from "@/provider/config";
import {languages} from "@/i18n";

function LanguageSwitcher() {
    const [showModal, setShowModal, language] = useConfigLanguage();

    return (
        <>
            <button onClick={() => setShowModal(true)} className="text-2xl hover:rotate-6">
                <Icon icon={languages.find(l => l.code === language)?.icon || 'emojione:flag-for-china'}/>
            </button>
            <DialogLanguage />
        </>
    );
}

export default LanguageSwitcher;
