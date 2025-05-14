import React from 'react';
import { useTranslation } from 'react-i18next';

function User() {
  const { t } = useTranslation();

  return (
    <h1 className="text-xl font-bold">{t('page.user.title')}</h1>
  );
}

export default User;
