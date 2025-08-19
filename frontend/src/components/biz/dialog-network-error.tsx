import React from 'react';

import {useTranslation} from "react-i18next";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";


type DialogNetworkErrorProps = {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    onRetry: () => void
}

// 更新弹窗组件
const DialogNetworkError = (props: DialogNetworkErrorProps) => {
    const {t} = useTranslation();

    // 如果是强制更新，添加模糊背景效果
    return (<>
        <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
            <AlertDialogContent className={'bg-white dark:bg-black'}>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-red-600'>网络错误!</AlertDialogTitle>
                    <AlertDialogDescription>
                        连接服务器失败，请检查网络重试！
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => props.onRetry()}>重试</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>);
};

export default DialogNetworkError;
