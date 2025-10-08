import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router';

const ButtonTurnBack = ({ link }: { link: string }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(`${link}`)}
            className="flex items-center gap-2 px-4 py-[6px] rounded-md border border-gray-200 bg-white shadow-sm 
                        text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all duration-200"
        >
            <IoMdArrowBack className="text-lg mt-[2px]" />
            <span className="font-medium">Quay lại</span>
        </button>
    );
};

export default ButtonTurnBack;
