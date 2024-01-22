import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import { appSelector } from 'redux/slice/app.slice';
import { useAppSelector } from 'hooks';

const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'en':
      return import('utils/locales/en.json');
    default:
      return import('utils/locales/vn.json');
  }
};

type Props = {
  children: React.ReactNode;
};

const Locales: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<{ [key: string]: string }>();

  const { language } = useAppSelector(appSelector);

  useEffect(() => {
    loadLocaleData(language).then((d: { default: { [key: string]: string } }) => {
      setMessages(d.default);
    });
  }, [language]);

  return (
    <IntlProvider locale={language} defaultLocale="en" messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default Locales;
