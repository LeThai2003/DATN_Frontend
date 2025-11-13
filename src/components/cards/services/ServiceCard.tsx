import { getServiceById } from '@/stores/actions/managers/services/service.action';
import { fetchInfoPatient } from '@/stores/actions/patients/patient.action';
import { appointment, common, service as serviceSlice, shift } from '@/stores/reducers';
import { selectInfoPatient } from '@/stores/selectors/patients/patient.selector';
import { ModalType } from '@/types/stores/common';
import { getCookies } from '@/utils/cookies/cookies';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const ServiceCard = ({ service }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const infoPatient = useSelector(selectInfoPatient);

    let params = { patientId: infoPatient?.patientId };

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

    const user = JSON.parse(getCookies('user') || null);

    useEffect(() => {
        if (user && user?.authorities[0]?.authority == 'ROLE_PATIENT') {
            dispatch(fetchInfoPatient({ phone_number: user?.username }));
        }
    }, []);

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <img src={service.image} alt={service.name} className="h-32 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 text-ellipsis">
                {service.name}
            </h3>
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
                        dispatch(getServiceById({ id: service.serviceId, params }));
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
                        dispatch(getServiceById({ id: service.serviceId, params }));
                        dispatch(appointment.actions.setNewDoctorAppointment(null));
                        dispatch(appointment.actions.setShiftAppointment(null));
                        dispatch(shift.actions.setShiftEmployee([]));
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
