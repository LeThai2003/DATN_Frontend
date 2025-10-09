import React from 'react';

const WelcomeCard = ({ name }) => {
    return (
        <p className="mb-2 font-bold pl-1">
            Xin chào, <span className="text-blue-600">{name}</span>
        </p>
    );
};

export default WelcomeCard;
