import { FUNDING_STATUS } from '@/types/Funding';
import { Close, Done, PlayArrow, PointOfSale } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';



interface Props {
    status?: FUNDING_STATUS;
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const StatusChip: React.FC<Props> = ({
    status,
    onClick,
}) => {

    const item = useMemo(() => FundingStatusItems.find(i => i.value === status), [status]);
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



export const FundingStatusItems = [
    {
        label: 'Pending',
        value: FUNDING_STATUS.PENDING,
        subtitle: 'Funding is pending approval',
        color: 'default',
        icon: <PlayArrow />
    },
    {
        label: 'Cancelled',
        value: FUNDING_STATUS.CANCELLED,
        subtitle: 'Funding has been cancelled',
        color: 'error',
        icon: <Close />
    },
    {
        label: 'Payable',
        value: FUNDING_STATUS.PAYABLE,
        subtitle: 'Funding is ready to be paid',
        color: 'primary',
        icon: <PointOfSale />
    },
    {
        label: 'Paied',
        value: FUNDING_STATUS.PAIED,
        subtitle: 'Funding has been successfully paid',
        color: 'success',
        icon: <Done />
    },
    {
        label: 'Error',
        value: FUNDING_STATUS.ERROR,
        subtitle: 'Feature has been cancelled',
        color: 'error',
        icon: <Close />
    }
];

export type StatusItem = (typeof FundingStatusItems)[number];

