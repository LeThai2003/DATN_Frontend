import { lazy, Suspense } from 'react';
import LoadingPage from '@/pages/loading/LoadingPage';
import { useRoutes } from 'react-router';
import TitleRouter from './TitleRouter';
import ClinicLayout from '@/layouts/ClinicLayout';
import Error404 from '@/pages/errors/Error404';

const Login = lazy(() => import('../pages/auths/Login'));
const Drug = lazy(() => import('../pages/drugs/Drug'));

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
                    path: '*',
                    element: <Error404 />,
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
