import ServiceCard from '@/components/cards/services/ServiceCard';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { initFilterService } from '@/defaultValues/services/service_default';
import { fetchFirst, loadPage } from '@/stores/actions/managers/services/service.action';
import { service } from '@/stores/reducers';
import {
    selectFilter,
    selectLoadingPage,
    selectServices,
} from '@/stores/selectors/services/service.selector';
import { Empty, Pagination, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
        summary_profile: `Tốt nghiệp Bác sĩ Đa khoa tại Đại học Y Hà Nội (2004). 
Hơn 18 năm kinh nghiệm trong lĩnh vực Nội tổng quát, đặc biệt trong chẩn đoán và điều trị các bệnh lý mạn tính như tiểu đường, cao huyết áp, viêm gan và bệnh dạ dày. 
Nguyên bác sĩ tại Bệnh viện Bạch Mai, hiện đang công tác tại Phòng Khám Nội Tổng Quát.`,
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
        summary_profile: `Tốt nghiệp Bác sĩ Chuyên khoa I – Tim mạch tại Đại học Y Dược TP.HCM (2012). 
Có hơn 12 năm kinh nghiệm trong điều trị các bệnh lý tim mạch như tăng huyết áp, suy tim, rối loạn nhịp tim và bệnh mạch vành. 
Từng công tác tại Viện Tim TP.HCM trước khi gia nhập đội ngũ của phòng khám.`,
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
        summary_profile: `Bác sĩ trẻ, năng động, tốt nghiệp Đại học Y Dược Thái Nguyên (2015). 
Có kinh nghiệm trong khám và điều trị bệnh lý nội khoa thường gặp, tư vấn sức khỏe định kỳ và chăm sóc bệnh nhân mạn tính. 
Luôn đặt lợi ích và sự an toàn của người bệnh lên hàng đầu.`,
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
        summary_profile: `Tốt nghiệp Đại học Y Dược Cần Thơ (2010), 
có hơn 10 năm kinh nghiệm trong khám và điều trị bệnh lý tim mạch ở cả người lớn và trẻ em. 
Từng công tác tại Bệnh viện Nhi Đồng 1, hiện là bác sĩ chuyên khoa Tim mạch tại Phòng Khám Nhi.`,
    },
];

const services = [
    {
        service_id: 1,
        name: 'Khám Nội tổng quát',
        image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/kham_noi_tong_quat_la_gi_kham_noi_tong_quat_gom_nhung_gi_2_3d3c79fa26.jpg',
        description: `Dịch vụ Khám Nội tổng quát giúp phát hiện sớm các bệnh lý tiềm ẩn, kiểm tra sức khỏe toàn thân, tư vấn chế độ dinh dưỡng và sinh hoạt hợp lý. Bệnh nhân sẽ được thăm khám lâm sàng, chỉ định xét nghiệm máu, nước tiểu, chẩn đoán hình ảnh (Siêu âm, X-quang, ECG...) để đánh giá tổng thể tình trạng sức khỏe.`,
        price: 300000,
        doctors: [employees[0], employees[1]],
    },
    {
        service_id: 2,
        name: 'Khám Ngoại',
        image: 'https://pkdksaigonvungtau.com/wp-content/uploads/2018/01/khoa-noi-280x280.png',
        description: `Dịch vụ Khám Ngoại tập trung vào chẩn đoán và điều trị các bệnh lý liên quan đến hệ cơ xương khớp, chấn thương, vết thương phần mềm, gãy xương, thoát vị, viêm ruột thừa, trĩ, u bướu dưới da, v.v. Bác sĩ Ngoại sẽ thăm khám, chỉ định cận lâm sàng (siêu âm, X-quang, xét nghiệm…) và tư vấn phương án điều trị nội khoa hoặc phẫu thuật khi cần thiết. Dịch vụ giúp người bệnh được chẩn đoán nhanh chóng, an toàn và hiệu quả.`,
        price: 500000,
        doctors: [employees[1], employees[2]],
    },
    {
        service_id: 3,
        name: 'Khám Da liễu',
        image: 'https://www.umcclinic.com.vn/Data/Sites/1/media/y-hoc-thuong-thuc/da-li%E1%BB%85u/khi-n%C3%A0o-c%E1%BA%A7n-kh%C3%A1m-chuy%C3%AAn-khoa-da-li%E1%BB%85u/bac-si-tham-kham-da-lieu.jpg',
        description: `Dịch vụ Khám Da liễu chuyên chẩn đoán, tư vấn và điều trị các bệnh lý về da như mụn trứng cá, viêm da, nấm da, dị ứng, nám, tàn nhang, rụng tóc và lão hóa da. Bác sĩ Da liễu sẽ thăm khám bằng các phương pháp hiện đại và tư vấn phác đồ điều trị phù hợp.`,
        price: 250000,
        doctors: [employees[2]],
    },
    {
        service_id: 4,
        name: 'Khám Nhi khoa',
        image: 'https://afamilycdn.com/150157425591193600/2020/6/25/babylungs-15930747515191794863746.jpg',
        description: `Dịch vụ Khám Nhi khoa dành cho trẻ em từ sơ sinh đến vị thành niên, bao gồm theo dõi phát triển thể chất, tiêm chủng, khám bệnh cấp – mạn tính và tư vấn dinh dưỡng. Bác sĩ Nhi có kinh nghiệm lâu năm trong việc chăm sóc và điều trị các bệnh lý thường gặp ở trẻ.`,
        price: 350000,
        doctors: [employees[3]],
    },
    {
        service_id: 5,
        name: 'Khám Tim mạch',
        image: 'https://cdn.diag.vn/2025/01/40eb1298-kham-tim-mach.png',
        description: `Dịch vụ Khám Tim mạch giúp phát hiện sớm và điều trị các bệnh lý về tim như tăng huyết áp, thiếu máu cơ tim, rối loạn nhịp tim, suy tim, bệnh van tim và các yếu tố nguy cơ tim mạch khác. Bệnh nhân sẽ được siêu âm tim, đo điện tim và tư vấn điều trị phù hợp.`,
        price: 600000,
        doctors: [employees[1]],
    },
    {
        service_id: 6,
        name: 'Khám Mắt',
        image: 'https://jieh.vn/upload/images/news/Th%C3%B4ng%20tin%20nh%C3%A3n%20khoa/Kham%20mat.jpg',
        description: `Khám Mắt giúp phát hiện sớm và điều trị các bệnh lý như cận thị, viễn thị, loạn thị, viêm kết mạc, đục thủy tinh thể, tăng nhãn áp, tật khúc xạ... Bệnh nhân sẽ được đo thị lực, soi đáy mắt và tư vấn điều trị hoặc phẫu thuật khi cần thiết.`,
        price: 280000,
        doctors: [employees[0]],
    },
    {
        service_id: 7,
        name: 'Khám Tai Mũi Họng',
        image: 'https://baosonhospital.com/Upload/images-old/images/NOI%20SOI%20TAI%20MUI%20HONG%20(2).JPG',
        description: `Khám Tai Mũi Họng chuyên điều trị các bệnh lý về hô hấp trên như viêm xoang, viêm họng, viêm tai giữa, ù tai, viêm amidan, viêm mũi dị ứng... Bác sĩ sẽ sử dụng thiết bị nội soi hiện đại để chẩn đoán và điều trị hiệu quả.`,
        price: 300000,
        doctors: [employees[3], employees[1]],
    },
    {
        service_id: 8,
        name: 'Khám Răng - Hàm - Mặt',
        image: 'https://baosonhospital.com/Upload/images-old/images/IMG_7982.JPG',
        description: `Khám Răng - Hàm - Mặt bao gồm kiểm tra, tư vấn và điều trị các vấn đề về răng miệng như sâu răng, viêm nướu, chỉnh nha, nhổ răng, tẩy trắng và trồng răng. Bác sĩ sẽ đảm bảo tính thẩm mỹ và sức khỏe răng miệng tối ưu cho bệnh nhân.`,
        price: 400000,
        doctors: [employees[2]],
    },
];

