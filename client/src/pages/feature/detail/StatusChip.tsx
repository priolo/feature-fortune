import { FEATURE_STATUS } from '@/types/feature/Feature';
import { Build, Close, DesignServices, Done, WaterDrop } from '@mui/icons-material';
import { Chip, SxProps, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';



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

    const item = useMemo(() => FeatureStatusItems.find(i => i.value === status), [status]);
    const label = item?.label?.toUpperCase() ?? "N/A";

    return (
        <Tooltip title={item?.subtitle ?? ""} sx={sx}>
            <Chip
                icon={item?.icon}
                label={label}
                color={item?.color as any || 'default'}
                onClick={onClick}
            />
        </Tooltip>
    );
};

export default FeatureStatusChip; 



export const FeatureStatusItems = [
    {
        label: 'Proposed',
        value: FEATURE_STATUS.PROPOSED,
        subtitle: 'Feature has been proposed from AUTHOR',
        color: 'default',
        icon: <DesignServices />
    },
    {
        label: 'Development',
        value: FEATURE_STATUS.IN_DEVELOPMENT,
        subtitle: 'Feature accepted by an DEVELOPER and is in progress',
        color: 'info',
        icon: <Build />
    },
    {
        label: 'Released',
        value: FEATURE_STATUS.RELEASED,
        subtitle: 'DEVELOPER declares the feature COMPLETED',
        color: 'primary',
        icon: <WaterDrop />
    },
    {
        label: 'Completed',
        value: FEATURE_STATUS.COMPLETED,
        subtitle: 'AUTHOOR confirms the feature is SUCCESSFUL',
        color: 'secondary',
        icon: <Done />
    },
    {
        label: 'Cancelled',
        value: FEATURE_STATUS.CANCELLED,
        subtitle: 'AUTHOR or DEVELOPER has CANCELLED the feature',
        color: 'error',
        icon: <Close />
    }
];

export type StatusItem = (typeof FeatureStatusItems)[number];

