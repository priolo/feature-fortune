import { FEATURE_FILTER, FEATURE_SORT } from "@/stores/feature/types";
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { Box } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FeatureStatusItems } from '../detail/StatusChip';
import { featureFiltes } from './FeatureFilterSelector';
import { featureSort } from './FeatureSortSelector';
import { HeaderItems } from '../../../layout/right/HeaderItems';
import { ItemRow } from '../../../layout/right/ItemRow';



const RightRender: React.FC = () => {

    // HOOKS
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const filterId = params.filter as FEATURE_FILTER ?? FEATURE_FILTER.ALL;
    const sortId = params.sort as FEATURE_SORT ?? FEATURE_SORT.RECENT;
    const statusId = params.status as FEATURE_STATUS ?? null;

    // HANDLERS
    const handleFilterChange = (filter: FEATURE_FILTER) => {
        if (filter == null || filter === FEATURE_FILTER.ALL) {
            const newParams = { ...params };
            delete newParams.filter;
            setSearchParams(newParams);
            return;
        }
        setSearchParams({ ...params, filter });
    };

    const handleSortChange = (sort: FEATURE_SORT) => {
        if (sort == null || sort === FEATURE_SORT.RECENT) {
            const newParams = { ...params };
            delete newParams.sort;
            setSearchParams(newParams);
            return;
        }
        setSearchParams({ ...params, sort });
    };

    const handleStatusChange = (status: FEATURE_STATUS | null) => {
        if (status == null) {
            const newParams = { ...params };
            delete newParams.status;
            setSearchParams(newParams);
            return;
        }
        setSearchParams({ ...params, status });
    };

    // RENDER

    return (
        <Box sx={{ position: 'sticky', top: 20 }}>
            <HeaderItems>Sort By</HeaderItems>
            {featureSort.map(item => (
                <ItemRow
                    key={item.id}
                    label={item.label}
                    selected={sortId === item.id}
                    onClick={() => handleSortChange(item.id)}
                />
            ))}

            <HeaderItems>Filter By</HeaderItems>
            {featureFiltes.map(item => (
                <ItemRow
                    key={item.id}
                    label={item.label}
                    selected={filterId === item.id}
                    onClick={() => handleFilterChange(item.id)}
                />
            ))}

            <HeaderItems>Status</HeaderItems>
            <ItemRow
                label="ALL"
                selected={statusId == null}
                onClick={() => handleStatusChange(null)}
            />
            {FeatureStatusItems.map(item => (
                <ItemRow
                    key={item.value}
                    label={item.label}
                    selected={statusId === item.value}
                    onClick={() => handleStatusChange(item.value)}
                />
            ))}
        </Box>
    );
};

export default RightRender;
