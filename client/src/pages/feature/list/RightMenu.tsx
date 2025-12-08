import { sxRightMenuRoot } from "@/pages/styles";
import { FEATURE_FILTER, FEATURE_SORT } from "@/stores/feature/types";
import { FeatureStatusItems, StatusItem } from '@/types/feature/enum';
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";
import { useSearchParams } from 'react-router-dom';
import { ItemRow } from '../../../layout/right/ItemRow';



const RightMenu: React.FC = () => {


    // HOOKS
    const { t } = useTranslation()
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
        <Box sx={sxRightMenuRoot}>

            <Typography variant="overline" color="text.secondary" sx={[sxHeader, { mt: 0 }] as SxProps}>
                {t(`rightmenu.features.sort.title`)}
            </Typography>
            {Object.values(FEATURE_SORT).map(item => (
                <ItemRow
                    key={item}
                    label={t(`rightmenu.features.sort.${item}`)}
                    selected={sortId === item}
                    onClick={() => handleSortChange(item)}
                />
            ))}

            <Typography variant="overline" color="text.secondary" sx={sxHeader}>
                {t(`rightmenu.features.filter.title`)}
            </Typography>
            {Object.values(FEATURE_FILTER).map(item => (
                <ItemRow
                    key={item}
                    label={t(`rightmenu.features.filter.${item}`)}
                    selected={filterId === item}
                    onClick={() => handleFilterChange(item)}
                />
            ))}

            <Typography variant="overline" color="text.secondary" sx={sxHeader}>
                {t(`rightmenu.features.status.title`)}
            </Typography>
            <ItemRow
                label="ALL"
                selected={statusId == null}
                onClick={() => handleStatusChange(null)}
            />
            {FeatureStatusItems.map((item: StatusItem) => (
                <ItemRow
                    key={item.value}
                    label={t(`view.feature.${item.value}.label`)}
                    selected={statusId === item.value}
                    onClick={() => handleStatusChange(item.value)}
                />
            ))}
        </Box>
    );
};

export default RightMenu;

const sxHeader: SxProps = {
    fontWeight: 200,
    mb: 1,
    mt: 2
}