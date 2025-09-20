import featureDetailSo from '@/stores/feature/detail';
import { Box, TextField } from '@mui/material';
import { useStore } from '@priolo/jon';



export default function StripePromise() {

	// STORES
	useStore(featureDetailSo)


	// HANDLERS
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		featureDetailSo.setFunding({ 
			...featureDetailSo.state.funding, 
			amount: parseFloat(e.target.value) 
		})
	}


	// RENDER
	const funding = featureDetailSo.state.funding;

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
			<TextField label="Amount" variant="outlined" fullWidth 
				value={funding?.amount ?? ''} 
				onChange={handleAmountChange}
			/>
		</Box>
	);
}


