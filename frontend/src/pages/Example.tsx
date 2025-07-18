import React from "react";
import {Browser, Events, Screens} from '@wailsio/runtime'
import {ExampleService} from '../../bindings/example-wails/internal/service';
import {useTranslation} from "react-i18next";
import {AppInfoModel} from "../../bindings/example-wails/internal/model";
import {Event, UI, Value} from "@/const";
import {useGlobalAppInfo, useGlobalDialog, useGlobalUpdate} from "@/provider/global-provider";

import classNames from "classnames";


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

    const butGroupClass = 'flex flex-wrap gap-4 mt-4';

    const separator = <hr className="my-4 border-t border-gray-600 dark:border-gray-400"/>;

    Events.On(Event.events.AppDatetime, function (event) {
        console.log(Event.events.AppDatetime, event);
        const eventDatas: string[] = event.data;
        const eventData: string = eventDatas[0];
        console.log(Event.events.AppDatetime + " data ", eventData);
        setDateTime(eventData);
    });

    return (
        <div className='p-4'>
            <div>
                <span>{t('page.example.input')}</span><input
                className='ml-3 min-w-96 rounded-s-sm border-1 px-2 py-1 border-gray-300 dark:border-gray-600 '
                value={text}
                onChange={event => setText(event.target.value)}/>
            </div>
            {separator}
            <section>
                <h2>{t('page.example.app-info')}</h2>
                <div className={classNames(butGroupClass)}>
                    <div>Version: {appInfo.version}</div>
                    <div>VersionCode: {appInfo.versionCode}</div>
                    <div>BuildId: {appInfo.buildId}</div>
                    <div>BuildTime: {appInfo.buildTime}</div>
                </div>
                <div className={butGroupClass}>
                    <button className={UI.ui.btn} type="button"
                            onClick={async () => {
                                setDialog(true);
                                ExampleService.GetAppInfo()
                                    .then((appInfoModel: AppInfoModel) => {
                                        console.log("appInfoModel", appInfoModel);
                                        setAppInfo({
                                            name: appInfoModel.Name,
                                            version: appInfoModel.Version,
                                            versionCode: appInfoModel.VersionCode,
                                            buildId: appInfoModel.BuildId,
                                            buildTime: appInfoModel.BuildTime,
                                        });
                                    })
                                    .finally(() => {
                                        setTimeout(() => setDialog(false), 1000);
                                    });

                            }}>
                        {t('page.example.app-info')}
                    </button>
                    <button className={UI.ui.btn} type="button"
                            onClick={async () => {
                                const updateInfoModel = await ExampleService.AppUpdate(true, false);
                                console.log("updateInfoModel", updateInfoModel);
                                if (updateInfoModel) {
                                    setUpdateInfo({
                                        version: updateInfoModel.Version,
                                        versionCode: updateInfoModel.VersionCode,
                                        forceUpdate: updateInfoModel.ForceUpdate,
                                        changelog: updateInfoModel.Changelog,
                                        downloadUrl: updateInfoModel.DownloadUrl
                                    });
                                    setShowUpdateDialog(true);
                                }
                            }}>
                        {t('page.example.app-update')}
                    </button>
                    <button className={UI.ui.btn} type="button"
                            onClick={async () => {
                                const updateInfoModel = await ExampleService.AppUpdate(true, true);
                                console.log("updateInfoModel", updateInfoModel);
                                if (updateInfoModel) {
                                    setUpdateInfo({
                                        version: updateInfoModel.Version,
                                        versionCode: updateInfoModel.VersionCode,
                                        forceUpdate: updateInfoModel.ForceUpdate,
                                        changelog: updateInfoModel.Changelog,
                                        downloadUrl: updateInfoModel.DownloadUrl
                                    });
                                    setShowUpdateDialog(true);
                                }
                            }}>
                        {t('page.example.app-force-update')}
                    </button>
                    <button className={UI.ui.btn} type="button"
                            onClick={async () => await ExampleService.AppUpdateFromEvent(true, false)}>
                        {t('page.example.app-update-from-event')}
                    </button>
                    <button className={UI.ui.btn} type="button"
                            onClick={async () => await ExampleService.AppUpdateFromEvent(true, true)}>
                        {t('page.example.app-force-update-from-event')}
                    </button>
                    <button className={UI.ui.btn} type="button" onClick={() => ExampleService.AppEmbedFile()}>
                        {t('page.example.app-embed-file')}
                    </button>
                    <button className={UI.ui.btn} type="button" onClick={() => {
                        setDialog(true);
                        ExampleService.AppEmbedExecBinary().then(() => {
                            console.log("AppEmbedExecBinary done");
                        }).catch((err) => {
                            console.log("AppEmbedExecBinary err", err);
                        }).finally(() => setDialog(false));
                    }}>
                        {t('page.example.app-embed-exec-binary')}
                    </button>
                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.AppOpenApplication("WeChat")}>
                        {t('page.example.app-open-application-wechat')}
                    </button>
                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.AppOpenApplication("QQ")}>
                        {t('page.example.app-open-application-qq')}
                    </button>
                    <button className={UI.ui.btn} type="button"
                            onClick={() => Browser.OpenURL('https://github.com/toquery/example-wails')}>
                        {t('page.example.app-open-browser')}
                    </button>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.clipboard')}</h2>
                <div className={butGroupClass}>
                    <button className={UI.ui.btn} type="button"
                            onClick={async () => setText(await ExampleService.ClipboardGet())}>
                        {t('page.example.get-clipboard')}
                    </button>

                    <button className={UI.ui.btn} type="button" onClick={() => ExampleService.ClipboardSet(text)}>
                        {t('page.example.set-clipboard')}
                    </button>
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
                    <button className={UI.ui.btn} type="button" onClick={() => ExampleService.InfoDialog()}>
                        {t('page.example.info-dialog')}
                    </button>
                    <button className={UI.ui.btn} type="button" onClick={() => ExampleService.QuestionDialog()}>
                        {t('page.example.question-dialog')}
                    </button>
                    <button className={UI.ui.btn} type="button" onClick={() => ExampleService.ErrorDialog()}>
                        {t('page.example.error-dialog')}
                    </button>
                    <button className={UI.ui.btn} type="button" onClick={() => ExampleService.FileDialog()}>
                        {t('page.example.file-dialog')}
                    </button>

                    <button className={UI.ui.btn} type="button" onClick={() => {
                        ExampleService.FileDialogImage().then((path) => {
                            console.log("FileDialogImage", path);
                            setDiskImagePath(path);
                        });
                    }}>
                        {t('page.example.image-dialog')}
                    </button>

                    <button className={UI.ui.btn} type="button" onClick={() => ExampleService.SaveFileDialog()}>
                        {t('page.example.save-file-dialog')}
                    </button>

                    <button className={UI.ui.btn} type="button" onClick={() => ExampleService.ShowAboutDialog()}>
                        {t('page.example.about-dialog')}
                    </button>


                    <button className={UI.ui.btn} type="button" onClick={() => {}}>
                        {t('page.example.save-file-dialog')}
                    </button>
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
                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.Notification()}>
                        Notification
                    </button>
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
                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.WebviewWindowShow(windowName, "/")}>
                        {t('page.example.webview-window-show')}
                    </button>

                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.WebviewWindowHide(windowName)}>
                        {t('page.example.webview-window-hide')}
                    </button>

                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.WebviewWindowCenter(windowName)}>
                        {t('page.example.webview-window-center')}
                    </button>

                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.WebviewWindowToggleFullscreen(windowName)}>
                        {t('page.example.webview-window-toggle-fullscreen')}
                    </button>

                    <button className={UI.ui.btn} type="button"
                            onClick={async () => {
                                const currentScreens = await Screens.GetCurrent();
                                ExampleService.WebviewWindowSetSize(windowName, 800, currentScreens.WorkArea.Height)
                            }}>
                        {t('page.example.webview-window-set-size')}
                    </button>

                    <button className={UI.ui.btn} type="button"
                            onClick={() => {
                                const newVal = !alwaysOnTop;
                                ExampleService.WebviewWindowSetAlwaysOnTop(windowName, newVal);
                                setAlwaysOnTop(newVal);
                            }}>
                        {alwaysOnTop ? t('page.example.webview-window-set-always-on-top-false') : t('page.example.webview-window-set-always-on-top-true')}
                    </button>

                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.WebviewWindowClose(windowName)}>
                        {t('page.example.webview-window-close')}
                    </button>

                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.WebviewWindowShow(windowName, "https://github.com")}>
                        {t('page.example.webview-window-show-github')}
                    </button>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.example.other')}</h2>
                <div className={butGroupClass}>
                    <button className={UI.ui.btn} type="button"
                            onClick={() => ExampleService.OpenSettingWindow("/setting")}>
                        {t('page.example.open-setting-window')}
                    </button>
                </div>
            </section>
        </div>);
}

export default Example;
