import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link, useLocation, useMatches} from 'react-router-dom';
import classNames from 'classnames';
import {Icon} from "@iconify/react";
import {ui} from "@/const/ui";
import {Menu} from "@/router/type";

type SettingHeaderProps = {
}

function SettingHeader(props: SettingHeaderProps) {
    const {t} = useTranslation();
    const location = useLocation();

    const matches = useMatches();
    // 从useMatches获取菜单数据
    const rootMatch = matches?.[0];
    const data = rootMatch?.data as { menus?: Menu[] };
    const menus: Menu[] = data?.menus ?? [];


    // 获取当前最后一级匹配的 route
    const current = matches[matches.length - 1];
    console.log('matches current', current);
    // 如果当前 route 有 children（在 createBrowserRouter 配置里定义的）
    // const subRoutes = current?.route?.children?.filter(r => r.element) ?? [];


    const activeClass = classNames(ui.theme.defaultActiveBgClass, ui.theme.defaultActiveTextClass);
    const menuItemStyle = classNames('flex flex-col justify-center items-center px-2 py-1 rounded min-w-10', ui.theme.defaultHoverBgClass, ui.theme.defaultHoverTextClass);

    return (
        <div className="dark:bg-gray-700">
            <header className='text-center py-1'>
                设置
            </header>
            <nav className="flex space-x-1 justify-center items-end pb-1" aria-label="Tabs">
                {menus.map((menu) => {
                    const isActive = location.pathname === menu.path ||
                        (menu.path === '/settings/general' && location.pathname === '/settings');

                    return (
                        <Link
                            key={menu.name}
                            to={menu.path!}
                            className={classNames(
                                menuItemStyle,
                                isActive ? activeClass : ''
                            )}
                        >
                            {menu.icon && <Icon icon={menu.icon} className='text-2xl font-extralight'/>}
                            <span className='text-sm mt-0.5'>{t(menu.name)}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default SettingHeader;
