import SelectorDialogBase from '@/components/SelectorDialogBase';
import { FEATURE_FILTER } from "@/stores/feature/types";
import { Chip } from '@mui/material';
import React from 'react';



interface Props {
	filterId: FEATURE_FILTER
	onChange: (filter: FEATURE_FILTER) => void
}

const FeatureFilterSelector: React.FC<Props> = ({
	filterId,
	onChange,
}) => {

	// HOOKS
	const [isOpen, setIsOpen] = React.useState(false);

	// HANDLERS
	const handleClose = (filter: any) => {
		onChange(filter.id)
		setIsOpen(false)
	}

	// RENDER
	const selected = featureFiltes.find(f => f.id === filterId) ?? featureFiltes[0]

	return <>

		<Chip
			label={selected.label}
			onClick={() => setIsOpen(true)}
			onDelete={() => onChange(null)}
		/>

		<SelectorDialogBase
			title="Filter Features"

			idSelect={selected?.id}
			items={featureFiltes}
			fnTextFromItem={item => item.label}
			fnIdFromItem={item => item.id}

			isOpen={isOpen}
			onClose={handleClose}
		/>
	</>
}

export default FeatureFilterSelector;

const featureFiltes = [
	{ id: FEATURE_FILTER.ALL, label: "ALL" },
	{ id: FEATURE_FILTER.MY, label: "I MADE THEM" },
	{ id: FEATURE_FILTER.FINANCED, label: "I FINANCED THEM" },
	{ id: FEATURE_FILTER.DEVELOPED, label: "I AM THE DEVELOPER" },
]