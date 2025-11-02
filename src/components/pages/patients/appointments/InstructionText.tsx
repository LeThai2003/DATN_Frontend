import React from 'react';

const InstructionText = () => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-gray-800 inline-block">
            <h3 className="font-bold text-lg mb-2 text-yellow-700">⚠️ Các bước đặt lịch khám:</h3>
            <ol className="space-y-1 list-decimal list-inside text-sm leading-relaxed">
                <li>
                    Kiểm tra <span className="font-semibold">thông tin dịch vụ</span>.
                </li>
                <li>
                    Điền đầy đủ <span className="font-semibold">thông tin người khám</span> và nhấn
                    {/* <span className="font-semibold text-yellow-700"> "Lưu thông tin"</span>. */}
                </li>
                <li>
                    Tích chọn <span className="font-semibold">bác sĩ phụ trách</span> ở đầu dòng và
                    chọn
                    <span className="font-semibold"> thời gian khám mong muốn</span> dưới bảng bác
                    sĩ, sau đó nhấn
                    {/* <span className="font-semibold text-yellow-700"> "Lưu bác sĩ và giờ khám"</span> */}
                    .
                </li>
                <li>
                    Kiểm tra lại thông tin và nhấn
                    <span className="font-semibold text-yellow-700"> "Xác nhận"</span> để đến bước
                    thanh toán.
                </li>
            </ol>
        </div>
    );
};

export default InstructionText;
