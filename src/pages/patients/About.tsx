import React from 'react';
import { Collapse, Card } from 'antd';
import { LuHeartPulse, LuStethoscope, LuUsers } from 'react-icons/lu';

const { Panel } = Collapse;

export default function AboutPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-16 mt-[35px]">
            <div className="container mx-auto">
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary mb-4">Phòng Khám Chúng Tôi</h1>
                    <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
                        Phòng khám <strong>MediClinic - Y tế thông minh</strong> được thành lập với
                        mong muốn mang lại dịch vụ chăm sóc sức khỏe toàn diện, an toàn và tận tâm
                        nhất cho mọi bệnh nhân. Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết
                        bị hiện đại, chúng tôi cam kết mang đến những trải nghiệm tốt nhất cho người
                        bệnh.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-16">
                    <Card
                        bordered={false}
                        className="shadow-md hover:shadow-lg transition rounded-2xl text-center p-6"
                    >
                        <div className="flex justify-center mb-4">
                            <LuHeartPulse className="text-red-500 w-10 h-10" />
                        </div>
                        <h3 className="font-semibold text-xl mb-2">Sứ mệnh</h3>
                        <p className="text-gray-600">
                            Chăm sóc sức khỏe cộng đồng bằng sự tận tâm, chính xác và chu đáo trong
                            từng dịch vụ.
                        </p>
                    </Card>

                    <Card
                        bordered={false}
                        className="shadow-md hover:shadow-lg transition rounded-2xl text-center p-6"
                    >
                        <div className="flex justify-center mb-4">
                            <LuStethoscope className="text-blue-500 w-10 h-10" />
                        </div>
                        <h3 className="font-semibold text-xl mb-2">Tầm nhìn</h3>
                        <p className="text-gray-600">
                            Trở thành phòng khám hàng đầu trong khu vực, hướng tới tiêu chuẩn quốc
                            tế về chất lượng y tế và dịch vụ.
                        </p>
                    </Card>

                    <Card
                        bordered={false}
                        className="shadow-md hover:shadow-lg transition rounded-2xl text-center p-6"
                    >
                        <div className="flex justify-center mb-4">
                            <LuUsers className="text-green-500 w-10 h-10" />
                        </div>
                        <h3 className="font-semibold text-xl mb-2">Giá trị cốt lõi</h3>
                        <p className="text-gray-600">
                            Tận tâm – Chuyên nghiệp – Chính trực – Cải tiến không ngừng vì sức khỏe
                            bệnh nhân.
                        </p>
                    </Card>
                </section>

                <section className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-6">
                        Đội ngũ bác sĩ của chúng tôi
                    </h2>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                        Đội ngũ bác sĩ tại MediClinic đều có nhiều năm kinh nghiệm, chuyên môn vững
                        vàng, luôn đặt sức khỏe và sự an tâm của bệnh nhân lên hàng đầu.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow rounded-2xl p-4">
                            <img
                                src="https://i.pravatar.cc/150?img=12"
                                alt="Bác sĩ An"
                                className="rounded-xl w-full h-56 object-cover mb-3"
                            />
                            <h4 className="font-semibold text-lg">BS. Nguyễn Văn An</h4>
                            <p className="text-gray-500 text-sm">Chuyên khoa Nội tổng quát</p>
                        </div>
                        <div className="bg-white shadow rounded-2xl p-4">
                            <img
                                src="https://i.pravatar.cc/150?img=5"
                                alt="Bác sĩ Bích"
                                className="rounded-xl w-full h-56 object-cover mb-3"
                            />
                            <h4 className="font-semibold text-lg">BS. Trần Thị Bích</h4>
                            <p className="text-gray-500 text-sm">Chuyên khoa Nhi</p>
                        </div>
                        <div className="bg-white shadow rounded-2xl p-4">
                            <img
                                src="https://i.pravatar.cc/150?img=1"
                                alt="Bác sĩ Minh"
                                className="rounded-xl w-full h-56 object-cover mb-3"
                            />
                            <h4 className="font-semibold text-lg">BS. Lê Minh Quân</h4>
                            <p className="text-gray-500 text-sm">Chuyên khoa Tai - Mũi - Họng</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                        Câu hỏi thường gặp
                    </h2>
                    <Collapse accordion bordered={false}>
                        <Panel header="Phòng khám làm việc vào những giờ nào?" key="1">
                            <p>
                                Phòng khám mở cửa từ <strong>7:00 sáng đến 18:00 tối</strong> tất cả
                                các ngày trong tuần, bao gồm cả Thứ 7 và Chủ nhật.
                            </p>
                        </Panel>
                        <Panel header="Tôi có cần đặt lịch trước khi đến không?" key="2">
                            <p>
                                Quý khách có thể <strong>đặt lịch trước</strong> để tránh thời gian
                                chờ đợi. Tuy nhiên, chúng tôi vẫn tiếp nhận bệnh nhân đến trực tiếp.
                            </p>
                        </Panel>
                        <Panel
                            header="Phòng khám có hỗ trợ thanh toán bảo hiểm y tế không?"
                            key="3"
                        >
                            <p>
                                Hiện tại, chúng tôi đang liên kết với một số công ty bảo hiểm. Vui
                                lòng liên hệ quầy lễ tân để được hướng dẫn chi tiết.
                            </p>
                        </Panel>
                        <Panel header="Tôi có thể nhận kết quả khám online không?" key="4">
                            <p>
                                Có. Sau khi hoàn tất buổi khám, bạn có thể nhận kết quả qua bằng
                                cách truy cập vào trang “Lịch sử khám bệnh” trong tài khoản của bạn.
                            </p>
                        </Panel>
                    </Collapse>
                </section>
            </div>
        </div>
    );
}
