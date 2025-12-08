import React from 'react';
import PageMenu from '../../../components/PageMenu';
import featureDetailSo from '@/stores/feature/detail';
import { useStore } from '@priolo/jon';
import fundingListSo from '@/stores/funding/list';
import commentListSo from '@/stores/comment/list';
import { useTranslation } from 'react-i18next';



interface Props {
}

const FeatureDetailRightMenu: React.FC<Props> = ({
}) => {

    // STORES
    useStore(featureDetailSo)
    useStore(fundingListSo)
    useStore(commentListSo)


    // HOOKS
    const { t } = useTranslation()


    // RENDER
    const feature = featureDetailSo.state.feature
    if (!feature) return null

    const fundingCount = fundingListSo.state.all?.length || null
    const commentCount = commentListSo.state.all?.length || null
    const haveDescription = feature.description?.trim().length > 0 && feature.title?.trim().length > 0

    return <PageMenu items={[
        {
            id: 'github-repo-selector-card',
            label: t('rightmenu.feature.repo.label'),
            subLabel: feature.githubRepoId ? feature.githubRepoMetadata?.full_name ?? "--" : t('rightmenu.feature.repo.warn'),
            warnIcon: !feature.githubRepoId,

        },
        {
            id: 'feature-detail-card',
            label: t('rightmenu.feature.details.label'),
            subLabel: t(`rightmenu.feature.details.${haveDescription ? "ok" : "warn"}`),
            warnIcon: !haveDescription,
        },
        {
            id: 'dev-selector',
            label: t('rightmenu.feature.developer.label'),
            subLabel: t(`rightmenu.feature.developer.${feature.accountDevId ? "ok" : "warn"}`),
            warnIcon: !feature.accountDevId,
        },
        {
            id: 'fundings-card',
            label: t('rightmenu.feature.fundings.label'),
            subLabel: t(`rightmenu.feature.fundings.${!fundingCount ? "warn" : "ok"}`),
            startRender: fundingCount,
        },
        {
            id: 'comments-card',
            label: t('rightmenu.feature.comments.label'),
            subLabel: t(`rightmenu.feature.comments.${!commentCount ? "warn" : "ok"}`),
            startRender: commentCount,
        }
    ]} />
};

export default FeatureDetailRightMenu;
