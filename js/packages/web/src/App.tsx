import React from 'react';
import { Routes } from './routes';
// import { Routes } from './views/preLaunch/routes'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import localeEn from '../locale/en.json';
import localeJa from '../locale/ja.json';

i18n.load('en', localeEn);
i18n.load('ja', localeJa);
i18n.activate('ja');

function App() {
  return (
    <I18nProvider i18n={i18n}>
      <Routes />
    </I18nProvider>
  )
}

export default App;
