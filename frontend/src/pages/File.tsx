import React from 'react';
import {useTranslation} from 'react-i18next';

import {DirInfoModel} from "../../bindings/example-wails/internal/model";
import {ExampleService} from "../../bindings/example-wails/internal/service";
import classNames from "classnames";
import {Button} from "@/components/ui/button";

function File() {
    const {t} = useTranslation();

    const [dirInfo, setDirInfo] = React.useState<DirInfoModel>();

    const dirClass = 'mt-4 space-y-4';

    const separator = <hr className="my-4 border-t border-gray-600 dark:border-gray-400"/>;

    return (
        <div className='p-4'>
            <div className='flex justify-between item-center'>
                <h1 className='w-full'>{t('page.file.directory')}</h1>

                <Button onClick={async () => {
                            ExampleService.GetDirInfo().then(exchange => {
                                if (exchange.success && exchange.data){
                                    setDirInfo(exchange.data);
                                }
                            });
                        }}>
                    {t('page.file.dir-info')}
                </Button>
            </div>
            {separator}
            <section>
                <h2>{t('page.file.os_directory')}</h2>
                <div className={classNames(dirClass)}>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('page.file.os_directory')}</th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('page.file.path')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.os_temp_dir')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.OSTempDir}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.os_user_cache_dir')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.OSUserCacheDir}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.os_user_config_dir')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.OSUserConfigDir}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.os_user_home_dir')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.OSUserHomeDir}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.file.xdg_directory')}</h2>
                <div className={classNames(dirClass)}>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('page.file.xdg_directory')}
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('page.file.path')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_home')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_data_home')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGDataHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_config_home')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGConfigHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_state_home')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGStateHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_cache_home')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGCacheHome}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_runtime_dir')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGRuntimeDir}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_bin_home')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGBinHome}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.file.xdg_directory_list')}</h2>
                <div className={classNames(dirClass)}>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('page.file.xdg_directory_list')}
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('page.file.path')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_data_dirs')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGDataDirs?.join(', ')}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_config_dirs')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGConfigDirs?.join(', ')}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_font_dirs')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGFontDirs?.join(', ')}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.xdg_application_dirs')}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGApplicationDirs?.join(', ')}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            {separator}
            <section>
                <h2>{t('page.file.xdg_user_directory')}</h2>
                <div className={classNames(dirClass)}>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('page.file.xdg_user_directory')}
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('page.file.path')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.desktop')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.desktop}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.download')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.download}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.documents')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.documents}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.music')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.music}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.pictures')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.pictures}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.videos')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.videos}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.templates')}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{dirInfo?.XDGUserDirs?.templates}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('page.file.public_share')}</td>
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
