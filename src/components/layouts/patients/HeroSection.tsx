import React from 'react';

const HeroSection = () => {
    return (
        <section
            className="relative h-screen bg-cover flex items-center justify-center text-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80')",
            }}
        >
            <div className="bg-black bg-opacity-40 absolute inset-0"></div>
            <div className="relative z-10 text-white px-6 mt-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">
                    Chào mừng đến với Phòng khám Sức Khỏe!
                </h1>
                <p className="text-lg md:text-xl mb-6 text-slate-200">
                    Nơi chăm sóc sức khỏe toàn diện cho bạn và gia đình.
                </p>
                <a
                    href="/services"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition"
                >
                    Đặt lịch hẹn ngay
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
