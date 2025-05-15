import React from 'react';
import { useTranslation } from 'react-i18next';

function User() {
  const { t } = useTranslation();

  return (
      <div className='bg-gray-100 w-full h-full'>
        <h1 className="text-xl font-bold">{t('page.user.title')}</h1>
      </div>
  );
}

export default User;
