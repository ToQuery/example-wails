const btnClass = 'text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95';

const DefaultPrimaryColorClass = 'bg-blue-600 dark:text-blue-500';

// 侧边栏导航激活样式
const DefaultBgClass = 'dark:bg-slate-800';
const DefaultTextClass = 'text-gray-500 dark:text-gray-200';

const DefaultHoverBgClass = 'hover:bg-blue-400/20 dark:hover:bg-gray-600';
const DefaultHoverTextClass = 'hover:text-blue-600 dark:hover:text-blue-400';

const DefaultActiveBgClass = '';
const DefaultActiveTextClass = 'text-blue-500 dark:text-blue-400';


export const ui = {
    btn: btnClass,
    theme: {
       defaultPrimaryColorClass: DefaultPrimaryColorClass,
       defaultBgClass: DefaultBgClass,
       defaultTextClass: DefaultTextClass,
       defaultHoverBgClass: DefaultHoverBgClass,
       defaultHoverTextClass: DefaultHoverTextClass,
       defaultActiveBgClass: DefaultActiveBgClass,
       defaultActiveTextClass: DefaultActiveTextClass,
    }
}
