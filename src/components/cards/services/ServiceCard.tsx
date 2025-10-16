import { getServiceById } from '@/stores/actions/managers/services/service.action';
import { common, service as serviceSlice } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const ServiceCard = ({ service }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleOpenViewService = (data) => {
        dispatch(serviceSlice.actions.setSelectService(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SERVICE_PATIENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleBookAppointment = () => {
        dispatch(serviceSlice.actions.setSelectService(service));
        navigate(`/appointment`);
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <img src={service.image} alt={service.name} className="h-32 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-2 line-clamp-1">{service.description}</p>
            <div className="bg-gray-100 rounded-xl py-1 px-4 mb-4 inline-block">
                <span className="text-sm text-gray-500 mr-2">Phí khám:</span>
                <span className="text-lg font-semibold text-primary">
                    {service.price?.toLocaleString('vi-VN')} ₫
                </span>
            </div>
            <div className="flex items-center justify-center gap-4 flex-col lg:flex-row">
                <Button
                    type="primary"
                    onClick={() => {
                        handleOpenViewService(service);
                        dispatch(getServiceById({ id: service.serviceId }));
                    }}
                    className=""
                >
                    Xem thêm
                </Button>

                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                        handleBookAppointment();
                        dispatch(getServiceById({ id: service.serviceId }));
                    }}
                    className=""
                >
                    Đặt lịch khám
                </Button>
            </div>
        </div>
    );
};

export default ServiceCard;
