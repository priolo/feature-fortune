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

    const fundingCount = fundingListSo.state.all?.length || null;
    const commentCount = commentListSo.state.all?.length || null;

    return <PageMenu items={[
        // {
        //     id: 'account-selector-author',
        //     label: 'Author',
        //     subLabel: 'Feature creator'
        // },
        {
            id: 'github-repo-selector-card',
            label: 'Repository',
            subLabel: "GitHub Repository",
            warnIcon: !feature.githubRepoId,

        },
        {
            id: 'dev-selector',
            label: 'Developer',
            subLabel: 'Assigned developer',
        },
        {
            id: 'feature-detail-card',
            label: 'Details',
            subLabel: 'Feature description',
            warnIcon: !feature.accountDevId,
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
