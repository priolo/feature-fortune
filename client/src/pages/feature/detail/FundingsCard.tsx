import Card from '@/components/Card';
import FundingDialog from '@/components/funding/FundingDialog';
import FundingList from '@/components/funding/FundingList';
import MessageBanner from '@/components/MessageBanner';
import fundingListSo from '@/stores/funding/list';
import { Funding } from '@/types/Funding';
import { Add, Payment } from '@mui/icons-material';
import { Button } from '@mui/material';
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
    
        <Card id="funding-card"
            icon={<Payment />}
            title="FUNDINGS"
            titleEndRender={
                <Button variant="contained" size="small"
                    startIcon={<Add />}
                    onClick={handleCreateClick}
                >CONTRIBUTE</Button>
            }
        >

            {!isVoid ? (
                <FundingList fundings={fundings} />
            ) : (
                <MessageBanner>
                    No fundings yet for this feature.
                </MessageBanner>
            )}

        </Card>

        <FundingDialog
            isOpen={dialogOpen}
            onClose={handleDialogClose}
        />

    </>
}

export default FundingsCard;
