import { lazy, Suspense } from 'react';
import LoadingPage from '@/pages/loading/LoadingPage';
import { useRoutes } from 'react-router';
import TitleRouter from './TitleRouter';
import Error404 from '@/pages/errors/Error404';
import ClinicLayout from '@/layouts/ClinicLayout';
import DoctorClinicLayout from '@/layouts/DoctorClinicLayout';

import Doctor from '@/pages/doctor/Doctor';
import PatientLayout from '@/layouts/PatientLayout';
import ScrollToTop from './ScrollToTop';

const Login = lazy(() => import('../pages/auths/Login'));
const SignUp = lazy(() => import('../pages/auths/SignUp'));
const PhoneNumberOtp = lazy(() => import('../pages/auths/PhoneNumberOtp'));
const OtpVerify = lazy(() => import('../pages/auths/OtpVerify'));

const Drug = lazy(() => import('../pages/manager/drugs/Drug'));
const Employee = lazy(() => import('../pages/manager/employees/Employee'));
const Room = lazy(() => import('../pages/manager/rooms/Room'));
const Specialization = lazy(() => import('../pages/manager/specializations/Specialization'));
const Service = lazy(() => import('../pages/manager/services/Service'));
const ServiceEdit = lazy(() => import('../pages/manager/services/ServiceEdit'));
const Patient = lazy(() => import('../pages/manager/patients/Patient'));
const PatientDetail = lazy(() => import('../pages/manager/patients/PatientDetail'));

const Home = lazy(() => import('../pages/patients/Home'));
const ServicePatient = lazy(() => import('../pages/patients/Service'));
const Appointment = lazy(() => import('../pages/patients/Appointment'));
const Checkout = lazy(() => import('../pages/patients/Checkout'));
const AccountPatient = lazy(() => import('../pages/patients/Account'));
const AppointmentHistory = lazy(() => import('../pages/patients/AppointmentHistory'));
const AboutPage = lazy(() => import('../pages/patients/About'));
const PaymentResult = lazy(() => import('../pages/patients/PaymentResult'));

function AppRoutes() {
    const routes = useRoutes([
        {
            path: '/manager',
            element: <ClinicLayout />,
            children: [
                {
                    path: '/manager/drugs',
                    element: (
                        <TitleRouter title="Quản lý thuốc">
                            <Drug />
                        </TitleRouter>
                    ),
                },
                {
                    path: '/manager/employees',
                    element: (
                        <TitleRouter title="Quản lý bác sĩ">
                            <Employee />
                        </TitleRouter>
                    ),
                },
                {
                    path: '/manager/rooms',
                    element: (
                        <TitleRouter title="Quản lý phòng khám">
                            <Room />
                        </TitleRouter>
                    ),
                },
                {
                    path: '/manager/specializations',
                    element: (
                        <TitleRouter title="Quản lý chuyên khoa">
                            <Specialization />
                        </TitleRouter>
                    ),
                },
                {
                    path: '/manager/services',
                    element: (
                        <TitleRouter title="Quản lý dịch vụ">
                            <Service />
                        </TitleRouter>
                    ),
                },
                {
                    path: '/manager/services/edit',
                    element: (
                        <TitleRouter title="Cập nhật dịch vụ">
                            <ServiceEdit />
                        </TitleRouter>
                    ),
                },
                {
                    path: '/manager/patients',
                    element: (
                        <TitleRouter title="Quản lý bệnh nhân">
                            <Patient />
                        </TitleRouter>
                    ),
                },
                {
                    path: '/manager/patients/detail',
                    element: (
                        <TitleRouter title="Chi tiết bệnh nhân">
                            <PatientDetail />
                        </TitleRouter>
                    ),
                },
                {
                    path: '*',
                    element: <Error404 />,
                },
            ],
        },
        {
            path: '/doctors',
            element: <DoctorClinicLayout />,
            children: [
                {
                    path: '',
                    element: (
                        <TitleRouter title="Khám bệnh">
                            <Doctor />
                        </TitleRouter>
                    ),
                },
            ],
        },
        {
            path: 'auths/',
            children: [
                {
                    path: 'login',
                    element: (
                        <TitleRouter title="Đăng nhập">
                            <Login />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'signup',
                    element: (
                        <TitleRouter title="Đăng ký">
                            <SignUp />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'phone-signup',
                    element: (
                        <TitleRouter title="Số điện thoại đăng ký">
                            <PhoneNumberOtp />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'otp-verify',
                    element: (
                        <TitleRouter title="Xác thực số điện thoại">
                            <OtpVerify />
                        </TitleRouter>
                    ),
                },
            ],
        },
        {
            path: '/',
            element: <PatientLayout />,
            children: [
                {
                    index: true,
                    path: '',
                    element: (
                        <TitleRouter title="MediClinic">
                            <Home />
                        </TitleRouter>
                    ),
                },
                {
                    index: true,
                    path: '/services',
                    element: (
                        <TitleRouter title="Dịch vụ">
                            <ServicePatient />
                        </TitleRouter>
                    ),
                },
                {
                    index: true,
                    path: '/appointment',
                    element: (
                        <TitleRouter title="Đặt lịch khám">
                            <Appointment />
                        </TitleRouter>
                    ),
                },
                {
                    index: true,
                    path: '/checkout',
                    element: (
                        <TitleRouter title="Thanh toán">
                            <Checkout />
                        </TitleRouter>
                    ),
                },
                {
                    index: true,
                    path: '/account',
                    element: (
                        <TitleRouter title="Tài khoản">
                            <AccountPatient />
                        </TitleRouter>
                    ),
                },
                {
                    index: true,
                    path: '/appointment-history',
                    element: (
                        <TitleRouter title="Lịch sử khám bệnh">
                            <AppointmentHistory />
                        </TitleRouter>
                    ),
                },
                {
                    index: true,
                    path: '/about',
                    element: (
                        <TitleRouter title="Giới thiệu">
                            <AboutPage />
                        </TitleRouter>
                    ),
                },
                {
                    index: true,
                    path: '/payment-result',
                    element: (
                        <TitleRouter title="Kết quả thanh toán">
                            <PaymentResult />
                        </TitleRouter>
                    ),
                },
            ],
        },
        {
            path: '*',
            element: <Error404 />,
        },
    ]);

    return (
        <Suspense
            fallback={
                <TitleRouter title="Loading...">
                    <LoadingPage />
                </TitleRouter>
            }
        >
            <ScrollToTop />
            {routes}
        </Suspense>
    );
}

export default AppRoutes;
