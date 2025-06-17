import {Outlet} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {SettingRouters} from "../../config/routes";
import SettingHeader from "@/components/setting/setting-header";

function SettingLayout() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-w-screen min-h-screen overflow-hidden">
            {/* 顶部导航栏 */}
            <SettingHeader menus={SettingRouters}  />

            {/* 内容区域 */}
            <div className="grow bg-gray-50 dark:bg-gray-900">
                <Outlet />
            </div>
        </div>
    );
}

export default SettingLayout;
