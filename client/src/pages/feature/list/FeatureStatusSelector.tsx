import SelectorDialogBase from '@/components/SelectorDialogBase';
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { FeatureStatusItems, StatusItem } from '@/types/feature/enum';
import { Chip } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';



interface Props {
	statusId?: FEATURE_STATUS | null;
	onChange: (status: FEATURE_STATUS | null) => void;
}

const FeatureStatusSelector: React.FC<Props> = ({
	statusId,
	onChange,
}) => {


	// HOOKS
	const { t } = useTranslation()
	const [isOpen, setIsOpen] = React.useState(false);
	const selected: StatusItem = React.useMemo(() =>
		FeatureStatusItems.find(item => item.value === statusId), [statusId]
	)


	// HANDLERS
	const handleClose = (status: StatusItem | null) => {
		if (!!status) onChange(status.value);
		setIsOpen(false);
	};


	// RENDER
	const label = t(`view.feature.${selected.value}.label`) ?? 'ALL STATUSES';
	const isDefault = selected == null

	return <>

		<Chip
			label={label}
			onClick={() => setIsOpen(true)}
			onDelete={!isDefault ? () => onChange(null) : undefined}
		/>

		<SelectorDialogBase
			title="FILTER BY STATUS"

			idSelect={selected?.value ?? undefined}
			items={FeatureStatusItems}
			fnTextFromItem={(item: StatusItem) => t(`view.feature.${item.value}.label`)}
			fnSecondaryFromItem={(item: StatusItem) => t(`view.feature.${item.value}.desc`)}
			fnIdFromItem={(item: StatusItem) => item.value}

			isOpen={isOpen}
			onClose={handleClose}
		/>
	</>;
};

export default FeatureStatusSelector;
