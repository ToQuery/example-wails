import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Button} from "@/components/ui/button";


function Home() {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);

    return (
        <div className="p-4 space-y-6">
            <div>
                <Button onClick={() => setCount(count + 1)}>
                    {t('page.home.counter')}{count}
                </Button>
            </div>

        </div>
    );
}

export default Home;
