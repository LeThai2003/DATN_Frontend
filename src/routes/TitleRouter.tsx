import React, { useEffect } from 'react';

const TitleRouter = ({ title, children }: { title: string; children: React.ReactNode }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return children;
};

export default TitleRouter;
