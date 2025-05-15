import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Greet} from "../../wailsjs/go/main/App";


function Home() {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);
    const butClass = 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95';

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold">{t('page.home.title')}</h1>
            <div>
                <button
                    type="button"
                    onClick={() => setCount(count + 1)}
                    className={butClass}
                >
                    {t('page.home.counter')}{count}
                </button>
            </div>
            <div>
                <button type="button"
                        onClick={() => Greet('Hello Wails!')}
                        className={butClass}>
                    Greet
                </button>
            </div>
        </div>
    );
}

export default Home;
