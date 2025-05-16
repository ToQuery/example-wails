import React from "react";
import {Events} from '@wailsio/runtime'
import {ExampleService} from '../../bindings/example-wails/internal/service';
import {useTranslation} from "react-i18next";

function Example() {
    const { t } = useTranslation();

    const [text, setText] = React.useState<string>("Hello Wails！");
    const [dateTime, setDateTime] = React.useState<string>("2000-01-01 00:00:00");

    const butClass = 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95';

    const butGroupClass = 'flex flex-wrap gap-4 mt-4';

    const separator = <hr className="my-4 border-t border-gray-600 dark:border-gray-400"/>;

    Events.On("example-wails-datetime", function(data) {
        console.log("example-wails-datetime", data);
        setDateTime(data.data);
    })

    return (<div>
        <div>
            <span>{t('page.example.input')}</span><input className='ml-3 min-w-96 rounded-s-sm border-1 px-2 py-1 border-gray-300 dark:border-gray-600 ' value={text} onChange={event => setText(event.target.value)} />
        </div>
        {separator}
        <section>
            <h2>{t('page.example.clipboard')}</h2>
            <div className={butGroupClass}>
                <button className={butClass} type="button" onClick={async () => setText(await ExampleService.ClipboardGet())}>
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
                <button className={butClass} type="button" onClick={() => ExampleService.WebviewWindowShow("/setting")}>
                    {t('page.example.webview-window-show')}
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.WebviewWindowHide()}>
                    {t('page.example.webview-window-hide')}
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.WebviewWindowCenter()}>
                    {t('page.example.webview-window-center')}
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.WebviewWindowToggleFullscreen()}>
                    {t('page.example.webview-window-toggle-fullscreen')}
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.WebviewWindowClose()}>
                    {t('page.example.webview-window-close')}
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.WebviewWindowShow("https://github.com")}>
                    {t('page.example.webview-window-show-github')}
                </button>
            </div>
        </section>
    </div>);
}

export default Example;
