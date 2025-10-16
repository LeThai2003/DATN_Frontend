import ServiceCard from '@/components/cards/services/ServiceCard';
import HeroSection from '@/components/layouts/patients/HeroSection';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { fetchFirst } from '@/stores/actions/managers/services/service.action';
import { common } from '@/stores/reducers';
import { selectLoadingPage, selectServices } from '@/stores/selectors/services/service.selector';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const employees = [
    {
        employee_id: 1,
        account_id: 101,
        fullname: 'Nguyễn Văn A',
        email: 'a.nguyen@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        dob: '1980-05-12',
        specialization_id: 1,
        specialization_name: 'Nội tổng quát',
        room_id: 1,
        room_name: 'Phòng Khám Nội Tổng Quát',
        summary_profile: `Tốt nghiệp Bác sĩ Đa khoa tại Đại học Y Hà Nội (2004). Hơn 18 năm kinh nghiệm trong lĩnh vực Nội tổng quát, đặc biệt trong chẩn đoán và điều trị các bệnh lý mạn tính như tiểu đường, cao huyết áp, viêm gan và bệnh dạ dày. Nguyên bác sĩ tại Bệnh viện Bạch Mai, hiện đang công tác tại Phòng Khám Nội Tổng Quát.`,
    },
    {
        employee_id: 3,
        account_id: 103,
        fullname: 'Phạm Văn C',
        email: 'c.pham@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        dob: '20-09-1985',
        specialization_id: 3,
        specialization_name: 'Tim mạch',
        room_id: 1,
        room_name: 'Phòng Khám Nội Tổng Quát',
        summary_profile: `Tốt nghiệp Bác sĩ Chuyên khoa I – Tim mạch tại Đại học Y Dược TP.HCM (2012). Có hơn 12 năm kinh nghiệm trong điều trị các bệnh lý tim mạch như tăng huyết áp, suy tim, rối loạn nhịp tim và bệnh mạch vành. Từng công tác tại Viện Tim TP.HCM trước khi gia nhập đội ngũ của phòng khám.`,
    },
    {
        employee_id: 5,
        account_id: 109,
        fullname: 'Nguyễn Thị D',
        email: 'd.nguyen@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=5',
        dob: '08-11-1990',
        specialization_id: 1,
        specialization_name: 'Nội tổng quát',
        room_id: 1,
        room_name: 'Phòng Khám Nội Tổng Quát',
        summary_profile: `Bác sĩ trẻ, năng động, tốt nghiệp Đại học Y Dược Thái Nguyên (2015). Có kinh nghiệm trong khám và điều trị bệnh lý nội khoa thường gặp, tư vấn sức khỏe định kỳ và chăm sóc bệnh nhân mạn tính. Luôn đặt lợi ích và sự an toàn của người bệnh lên hàng đầu.`,
    },
    {
        employee_id: 7,
        account_id: 106,
        fullname: 'Phạm Văn C',
        email: 'c.pham@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        dob: '1987-03-18',
        specialization_id: 3,
        specialization_name: 'Tim mạch',
        room_id: 2,
        room_name: 'Phòng Khám Nhi',
        summary_profile: `Tốt nghiệp Đại học Y Dược Cần Thơ (2010), có hơn 10 năm kinh nghiệm trong khám và điều trị bệnh lý tim mạch ở cả người lớn và trẻ em. Từng công tác tại Bệnh viện Nhi Đồng 1, hiện là bác sĩ chuyên khoa Tim mạch tại Phòng Khám Nhi.`,
    },
];

const services = [
    {
        id: 1,
        name: 'Khám Nội tổng quát',
        image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/kham_noi_tong_quat_la_gi_kham_noi_tong_quat_gom_nhung_gi_2_3d3c79fa26.jpg',
        description: 'Kiểm tra sức khỏe định kỳ, tư vấn điều trị toàn thân.',
        price: 300000,
        doctors: [employees[0], employees[1]],
    },
    {
        id: 2,
        name: 'Khám Ngoại',
        image: 'https://pkdksaigonvungtau.com/wp-content/uploads/2018/01/khoa-noi-280x280.png',
        description: `Dịch vụ Khám Ngoại tập trung vào chẩn đoán và điều trị các bệnh lý liên quan đến hệ cơ xương khớp, chấn thương, vết thương phần mềm, gãy xương, thoát vị, viêm ruột thừa, trĩ, u bướu dưới da, v.v. Bác sĩ Ngoại sẽ thăm khám, chỉ định cận lâm sàng (siêu âm, X-quang, xét nghiệm…) và tư vấn phương án điều trị nội khoa hoặc phẫu thuật khi cần thiết. 
`,
        price: 500000,
        doctors: [employees[1], employees[2]],
    },
    {
        id: 3,
        name: 'Khám Da liễu',
        image: 'https://www.umcclinic.com.vn/Data/Sites/1/media/y-hoc-thuong-thuc/da-li%E1%BB%85u/khi-n%C3%A0o-c%E1%BA%A7n-kh%C3%A1m-chuy%C3%AAn-khoa-da-li%E1%BB%85u/bac-si-tham-kham-da-lieu.jpg',
        description: 'Chăm sóc và điều trị các bệnh lý về da.',
        price: 250000,
        doctors: [employees[2]],
    },
];

const Home = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const servicesList = useSelector(selectServices);
    const loadingPage = useSelector(selectLoadingPage);

    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    return (
        <div className="">
            <HeroSection />

            <section className="py-16">
                <div className="relative container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10 text-gray-800">
                        Dịch vụ của chúng tôi
                    </h2>

                    {loadingPage && <LoadingSpinAntD />}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesList?.data?.slice(0, 3).map((service) => (
                            <ServiceCard key={service?.serviceId} service={service} />
                        ))}
                    </div>
                    <Button
                        color="primary"
                        variant="text"
                        onClick={() => navigate('/services')}
                        className="mt-4"
                        size="large"
                    >
                        Xem tất cả dịch vụ
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
