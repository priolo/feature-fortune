import { DesignServices, Build, WaterDrop, Done, AttachMoney, Close } from "@mui/icons-material";
import { FEATURE_STATUS } from "./Feature";



export const FeatureStatusItems = [
    {
        value: FEATURE_STATUS.PROPOSED,
        color: 'default',
        icon: DesignServices,
    },
    {
        value: FEATURE_STATUS.IN_DEVELOPMENT,
        color: 'info',
        icon: Build,
    },
    {
        value: FEATURE_STATUS.RELEASED,
        color: 'primary',
        icon: WaterDrop
    },
    {
        value: FEATURE_STATUS.COMPLETED,
        color: 'success',
        icon: Done
    },
    {
        value: FEATURE_STATUS.PAID,
        color: 'secondary',
        icon: AttachMoney
    },
    {
        value: FEATURE_STATUS.CANCELLED,
        color: 'error',
        icon: Close
    }
];

export type StatusItem = (typeof FeatureStatusItems)[number];
