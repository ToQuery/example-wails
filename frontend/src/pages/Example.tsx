import React from "react";
import {Events} from '@wailsio/runtime'
import {ExampleService} from '../../bindings/example-wails/internal/service';
import {useTranslation} from "react-i18next";
import {AppInfoModel} from "../../bindings/example-wails/internal/model";
import {Event} from "@/const";
import {useConfigLoading, useConfigUpdate} from "@/provider/config";
import {cn} from "@/lib/utils";

function Example() {
    const {t} = useTranslation();

    const [text, setText] = React.useState<string>("Hello Wails！");
    const [appInfo, setAppInfo] = React.useState<AppInfoModel>();
    const [dateTime, setDateTime] = React.useState<string>("2000-01-01 00:00:00");
    const [windowName, setWindowName] = React.useState<string>("main");

    const [, setLoading] = useConfigLoading();
    const [showUpdateDialog, setShowUpdateDialog, updateInfo, setUpdateInfo, checkForUpdates] = useConfigUpdate();


    const butClass = 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95';

    const butGroupClass = 'flex flex-wrap gap-4 mt-4';

    const separator = <hr className="my-4 border-t border-gray-600 dark:border-gray-400"/>;

    Events.On(Event.events.AppDatetime, function (event) {
        console.log(Event.events.AppDatetime, event);
        const eventDatas: string[] = event.data;
        const eventData: string = eventDatas[0];
        console.log(Event.events.AppDatetime + " data ", eventData);
        setDateTime(eventData);
    });

    return (<div>
        <div>
            <span>{t('page.example.input')}</span><input
            className='ml-3 min-w-96 rounded-s-sm border-1 px-2 py-1 border-gray-300 dark:border-gray-600 ' value={text}
            onChange={event => setText(event.target.value)}/>
        </div>
        {separator}
        <section>
            <h2>{t('page.example.app-info')}</h2>
            <div className={cn(butGroupClass)}>
                <div>Version: {appInfo?.Version}</div>
                <div>VersionCode: {appInfo?.VersionCode}</div>
                <div>BuildId: {appInfo?.BuildId}</div>
                <div>BuildTime: {appInfo?.BuildTime}</div>
            </div>
            <div className={butGroupClass}>
                <button className={butClass} type="button"
                        onClick={async () => setAppInfo(await ExampleService.GetAppInfo())}>
                    {t('page.example.app-info')}
                </button>
                <button className={butClass} type="button"
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
                <button className={butClass} type="button"
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
                <button className={butClass} type="button"
                        onClick={async () => await ExampleService.AppUpdateFromEvent(true, false)}>
                    {t('page.example.app-update-from-event')}
                </button>
                <button className={butClass} type="button"
                        onClick={async () => await ExampleService.AppUpdateFromEvent(true, true)}>
                    {t('page.example.app-force-update-from-event')}
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.AppEmbedFile()}>
                    {t('page.example.app-embed-file')}
                </button>
                <button className={butClass} type="button" onClick={() => {
                    setLoading(true);
                    ExampleService.AppEmbedExecBinary().then(() => {
                        console.log("AppEmbedExecBinary done");
                    }).catch((err) => {
                        console.log("AppEmbedExecBinary err", err);
                    }).finally(() => setLoading(false));
                }}>
                    {t('page.example.app-embed-exec-binary')}
                </button>
                <button className={butClass} type="button"
                        onClick={() => ExampleService.AppOpenApplication("WeChat")}>
                    {t('page.example.app-open-application-wechat')}
                </button>
                <button className={butClass} type="button"
                        onClick={() => ExampleService.AppOpenApplication("QQ")}>
                    {t('page.example.app-open-application-qq')}
                </button>
                <button className={butClass} type="button"
                        onClick={() => ExampleService.AppOpenBrowser("https://github.com")}>
                    {t('page.example.app-open-browser')}
                </button>
            </div>
        </section>
        {separator}
        <section>
            <h2>{t('page.example.clipboard')}</h2>
            <div className={butGroupClass}>
                <button className={butClass} type="button"
                        onClick={async () => setText(await ExampleService.ClipboardGet())}>
                    {t('page.example.get-clipboard')}
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.ClipboardSet(text)}>
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
                <button className={butClass} type="button" onClick={() => ExampleService.InfoDialog()}>
                    {t('page.example.info-dialog')}
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.QuestionDialog()}>
                    {t('page.example.question-dialog')}
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.ErrorDialog()}>
                    {t('page.example.error-dialog')}
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.FileDialog()}>
                    {t('page.example.file-dialog')}
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.SaveFileDialog()}>
                    {t('page.example.save-file-dialog')}
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.ShowAboutDialog()}>
                    {t('page.example.about-dialog')}
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
                <button className={butClass} type="button"
                        onClick={() => ExampleService.WebviewWindowShow(windowName, "/setting")}>
                    {t('page.example.webview-window-show')}
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.WebviewWindowHide(windowName)}>
                    {t('page.example.webview-window-hide')}
                </button>

                <button className={butClass} type="button"
                        onClick={() => ExampleService.WebviewWindowCenter(windowName)}>
                    {t('page.example.webview-window-center')}
                </button>

                <button className={butClass} type="button"
                        onClick={() => ExampleService.WebviewWindowToggleFullscreen(windowName)}>
                    {t('page.example.webview-window-toggle-fullscreen')}
                </button>

                <button className={butClass} type="button"
                        onClick={() => ExampleService.WebviewWindowClose(windowName)}>
                    {t('page.example.webview-window-close')}
                </button>

                <button className={butClass} type="button"
                        onClick={() => ExampleService.WebviewWindowShow(windowName, "https://github.com")}>
                    {t('page.example.webview-window-show-github')}
                </button>
            </div>
        </section>
        {separator}
        <section>
            <h2>{t('page.example.other')}</h2>
            <div className={butGroupClass}></div>
        </section>
    </div>);
}

export default Example;
