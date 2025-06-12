import React from 'react';
import classNames from "classnames";
import {Icon} from '@iconify/react';

import {useTranslation} from "react-i18next";
import {ui} from "@/const/ui";


type DialogNetworkErrorProps = {
    onRetry: () => void
}

// 更新弹窗组件
const DialogNetworkError = (props: DialogNetworkErrorProps) => {
    const {t} = useTranslation();

    // 如果是强制更新，添加模糊背景效果
    return (<>
        {/* 模态框内容 */}
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
            <div
                className="w-full max-w-md rounded-xl bg-white dark:bg-slate-800 shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out">
                {/* 模态框头部 */}
                <div className={classNames(ui.theme.defaultBgClass, "p-4 text-white dark:text-white")}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center">
                            <Icon icon="material-symbols:error-outline" className="mr-2 text-xl"/>
                            网络错误
                        </h3>
                    </div>
                </div>

                {/* 模态框内容 */}
                <div className="p-5">
                    <div className="mb-4">

                        <div className="mb-4 text-left">
                            连接服务器失败，请检查网络重试！
                        </div>

                    </div>

                    {/* 模态框底部 */}
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => props.onRetry()}
                            className={classNames(ui.theme.defaultBgClass, "px-4 py-2 rounded-lg text-white dark:text-white font-medium hover:shadow-lg transition-all transform hover:scale-105")}
                        >
                            <div className="flex items-center">
                                <Icon icon="material-symbols:refresh" className="mr-1"/>
                                重试
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default DialogNetworkError
;
