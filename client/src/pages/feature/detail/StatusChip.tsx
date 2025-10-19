import { Feature, FEATURE_STATUS } from '@/types/feature/Feature';
import { Build, Close, DesignServices, Done, WaterDrop } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';



interface Props {
    status?: FEATURE_STATUS;
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const StatusChip: React.FC<Props> = ({
    status,
    onClick,
}) => {

    const item = useMemo(() => FeatureStatusItems.find(i => i.value === status), [status]);
    const label = item?.label?.toUpperCase() ?? "N/A";

    return (
        <Tooltip title={item?.subtitle ?? ""}>
            <Chip
                icon={item?.icon}
                label={label}
                color={item?.color as any || 'default'}
                onClick={onClick}
            />
        </Tooltip>
    );
};

export default StatusChip; 



export const FeatureStatusItems = [
    {
        label: 'Proposed',
        value: FEATURE_STATUS.PROPOSED,
        subtitle: 'Feature has been proposed',
        color: 'default',
        icon: <DesignServices />
    },
    {
        label: 'In Development',
        value: FEATURE_STATUS.IN_DEVELOPMENT,
        subtitle: 'Feature accepted by an AUTHOR and in development',
        color: 'primary',
        icon: <Build />
    },
    {
        label: 'Released',
        value: FEATURE_STATUS.RELEASED,
        subtitle: 'AUTHOR declares the feature completed',
        color: 'secondary',
        icon: <WaterDrop />
    },
    {
        label: 'Completed',
        value: FEATURE_STATUS.COMPLETED,
        subtitle: 'Feature has been completed',
        color: 'success',
        icon: <Done />
    },
    {
        label: 'Cancelled',
        value: FEATURE_STATUS.CANCELLED,
        subtitle: 'Feature has been cancelled',
        color: 'error',
        icon: <Close />
    }
];

export type StatusItem = (typeof FeatureStatusItems)[number];

