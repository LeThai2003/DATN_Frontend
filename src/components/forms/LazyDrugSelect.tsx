import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Select, Spin } from 'antd';

import { drug } from '@/stores/reducers';
import {
    selectDrugsSelect,
    selectFilter,
    selectHasMore,
    selectLoadingPageSelect,
} from '@/stores/selectors/drugs/drug.selector';
import { getDrugsSelect } from '@/stores/actions/managers/drug/drug.action';

interface Drug {
    drug_id: number;
    name: string;
}

const LazyDrugSelect = ({ value, onChange }) => {
    const dispatch = useDispatch();
    const drugs = useSelector(selectDrugsSelect);
    const filter = useSelector(selectFilter);
    const hasMore = useSelector(selectHasMore);
    const loadingPage = useSelector(selectLoadingPageSelect);

    const [searchTerm, setSearchTerm] = useState('');
    const scrollRef = useRef<any>(null);

    // load trang 1
    useEffect(() => {
        dispatch(getDrugsSelect());
    }, [dispatch]);

    const loadMore = () => {
        if (hasMore && !loadingPage) {
            dispatch(
                drug.actions.setFilterDrug({
                    ...filter,
                    pageNo: (filter.pageNo ?? 0) + 1,
                })
            );
            dispatch(getDrugsSelect());
        }
    };

    const handleSearch = (val: string) => {
        setSearchTerm(val);

        dispatch(
            drug.actions.setFilterDrug({
                ...filter,
                search: val,
                pageNo: 0,
            })
        );
        dispatch(drug.actions.resetDrugsSelect());
        dispatch(getDrugsSelect());
    };

    const handleLoadNew = () => {
        dispatch(
            drug.actions.setFilterDrug({
                ...filter,
                search: '',
                pageNo: 0,
            })
        );
        dispatch(getDrugsSelect());
    };

    const options = () => {
        const list =
            drugs?.data?.map((d) => ({
                label: d.name,
                value: d.drugId,
            })) ?? [];

        if (!loadingPage && list.length === 0 && searchTerm.trim()) {
            return [
                {
                    label: `Thuốc mới: "${searchTerm}"`,
                    value: searchTerm, // luôn cố định
                },
            ];
        }
        return list;
    };

    return (
        <Select
            showSearch
            allowClear
            filterOption={false}
            style={{ width: 180 }}
            placeholder="Tên thuốc"
            value={value}
            options={options()}
            loading={loadingPage}
            onSearch={handleSearch}
            onPopupScroll={(e) => {
                const t = e.target as HTMLDivElement;
                if (
                    t.scrollTop + t.offsetHeight >= t.scrollHeight - 40 &&
                    !loadingPage &&
                    hasMore
                ) {
                    loadMore();
                }
            }}
            notFoundContent={loadingPage ? <Spin size="small" /> : 'Không tìm thấy'}
            onChange={(val: any, option: any) => {
                if (option.label.includes('Thuốc mới')) {
                    // user nhập tay
                    onChange({
                        drugId: null,
                        drugName: searchTerm,
                    });

                    handleLoadNew();
                } else {
                    // chọn đúng từ DB
                    onChange({
                        drugId: val,
                        drugName: option.label,
                    });

                    handleLoadNew();
                }
            }}
        />
    );
};

export default LazyDrugSelect;
