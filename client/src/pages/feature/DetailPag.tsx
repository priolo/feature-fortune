import AccountSelector from '@/components/account/AccountSelector';
import Framework from '@/layout/Framework';
import CommentsCard from '@/pages/feature/CommentsCard';
import FundingsCard from '@/pages/feature/FundingsCard';
import featureDetailSo from '@/stores/feature/detail';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { buildNewFeature } from '@/types/feature/factory';
import { Feature } from '@/types/feature/Feature';
import { Card, CardContent, TextField } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GithubRepoSelector from '../../components/github/repos/GithubRepoSelector';
import GithubUserSelector from '../../components/github/users/GithubUserSelector';
import { GitHubUser } from '@/types/github/GitHub';
import accountApi from '@/api/account';
import { Account } from '@/types/Account';



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
    useEffect(() => {
        locationSo.setCurrent(LOCATION_PAGE.FeatureDetail)

        if (id === 'new') {
            featureDetailSo.setFeature(buildNewFeature())
            return
        }
        const load = async () => {
            featureDetailSo.setFeature({ id })
            await featureDetailSo.fetch()
        }
        load();
    }, [id])


    // HANDLERS
    const handlePropChange = (prop: Partial<Feature>) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,
            ...prop
        })
    };

    const handleGithubUserChange = async (githubUser: GitHubUser) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,   
            githubUserId: githubUser?.id,
        })
        const res = await accountApi.getByGithubUserId(githubUser?.id)
        handleAccountChange(res.account)
    };

    const handleAccountChange = async (account:Account) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,   
            devAccountId: account?.id,
        })
    };


    // RENDER
    const inNew = featureDetailSo.state.feature?.id == null
    const showFundings = !inNew
    const title = featureDetailSo.state.feature?.title || ''
    const description = featureDetailSo.state.feature?.description || ''

    return <Framework>

        <GithubRepoSelector
            githubRepoId={featureDetailSo.state.feature?.githubRepoId}
            onChange={() => featureDetailSo.setFeature({
                ...featureDetailSo.state.feature,
                githubRepoId: featureDetailSo.state.feature?.githubRepoId,
            })}
        />
        <GithubUserSelector
            githubOwnerId={featureDetailSo.state.feature?.githubUserId}
            onChange={handleGithubUserChange}
        />
        <AccountSelector 
            accountId={featureDetailSo.state.feature?.devAccountId}
            onChange={handleAccountChange}
        />


        {/* FEATURE DETAIL */}
        <Card sx={{ width: '100%', mt: 2 }}>
            <CardContent sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
                <TextField fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => handlePropChange({ title: e.target.value })}
                    placeholder="Enter a short title for the feature"
                />
                <TextField fullWidth multiline
                    label="Feature Description"
                    rows={6}
                    value={description}
                    onChange={(e) => handlePropChange({ description: e.target.value })}
                    placeholder="Enter a complete description of the feature..."
                />
            </CardContent>
        </Card>


        {/* FUNDINGS SECTION */}
        {showFundings && (
            <FundingsCard />
        )}


        {/* COMMENTS SECTION */}
        {showFundings && (
            <CommentsCard />
        )}

    </Framework>
}

export default FeatureDetailPag;
