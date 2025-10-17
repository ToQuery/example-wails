import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from "@/components/ui/button";
import {ExampleService} from "../../bindings/example-wails/internal/service";
import {toast} from "sonner";


function IndexPage() {
    const {t} = useTranslation();
    const [count, setCount] = useState(0);

    return (
        <div className="p-4 space-y-6">
            <div className='space-x-2'>
                <Button
                    onClick={() => setCount(count + 1)}>
                    {t('page.home.counter')}{count}
                </Button>
                <Button
                    onClick={() => {
                        ExampleService.HttpBinUUID().then(res => {
                            toast(res.data?.uuid);
                        }).catch((e) => {
                            console.error(e);
                        });
                    }}>
                    {t('page.home.httpbin-uuid')}
                </Button>
            </div>
        </div>
    );
}

export default IndexPage;
