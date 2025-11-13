import { useDispatch, useSelector } from 'react-redux';
import {
    selectFilter,
    selectHasMore,
    selectIcd10s,
    selectLoadingPage,
} from '@/stores/selectors/icd10/icd10.selector';
import { getIcd10 } from '@/stores/actions/icd10/icd10.action';
import { useEffect } from 'react';
import { icd10 } from '@/stores/reducers';
import { Select, Spin } from 'antd';

const LazyICD10Select = ({
    value,
    onChange,
    onChangeLabel,
}: {
    value?: string;
    onChange?: (val: string) => void;
    onChangeLabel?: (label: string | null) => void;
    placeholder?: string;
    disabled?: boolean;
}) => {
    const dispatch = useDispatch();
    const icd10s = useSelector(selectIcd10s);
    const filter = useSelector(selectFilter);
    const hasMore = useSelector(selectHasMore);
    const loadingPage = useSelector(selectLoadingPage);

    // console.log(icd10s.data);

    useEffect(() => {
        dispatch(getIcd10({}));
    }, [dispatch]);

    const handleLoadMore = () => {
        if (hasMore && !loadingPage) {
            const newFilter = { ...filter, pageNo: (filter.pageNo ?? 0) + 1 };
            dispatch(icd10.actions.setFilterIcd10(newFilter));
            dispatch(getIcd10({}));
        }
    };

    return (
        <Select
            showSearch
            allowClear
            optionFilterProp="label"
            placeholder="Chọn mã ICD-10"
            filterOption={false}
            onSearch={(term) => {
                dispatch(
                    icd10.actions.setFilterIcd10({
                        ...filter,
                        search: term,
                        pageNo: 0,
                    })
                );
                dispatch(icd10.actions.resetIcd10s());
                dispatch(getIcd10({}));
            }}
            onPopupScroll={(e) => {
                const target = e.target as HTMLDivElement;
                if (
                    target.scrollTop + target.offsetHeight >= target.scrollHeight - 50 &&
                    !loadingPage &&
                    hasMore
                ) {
                    handleLoadMore();
                }
            }}
            notFoundContent={loadingPage ? <Spin size="small" /> : 'Không tìm thấy'}
            options={icd10s?.data?.map((item) => ({
                label: `${item?.code} - ${item?.description}`,
                value: item?.code,
            }))}
            value={value}
            onChange={(value, option) => {
                onChange?.(value);
                onChangeLabel?.((option as any)?.label ?? null);
            }}
            style={{ width: '100%' }}
        />
    );
};

export default LazyICD10Select;
