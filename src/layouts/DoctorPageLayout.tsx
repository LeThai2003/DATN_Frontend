import React, { useState } from 'react';
import { Tabs } from 'antd';
import SiderDoctor from '@/menus/doctors/SiderDoctor';
import Doctor2 from '@/pages/doctor/Doctor2';

const DoctorPageLayout = () => {
    const [tabs, setTabs] = useState([
        {
            key: 'new-exam',
            label: 'Khám mới',
            content: (
                <Doctor2
                    isNewExam={true}
                    patient={undefined}
                    record={undefined}
                    isHistory={undefined}
                />
            ),
            closable: false,
        },
    ]);
    const [activeKey, setActiveKey] = useState('new-exam');

    // Mở tab mới hoặc cập nhật tab hiện tại
    const openTab = (patient, isHistory = false, record = null) => {
        if (!isHistory) {
            // Khám mới
            setTabs((prev) => {
                const newTabs = [...prev];
                newTabs[0] = {
                    ...newTabs[0],
                    content: (
                        <Doctor2
                            patient={patient}
                            isNewExam={true}
                            record={undefined}
                            isHistory={undefined}
                        />
                    ),
                };
                return newTabs;
            });
            setActiveKey('new-exam');
        } else {
            // Lịch sử khám
            const newKey = `history-${patient.patient_id}-${Date.now()}`;
            setTabs((prev) => [
                ...prev,
                {
                    key: newKey,
                    label: `KQ khám - ${record?.date}`,
                    content: (
                        <Doctor2
                            patient={patient}
                            record={record}
                            isHistory={true}
                            isNewExam={undefined}
                        />
                    ),
                    closable: true,
                },
            ]);
            setActiveKey(newKey);
        }
    };

    const removeTab = (targetKey) => {
        setTabs((prev) => prev.filter((t) => t.key !== targetKey));
        if (activeKey === targetKey) setActiveKey('new-exam');
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
                <SiderDoctor onOpenTab={openTab} />
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
