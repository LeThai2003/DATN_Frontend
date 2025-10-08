import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Nếu có hash (ví dụ: #section-1) thì không scroll lên đầu
        if (hash) return;

        // Scroll lên đầu trang
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
