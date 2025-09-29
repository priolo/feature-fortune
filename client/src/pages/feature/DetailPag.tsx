import FundingList from '@/components/funding/FundingList';
import GithubRepoDialog from '@/components/github/GithubRepoDialog';
import GithubRepoCmp from '@/components/github/GithubRepoCmp';
import featureDetailSo from '@/stores/feature/detail';
import { buildNewFeature } from '@/types/feature/factory';
import { GitHubRepository } from '@/types/github/GitHub';
import { Box, Button, Card, CardActions, CardContent, SxProps, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FORM_MODE } from '@/stores/types';
import FundingDialog from '@/components/funding/FundingDialog';
import { Funding } from '@/types/Funding';



interface Props {
}

/**
 * si occupa di crerae e collegare l'account del current user ai vari servizi
 */
const FeatureDetailPag: React.FC<Props> = ({
}) => {

    // STORES
    useStore(featureDetailSo)

    // HOOKS
    let { id } = useParams<{ id: string }>()
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogFundingOpen, setDialogFundingOpen] = useState(false);


    useEffect(() => {
        if (id === 'new') {
            featureDetailSo.setFeature(buildNewFeature())
            featureDetailSo.setGithubRepo(null)
            featureDetailSo.setMode(FORM_MODE.CREATE)
            return
        }
        featureDetailSo.setMode(FORM_MODE.VIEW)
        const load = async () => {
            featureDetailSo.setFeature({ id })
            await featureDetailSo.fetch()
            featureDetailSo.fetchGithubRepo()
        }
        load();
    }, [id])


    // HANDLERS
    const handleGithubFindClick = () => {
        setDialogOpen(true)
    }
    const handleGithubDialogClose = (repo: GitHubRepository) => {
        setDialogOpen(false)
        if (!repo) return
        featureDetailSo.setGithubRepo(repo)
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,
            githubName: repo.full_name,
            githubId: repo.id
        })
    }



    const handleFeatureTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,
            title: e.target.value
        })
    };
    const handleFeatureDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,
            description: e.target.value
        })
    }
    const handleFeatureSaveClick = () => {
        featureDetailSo.saveFeature()
    }



    const handleFundingCreateClick = () => {
        setDialogFundingOpen(true)
    };
    const handleFundingDialogClose = (funding: Funding) => {
        setDialogFundingOpen(false)
        if (!funding) return
        featureDetailSo.setFundingSelected(funding)
        featureDetailSo.saveFunding()
    }

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // RENDER
    const inNew = featureDetailSo.state.feature?.id == null
    const showFundings = !inNew
    const title = featureDetailSo.state.feature?.title || ''
    const description = featureDetailSo.state.feature?.description || ''

    return (
        <Box sx={sxRoot}>

            <Card sx={{ width: '100%', mt: 2 }}>
                <CardContent>
                    <GithubRepoCmp
                        repository={featureDetailSo.state.githubRepo}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        onClick={handleGithubFindClick}
                    >SELECT</Button>
                </CardActions>
            </Card>

            <Card sx={{ width: '100%', mt: 2 }}>
                <CardContent sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
                    <TextField fullWidth
                        label="Title"
                        value={title}
                        onChange={handleFeatureTitleChange}
                        placeholder="Enter a short title for the feature"
                    />
                    <TextField fullWidth multiline
                        label="Feature Description"
                        rows={6}
                        value={description}
                        onChange={handleFeatureDescriptionChange}
                        placeholder="Enter a complete description of the feature..."
                    />
                </CardContent>
                <CardActions>
                    <Button
                        onClick={handleFeatureSaveClick}
                    >Create Feature</Button>
                </CardActions>
            </Card>

            {/* Fundings Section */}
            {showFundings && (
                <Card sx={{ width: '100%', mt: 2 }}>
                    <CardContent>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" component="h2">
                                Fundings ({featureDetailSo.state.feature?.fundings?.length || 0})
                            </Typography>
                            <Button variant="contained" color="primary"
                                onClick={handleFundingCreateClick}
                            >CONTRIBUTE</Button>
                        </Box>

                        {featureDetailSo.state.feature?.fundings && featureDetailSo.state.feature.fundings.length > 0 ? (

                            <FundingList fundings={featureDetailSo.state.feature.fundings} />

                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                                No fundings yet for this feature.
                            </Typography>
                        )}

                        {/* Total funding summary */}
                        {featureDetailSo.state.feature?.fundings && featureDetailSo.state.feature.fundings.length > 0 && (
                            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                                <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Total Funded:</strong>
                                    <strong>
                                        {formatAmount(
                                            featureDetailSo.state.feature.fundings
                                                .filter(f => f.status === 'completed')
                                                .reduce((sum, f) => sum + f.amount, 0)
                                        )}
                                    </strong>
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            )}



            <GithubRepoDialog
                isOpen={dialogOpen}
                onClose={handleGithubDialogClose}
            />

            <FundingDialog 
                isOpen={dialogFundingOpen}
                onClose={handleFundingDialogClose}
            /> 

        </Box>
    );
};

export default FeatureDetailPag;

const sxRoot: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    //alignItems: 'center',
    maxWidth: 800,
    margin: '0 auto',
    padding: 2
}


const testItems = [
    { id: 1, name: 'Item One', description: 'This is the first item' },
    { id: 2, name: 'Item Two', description: 'This is the second item' },
    { id: 3, name: 'Item Three', description: 'This is the third item' },
    { id: 4, name: 'Item Four', description: 'This is the fourth item' },
    { id: 5, name: 'Item Five', description: 'This is the fifth item' },
    { id: 6, name: 'Item Six', description: 'This is the sixth item' },
    { id: 7, name: 'Item Seven', description: 'This is the seventh item' },
    { id: 8, name: 'Item Eight', description: 'This is the eighth item' },
    { id: 9, name: 'Item Nine', description: 'This is the ninth item' },
    { id: 10, name: 'Item Ten', description: 'This is the tenth item' },
]