import FundingDialog from '@/components/funding/FundingDialog';
import FundingList from '@/components/funding/FundingList';
import fundingListSo from '@/stores/funding/list';
import { Funding } from '@/types/Funding';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';



interface Props {
    featureId?: string
}

const FundingsCard: React.FC<Props> = ({
    featureId
}) => {

    // STORES
    useStore(fundingListSo)


    // HOOKS
    const [dialogOpen, setDialogOpen] = useState(false);
    useEffect(() => {
        if (!featureId) {
            fundingListSo.setAll(null)
            return
        }
        fundingListSo.fetch({ featureId })
    }, [featureId])


    // HANDLERS
    const handleCreateClick = () => {
        setDialogOpen(true)
    }
    /** Funding è sempre NEW */
    const handleDialogClose = (funding: Funding) => {
        setDialogOpen(false)
        if (!funding) return
        funding.featureId = featureId
        fundingListSo.setSelected(funding)
        fundingListSo.saveSelected()
    }


    // RENDER
    const fundings = fundingListSo.state.all
    if (!fundings) return null
    const isVoid = fundings.length == 0;

    return <>
        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                        Fundings ({fundings?.length || 0})
                    </Typography>
                    <Button variant="contained" color="primary"
                        onClick={handleCreateClick}
                    >CONTRIBUTE</Button>
                </Box>

                {!isVoid ? (

                    <FundingList fundings={fundings} />

                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                        No fundings yet for this feature.
                    </Typography>
                )}

            </CardContent>
        </Card>

        {/* DIALOGS */}
        <FundingDialog
            isOpen={dialogOpen}
            onClose={handleDialogClose}
        />
    </>
}

export default FundingsCard;
