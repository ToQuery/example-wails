import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link, useLocation} from 'react-router-dom';
import classNames from 'classnames';
import {Menu} from "@/components/sidebar/sidebar";
import {Icon} from "@iconify/react";
import {ui} from "@/const/ui";

type SettingHeaderProps = {
    menus: Menu[];
}

function SettingHeader(props: SettingHeaderProps) {
    const {t} = useTranslation();
    const location = useLocation();

    const activeClass = classNames(ui.theme.defaultActiveBgClass, ui.theme.defaultActiveTextClass);
    const menuItemStyle = classNames('flex flex-col justify-center items-center px-2 py-1 rounded', ui.theme.defaultHoverBgClass, ui.theme.defaultHoverTextClass);

    return (
        <div className="bg-gray-100 dark:bg-gray-700">
            <header className='text-center py-1'>
                设置
            </header>
            <nav className="flex space-x-1 justify-center items-end pb-1" aria-label="Tabs">
                {props.menus.map((menu) => {
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
                            {menu.icon && <Icon icon={menu.icon} className='text-3xl'/>}
                            <span className='text-sm mt-1'>{t(menu.name)}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default SettingHeader;
