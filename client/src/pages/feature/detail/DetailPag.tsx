import accountApi from '@/api/account';
import AccountSelectorCard from '@/components/account/AccountSelectorCard';
import CommentsCard from '@/components/comment/CommentsCard';
import Framework from '@/layout/Framework';
import FeatureDetailCard from '@/pages/feature/detail/FeatureDetailCard';
import FundingsCard from '@/pages/feature/detail/FundingsCard';
import featureDetailSo from '@/stores/feature/detail';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Account } from '@/types/Account';
import { buildNewFeature } from '@/types/feature/factory';
import { Feature, FEATURE_STATUS } from '@/types/feature/Feature';
import { GitHubRepository, GitHubUser } from '@/types/github/GitHub';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GithubRepoSelectorCard from '../../../components/github/repos/GithubRepoSelectorCard';
import GithubUserSelectorCard from '../../../components/github/users/GithubUserSelectorCard';
import authSo from '@/stores/auth/repo';
import { HistoryEdu } from '@mui/icons-material';
import FeatureDetailOverview from './FeatureDetailOverview';
import FeatureDetailRightMenu from './FeatureDetailRightMenu';



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

    useEffect(() => {
        return () => {
            featureDetailSo.setFeature(null)
        }
    }, [])


    // HANDLERS
    const scrollToCard = (cardId: string) => {
        const element = document.getElementById(cardId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const handleDetailChange = (feature: Feature) => {
        featureDetailSo.setFeature(feature)
    }

    const handleGithubRepoChange = async (repo: GitHubRepository) => {

        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,
            githubRepoId: repo?.id ?? null,
            githubRepoMetadata: repo ? {
                name: repo.name,
                full_name: repo.full_name,
                avatar_url: repo.owner.avatar_url,
                description: repo.description,
                html_url: repo.html_url,
            } : null,
        })

        // auto-link githubDevId
        if (!!repo.owner && !feature.githubDevId) {
            handleGithubDevChange(repo.owner)
        }
    }

    const handleGithubDevChange = async (githubDev: GitHubUser) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,
            githubDevId: githubDev?.id ?? null,
        })

        // auto-link accountDevId
        if (featureDetailSo.state.feature?.accountDevId) return
        const res = await accountApi.getByGithubUserId(githubDev?.id)
        handleAccountDevChange(res.account)
    };

    const handleAccountDevChange = async (account: Account) => {
        featureDetailSo.setFeature({
            ...featureDetailSo.state.feature,
            accountDevId: account?.id ?? null,
        })
    };


    // RENDER
    const feature = featureDetailSo.state.feature
    if (!feature) return null

    const logged = !!authSo.state.user
    const isNew = !feature.id
    const authorId = isNew ? authSo.state.user?.id : feature.accountId
    const isAuthor = logged && (isNew || feature?.accountId == authSo.state.user?.id)
    const isFundable = feature?.status != FEATURE_STATUS.CANCELLED && feature?.status != FEATURE_STATUS.COMPLETED
    // posso editare solo se sono l'AUTHOR e lo stato è PROPOSED
    const canAuthorEdit = isAuthor && feature.status == FEATURE_STATUS.PROPOSED

    return <Framework sx={{ py: 2 }}
        leftRender={<FeatureDetailOverview />}
        rightRender={<FeatureDetailRightMenu onScrollTo={scrollToCard} />}
    >

        <div id="author-card">
            <AccountSelectorCard readOnly
                icon={<HistoryEdu />}
                title="AUTHOR"
                accountId={authorId}
            />
        </div>

        <div id="repo-card">
            <GithubRepoSelectorCard readOnly={!canAuthorEdit}
                githubRepoId={feature.githubRepoId}
                onChange={handleGithubRepoChange}
            />
        </div>

        {feature.status == FEATURE_STATUS.PROPOSED && (
            <div id="github-user-card">
                <GithubUserSelectorCard readOnly={!canAuthorEdit}
                    githubOwnerId={feature.githubDevId}
                    onChange={handleGithubDevChange}
                />
            </div>
        )}

        <div id="dev-card">
            <AccountSelectorCard readOnly={!canAuthorEdit}
                title="DEVELOPER"
                message={!feature.accountDevId
                    ? "Select the account that will be used to open issues and pull requests on GitHub."
                    : null
                }
                accountId={feature.accountDevId}
                onChange={handleAccountDevChange}
            />
        </div>

        <div id="detail-card">
            <FeatureDetailCard readOnly={!canAuthorEdit}
                feature={feature}
                onChange={handleDetailChange}
            />
        </div>

        <div id="fundings-card">
            <FundingsCard readonly={!isFundable}
                featureId={feature.id}
            />
        </div>

        <div id="comments-card">
            <CommentsCard
                featureId={feature.id}
            />
        </div>

    </Framework>
}

export default FeatureDetailPag;
