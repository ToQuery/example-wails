import React from 'react';
import logo from '../assets/images/logo-universal.png';

function Setting() {

  return (
    <section className="space-y-4">
      <div className="flex gap-4 items-center">
        <img src={logo} alt="logo" className="w-10 h-10 select-none" />
        <h1 className="text-2xl">Wails And React</h1>
      </div>

      <div className="flex items-end gap-4">
        <p>版本：v1.0</p>
        <p className="p-1 text-sm bg-slate-100 rounded-lg text-red-400">有新版本</p>
      </div>

    </section>
  );
}

export default Setting;
