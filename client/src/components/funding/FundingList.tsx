import stripeApi from '@/api/stripe';
import { Funding } from '@/types/Funding';
import { Done } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import FundingRow from './FundingRow';



interface Props {
    fundings: Funding[];
}

const FundingList: React.FC<Props> = ({
    fundings
}) => {

    // HANDLERS
    const handlePayNow = async (funding: Funding) => {
        const result = await stripeApi.pay(funding.id);
        console.log(result);
    };


    // RENDER
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            {fundings.map(funding => (
                <FundingRow 
                    key={funding.id}
                    funding={funding}
                    onClick={handlePayNow}
                />
            ))}

        </Box>
    );
};

export default FundingList;