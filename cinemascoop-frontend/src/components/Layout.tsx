
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import  { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LocaleContext from "@/LocaleContext";

const Layout = ({ children }: any) => {
    const { t } = useTranslation();
    const { locale, setLocale } = useContext(LocaleContext);
    const [selectedLanguage, setSelectedLanguage] = useState(locale);
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedLocale = event.target.value;
      setLocale(selectedLocale);
  };

    useEffect(() => {
      setSelectedLanguage(locale);
  }, [locale]);
  

      return (
        <>
          <div>
            <label>{t("language")}</label>
            <select value={selectedLanguage} onChange={handleChange}>
              <option value="en">English</option>
              <option value="cn">中文</option>
            </select>
          </div>
          <Header />
          {children}
          <Footer />
        </>
      );
};

export default Layout;
