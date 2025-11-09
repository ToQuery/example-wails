import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const getUrlParam = (search: string) => {
    const params = new URLSearchParams(search);
    return params.get("url") || "";
};

const BrowserPage: React.FC = () => {
    const { t } = useTranslation();
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
                <div style={{ padding: 24, color: 'red' }}>{t('page.browser.invalid_url')}</div>
            )}
        </div>
    );
};

export default BrowserPage;
