import { FeatureStatusItems } from '@/types/feature/enum';
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { Chip, SxProps, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';



interface Props {
    sx?: SxProps
    status?: FEATURE_STATUS;
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const FeatureStatusChip: React.FC<Props> = ({
    sx,
    status,
    onClick,
}) => {


    // HOOKS
    const { t } = useTranslation()


    // RENDER
    const item = useMemo(() => FeatureStatusItems.find(i => i.value === status), [status]);
    const label = t(`view.feature.${status}.label`) ?? "N/A";
    const tooltip = t(`view.feature.${status}.desc`) ?? "";

    return (
        <Tooltip title={tooltip ?? ""} >
            <Chip sx={sx}
                icon={item?.icon && <item.icon sx={{ width: "12px", height: "12px" }} />}
                label={label}
                color={item?.color as any || 'default'}
                onClick={onClick}
            />
        </Tooltip>
    );
};

export default FeatureStatusChip;




