import { lazy, Suspense } from 'react';
import LoadingPage from '@/pages/loading/LoadingPage';
import { useRoutes } from 'react-router';
import TitleRouter from './TitleRouter';
import Error404 from '@/pages/errors/Error404';
import ClinicLayout from '@/layouts/ClinicLayout';

import Doctor2 from '@/pages/doctor/Doctor2';
import PatientLayout from '@/layouts/PatientLayout';
import ScrollToTop from './ScrollToTop';
import DoctorPageLayout from '@/layouts/DoctorPageLayout';

const PrivateRoute = lazy(() => import('../routes/PrivateRoute'));
const Error500 = lazy(() => import('../pages/errors/Error500'));

const Login = lazy(() => import('../pages/auths/Login'));
const SignUp = lazy(() => import('../pages/auths/SignUp'));
const PhoneNumberOtp = lazy(() => import('../pages/auths/PhoneNumberOtp'));
const OtpVerify = lazy(() => import('../pages/auths/OtpVerify'));
const ForgotPasswordPhone = lazy(
    () => import('../pages/auths/forgotPasswords/ForgotPassword_Phone')
);
const ForgotPasswordOTP = lazy(() => import('../pages/auths/forgotPasswords/ForgotPassword_OTP'));
const ForgotPasswordReset = lazy(
    () => import('../pages/auths/forgotPasswords/ForgotPassword_Reset')
);

const Drug = lazy(() => import('../pages/manager/drugs/Drug'));
const Employee = lazy(() => import('../pages/manager/employees/Employee'));
const Room = lazy(() => import('../pages/manager/rooms/Room'));
const Specialization = lazy(() => import('../pages/manager/specializations/Specialization'));
const Service = lazy(() => import('../pages/manager/services/Service'));
const Patient = lazy(() => import('../pages/manager/patients/Patient'));
const PatientDetail = lazy(() => import('../pages/manager/patients/PatientDetail'));
const AccountEmployee = lazy(() => import('../pages/manager/accounts/AccountEmployee'));
const Dashboard = lazy(() => import('../pages/manager/dashboards/Dashboard'));
const Schedule = lazy(() => import('../pages/manager/schedules/Schedule'));
const Shift = lazy(() => import('../pages/manager/shifts/Shift'));

const Home = lazy(() => import('../pages/patients/Home'));
const ServicePatient = lazy(() => import('../pages/patients/Service'));
const Appointment = lazy(() => import('../pages/patients/Appointment'));
const Checkout = lazy(() => import('../pages/patients/Checkout'));
const AccountPatient = lazy(() => import('../pages/patients/Account'));
const AppointmentHistory = lazy(() => import('../pages/patients/AppointmentHistory'));
const AboutPage = lazy(() => import('../pages/patients/About'));
const PaymentResult = lazy(() => import('../pages/patients/PaymentResult'));
const RelativeInformation = lazy(() => import('../pages/patients/RelativeInformation'));

const Unauthorized = lazy(() => import('../pages/errors/Unauthenticated403'));

