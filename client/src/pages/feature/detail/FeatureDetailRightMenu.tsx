import React from 'react';
import PageMenu from '../../../components/PageMenu';
import featureDetailSo from '@/stores/feature/detail';
import { useStore } from '@priolo/jon';
import fundingListSo from '@/stores/funding/list';
import commentListSo from '@/stores/comment/list';



interface Props {
}

const FeatureDetailRightMenu: React.FC<Props> = ({
}) => {

    // STORES
    useStore(featureDetailSo)
    useStore(fundingListSo)
    useStore(commentListSo)


    // RENDER
    const feature = featureDetailSo.state.feature
    if (!feature) return null

    const fundingCount = fundingListSo.state.all?.length || null
    const commentCount = commentListSo.state.all?.length || null
    const haveDescription = !(feature.description?.trim().length > 0 && feature.title?.trim().length > 0)

    return <PageMenu items={[
        {
            id: 'github-repo-selector-card',
            label: 'Repository',
            subLabel: feature.githubRepoId ? feature.githubRepoMetadata?.full_name ?? "--" : 'Not linked',
            warnIcon: !feature.githubRepoId,

        },
        {
            id: 'dev-selector',
            label: 'Developer',
            subLabel: feature.accountDevId ? "Assigned" : 'Not assigned',
            warnIcon: !feature.accountDevId,
        },
        {
            id: 'feature-detail-card',
            label: 'Details',
            subLabel: haveDescription ? 'Feature description' : "Write a title and description",
            warnIcon: !haveDescription,
        },
        {
            id: 'fundings-card',
            label: 'Fundings',
            subLabel: 'Backers and funds',
            startRender: fundingCount,
        },
        {
            id: 'comments-card',
            label: 'Comments',
            subLabel: 'Discussion',
            startRender: commentCount,
        }
    ]} />
};

export default FeatureDetailRightMenu;
