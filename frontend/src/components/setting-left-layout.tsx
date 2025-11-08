import {Link, Outlet, useMatches} from "react-router-dom";
import React from "react";
import {Icon} from "@iconify/react";
import {useTranslation} from "react-i18next";
import {Menu} from "@/lib/route";
import {SettingRouters} from "../../config/routes";

type SettingLeftProps = {
}

function SettingLeftLayout(props: SettingLeftProps) {
    const {t} = useTranslation();

    const matches = useMatches();
    // 从useMatches获取菜单数据
    const rootMatch = matches?.[0];
    const data = rootMatch?.data as { menus?: Menu[] };
    const menus: Menu[] = data?.menus ?? [];


    return (
        <div className="flex h-full">
            {/* 左侧导航栏 */}
            <div className=" h-full w-48 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700">
                <nav className="p-4 space-y-2">
                    {menus.map((menu, index) => (
                        <Link to={menu.path!}
                              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                            <Icon icon={menu.icon!} className="mr-3"/>
                            {t(menu.name)}
                        </Link>
                    ))}

                </nav>
            </div>

            {/* 右侧内容区域 */}
            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
                <Outlet/>
            </div>
        </div>
    );
}

export default SettingLeftLayout;
