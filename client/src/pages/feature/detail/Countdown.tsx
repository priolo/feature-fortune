import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    date: Date | string;
	delta:number
}

const Countdown: React.FC<Props> = ({ 
	date,
	delta,
}) => {

	// HOOKS
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState<string>("00:00:00");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const completedAt = new Date(date).getTime();
            const targetTime = completedAt + delta
            const now = Date.now();
            const difference = targetTime - now;

            if (difference > 0) {
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                return "00:00:00";
            }
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [date]);


	// RENDER

    return (
        <Box>
            <Typography variant="overline" color="text.secondary">
                {t('overview.feature.label.time_left', 'TIME LEFT')}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                {timeLeft}
            </Typography>
        </Box>
    );
};

export default Countdown;
