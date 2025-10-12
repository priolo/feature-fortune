import AccountSelectorCard from '@/components/account/AccountSelectorCard';
import Framework from '@/layout/Framework';
import CommentsCard from '@/pages/feature/CommentsCard';
import FundingsCard from '@/pages/feature/FundingsCard';
import FeatureDetailCard from '@/pages/feature/FeatureDetailCard';
import featureDetailSo from '@/stores/feature/detail';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { buildNewFeature } from '@/types/feature/factory';
import { Feature } from '@/types/feature/Feature';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GithubRepoSelectorCard from '../../components/github/repos/GithubRepoSelectorCard';
import GithubUserSelectorCard from '../../components/github/users/GithubUserSelectorCard';
import { GitHubRepository, GitHubUser } from '@/types/github/GitHub';
import accountApi from '@/api/account';
import { Account } from '@/types/Account';
import authSo from '@/stores/auth/repo';



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

        if (id === 'new' || !id) {
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
    const handleDetailChange = (feature: Feature) => {
        featureDetailSo.setFeature(feature)
    }

    const handleGithubRepoChange = async (repo: GitHubRepository) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,   
            githubRepoId: repo?.id,
        })
    }

    const handleGithubDevChange = async (githubUser: GitHubUser) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,   
            githubDevId: githubUser?.id,
        })
        const res = await accountApi.getByGithubUserId(githubUser?.id)
        handleAccountDevChange(res.account)
    };

    const handleAccountDevChange = async (account:Account) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,   
            accountDevId: account?.id,
        })
    };


    // RENDER
    const feature = featureDetailSo.state.feature
    const inNew = feature?.id == null
    const logged = !!authSo.state.user
    const isOwner = feature?.accountId === authSo.state.user?.id
    const isDev = feature?.accountDevId === authSo.state.user?.id
    const showFundings = !inNew 
    const title = feature?.title || ''
    const description = feature?.description || ''

    return <Framework sx={{ py: 2}}>

        <GithubRepoSelectorCard
            githubRepoId={feature?.githubRepoId}
            onChange={handleGithubRepoChange}
        />

        <GithubUserSelectorCard
            githubOwnerId={feature?.githubDevId}
            onChange={handleGithubDevChange}
        />

        <AccountSelectorCard 
            accountId={feature?.accountDevId}
            onChange={handleAccountDevChange}
        />

        {/* FEATURE DETAIL */}
        <FeatureDetailCard
            feature={feature}
            onChange={handleDetailChange}
        />

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
