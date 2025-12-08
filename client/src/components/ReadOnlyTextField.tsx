import { TextField, TextFieldProps, Typography } from '@mui/material';
import React from 'react';



export type ReadOnlyTextFieldProps = TextFieldProps & {
	readOnly?: boolean;
	value?: string;
	placeholder?: string;
};

const ReadOnlyTextField: React.FC<ReadOnlyTextFieldProps> = ({
	readOnly,
	value,
	placeholder,
	...textFieldProps
}) => {

	if (!readOnly) {
		return (
			<TextField
				{...textFieldProps}
				value={value}
				placeholder={placeholder}
			/>
		);
	}

	return (
		<Typography variant="body1" sx={{ p: 1 }}>
			{value}
		</Typography>
	);
};

export default ReadOnlyTextField;
