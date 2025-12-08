import { FUNDING_STATUS } from '@/types/Funding';
import { ChevronRight, Close, Done, PlayArrow, PointOfSale } from '@mui/icons-material';
import { Chip, SxProps, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';



interface Props {
    status?: FUNDING_STATUS;
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

type ItemRow = {
    tooltip?: string,
    label?: string,
    color?: string,
    icon?: React.ReactNode
}

const StatusChip: React.FC<Props> = ({
    status,
    onClick,
}) => {


    // HOOKS
    const { t } = useTranslation()
    const item: ItemRow = useMemo(() => {
        let item: ItemRow = {
            [FUNDING_STATUS.PENDING]: {
                color: 'default',
                icon: <ChevronRight sx={sxIcon} />,
            },
            [FUNDING_STATUS.CANCELLED]: {
                color: 'error',
                icon: <Close sx={sxIcon} />,
            },
            [FUNDING_STATUS.PAYABLE]: {
                color: 'primary',
                icon: <PointOfSale sx={sxIcon} />,
            },
            [FUNDING_STATUS.PAIED]: {
                color: 'secondary',
                icon: <Done sx={sxIcon} />,
            },
            [FUNDING_STATUS.ERROR]: {
                color: 'error',
                icon: <Close sx={sxIcon} />,
            }
        }[status]
        item.label = t(`view.funding.status.${status}.label`, status);
        item.tooltip = t(`view.funding.status.${status}.tooltip`);
        return item;
    }, [status]);






    // RENDER
    if ( !item ) return null;
    
    return (
        <Tooltip title={item.tooltip}>
            <Chip
                icon={item.icon as any}
                label={item.label}
                color={item?.color as any}
                onClick={onClick}
            />
        </Tooltip>
    );
};

export default StatusChip;


const sxIcon: SxProps = {
    width: "14px",
    height: "14px"
}

