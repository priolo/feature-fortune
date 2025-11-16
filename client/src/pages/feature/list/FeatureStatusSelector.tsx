import SelectorDialogBase from '@/components/SelectorDialogBase';
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { FeatureStatusItems, StatusItem } from '../detail/StatusChip';
import { Chip } from '@mui/material';
import React from 'react';



interface Props {
	statusId?: FEATURE_STATUS | null;
	onChange: (status: FEATURE_STATUS | null) => void;
}

const FeatureStatusSelector: React.FC<Props> = ({
	statusId,
	onChange,
}) => {

	const [isOpen, setIsOpen] = React.useState(false);

	const selected = React.useMemo(() => FeatureStatusItems.find(item => item.value === statusId), [statusId]);

	const handleClose = (status: StatusItem | null) => {
		if (!!status) onChange(status.value);
		setIsOpen(false);
	};

	const label = selected?.label?.toUpperCase() ?? 'ALL STATUSES';
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
			fnTextFromItem={item => item.label.toUpperCase()}
			fnSecondaryFromItem={item => item.subtitle}
			fnIdFromItem={item => item.value}

			isOpen={isOpen}
			onClose={handleClose}
		/>
	</>;
};

export default FeatureStatusSelector;
