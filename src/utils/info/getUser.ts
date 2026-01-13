import { getCookies } from '../cookies/cookies';

export function getUser() {
    let userData = null;

    try {
        const cookieUser = getCookies('user');
        if (cookieUser) userData = JSON.parse(cookieUser);
    } catch {}

    if (!userData) {
        try {
            const localUser = localStorage.getItem('user');
            if (localUser) userData = JSON.parse(localUser);
        } catch {}
    }

    return userData;
}
