import ReadOnlyTextField from '@/components/ReadOnlyTextField';
import { OpenInNew } from '@mui/icons-material';
import { IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import React from 'react';



interface Props {
	value: string;
	readOnly?: boolean;
	onChange: (value: string) => void;
	placeholder?: string;
}

const LinkField: React.FC<Props> = ({
	value,
	readOnly,
	onChange,
	placeholder,
}) => {
	const href = value && !/^https?:\/\//i.test(value) ? `https://${value}` : value;

	return (
		<>
			{readOnly && value ? (
				<Typography
					variant="body1"
					sx={{ p: '8.5px 14px' }}
				>
					<Link href={href} target="_blank" rel="noopener noreferrer" underline="always">
						{value}
					</Link>
				</Typography>
			) : (
				<TextField fullWidth
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					slotProps={{
						input: {
							endAdornment: value ? (
								<InputAdornment position="end">
									<IconButton
										href={href}
										target="_blank"
										edge="end"
										size="small"
									>
										<OpenInNew />
									</IconButton>
								</InputAdornment>
							) : null
						}
					}}
				/>
			)}
		</>
	);
};

export default LinkField;