const Service = () => {
    const dispatch = useDispatch();
    const filterService = useSelector(selectFilter);
    const [isOpenServiceFilter, setIsOpenServiceFilter] = useState(false);

    const servicesList = useSelector(selectServices);
    const loadingPage = useSelector(selectLoadingPage);

    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const FilterServiceFields = [{ key: 'search', type: 'text', placeholder: 'Tìm kiếm dịch vụ' }];

    const handleFilterServiceChange = (key, value) => {
        dispatch(service.actions.setFilterService({ ...filterService, [key]: value }));
        dispatch(loadPage());
    };

    const handleResetServiceFilter = () => {
        dispatch(service.actions.setFilterService({ ...initFilterService }));
        dispatch(loadPage());
    };

    const handleApplyServiceFilter = () => {
        dispatch(loadPage());
    };

    const handleChangeRoomPage = (e) => {
        dispatch(
            service.actions.setFilterService({
                ...filterService,
                pageNo: e - 1,
            })
        );
        dispatch(loadPage());
    };

    return (
        <section className="py-10 min-h-screen">
            <div className="relative pt-[68px]">
                {loadingPage && <LoadingSpinAntD />}
                <div className=" container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-5 text-gray-800">Dịch vụ của chúng tôi</h2>

                    <div className="mb-3">
                        {!isOpenServiceFilter && (
                            <FilterButton onClick={() => setIsOpenServiceFilter(true)} />
                        )}
                    </div>

                    {isOpenServiceFilter && (
                        <div className="mb-4">
                            <FilterForm
                                fields={FilterServiceFields}
                                values={filterService}
                                onChange={handleFilterServiceChange}
                                onReset={handleResetServiceFilter}
                                onApply={handleApplyServiceFilter}
                                onClose={() => setIsOpenServiceFilter(false)}
                                style={{ backgroundColor: 'white', display: 'flex' }}
                                className="shadow-sm"
                            />
                        </div>
                    )}

                    {servicesList?.data?.length > 0 ? (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {servicesList?.data?.map((service) => (
                                    <ServiceCard key={service.serviceId} service={service} />
                                ))}
                            </div>

                            <div className="flex justify-center mt-10">
                                <Pagination
                                    current={filterService?.pageNo + 1 || 0}
                                    pageSize={10}
                                    onChange={(e) => {
                                        handleChangeRoomPage(e);
                                    }}
                                    total={servicesList?.totalPage * 10 || 1}
                                />
                            </div>
                        </div>
                    ) : (
                        <Empty
                            description={loadingPage ? 'Đang tải dữ liệu' : "'Không có dữ liệu'"}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Service;
