import FundingDialog from '@/components/funding/FundingDialog';
import FundingList from '@/components/funding/FundingList';
import featureDetailSo from '@/stores/feature/detail';
import { Funding } from '@/types/Funding';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useState } from 'react';



interface Props {
}

const FundingsCard: React.FC<Props> = ({
}) => {

    // STORES
    useStore(featureDetailSo)

    // HOOKS
    const [dialogFundingOpen, setDialogFundingOpen] = useState(false);

    // HANDLERS
    const handleFundingCreateClick = () => {
        setDialogFundingOpen(true)
    };
    const handleFundingDialogClose = (funding: Funding) => {
        setDialogFundingOpen(false)
        if (!funding) return

        featureDetailSo.setFundingSelected(funding)
        featureDetailSo.saveFunding()
    }

    // RENDER
    const fundings = featureDetailSo.state.feature?.fundings || [];
    const haveFunding = fundings != null && fundings.length > 0;

    return <>
        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                        Fundings ({fundings?.length || 0})
                    </Typography>
                    <Button variant="contained" color="primary"
                        onClick={handleFundingCreateClick}
                    >CONTRIBUTE</Button>
                </Box>

                {haveFunding ? (

                    <FundingList fundings={fundings} />

                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                        No fundings yet for this feature.
                    </Typography>
                )}

                {/* Total funding summary */}
                {haveFunding && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                        <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Total Funded:</strong>
                            <strong>
                                {formatAmount(
                                    fundings
                                        .filter(f => f.status === 'completed')
                                        .reduce((sum, f) => sum + f.amount, 0)
                                )}
                            </strong>
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>

        {/* DIALOGS */}
        <FundingDialog
            isOpen={dialogFundingOpen}
            onClose={handleFundingDialogClose}
        />
    </>
}

export default FundingsCard;

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};