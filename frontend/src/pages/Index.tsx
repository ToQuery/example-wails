import React, {useState} from 'react';

function Index() {
    const [count, setCount] = useState(0);
    const butClass = 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95';

    return (
        <div className="space-y-6">
            <p>首页</p>
            <div>
                <button
                    type="button"
                    onClick={() => setCount(count + 1)}
                    className={butClass}
                >
                    计数器：{count}
                </button>
            </div>
        </div>
    );
}

export default Index;
