import { lazy, Suspense } from 'react';
import LoadingPage from '@/pages/loading/LoadingPage';
import { useRoutes } from 'react-router';
import TitleRouter from './TitleRouter';
import ClinicLayout from '@/layouts/ClinicLayout';
import Error404 from '@/pages/errors/Error404';
import DoctorClinicLayout from '@/layouts/DoctorClinicLayout';

import Doctor from '@/pages/doctor/Doctor';

const Login = lazy(() => import('../pages/auths/Login'));
const Drug = lazy(() => import('../pages/manager/drugs/Drug'));
const Employee = lazy(() => import('../pages/manager/employees/Employee'));
const Room = lazy(() => import('../pages/manager/rooms/Room'));

const ClinicPage = lazy(() => import('../pages/doctor/ClinicPage'));

function AppRoutes() {
    const routes = useRoutes([
        {
            path: '/',
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
            {routes}
        </Suspense>
    );
}

export default AppRoutes;
