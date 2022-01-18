import React from 'react';
import { Routes } from './routes';
// import { Routes } from './views/preLaunch/routes'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { CURRENT_LANGUAGE } from './constants/languages';
import localeEn from '../locale/en.json';
import localeJa from '../locale/ja.json';
import { en, ja } from 'make-plural/plurals'

i18n.loadLocaleData({
  en: { plurals: en },
  ja: { plurals: ja },
})

i18n.load('en', localeEn);
i18n.load('ja', localeJa);

function App() {
i18n.activate(CURRENT_LANGUAGE);
  return (
    <I18nProvider i18n={i18n}>
      <Routes />
    </I18nProvider>
  )
}

export default App;
