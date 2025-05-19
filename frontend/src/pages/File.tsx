import React from 'react';
import {useTranslation} from 'react-i18next';
import {cn} from "@/lib/utils";
import {DirInfoModel} from "../../bindings/example-wails/internal/model";
import {ExampleService} from "../../bindings/example-wails/internal/service";
import {UI} from "@/const";

function File() {
    const {t} = useTranslation();

    const [dirInfo, setDirInfo] = React.useState<DirInfoModel>();

    const dirClass = 'mt-4 space-y-4';

    const separator = <hr className="my-4 border-t border-gray-600 dark:border-gray-400"/>;

    return (
        <div>
            <div className='flex justify-between item-center'>
                <h1 className='w-full'>目录</h1>

                <button className={UI.ui.btn} type="button"
                        onClick={async () => setDirInfo(await ExampleService.GetDirInfo())}>
                    {t('page.file.dir-info')}
                </button>
            </div>
            {separator}
            <section>
                <h2>OS 目录</h2>
                <div className={cn(dirClass)}>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">OS 目录</th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">路径</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">OS TempDir</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.OSTempDir}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">OS UserCacheDir</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.OSUserCacheDir}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">OS UserConfigDir</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.OSUserConfigDir}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">OS UserHomeDir</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.OSUserHomeDir}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            {separator}
            <section>
                <h2>XDG 目录</h2>
                <div className={cn(dirClass)}>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">XDG 目录
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">路径</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG Home</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG DataHome</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGDataHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG ConfigHome</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGConfigHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG StateHome</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGStateHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG CacheHome</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGCacheHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG RuntimeDir</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGRuntimeDir}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG BinHome</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGBinHome}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            {separator}
            <section>
                <h2>XDG 目录列表</h2>
                <div className={cn(dirClass)}>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">XDG
                                目录列表
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">路径</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG DataDirs</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGDataDirs?.join(', ')}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG ConfigDirs</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGConfigDirs?.join(', ')}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG FontDirs</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGFontDirs?.join(', ')}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">XDG ApplicationDirs
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGApplicationDirs?.join(', ')}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            {separator}
            <section>
                <h2>XDG 用户目录</h2>
                <div className={cn(dirClass)}>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">XDG
                                用户目录
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">路径</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Desktop</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.desktop}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Download</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.download}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Documents</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.documents}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Music</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.music}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Pictures</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.pictures}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Videos</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.videos}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Templates</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.templates}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">PublicShare</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.publicShare}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
}

export default File;
