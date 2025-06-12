import {Icon} from '@iconify/react';
import {useGlobalLanguage} from "@/provider/global-provider";

import {languages} from "@/i18n";

function LanguageSwitcher() {
    const [showModal, setShowModal, language] = useGlobalLanguage();

    return (
        <>
            <button onClick={() => setShowModal(true)} className="text-2xl hover:rotate-6">
                <Icon icon={languages.find(l => l.code === language)?.icon || 'emojione:flag-for-china'}/>
            </button>
        </>
    );
}

export default LanguageSwitcher;
