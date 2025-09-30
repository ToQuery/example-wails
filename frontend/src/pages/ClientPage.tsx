import React, {useEffect} from "react";
import {Browser, Clipboard, Dialogs, Events, Screens} from '@wailsio/runtime'
import {ClientService, ExampleService} from '../../bindings/example-wails/internal/service';
import {useTranslation} from "react-i18next";
import {Event, Value} from "@/const";
import {useGlobalClientBuild, useGlobalDialog, useGlobalUpdate} from "@/provider/global-provider";

import classNames from "classnames";
import {Button} from "@/components/ui/button";
import {ClientPlatformModel} from "../../bindings/example-wails/internal/model";
import {Separator} from "@/components/ui/separator";


function ClientPage() {
    const {t} = useTranslation();

    const [platformInfo, setPlatformInfo] = React.useState<ClientPlatformModel>();

    const [, setDialog] = useGlobalDialog();
    const [clientBuild, setClientBuild] = useGlobalClientBuild();
    const [showUpdateDialog, setShowUpdateDialog, updateInfo, setUpdateInfo, checkForUpdates] = useGlobalUpdate();

    const butGroupClass = 'flex flex-wrap gap-4 mt-4';

    const separator = <hr className="my-4 border-t border-gray-600 dark:border-gray-400"/>;

    return (
        <div className='p-4 space-y-3'>
            <section>
                <h2>{t('page.client.platform-info')}</h2>
                <div className={classNames(butGroupClass)}>
                    <div>OSName: {platformInfo?.osName}</div>
                    <div>OSArch: {platformInfo?.osArch}</div>
                </div>
                <div className={butGroupClass}>
                    <Button onClick={async () => {
                        setDialog(true);
                        ClientService.GetClientPlatform()
                            .then((exchange) => {
                                if (exchange.success && exchange.data) {
                                    const platformInfo = exchange.data;
                                    console.log("platformInfo", platformInfo);
                                    setPlatformInfo(platformInfo);
                                }

                            })
                            .finally(() => {
                                setTimeout(() => setDialog(false), 1000);
                            });

                    }}>
                        {t('page.client.platform-info')}
                    </Button>
                </div>
            </section>
            <Separator />
            <section>
                <h2>{t('page.client.client-info')}</h2>
                <div className={classNames(butGroupClass)}>
                    <div>Version: {clientBuild.version}</div>
                    <div>VersionCode: {clientBuild.versionCode}</div>
                    <div>BuildId: {clientBuild.buildId}</div>
                    <div>BuildTime: {clientBuild.buildTime}</div>
                </div>
                <div className={butGroupClass}>
                    <Button onClick={async () => {
                        setDialog(true);
                        ClientService.GetClientBuild()
                            .then((exchange) => {
                                if (exchange.success && exchange.data) {
                                    const appInfoModel = exchange.data;
                                    console.log("appInfoModel", appInfoModel);
                                    setClientBuild(appInfoModel);
                                }

                            })
                            .finally(() => {
                                setTimeout(() => setDialog(false), 1000);
                            });

                    }}>
                        {t('page.client.client-info')}
                    </Button>
                    <Button onClick={async () => {
                        const exchange = await ClientService.ClientUpdateCheck(false);
                        console.log("updateInfoModel", exchange);
                        if (exchange.success && exchange.data) {
                            const updateInfoModel = exchange.data;
                            setUpdateInfo(updateInfoModel);
                            setShowUpdateDialog(true);
                        }
                    }}>
                        {t('page.client.client-update')}
                    </Button>
                    <Button onClick={async () => {
                        const exchange = await ClientService.ClientUpdateCheck(true);
                        console.log("updateInfoModel", exchange);
                        if (exchange.success && exchange.data) {
                            const updateInfoModel = exchange.data;
                            setUpdateInfo(updateInfoModel);
                            setShowUpdateDialog(true);
                        }
                    }}>
                        {t('page.client.client-force-update')}
                    </Button>
                    <Button onClick={async () => await ClientService.ClientUpdateFromEvent(false)}>
                        {t('page.client.client-update-from-event')}
                    </Button>
                    <Button onClick={async () => await ClientService.ClientUpdateFromEvent(true)}>
                        {t('page.client.client-force-update-from-event')}
                    </Button>

                </div>
            </section>
        </div>);
}

export default ClientPage;
