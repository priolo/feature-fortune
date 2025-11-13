import SelectorDialogBase from '@/components/SelectorDialogBase';
import { FEATURE_SORT } from "@/stores/feature/types";
import { Chip } from '@mui/material';
import React from 'react';



interface Props {
	sortId: FEATURE_SORT
	onChange: (filter: FEATURE_SORT) => void
}

const FeatureSortSelector: React.FC<Props> = ({
	sortId,
	onChange,
}) => {

	// HOOKS
	const [isOpen, setIsOpen] = React.useState(false);

	// HANDLERS
	const handleClose = (sort: any) => {
		if (!!sort) onChange(sort.id)
		setIsOpen(false)
	}

	// RENDER
	const selected = featureSort.find(f => f.id === sortId) ?? featureSort[0]

	return <>

		<Chip
			label={selected.label}
			onClick={() => setIsOpen(true)}
			onDelete={() => onChange(null)}
		/>

		<SelectorDialogBase
			title="SORT FEATURES BY..."

			idSelect={selected?.id}
			items={featureSort}
			fnTextFromItem={item => item.label}
			fnIdFromItem={item => item.id}

			isOpen={isOpen}
			onClose={handleClose}
		/>
	</>
}

export default FeatureSortSelector;

const featureSort = [
	{ id: FEATURE_SORT.ALL, label: "ALL" },
	{ id: FEATURE_SORT.RECENT, label: "MOST RECENT" },
	{ id: FEATURE_SORT.OLDEST, label: "OLDER" },
	{ id: FEATURE_SORT.RICHEST, label: "RICHEST" },
	{ id: FEATURE_SORT.POOREST, label: "POOREST" },
]