import stripeApi from '@/api/stripe';
import { Funding } from '@/types/Funding';
import { Box, List, ListItemButton } from '@mui/material';
import React from 'react';
import FundingView from './FundingView';



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
            <List>
                {fundings.map((funding, index) => (

                    <ListItemButton key={funding.id}
                        divider={index < fundings.length - 1}
                        onClick={() => handlePayNow(funding)}
                    >
                        <FundingView
                            funding={funding}
                        />
                    </ListItemButton>
                    
                ))}
            </List>
        </Box>
    );
};

export default FundingList;