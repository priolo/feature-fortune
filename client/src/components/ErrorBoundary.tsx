import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import { Button, Container, Typography } from "@mui/material";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	};

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
		dialogSo.dialogOpen({ 
			type: DIALOG_TYPE.ERROR, 
			title: "Application Error",
			text: error.message 
		});
	}

	public render() {
		if (this.state.hasError) {
			return (
				<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
					<Typography variant="h4" component="h1" gutterBottom color="error">
						Something went wrong
					</Typography>
					<Button variant="contained" color="primary" onClick={() => window.location.reload()}>
						Reload Application
					</Button>
				</Container>
			);
		}

		return this.props.children;
	}
}
