import React from "react";
import {ExampleService} from '../../bindings/example-wails/internal/service';

function Example() {
    const butClass = 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95';

    return (<div>
        <section>
            <h1>Clipboard</h1>
            <div>
                <button className={butClass} type="button" onClick={() => ExampleService.Dialog('Wails')}>
                    Clipboard
                </button>
            </div>
        </section>
        <section>
            <h1>Context Menus</h1>
        </section>
        <section>
            <h1>Menu Reference</h1>
        </section>
        <section>
            <h1>Application Menu</h1>
        </section>

        <section>
            <h1>Dialog</h1>
            <div>
                <button className={butClass} type="button" onClick={() => ExampleService.InfoDialog()}>
                    InfoDialog
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.QuestionDialog()}>
                    QuestionDialog
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.ErrorDialog()}>
                    ErrorDialog
                </button>
            </div>
            <div>
                <button className={butClass} type="button" onClick={() => ExampleService.FileDialog()}>
                    FileDialog
                </button>
                <button className={butClass} type="button" onClick={() => ExampleService.SaveFileDialog()}>
                    SaveFileDialog
                </button>
            </div>
        </section>

        <section>
            <h1>Events</h1>
        </section>
        <section>
            <h1>Badges</h1>
        </section>
        <section>
            <h1>Notifications</h1>
        </section>
        <section>
            <h1>System Tray</h1>
        </section>
    </div>);
}

export default Example;
