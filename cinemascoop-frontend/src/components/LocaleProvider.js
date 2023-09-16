import React, { useState } from 'react';
import LocaleContext from './LocaleContext'; // Update the path if needed
import i18n from './i18n'; // Update the path if needed
import { Suspense } from 'react';

function Loading() {
  return <>Loading...</>;
}

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  const handleChange = (event) => {
    const selectedLocale = event.target.value;
    i18n.changeLanguage(selectedLocale);
    setLocale(selectedLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        <div>
          <label>Language:</label>
          <select value={locale} onChange={handleChange}>
            <option value="en">English</option>
            <option value="cn">中文</option>
          </select>
        </div>
        {children}
      </Suspense>
    </LocaleContext.Provider>
  );
}

export default LocaleProvider;