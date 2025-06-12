import {Outlet} from "react-router-dom";
import React from "react";

function SettingLayout() {

    return (
        <div>
            <h1>SettingLayout</h1>
            <main className="overflow-auto h-full">
                <Outlet/>
            </main>
        </div>
    );
}

export default SettingLayout;
