import React, { createContext, useContext, useState } from 'react';

const defaultValue = {
    locale: 'zh-CN',
    setLocale:(newLocale)=>{},
}

export default createContext(defaultValue);