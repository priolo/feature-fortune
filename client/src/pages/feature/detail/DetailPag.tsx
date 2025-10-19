import AccountSelectorCard from '@/components/account/AccountSelectorCard';
import Framework from '@/layout/Framework';
import CommentsCard from '@/components/comment/CommentsCard';
import FeatureDetailCard from '@/pages/feature/detail/FeatureDetailCard';
import FundingsCard from '@/pages/feature/detail/FundingsCard';
import authSo from '@/stores/auth/repo';
import featureDetailSo from '@/stores/feature/detail';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Account } from '@/types/Account';
import { buildNewFeature } from '@/types/feature/factory';
import { Feature } from '@/types/feature/Feature';
import { GitHubRepository, GitHubUser } from '@/types/github/GitHub';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GithubRepoSelectorCard from '../../../components/github/repos/GithubRepoSelectorCard';
import GithubUserSelectorCard from '../../../components/github/users/GithubUserSelectorCard';
import accountApi from '@/api/account';



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

    const handleGithubDevChange = async (githubDev: GitHubUser) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,   
            githubDevId: githubDev?.id,
        })
        if ( featureDetailSo.state.feature?.accountDevId ) return; // non sovrascrive se gia' presente
        const res = await accountApi.getByGithubUserId(githubDev?.id)
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

        <FeatureDetailCard
            feature={feature}
            onChange={handleDetailChange}
        />

        <FundingsCard 
            featureId={feature?.id} 
        />

        <CommentsCard 
            featureId={feature?.id} 
        />

    </Framework>
}

export default FeatureDetailPag;
