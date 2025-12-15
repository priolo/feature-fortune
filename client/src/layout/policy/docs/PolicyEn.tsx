import { Box, Link, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

const PolicyEn: FunctionComponent = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

			<Typography variant='h4'>
				1. Privacy Policy
			</Typography>

			<Typography variant='h6'>
				Data Controller
			</Typography>

			<Typography variant='body1'>
				The Data Controller is: <strong> Ivano Iorio</strong>
				<br />
				Address: <strong> Via Don Giovanni Verità, 5 Padova</strong>
				<br />
				Contact email: <strong>
					<Link href="mailto:info@puce.app"> info@puce.app</Link>
				</strong>
			</Typography>

			<Typography variant='h6' sx={{ mt: 2 }}>
				Collected Data and Purposes
			</Typography>
			<Typography variant='body1'>
				We collect and process your personal data (e.g. name, email, online identifiers) exclusively for:
			</Typography>
			<Typography variant="body1">
				<ul>
					<li>Allowing registration and access to the platform.</li>
					<li>Connecting donors and open source project developers.</li>
					<li>Managing the security of the platform.</li>
					<li>Fulfilling legal obligations.</li>
				</ul>
			</Typography>



			<Typography variant='h6' sx={{ mt: 2 }}>
				Data Recipients and Third-Party Services
			</Typography>

			<Typography variant='body1'>
				To provide the service, we rely on trusted third-party providers. Your data may be transmitted to:
			</Typography>

			<Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>

				<Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
					Payment Processing (Stripe)
				</Typography>
				<Typography variant='body2'>
					We use <strong>Stripe</strong> to process donations. When you make a donation, some data (such as user ID, amount, and email) is transferred to Stripe. Stripe acts as an independent controller for financial data and payment processing (including anti-fraud and anti-money laundering checks). We never store your credit card data.
					<br />
					For more information:
					<Link href="https://stripe.com/it/privacy" target="_blank" rel="noopener" color='secondary'>
						<strong> Stripe Privacy Policy </strong>
					</Link>.
				</Typography>

				<Typography variant='subtitle1' sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
					Authentication (Google)
				</Typography>
				<Typography variant='body2'>
					This platform allows you to log in via the "Sign in with Google" service provided by Google Ireland Ltd / Google LLC.
					When you use this feature, Google collects data about your device and your Google account to verify your identity and provide us with a secure access token. We do not have access to your Google password.
					<br />
					For more information:
					<Link href="https://policies.google.com/privacy" target="_blank" rel="noopener" color="secondary">
						<strong> Google Privacy Policy</strong>
					</Link>.
				</Typography>

				<Typography variant='subtitle1' sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
					Authentication (GitHub)
				</Typography>
				<Typography variant='body2'>
					This platform allows you to log in via the "Sign in with GitHub" service provided by GitHub Inc.
					When you use this feature, GitHub collects data about your GitHub account (such as username, email, and avatar) to verify your identity and provide us with a secure access token. We do not have access to your GitHub password nor can we act on your behalf on your account.
					<br />
					For more information:
					<Link href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener" color="secondary">
						<strong> GitHub Privacy Policy</strong>
					</Link>.
				</Typography>
				
			</Box>

			<Typography variant='h6' sx={{ mt: 2 }}>
				Data Retention
			</Typography>
			<Typography variant='body1'>
				Your account data is retained as long as your account is active. Data related to financial transactions is kept for 10 years as required by current tax regulations.
			</Typography>

			<Typography variant='h6' sx={{ mt: 2 }}>
				Your Rights
			</Typography>
			<Typography variant='body1'>
				Under the GDPR, you have the right to request from the Controller access to your data, rectification, erasure (right to be forgotten), or restriction of processing. You can exercise these rights by writing to the email address indicated above.
			</Typography>

			<Typography variant='h4' sx={{ mt: 4 }}>
				2. Cookie Policy
			</Typography>

			<Typography variant='body1'>
				This site <strong>does not use commercial or advertising profiling cookies</strong>, neither first-party nor third-party.
			</Typography>
			<Typography variant='body1'>
				We only use <strong>technical cookies</strong> (or similar tools such as Local Storage) strictly necessary for the proper functioning of the platform and to ensure secure browsing.
			</Typography>

			<Typography variant='h6' sx={{ mt: 2 }}>
				Types of Technical Cookies Used
			</Typography>
			<Typography variant="body1">
				<ul>
					<li>
						<strong>Functionality and Session:</strong> We use technical tokens (e.g. JWT or session cookies) to recognize your user once you have logged in and to allow you to navigate the reserved area without having to re-enter your credentials on every page.
					</li>
					<li>
						<strong>Payment Security (Stripe):</strong> We use third-party technical cookies provided by Stripe Inc. necessary to process payments, ensure transaction security, and prevent fraud.
					</li>
					<li>
						<strong>Federated Authentication (Google):</strong> We use third-party technical cookies strictly necessary for the management of the "Sign-in with Google" service. These are necessary to allow quick access via your Google account.
					</li>
					<li>
						<strong>Federated Authentication (GitHub):</strong> We use third-party technical cookies strictly necessary for the management of the "Sign-in with GitHub" service. These are necessary to allow quick access via your GitHub account.
					</li>
				</ul>
			</Typography>

			<Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
				<Typography variant='body1'>
					<strong>Legal basis:</strong> According to the ePrivacy Directive and the provisions of the Privacy Authority, the installation of such necessary technical cookies does not require the user's prior consent, therefore the preventive block banner is not shown.
				</Typography>
			</Box>

			<Box component="footer" sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
				<Typography variant='caption' color="text.secondary">
					&copy; 2024 PUCE - All rights reserved.
				</Typography>
			</Box>
		</Box>
	);
};

export default PolicyEn;
