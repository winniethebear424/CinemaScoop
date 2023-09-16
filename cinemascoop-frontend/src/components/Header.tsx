import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useEffect } from "react";   
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/authSlice';
import { useRouter } from 'next/router';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleContext from "@/LocaleContext";


const Header = () => {
  const { t } = useTranslation();
  const { locale, setLocale } = useContext(LocaleContext);
  const [searchValue, setSearchValue] = useState("");   
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();


  const fetchAccessToken = async () => {
    try {
      const response = await fetch("/api/auth/token");
      if (response.ok) {
        const data = await response.json();
        dispatch(setToken(data.accessToken));
      } else {
        console.error("Error fetching access token");
      }
    } catch (error) {
      console.error("Failed to fetch access token:", error);
    }
  };
  

  const handleSearch = () => {
    if (searchValue) {
          router.push(`/movies/search?keyword=${searchValue}`);
    }
};



  useEffect(() => {
    if (user) {
      fetchAccessToken();
    }
  }, [user]);
  
  return (
    <header className="py-4 px-5 bg-gray-800 flex justify-between items-center">
      <Link href="/" className="text-xl font-medium text-white">
        {t('movieApp')}
      </Link>
      {/* //yyyy: Search box  */}
      <div className="ml-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="SearchMovie"
          // {t('SearchMovie')}
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}        
          className="border-2 border-gray-300 rounded-lg px-4 py-2"
        />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
          {t('search')}
        </button>
        </div>

        {/* Pass searchResults as a prop to Content */}
      {!!user ? (
        <div className="flex justify-between items-center gap-5">
          <Image src={user.picture || ""} alt={user.name || ""} height={50} width={50} />
          <Link className="text-xl font-medium text-white" href="/api/auth/logout">{t('logout')}</Link>
        </div>
      ) : (
        <Link className="text-xl font-medium text-white" href="/api/auth/login">{t('login')}</Link>
      )}    
      
    </header>
  );
};

export default Header;
