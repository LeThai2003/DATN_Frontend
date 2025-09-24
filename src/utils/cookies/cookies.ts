import Cookies from 'js-cookie';

export const setCookies = (key: string, value: any, time: number) => {
    Cookies.set(key, value, {
        expires: time,
        secure: false,
        sameSite: 'Strict',
    });
};

export const getCookies = (key: string) => {
    return Cookies.get(key);
};

export const deleteCookies = (key: string) => {
    Cookies.remove(key);
};

export const deleteAllCookies = () => {
    const allCookies = Cookies.get(); // trả về object: { key1: value1, key2: value2, ... }

    Object.keys(allCookies).forEach((cookieName) => {
        Cookies.remove(cookieName);
    });
};
