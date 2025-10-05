import { email, http, httpRouter, jwt, log, typeorm } from "@priolo/julian";
import { TypeLog } from "@priolo/julian/dist/core/types.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { AccountRepo } from "./repository/Account.js";
import { CommentRepo } from "./repository/Comment.js";
import { getDBConnectionConfig } from './repository/dbConfig.js';
import { FeatureRepo } from "./repository/Feature.js";
import { FundingRepo } from "./repository/Funding.js";
import AccountRoute from "./routers/AccountRoute.js";
import AuthGithubRoute from "./routers/AuthGithubRoute.js";
import AuthGoogleRoute from "./routers/AuthGoogleRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
import FeatureRoute from "./routers/FeatureRoute.js";
import FundingRoute from "./routers/FundingRoute.js";
import PaymentRoute from "./routers/PaymentRoute.js";
import StripeHookRoute from "./routers/StripeHookRoute.js";
import { envInit } from "./types/env.js";
import PaymentCrono from "./services/crono/PaymentCrono.js";
import StripeService from "./services/stripe/StripeService.js";
import CommentRoute from "./routers/CommentRoute.js";
import ReflectionRoute from "./services/reflection/ReflectionRoute.js";



envInit();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const PORT = process.env.PORT || 3000;

function buildNodeConfig(noWs: boolean = false, noLog: boolean = false) {

	return [

		<log.conf>{
			class: "log",
			exclude: [TypeLog.SYSTEM],
			onParentLog: (log) => {
				if (!!log?.payload && ['nc:init', 'nc:destroy', "ns:set-state"].includes(log.payload.type)) return false
			}
		},

		{
			class: PaymentCrono,
		},

		{
			class: StripeService,
		},

		<http.conf>{
			class: "http",
			port: PORT,
			rawPaths: ["/api/fundings/webhook"],
			children: [

				{ class: AuthGithubRoute },
				{ class: AuthGoogleRoute },
				{ class: AuthRoute },
				{ class: StripeHookRoute },
				{ class: ReflectionRoute },


				<httpRouter.jwt.conf>{
					class: "http-router/jwt",
					repository: "/typeorm/user",
					jwt: "/jwt",
					//disabled: true,
					children: [

						<httpRouter.conf>{
							class: "http-router",
							path: "/api",
							cors: {
								"origin": "*",
								// "allowedHeaders": "*",
								// "credentials": true,
							},
							children: [
								{ class: AccountRoute },
								{ class: FeatureRoute },
								{ class: PaymentRoute },
								{ class: FundingRoute },
								{ class: CommentRoute },
							],
						},

					]
				},

			]
		},

		<typeorm.conf>{
			class: "typeorm",
			options: {
				...getDBConnectionConfig(noLog),
				//entities: repositories
			},
			children: [
				{
					name: "accounts",
					class: "typeorm/repo",
					model: AccountRepo,
				},
				// {
				// 	name: "providers",
				// 	class: "typeorm/repo",
				// 	model: ProviderRepo,
				// },
				{
					name: "features",
					class: "typeorm/repo",
					model: FeatureRepo,
				},
				{
					name: "fundings",
					class: "typeorm/repo",
					model: FundingRepo,
				},
				{
					name: "comments",
					class: "typeorm/repo",
					model: CommentRepo,
				},

			],
		},

		<jwt.conf>{
			class: "jwt",
			secret: "secret_word!!!"
		},

		<email.conf>{
			class: "email",
			account: <email.conf>{
				// https://ethereal.email/login
				host: process.env.EMAIL_SMTP,
				port: process.env.EMAIL_PORT,
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASSWORD
				}
			},
		}
	]
}

export default buildNodeConfig 