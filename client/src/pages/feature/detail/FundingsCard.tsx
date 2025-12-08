import Card from '@/components/Card';
import FundingDialog from '@/components/funding/FundingDialog';
import FundingView from '@/components/funding/FundingView';
import MessageBanner from '@/components/MessageBanner';
import fundingListSo from '@/stores/funding/list';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import { Funding } from '@/types/Funding';
import { Add, Payment } from '@mui/icons-material';
import { Button, List, ListItem } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';



interface Props {
    featureId?: string
    readonly?: boolean
}

const FundingsCard: React.FC<Props> = ({
    featureId,
    readonly = false,
}) => {

    // STORES
    useStore(fundingListSo)


    // HOOKS
    const { t } = useTranslation()
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
    const handlePayNow = async (funding: Funding) => {
        const r = await dialogSo.dialogOpen({
            type: DIALOG_TYPE.WARNING,
            text: t('cards.FundingsCard.alerts.pay.check'),
            modal: true,
        })
        if (!r) return
        const success = await fundingListSo.pay(funding.id)
        if (!success) return

        dialogSo.dialogOpen({ type: DIALOG_TYPE.SUCCESS, text: t('cards.FundingsCard.alerts.pay.success') });
    }
    const handleCancel = async (funding: Funding) => {
        const r = await dialogSo.dialogOpen({
            type: DIALOG_TYPE.WARNING,
            text: t('cards.FundingsCard.alerts.cancel.check'),
            modal: true,
        })
        if (!r) return
        const success = await fundingListSo.remove(funding.id)
        if (!success) return
        dialogSo.dialogOpen({ type: DIALOG_TYPE.SUCCESS, text: t('cards.FundingsCard.alerts.cancel.success') });
    }


    // RENDER
    const fundings = fundingListSo.state.all
    if (!fundings) return null
    const isVoid = fundings.length == 0;

    return <>

        <Card id="funding-card"
            icon={<Payment />}
            title={t('cards.FundingsCard.title', 'FUNDINGS')}
            titleEndRender={!readonly && (
                <Button variant="contained" size="small"
                    startIcon={<Add />}
                    onClick={handleCreateClick}
                >{t('cards.FundingsCard.actions.contribute', 'CONTRIBUTE')}</Button>
            )}
        >

            {!isVoid ? (
                <List> {fundings.map((funding, index) => (

                    <ListItem key={funding.id}
                        divider={index < fundings.length - 1}
                    >
                        <FundingView
                            funding={funding}
                            onCancel={handleCancel}
                            onPayNow={handlePayNow}
                        />
                    </ListItem>

                ))} </List>
            ) : (
                <MessageBanner align="center">
                    {t('cards.FundingsCard.empty')}
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
