import React from 'react';
import {Icon} from '@iconify/react';
import {useTranslation} from "react-i18next";

interface DialogProps {
    show: boolean;
    message?: string;
    contentNode?: React.ReactNode;
}

// Loading 组件
const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    const {t} = useTranslation();

    if (!props.show) return null;

    let contentNode: React.ReactNode = <></>
    if (props.contentNode) {
        contentNode = props.contentNode;
    } else if (props.message) {
        contentNode = (
            <p className="text-gray-700 dark:text-gray-200 font-medium">
                {props.message}
            </p>
        );
    }


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out bg-white/30 backdrop-blur-sm dark:bg-black/30">
            <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="animate-spin text-4xl text-black dark:text-white mb-4">
                    <Icon icon="mdi:loading"/>
                </div>
                <div>
                    {contentNode}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
