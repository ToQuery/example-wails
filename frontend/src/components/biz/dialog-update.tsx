import React from 'react';
import classNames from "classnames";
import {Icon} from '@iconify/react';
import {Browser} from "@wailsio/runtime";

import {DefaultBgClass, DefaultPrimaryColorClass} from '@/provider/config';
import {useTranslation} from "react-i18next";

// 更新信息接口
export interface UpdateInfo {
    version: string;
    versionCode: number;
    forceUpdate: boolean;
    changelog: string;
    downloadUrl: string;
}

type DialogUpdateProps = {
    updateInfo: UpdateInfo;
    onClose: () => void;
}

// 更新弹窗组件
const DialogUpdate = (props: DialogUpdateProps) => {
    const {t} = useTranslation();


    // 如果是强制更新，添加模糊背景效果
    return (<>
        {/* 模态框内容 */}
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
            <div
                className="w-full max-w-md rounded-xl bg-white dark:bg-slate-800 shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out">
                {/* 模态框头部 */}
                <div className={classNames(DefaultPrimaryColorClass, "p-4 text-white dark:text-white")}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center">
                            <Icon icon="mdi:update" className="mr-2 text-xl"/>
                            {t('app.update.new-version')}
                        </h3>
                        {!props.updateInfo.forceUpdate && (
                            <button
                                onClick={() => props.onClose()}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <Icon icon="mdi:close" className="text-xl"/>
                            </button>
                        )}
                    </div>
                </div>

                {/* 模态框内容 */}
                <div className="p-5">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 dark:text-gray-300">{t('app.update.version')}</span>
                            <span
                                className="font-semibold text-blue-600 dark:text-blue-400">{props.updateInfo.version}</span>
                        </div>

                        <div className="mb-4 text-left">
                            <div className="text-gray-600 dark:text-gray-300 mb-1">{t('app.update.changelog')}</div>
                            <div
                                className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg text-sm whitespace-pre-line">
                                {props.updateInfo.changelog}
                            </div>
                        </div>

                        {props.updateInfo.forceUpdate && (
                            <div
                                className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-3 mb-4 rounded-r-lg">
                                <div className="flex items-start">
                                    <Icon icon="mdi:alert"
                                          className="text-yellow-500 mr-2 text-xl flex-shrink-0 mt-0.5"/>
                                    <p className="text-yellow-700 dark:text-yellow-200 text-sm">
                                        {t('app.update.force-update-tip')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 模态框底部 */}
                    <div className="flex justify-end space-x-3">
                        {!props.updateInfo.forceUpdate && (
                            <button
                                onClick={() => props.onClose()}
                                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                {t('app.update.later')}
                            </button>
                        )}
                        <button
                            onClick={() => Browser.OpenURL(props.updateInfo.downloadUrl)}
                            className={classNames(DefaultBgClass, "px-4 py-2 rounded-lg text-white dark:text-white font-medium hover:shadow-lg transition-all transform hover:scale-105")}
                        >
                            <div className="flex items-center">
                                <Icon icon="mdi:download" className="mr-1"/>
                                {t('app.update.download-now')}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default DialogUpdate;
