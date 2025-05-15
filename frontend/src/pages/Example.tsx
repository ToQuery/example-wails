import React from "react";
import {ExampleService} from '../../bindings/example-wails/internal/service';

function Example() {
    const butClass = 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95';

    const separator = <hr className="my-4 border-t border-gray-600 dark:border-gray-400"/>;

    return (<div>
        <div className='pb-6 text-2xl font-black'>Example</div>
        <section>
            <h2>Clipboard</h2>
            <div className="flex gap-4 mt-4">
                <button className={butClass} type="button" onClick={() => ExampleService.ClipboardGet()}>
                   Get Clipboard
                </button>

                <button className={butClass} type="button" onClick={() => ExampleService.ClipboardSet('Wails')}>
                    Set Clipboard
                </button>
            </div>
        </section>
        {separator}
        <section>
            <h2>Context Menus</h2>
        </section>
        {separator}
        <section>
            <h2>Menu Reference</h2>
        </section>
        {separator}
        <section>
            <h2>Application Menu</h2>
        </section>

        {separator}
        <section>
            <h2>Dialog</h2>
            <div className="flex gap-4 mt-4">
                <button className={butClass} type="button" onClick={() => ExampleService.InfoDialog()}>
                    InfoDialog
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.QuestionDialog()}>
                    QuestionDialog
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.ErrorDialog()}>
                    ErrorDialog
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.FileDialog()}>
                    FileDialog
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.SaveFileDialog()}>
                    SaveFileDialog
                </button>
            </div>
        </section>
        {separator}
        <section>
            <h2>Events</h2>
        </section>
        {separator}
        <section>
            <h2>Badges</h2>
        </section>
        {separator}
        <section>
            <h2>Notifications</h2>
        </section>
        {separator}
        <section>
            <h2>System Tray</h2>
        </section>
    </div>);
}

export default Example;
