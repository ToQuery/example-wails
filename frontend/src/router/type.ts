// ======================
// Menu 类型定义
// ======================
type RequireOneOf<T, Keys extends keyof T = keyof T> =
    Omit<T, Keys> & {
    [K in Keys]-?: Required<Pick<T, K>> &
    Partial<Omit<Pick<T, Keys>, K>>;
}[Keys];

export interface BaseMenu {
    name: string;
    path?: string;
    icon?: string;
    index?: boolean;
    render?: React.ReactNode;
    page?: React.ReactNode;
    layout?: React.ReactNode;
    children?: Menu[];
    footer?: boolean;
    hidden?: boolean;
}

export type Menu = RequireOneOf<BaseMenu, 'render' | 'page' | 'layout'>;
