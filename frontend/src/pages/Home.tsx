import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { UI } from '@/const';


function Home() {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);

    return (
        <div className="space-y-6">
            <div>
                <button
                    type="button"
                    onClick={() => setCount(count + 1)}
                    className={UI.ui.btn}
                >
                    {t('page.home.counter')}{count}
                </button>
            </div>

        </div>
    );
}

export default Home;
