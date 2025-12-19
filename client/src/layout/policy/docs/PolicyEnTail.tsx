import { FunctionComponent } from 'react';

const PolicyEnTail: FunctionComponent = () => {
	return (
		<div className="flex flex-col gap-4">

			<h4 className="text-2xl font-bold">
				1. Privacy Policy
			</h4>

			<h6 className="text-lg font-semibold">
				Data Controller
			</h6>

			<p className="text-base">
				The Data Controller is: <strong> Ivano Iorio</strong>
				<br />
				Address: <strong> Via Don Giovanni Verità, 5 Padova</strong>
				<br />
				Contact email: <strong>
					<a href="mailto:info@puce.app" className="text-blue-600 hover:underline"> info@puce.app</a>
				</strong>
			</p>

			<h6 className="text-lg font-semibold mt-4">
				Collected Data and Purposes
			</h6>
			<p className="text-base">
				We collect and process your personal data (e.g. name, email, online identifiers) exclusively for:
			</p>
			<div className="text-base">
				<ul className="list-disc list-inside">
					<li>Allowing registration and access to the platform.</li>
					<li>Connecting donors and open source project developers.</li>
					<li>Managing the security of the platform.</li>
					<li>Fulfilling legal obligations.</li>
				</ul>
			</div>

			<h6 className="text-lg font-semibold mt-4">
				Data Recipients and Third-Party Services
			</h6>

			<p className="text-base">
				To provide the service, we rely on trusted third-party providers. Your data may be transmitted to:
			</p>

			<div className="bg-gray-100 p-4 rounded">

				<h6 className="text-lg font-bold mb-2">
					Payment Processing (Stripe)
				</h6>
				<p className="text-sm">
					We use <strong>Stripe</strong> to process donations. When you make a donation, some data (such as user ID, amount, and email) is transferred to Stripe. Stripe acts as an independent controller for financial data and payment processing (including anti-fraud and anti-money laundering checks). We never store your credit card data.
					<br />
					For more information:
					<a href="https://stripe.com/it/privacy" target="_blank" rel="noopener" className="text-purple-600 hover:underline">
						<strong> Stripe Privacy Policy </strong>
					</a>.
				</p>

				<h6 className="text-lg font-bold mt-4 mb-2">
					Authentication (Google)
				</h6>
				<p className="text-sm">
					This platform allows you to log in via the "Sign in with Google" service provided by Google Ireland Ltd / Google LLC.
					When you use this feature, Google collects data about your device and your Google account to verify your identity and provide us with a secure access token. We do not have access to your Google password.
					<br />
					For more information:
					<a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="text-purple-600 hover:underline">
						<strong> Google Privacy Policy</strong>
					</a>.
				</p>

				<h6 className="text-lg font-bold mt-4 mb-2">
					Authentication (GitHub)
				</h6>
				<p className="text-sm">
					This platform allows you to log in via the "Sign in with GitHub" service provided by GitHub Inc.
					When you use this feature, GitHub collects data about your GitHub account (such as username, email, and avatar) to verify your identity and provide us with a secure access token. We do not have access to your GitHub password nor can we act on your behalf on your account.
					<br />
					For more information:
					<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener" className="text-purple-600 hover:underline">
						<strong> GitHub Privacy Policy</strong>
					</a>.
				</p>
				
			</div>

			<h6 className="text-lg font-semibold mt-4">
				Data Retention
			</h6>
			<p className="text-base">
				Your account data is retained as long as your account is active. Data related to financial transactions is kept for 10 years as required by current tax regulations.
			</p>

			<h6 className="text-lg font-semibold mt-4">
				Your Rights
			</h6>
			<p className="text-base">
				Under the GDPR, you have the right to request from the Controller access to your data, rectification, erasure (right to be forgotten), or restriction of processing. You can exercise these rights by writing to the email address indicated above.
			</p>

			<h4 className="text-2xl font-bold mt-8">
				2. Cookie Policy
			</h4>

			<p className="text-base">
				This site <strong>does not use commercial or advertising profiling cookies</strong>, neither first-party nor third-party.
			</p>
			<p className="text-base">
				We only use <strong>technical cookies</strong> (or similar tools such as Local Storage) strictly necessary for the proper functioning of the platform and to ensure secure browsing.
			</p>

			<h6 className="text-lg font-semibold mt-4">
				Types of Technical Cookies Used
			</h6>
			<div className="text-base">
				<ul className="list-disc list-inside">
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
			</div>

			<div className="bg-gray-100 p-4 rounded">
				<p className="text-base">
					<strong>Legal basis:</strong> According to the ePrivacy Directive and the provisions of the Privacy Authority, the installation of such necessary technical cookies does not require the user's prior consent, therefore the preventive block banner is not shown.
				</p>
			</div>

			<footer className="mt-8 pt-4 border-t border-gray-200">
				<span className="text-xs text-gray-500">
					&copy; 2024 PUCE - All rights reserved.
				</span>
			</footer>
		</div>
	);
};

export default PolicyEnTail;
