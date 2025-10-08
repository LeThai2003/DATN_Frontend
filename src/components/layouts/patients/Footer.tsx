import React from 'react';

const Footer = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const subject = formData.get('subject');
        const description = formData.get('description');
        const message = formData.get('message');

        console.log({ email, subject, description, message });
        alert('Cảm ơn bạn đã gửi góp ý! Chúng tôi sẽ phản hồi sớm nhất.');
        e.currentTarget.reset();
    };

    return (
        <footer className="bg-gray-800 text-white py-8 px-6 pb-4">
            <div className="container mx-auto space-y-6">
                <h2 className="text-xl font-bold text-center mb-6 text-slate-100">
                    Góp ý & Liên hệ
                </h2>

                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-700 p-6 rounded-2xl shadow-lg w-full md:w-1/2 space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Email của bạn
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="vd: email@gmail.com"
                                className="w-full p-2 rounded-md text-gray-900 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Tiêu đề</label>
                            <input
                                type="text"
                                name="subject"
                                required
                                placeholder="Nhập tiêu đề góp ý"
                                className="w-full p-2 rounded-md text-gray-900 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Mô tả ngắn</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Tóm tắt nội dung góp ý"
                                className="w-full p-2 rounded-md text-gray-900 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Nội dung chi tiết
                            </label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                placeholder="Nhập nội dung góp ý của bạn..."
                                className="w-full p-2 rounded-md text-gray-900 focus:outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-primary hover:bg-blue-600 transition text-white font-semibold px-4 py-2 rounded-md w-full"
                        >
                            Gửi góp ý
                        </button>
                    </form>

                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.261208736072!2d106.784712488466!3d10.847813331608172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527131ae8b249%3A0x4d2d3c8fab7d3c2e!2zOTcgTWFuIFRoaeG7h24sIEhp4buHcCBQaMO6LCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1759638353469!5m2!1svi!2sus"
                        width="100%"
                        // height={`${window.innerWidth < 586 ? '255' : '485'}`}
                        height="255"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="md:w-1/2 shadow-lg"
                    ></iframe>
                </div>

                <div className="text-center pt-4 border-t border-gray-600">
                    <p className="text-slate-100">
                        © 2025 Phòng khám Sức Khỏe. Mọi quyền được bảo lưu.
                    </p>
                    <p className="text-slate-100">
                        Địa chỉ: 97 Man Thiện, phường Tăng Nhơn Phú, TP. Hồ Chí Minh | Điện thoại:
                        0123 456 789
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
