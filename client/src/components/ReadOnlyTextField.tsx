import React from 'react';
import { TextField, Typography, TextFieldProps, TypographyProps } from '@mui/material';

export type ReadOnlyTextFieldProps = TextFieldProps & {
	readOnly?: boolean;
	readOnlyPlaceholder?: React.ReactNode;
	readOnlyTypographyProps?: TypographyProps;
};

const defaultReadOnlySx: TypographyProps['sx'] = { p: '8.5px 14px' };

const ReadOnlyTextField: React.FC<ReadOnlyTextFieldProps> = (props) => {
	const {
		readOnly,
		value,
		placeholder,
		readOnlyPlaceholder,
		readOnlyTypographyProps,
		...textFieldProps
	} = props;

	if (!readOnly) {
		return (
			<TextField
				{...textFieldProps}
				value={value}
				placeholder={placeholder}
			/>
		);
	}

	const resolvedValue = Array.isArray(value) ? value.join(', ') : value;
	const stringified = resolvedValue === undefined || resolvedValue === null ? '' : String(resolvedValue);
	const fallback = readOnlyPlaceholder ?? placeholder ?? '';
	const content = stringified !== '' ? resolvedValue : fallback;

	return (
		<Typography
			variant="body1"
			{...readOnlyTypographyProps}
			sx={{
				...defaultReadOnlySx,
				...readOnlyTypographyProps?.sx,
			}}
		>
			{content as React.ReactNode}
		</Typography>
	);
};

export default ReadOnlyTextField;
