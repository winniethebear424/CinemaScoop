// import { useRouter } from 'next/router';
import Link from "next/link";
import {useTranslation} from 'react-i18next';
import { useContext } from "react";   

const Footer = () => {
  const{t} = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">{t('siteName')}</div>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-gray-400">
            {t('home')}
            </Link>
            <Link href="/about" className="hover:text-gray-400">
            {t('about')}
            </Link>
            <Link href="/contact" className="hover:text-gray-400">
            {t('contact')}
            </Link>
          </nav>
        </div>
        <div className="mt-4">
          &copy; {new Date().getFullYear()} {t('siteName')}. {t('rightsReserved')}.
        </div>
      </div>
    </footer>
  );
};



export default Footer;