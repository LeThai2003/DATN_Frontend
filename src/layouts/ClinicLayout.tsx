import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { Outlet } from 'react-router';
import ClinicSidebar from '@/menus/clinics/ClinicSidebar';
import Account from '@/components/dropdowns/Account';
import { createChat } from '@n8n/chat';
import { useSelector } from 'react-redux';
import { selectEmployeeInfo } from '@/stores/selectors/employees/employee.selector';
const { Sider, Content } = Layout;

const ClinicLayout = () => {
    const infoEmployee = useSelector(selectEmployeeInfo);

    // console.log(infoEmployee);

    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setCollapsed(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        createChat({
            webhookUrl: import.meta.env.VITE_CHAT_URL,
            chatInputKey: 'chatInput',
            chatSessionKey: 'sessionId',
            loadPreviousSession: true,
            metadata: {
                employeeId: infoEmployee?.employeeId,
                fullName: infoEmployee?.fullName,
                citizenId: infoEmployee?.citizenId,
                dob: infoEmployee?.dob,
                gender: infoEmployee?.gender,
                address: infoEmployee?.address,
                avatar: infoEmployee?.avatar,
                hiredDate: infoEmployee?.hiredDate,
                email: infoEmployee?.email,
                profile: infoEmployee?.profile,
                accountId: infoEmployee?.accountId,
                phoneNumber: infoEmployee?.phoneNumber,
                status: infoEmployee?.status,
                nameRole: infoEmployee?.nameRole,
                description: infoEmployee?.description,
            },
        });

        return () => {
            const chatEl = document.querySelector('#n8n-chat, .n8n-chat, iframe[src*="n8n"]');
            if (chatEl && chatEl.parentNode) {
                chatEl.parentNode.removeChild(chatEl);
            }
        };
    }, [infoEmployee]);

    return (
        <div>
            <Layout className="min-h-screen flex flex-col">
                <header className="flex bg-white border-b border-[#ddd] sticky top-0 z-40">
                    <div
                        className="flex items-center justify-center border-r border-[#ddd] transition-all duration-200 ease-in-out"
                        style={{ width: collapsed ? '80px' : '230px', height: '60px' }}
                    >
                        {collapsed ? (
                            <div className="flex flex-col items-center w-[80px]">
                                <h1 className="text-sm font-bold text-primary text-center leading-tight select-none">
                                    MediClinic
                                </h1>
                                <p className="italic text-[10px] font-semibold select-none text-center leading-tight text-secondary">
                                    Y tế thông minh
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-start">
                                <h1 className="text-2xl font-bold text-primary select-none">
                                    MediClinic
                                </h1>
                                <p className="italic text-xs font-semibold select-none text-secondary">
                                    Y tế thông minh · Smart Healthcare
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="p-2 flex flex-1 items-center justify-between">
                        <div className="flex items-center justify-center gap-4">
                            <div
                                className="text-[20px] cursor-pointer mr-5"
                                onClick={() => {
                                    setCollapsed(!collapsed);
                                }}
                            >
                                {collapsed ? (
                                    <AiOutlineMenuUnfold className="size-5" />
                                ) : (
                                    <AiOutlineMenuFold className="size-5" />
                                )}
                            </div>
                        </div>
                        <div className="">
                            <Account />
                        </div>
                    </div>
                </header>
                <Layout
                    className="flex flex-row flex-1"
                    style={{
                        overflow: 'auto',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#c0c0c0 transparent',
                    }}
                >
                    <Sider
                        className={`sider`}
                        collapsed={collapsed}
                        theme="light"
                        style={{
                            borderRight: '1px solid #ddd',
                            position: 'fixed',
                            top: '60px',
                            left: '0',
                            zIndex: '30',
                            height: 'calc(100vh - 60px)',
                            overflowY: 'auto',
                        }}
                        width={230}
                    >
                        <ClinicSidebar />
                    </Sider>
                    <Content
                        className="py-2 px-4 transition-all duration-200 ease-in-out bg-bg-gray"
                        style={{
                            marginLeft: !isMobile ? (collapsed ? '80px' : '230px') : '80px',
                            minHeight: 'calc(100vh - 65px)',
                            overflowY: 'auto',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#c0c0c0 transparent',
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>

                {/* overlay*/}
                {isMobile && !collapsed && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20"
                        onClick={() => setCollapsed(true)}
                        style={{ top: '60px' }}
                    />
                )}
            </Layout>
        </div>
    );
};

export default ClinicLayout;
