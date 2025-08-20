import React, {useEffect} from "react";
import {Browser, Clipboard, Dialogs, Events, Screens} from '@wailsio/runtime'
import {ExampleService} from '../../bindings/example-wails/internal/service';
import {useTranslation} from "react-i18next";
import {Event, Value} from "@/const";
import {useGlobalAppInfo, useGlobalDialog, useGlobalUpdate} from "@/provider/global-provider";

import classNames from "classnames";
import {Button} from "@/components/ui/button";


function Example() {
    const {t} = useTranslation();

    const [text, setText] = React.useState<string>("Hello Wails！");
    const [dateTime, setDateTime] = React.useState<string>("2000-01-01 00:00:00");
    const [windowName, setWindowName] = React.useState<string>("main");
    const [alwaysOnTop, setAlwaysOnTop] = React.useState<boolean>(false);
    const [diskImagePath, setDiskImagePath] = React.useState<string>();

    const [, setDialog] = useGlobalDialog();
    const [appInfo, setAppInfo] = useGlobalAppInfo();
    const [showUpdateDialog, setShowUpdateDialog, updateInfo, setUpdateInfo, checkForUpdates] = useGlobalUpdate();

    useEffect(() => {
        listerEvent();
        return () => {
            Events.Off(Event.events.AppDatetime);
        }
    }, []);

    const butGroupClass = 'flex flex-wrap gap-4 mt-4';

    const separator = <hr className="my-4 border-t border-gray-600 dark:border-gray-400"/>;

    const listerEvent = () => {
        Events.On(Event.events.AppDatetime, function (event) {
            console.log(Event.events.AppDatetime, event);
            const eventDatas: string[] = event.data;
            const eventData: string = eventDatas[0];
            console.log(Event.events.AppDatetime + " data ", eventData);
            setDateTime(eventData);
        });
    }

    return (
        <div className='p-4'>
            <section>
                <h2>{t('page.example.app-info')}</h2>
                <div className={classNames(butGroupClass)}>
                    <div>Version: {appInfo.version}</div>
                    <div>VersionCode: {appInfo.versionCode}</div>
                    <div>BuildId: {appInfo.buildId}</div>
                    <div>BuildTime: {appInfo.buildTime}</div>
                </div>
                <div className={butGroupClass}>
                    <Button onClick={async () => {
                        setDialog(true);
                        ExampleService.GetAppInfo()
                            .then((exchange) => {
                                if (exchange.success && exchange.data) {
                                    const appInfoModel = exchange.data;
                                    console.log("appInfoModel", appInfoModel);
                                    setAppInfo(appInfoModel);
                                }

                            })
                            .finally(() => {
                                setTimeout(() => setDialog(false), 1000);
                            });

                    }}>
                        {t('page.example.app-info')}
                    </Button>
                    <Button onClick={async () => {
                        const exchange = await ExampleService.AppUpdateCheck(false);
                        console.log("updateInfoModel", exchange);
                        if (exchange.success && exchange.data) {
                            const updateInfoModel = exchange.data;
                            setUpdateInfo(updateInfoModel);
                            setShowUpdateDialog(true);
                        }
                    }}>
                        {t('page.example.app-update')}
                    </Button>
                    <Button onClick={async () => {
                        const exchange = await ExampleService.AppUpdateCheck(true);
                        console.log("updateInfoModel", exchange);
                        if (exchange.success && exchange.data) {
                            const updateInfoModel = exchange.data;
                            setUpdateInfo(updateInfoModel);
                            setShowUpdateDialog(true);
                        }
                    }}>
                        {t('page.example.app-force-update')}
                    </Button>
                    <Button onClick={async () => await ExampleService.AppUpdateFromEvent(false)}>
                        {t('page.example.app-update-from-event')}
                    </Button>
                    <Button onClick={async () => await ExampleService.AppUpdateFromEvent(true)}>
                        {t('page.example.app-force-update-from-event')}
                    </Button>
                    <Button onClick={() => ExampleService.AppEmbedFile()}>
                        {t('page.example.app-embed-file')}
                    </Button>
                    <Button onClick={() => {
                        setDialog(true);
                        ExampleService.AppEmbedExecBinary().then(() => {
                            console.log("AppEmbedExecBinary done");
                        }).catch((err) => {
                            console.log("AppEmbedExecBinary err", err);
                        }).finally(() => setDialog(false));
                    }}>
                        {t('page.example.app-embed-exec-binary')}
                    </Button>
                    <Button onClick={() => ExampleService.AppOpenApplication("WeChat")}>
                        {t('page.example.app-open-application-wechat')}
                    </Button>
                    <Button onClick={() => ExampleService.AppOpenApplication("QQ")}>
                        {t('page.example.app-open-application-qq')}
                    </Button>
                    <Button onClick={() => Browser.OpenURL('https://github.com/toquery/example-wails')}>
                        {t('page.example.app-open-browser')}
                    </Button>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.clipboard')}</h2>
                <div className='mt-4'>
                    <input
                        className='min-w-96 rounded-sm border-1 px-2 py-1 border-gray-300 dark:border-gray-600 '
                        value={text}
                        onChange={event => setText(event.target.value)}/>
                </div>
                <div className={butGroupClass}>

                    <Button onClick={async () => setText(await Clipboard.Text())}>
                        {t('page.example.get-clipboard')}
                    </Button>

                    <Button onClick={() => Clipboard.SetText(text)}>
                        {t('page.example.set-clipboard')}
                    </Button>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.context-menus')}</h2>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.menu-reference')}</h2>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.application-menu')}</h2>
            </section>

            {separator}
            <section>
                <h2>{t('page.example.dialog')}</h2>
                <div className={butGroupClass}>
                    <div className=''>
                        {diskImagePath ? (
                                <img className='w-[300px] h-[300px] '
                                     src={diskImagePath ? Value.value.diskFilePrefix + "/" + diskImagePath : ""} alt=''/>) :
                            <p className='text-red-600'>请选择图片文件(选择后将展示本地磁盘文件)</p>}
                    </div>
                </div>
                <div className={butGroupClass}>
                    <Button onClick={() => Dialogs.Info({Title: "Info", Message: "Hello Wails！", Detached: true})}>
                        {t('page.example.info-dialog')}
                    </Button>
                    <Button onClick={() => Dialogs.Question({
                        Title: "Question",
                        Message: "Do you want to save your changes ?",
                        Buttons: [{Label: "Cancel", IsCancel: true}, {Label: "Confirm", IsDefault: true}]
                    }).then(value => {
                        console.log("Dialogs Question Then", value);
                    }).catch(err => {
                        console.error("Dialogs Question Catch", err);
                    }).finally(()=> {
                        console.error("Dialogs Question Finally");
                    })}>
                        {t('page.example.question-dialog')}
                    </Button>
                    <Button onClick={() => Dialogs.Warning({
                        Title: "Warning",
                        Message: "Warning Message",
                    })}>
                        {t('page.example.warning-dialog')}
                    </Button>
                    <Button onClick={() => Dialogs.Error({
                        Title: "Error",
                        Message: "Failed to save file",
                    })}>
                        {t('page.example.error-dialog')}
                    </Button>
                    <Button onClick={() => Dialogs.OpenFile({
                        Title: "Select Image",
                        CanChooseFiles: true,
                        Filters: [{DisplayName: "Images", Pattern: "*.png;*.jpg;*.jpeg;*.gif"}],
                    }).then(value => {
                        console.log("Dialogs OpenFile Then", value);
                        setDiskImagePath(value);
                    }).catch(err => {
                        console.error("Dialogs OpenFile Catch", err);
                    }).finally(()=> {
                        console.error("Dialogs OpenFile Finally");
                    })}>
                        {t('page.example.file-dialog')}
                    </Button>

                    <Button onClick={() => Dialogs.SaveFile({
                        Title: "Save File",
                        Message: "Save Document",
                        Filename: "document.txt",
                    }).then(value => {
                        console.log("Dialogs SaveFile Then", value);
                    }).catch(err => {
                        console.error("Dialogs SaveFile Catch", err);
                    }).finally(()=> {
                        console.error("Dialogs SaveFile Finally");
                    })}>
                        {t('page.example.front-save-file-dialog')}
                    </Button>

                    <Button onClick={() => ExampleService.SaveFileDialog()}>
                        {t('page.example.save-file-dialog')}
                    </Button>

                    <Button onClick={() => ExampleService.ShowAboutDialog()}>
                        {t('page.example.about-dialog')}
                    </Button>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.events')}</h2>
                <div className={butGroupClass}>
                    <div>{t('page.example.datetime')}: {dateTime}</div>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.badges')}</h2>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.notifications')}</h2>
                <div className={butGroupClass}>
                    <Button onClick={() => ExampleService.Notification()}>
                        Notification
                    </Button>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.system-tray')}</h2>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.multi-window')}</h2>
                <div className={butGroupClass}>
                    <span>{t('page.example.window-name')}:</span>
                    <div className="space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="windowName"
                                value="main"
                                checked={windowName === "main"}
                                onChange={() => setWindowName("main")}
                                className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">main</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="windowName"
                                value="window1"
                                checked={windowName === "window1"}
                                onChange={() => setWindowName("window1")}
                                className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">window1</span>
                        </label>
                    </div>
                </div>
                <div className={butGroupClass}>
                    <Button onClick={() => ExampleService.WebviewWindowShow(windowName, "/")}>
                        {t('page.example.webview-window-show')}
                    </Button>

                    <Button onClick={() => ExampleService.WebviewWindowHide(windowName)}>
                        {t('page.example.webview-window-hide')}
                    </Button>

                    <Button onClick={() => ExampleService.WebviewWindowCenter(windowName)}>
                        {t('page.example.webview-window-center')}
                    </Button>

                    <Button onClick={() => ExampleService.WebviewWindowToggleFullscreen(windowName)}>
                        {t('page.example.webview-window-toggle-fullscreen')}
                    </Button>

                    <Button onClick={async () => {
                        const currentScreens = await Screens.GetCurrent();
                        ExampleService.WebviewWindowSetSize(windowName, 800, currentScreens.WorkArea.Height)
                    }}>
                        {t('page.example.webview-window-set-size')}
                    </Button>

                    <Button onClick={() => {
                        const newVal = !alwaysOnTop;
                        ExampleService.WebviewWindowSetAlwaysOnTop(windowName, newVal);
                        setAlwaysOnTop(newVal);
                    }}>
                        {alwaysOnTop ? t('page.example.webview-window-set-always-on-top-false') : t('page.example.webview-window-set-always-on-top-true')}
                    </Button>

                    <Button onClick={() => ExampleService.WebviewWindowClose(windowName)}>
                        {t('page.example.webview-window-close')}
                    </Button>

                    <Button onClick={() => ExampleService.WebviewWindowShow(windowName, "https://github.com")}>
                        {t('page.example.webview-window-show-github')}
                    </Button>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.other')}</h2>
                <div className={butGroupClass}>
                    <Button onClick={() => ExampleService.OpenSettingWindow("/setting")}>
                        {t('page.example.open-setting-window')}
                    </Button>
                </div>
            </section>
        </div>);
}

export default Example;
