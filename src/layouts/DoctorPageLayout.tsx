import React, { useState } from 'react';
import { Modal, Tabs } from 'antd';
import SiderDoctor from '@/menus/doctors/SiderDoctor';
import Doctor2 from '@/pages/doctor/Doctor2';
import { useDispatch } from 'react-redux';
import { common } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import TitleRouter from '@/routes/TitleRouter';
import dayjs from 'dayjs';

const DoctorPageLayout = () => {
    const [tabs, setTabs] = useState([
        {
            key: 'new-exam',
            label: 'Khám mới',
            content: (
                <TitleRouter title="Khám bệnh">
                    <Doctor2
                        isNewExam={true}
                        patient={undefined}
                        record={undefined}
                        isHistory={undefined}
                    />
                </TitleRouter>
            ),
            closable: false,
        },
    ]);
    const [activeKey, setActiveKey] = useState('new-exam');
    const [currentPatient, setCurrentPatient] = useState(null);

    const dispatch = useDispatch();

    const handleConfirmChangePatient = (data) => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.APPOINTMENT_RECORD_CONFIRM,
                variant: 'view',
                data: data,
            })
        );
    };

    const resetTabsForNewPatient = (patient) => {
        const newTab = {
            key: 'new-exam',
            label: 'Khám mới',
            content: <Doctor2 key="new-exam" patient={patient} isNewExam isHistory={false} />,
            closable: false,
        };

        setTabs([newTab]);
        setActiveKey('new-exam');
        setCurrentPatient(patient);
    };

    const handleOpenTab = (
        patient: any,
        isHistory?: boolean,
        record?: any,
        callbacks: { onConfirm?: () => void } = {}
    ) => {
        // Nếu chưa chọn bệnh nhân nào
        if (!currentPatient) {
            callbacks.onConfirm?.(); // thực hiện cập nhật bên sidebar
            setCurrentPatient(patient);
        }
        // Nếu chọn bệnh nhân khác
        else if (
            `${currentPatient?.patientId?.patientId}-${currentPatient?.serviceId?.serviceId}-${currentPatient?.shiftId?.id}` !==
            `${patient?.patientId?.patientId}-${patient?.serviceId?.serviceId}-${patient?.shiftId?.id}`
        ) {
            handleConfirmChangePatient({
                title: 'Chuyển bệnh nhân?',
                content:
                    'Bạn có muốn chuyển sang bệnh nhân khác không? Tất cả tab hiện tại sẽ bị đóng.',
                onConfirm: () => {
                    resetTabsForNewPatient(patient);
                    callbacks.onConfirm?.();
                },
            });
            return;
        }

        // Nếu cùng bệnh nhân
        callbacks.onConfirm?.();
        openTab(patient, isHistory, record);
    };

    // Mở tab mới hoặc cập nhật tab hiện tại
    const openTab = (patient, isHistory = false, record = null) => {
        if (tabs.length >= 5) {
            dispatch(common.actions.setWarningMessage('Chỉ được mở tối đa 5 tab cùng lúc.'));
            console.log('Chỉ được mở tối đa 5 tab cùng lúc.');
            return;
        }

        if (!isHistory) {
            // Khám mới
            setTabs((prev) => {
                const newTabs = [...prev];
                newTabs[0] = {
                    ...newTabs[0],
                    content: (
                        <Doctor2
                            key={'new-exam'}
                            patient={patient}
                            record={record}
                            isHistory={isHistory}
                            isNewExam={!isHistory}
                        />
                    ),
                };
                return newTabs;
            });
            setActiveKey('new-exam');
        } else {
            // Lịch sử khám
            const newKey = `${record?.fullname || record?.patientId?.fullName} - ${dayjs(
                record?.shiftId?.date
            ).format('DD/MM/YYYY')} - ${record?.serviceId?.name}`;
            if (tabs?.find((tab) => tab.key == newKey)) return;
            setTabs((prev) => [
                ...prev,
                {
                    key: newKey,
                    label: `KQ - ${dayjs(record?.shiftId?.date).format('DD/MM/YYYY')}`,
                    content: (
                        <Doctor2
                            key={newKey}
                            patient={patient}
                            record={record}
                            isHistory={isHistory}
                            isNewExam={!isHistory}
                        />
                    ),
                    closable: true,
                },
            ]);
            setActiveKey(newKey);
        }
    };

    const removeTab = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        tabs.forEach((tab, i) => {
            if (tab.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newTabs = tabs.filter((tab) => tab.key !== targetKey);
        if (newTabs.length && newActiveKey === targetKey) {
            newActiveKey = newTabs[lastIndex >= 0 ? lastIndex : 0].key;
        }
        setTabs(newTabs);
        setActiveKey(newActiveKey);
    };

    return (
        <div className="flex flex-row">
            {/* ===== SIDEBAR ===== */}
            <div className="w-[220px] min-h-screen border-r border-gray-200 shadow-sm">
                <div className="flex flex-col items-start p-2 border-b border-gray-200 bg-white">
                    <h1 className="text-2xl font-bold text-primary select-none">MediClinic</h1>
                    <p className="italic text-xs font-semibold select-none text-secondary">
                        Y tế thông minh · Smart Healthcare
                    </p>
                </div>
                <SiderDoctor onOpenTab={handleOpenTab} />
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="min-h-screen flex flex-col flex-1">
                {/* <div className="bg-white p-3 px-6 h-[65px] border-b border-gray-200 flex items-center justify-end">
                    <span className="text-blue-600">BS. Nguyễn Nam</span>
                </div> */}

                <div className="flex-1 px-3 py-3 bg-gray-50">
                    <Tabs
                        hideAdd
                        type="editable-card"
                        activeKey={activeKey}
                        onChange={setActiveKey}
                        onEdit={(targetKey, action) => {
                            if (action === 'remove') removeTab(targetKey);
                        }}
                        items={tabs.map((tab) => ({
                            key: tab.key,
                            label: tab.label,
                            closable: tab.closable,
                            children: tab.content,
                        }))}
                    />
                </div>
            </div>
        </div>
    );
};

export default DoctorPageLayout;