function AppRoutes() {
    const routes = useRoutes([
        // Manager
        {
            path: '/manager',
            element: (
                <PrivateRoute roles={['ROLE_ADMIN']}>
                    <ClinicLayout />
                </PrivateRoute>
            ),
            children: [
                {
                    path: '',
                    index: true,
                    element: (
                        <TitleRouter title="Tổng quan">
                            <Dashboard />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'drugs',
                    element: (
                        <TitleRouter title="Quản lý thuốc">
                            <Drug />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'employees',
                    element: (
                        <TitleRouter title="Quản lý bác sĩ">
                            <Employee />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'rooms',
                    element: (
                        <TitleRouter title="Quản lý phòng khám">
                            <Room />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'specializations',
                    element: (
                        <TitleRouter title="Quản lý chuyên khoa">
                            <Specialization />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'services',
                    element: (
                        <TitleRouter title="Quản lý dịch vụ">
                            <Service />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'patients',
                    element: (
                        <TitleRouter title="Quản lý bệnh nhân">
                            <Patient />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'patients/detail',
                    element: (
                        <TitleRouter title="Chi tiết bệnh nhân">
                            <PatientDetail />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'account',
                    element: (
                        <TitleRouter title="Tài khoản cá nhân">
                            <AccountEmployee />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'schedules',
                    element: (
                        <TitleRouter title="Lịch làm việc">
                            <Schedule />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'shifts',
                    element: (
                        <TitleRouter title="Lịch làm việc">
                            <Shift />
                        </TitleRouter>
                    ),
                },
                {
                    path: '*',
                    element: <Error404 />,
                },
            ],
        },
        // Doctor
        {
            path: '/doctors2',
            element: (
                <PrivateRoute roles={['ROLE_DOCTOR']}>
                    {' '}
                    <DoctorPageLayout />{' '}
                </PrivateRoute>
            ),
            children: [
                {
                    path: '',
                    element: (
                        <TitleRouter title="Khám bệnh">
                            <Doctor2 patient={undefined} />
                        </TitleRouter>
                    ),
                },
            ],
        },
        // Auth
        {
            path: 'auths/',
            children: [
                {
                    path: 'forgot-password',
                    element: (
                        <TitleRouter title="Quên mật khẩu">
                            <ForgotPasswordPhone />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'forgot-password/:phone_number',
                    element: (
                        <TitleRouter title="Nhập mã OTP">
                            <ForgotPasswordOTP />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'forgot-password/reset/:verify_code/:phone_number',
                    element: (
                        <TitleRouter title="Nhập mới mật khẩu">
                            <ForgotPasswordReset />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'login',
                    element: (
                        <TitleRouter title="Đăng nhập">
                            <Login />
                        </TitleRouter>
                    ),
                },
                {
                    path: 'signup/:phone_number',
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
                    path: 'otp-verify/:phone_number',
                    element: (
                        <TitleRouter title="Xác thực số điện thoại">
                            <OtpVerify />
                        </TitleRouter>
                    ),
                },
            ],
        },
        // Patient
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
                        <PrivateRoute roles={['ROLE_PATIENT']}>
                            <TitleRouter title="Đặt lịch khám">
                                <Appointment />
                            </TitleRouter>
                        </PrivateRoute>
                    ),
                },
                {
                    index: true,
                    path: '/checkout',
                    element: (
                        <PrivateRoute roles={['ROLE_PATIENT']}>
                            <TitleRouter title="Thanh toán">
                                <Checkout />
                            </TitleRouter>
                        </PrivateRoute>
                    ),
                },
                {
                    index: true,
                    path: '/account',
                    element: (
                        <PrivateRoute roles={['ROLE_PATIENT']}>
                            <TitleRouter title="Tài khoản">
                                <AccountPatient />
                            </TitleRouter>
                        </PrivateRoute>
                    ),
                },
                {
                    index: true,
                    path: '/appointment-history',
                    element: (
                        <PrivateRoute roles={['ROLE_PATIENT']}>
                            <TitleRouter title="Lịch sử khám bệnh">
                                <AppointmentHistory />
                            </TitleRouter>
                        </PrivateRoute>
                    ),
                },
                {
                    index: true,
                    path: '/relatives-information',
                    element: (
                        <PrivateRoute roles={['ROLE_PATIENT']}>
                            <TitleRouter title="Thông tin người thân">
                                <RelativeInformation />
                            </TitleRouter>
                        </PrivateRoute>
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
                    path: '/payment/result',
                    element: (
                        <PrivateRoute roles={['ROLE_PATIENT']}>
                            <TitleRouter title="Kết quả thanh toán">
                                <PaymentResult />
                            </TitleRouter>
                        </PrivateRoute>
                    ),
                },
            ],
        },
        {
            path: '/unauthorized',
            element: (
                <TitleRouter title="403">
                    <Unauthorized />
                </TitleRouter>
            ),
        },
        {
            path: '/500',
            element: (
                <TitleRouter title="500">
                    <Error500 />
                </TitleRouter>
            ),
        },
        {
            path: '*',
            element: (
                <TitleRouter title="404">
                    <Error404 />
                </TitleRouter>
            ),
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
