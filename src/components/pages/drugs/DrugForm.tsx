import ButtonTurnBack from '@/components/buttons/ButtonTurnBack';
import FormField from '@/components/forms/FormField';
import DrugUnitTable from '@/components/modals/drugs/DrugUnitTable';
import { selectSelectedDrug } from '@/stores/selectors/drugs/drug.selector';
import { drugSchema } from '@/validations/drug.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

interface DrugFormProps {
    type: string;
}

const DrugForm = ({ type }: DrugFormProps) => {
    const selectedDrug = useSelector(selectSelectedDrug);

    const navigate = useNavigate();

    console.log(selectedDrug);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: selectedDrug?.name || '',
            generic_name: selectedDrug?.generic_name || '',
            description: selectedDrug?.description || '',
            dosage_form: selectedDrug?.dosage_form || '',
            strength: selectedDrug?.strength || '',
            usage_instructions: selectedDrug?.usage_instructions || '',
            packaging: selectedDrug?.packaging || '',
            manufacturer: selectedDrug?.manufacturer || '',
            distributor: selectedDrug?.distributor || '',
            side_effects: selectedDrug?.side_effects || '',
            contraindications: selectedDrug?.contraindications || '',
            allergy_info: selectedDrug?.allergy_info || '',
            storage_info: selectedDrug?.storage_info || '',
            is_insurance_covered: selectedDrug?.is_insurance_covered ?? false,
            insurance_code: selectedDrug?.insurance_code || null,
            insurance_rate: selectedDrug?.insurance_rate || null,
            insurance_notes: selectedDrug?.insurance_notes || '',
        },
        resolver: yupResolver(drugSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const clickEditFromDetail = () => {
        navigate(`/manager/drugs/edit/${selectedDrug.drug_id}`);
    };

    return (
        <div className="relative">
            <div className="absolute top-0 left-0">
                <div className="flex items-center justify-start gap-3">
                    <ButtonTurnBack link="/manager/drugs" />
                    {type == 'detail' && (
                        <Button type="primary" onClick={clickEditFromDetail}>
                            Chỉnh sửa
                        </Button>
                    )}
                </div>
            </div>

            <div className="pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Thông tin thuốc */}
                    <div className="lg:col-span-2 bg-white rounded-md p-4 pt-3 shadow h-[82vh]">
                        <h3>{type == 'edit' ? 'Cập nhật thông tin thuốc' : 'Thông tin thuốc'}</h3>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%] border-t border-gray-100"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="name"
                                    control={control}
                                    label="Tên thuốc"
                                    placeholder="Nhập tên thuốc"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required={type == 'edit'}
                                    disabled={type != 'edit'}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />

                                <FormField
                                    name="generic_name"
                                    control={control}
                                    label="Tên hoạt chất"
                                    placeholder="Nhập tên hoạt chất"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required={type == 'edit'}
                                    disabled={type != 'edit'}
                                    error={!!errors.generic_name}
                                    helperText={errors.generic_name?.message}
                                />

                                <FormField
                                    name="dosage_form"
                                    control={control}
                                    label="Dạng bào chế"
                                    placeholder="VD: Viên nén, ống tiêm..."
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required={type == 'edit'}
                                    disabled={type != 'edit'}
                                    error={!!errors.dosage_form}
                                    helperText={errors.dosage_form?.message}
                                />

                                <FormField
                                    name="strength"
                                    control={control}
                                    label="Hàm lượng"
                                    placeholder="VD: 500mg"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required={type == 'edit'}
                                    disabled={type != 'edit'}
                                    error={!!errors.strength}
                                    helperText={errors.strength?.message}
                                />

                                <FormField
                                    name="packaging"
                                    control={control}
                                    label="Quy cách đóng gói"
                                    placeholder="VD: Hộp 10 vỉ x 10 viên"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required={type == 'edit'}
                                    disabled={type != 'edit'}
                                    error={!!errors.packaging}
                                    helperText={errors.packaging?.message}
                                />

                                <FormField
                                    name="manufacturer"
                                    control={control}
                                    label="Nhà sản xuất"
                                    placeholder="Nhập nhà sản xuất"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required={type == 'edit'}
                                    disabled={type != 'edit'}
                                    error={!!errors.manufacturer}
                                    helperText={errors.manufacturer?.message}
                                />
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    name="is_insurance_covered"
                                    control={control}
                                    label="Thuốc thuộc BHYT"
                                    type={type === 'edit' ? 'select' : 'text'}
                                    options={[
                                        { label: 'Có', value: true },
                                        { label: 'Không', value: false },
                                    ]}
                                    required={type == 'edit'}
                                    disabled={type != 'edit'}
                                    error={!!errors.is_insurance_covered}
                                    helperText={errors.is_insurance_covered?.message}
                                />

                                {watch('is_insurance_covered') && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                name="insurance_code"
                                                control={control}
                                                label="Mã BHYT"
                                                placeholder="Nhập mã BHYT"
                                                type={type === 'edit' ? 'input' : 'text'}
                                                inputType="text"
                                                required={type == 'edit'}
                                                disabled={type != 'edit'}
                                                error={!!errors.insurance_code}
                                                helperText={errors.insurance_code?.message}
                                            />

                                            <FormField
                                                name="insurance_rate"
                                                control={control}
                                                label="Tỷ lệ chi trả (%)"
                                                placeholder="VD: 80"
                                                type={type === 'edit' ? 'input' : 'text'}
                                                inputType="number"
                                                required={type == 'edit'}
                                                disabled={type != 'edit'}
                                                error={!!errors.insurance_rate}
                                                helperText={errors.insurance_rate?.message}
                                            />
                                        </div>
                                        <FormField
                                            name="insurance_notes"
                                            control={control}
                                            label="Ghi chú BHYT"
                                            placeholder="Nhập ghi chú (nếu có)"
                                            type={type === 'edit' ? 'input' : 'text'}
                                            inputType="text"
                                            disabled={type != 'edit'}
                                            error={!!errors.insurance_notes}
                                            helperText={errors.insurance_notes?.message}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Thông tin bổ sung */}
                            <div className="space-y-4">
                                <FormField
                                    name="description"
                                    control={control}
                                    label="Mô tả"
                                    placeholder="Nhập mô tả"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    disabled={type != 'edit'}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />

                                <FormField
                                    name="usage_instructions"
                                    control={control}
                                    label="Hướng dẫn sử dụng"
                                    placeholder="VD: Uống sau khi ăn"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    disabled={type != 'edit'}
                                    error={!!errors.usage_instructions}
                                    helperText={errors.usage_instructions?.message}
                                />

                                <FormField
                                    name="distributor"
                                    control={control}
                                    label="Nhà phân phối"
                                    placeholder="Nhập nhà phân phối"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    disabled={type != 'edit'}
                                    error={!!errors.distributor}
                                    helperText={errors.distributor?.message}
                                />

                                <FormField
                                    name="side_effects"
                                    control={control}
                                    label="Tác dụng phụ"
                                    placeholder="Nhập tác dụng phụ"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    disabled={type != 'edit'}
                                    error={!!errors.side_effects}
                                    helperText={errors.side_effects?.message}
                                />

                                <FormField
                                    name="contraindications"
                                    control={control}
                                    label="Chống chỉ định"
                                    placeholder="Nhập chống chỉ định"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    disabled={type != 'edit'}
                                    inputType="text"
                                    error={!!errors.contraindications}
                                    helperText={errors.contraindications?.message}
                                />

                                <FormField
                                    name="allergy_info"
                                    control={control}
                                    label="Thông tin dị ứng"
                                    placeholder="VD: Dị ứng penicillin"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    disabled={type != 'edit'}
                                    error={!!errors.allergy_info}
                                    helperText={errors.allergy_info?.message}
                                />

                                <FormField
                                    name="storage_info"
                                    control={control}
                                    label="Điều kiện bảo quản"
                                    placeholder="VD: Bảo quản nơi khô ráo, thoáng mát"
                                    type={type === 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    disabled={type != 'edit'}
                                    error={!!errors.storage_info}
                                    helperText={errors.storage_info?.message}
                                />
                            </div>
                            {type == 'edit' && (
                                <div className="flex justify-end gap-2">
                                    <Button onClick={() => reset(selectedDrug)}>Hoàn tác</Button>
                                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                        Cập nhật
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                    {/* Thông tin đơn vị của thuốc */}
                    <div className=" bg-white rounded-md p-4 pt-3 shadow max-h-[82vh] h-fit">
                        <h3>
                            {type == 'edit' ? 'Cập nhật đơn vị thuốc' : 'Thông tin đơn vị thuốc'}
                        </h3>
                        <DrugUnitTable
                            drug={selectedDrug}
                            onChange={(units) => console.log('Cập nhật đơn vị:', units)}
                            editable={type == 'edit'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrugForm;
