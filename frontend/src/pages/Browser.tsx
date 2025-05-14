import React from "react";
import { useLocation } from "react-router-dom";

const getUrlParam = (search: string) => {
    const params = new URLSearchParams(search);
    return params.get("url") || "";
};

const Browser: React.FC = () => {
    const location = useLocation();
    const url = getUrlParam(location.search);
    const isHttp = url.startsWith("http://") || url.startsWith("https://");

    return (
        <div className='w-full h-full'>
            {isHttp ? (
                <iframe
                    src={url}
                    title="browser-frame"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
            ) : (
                <div style={{ padding: 24, color: 'red' }}>无效或不支持的地址</div>
            )}
        </div>
    );
};

export default Browser;
