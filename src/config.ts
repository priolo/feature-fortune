import { http, httpRouter, httpStatic, jwt, log, typeorm, types } from "@priolo/julian";
import { IAccount } from "@priolo/julian/dist/services/email/types.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { AccountRepo } from "./repository/Account.js";
import { CommentRepo } from "./repository/Comment.js";
import { FeatureRepo } from "./repository/Feature.js";
import { FundingRepo } from "./repository/Funding.js";
import { MessageRepo } from "./repository/Message.js";
import { MessageContentRepo } from "./repository/MessageContent.js";
import AccountRoute from "./routers/AccountRoute.js";
import AuthEmailRoute from "./routers/AuthEmailRoute.js";
import AuthGithubRoute from "./routers/AuthGithubRoute.js";
import AuthGoogleRoute from "./routers/AuthGoogleRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
import CommentRoute from "./routers/CommentRoute.js";
import FeatureRoute from "./routers/FeatureRoute.js";
import FundingRoute from "./routers/FundingRoute.js";
import GithubRoute from "./routers/GithubRoute.js";
import GoogleRoute from "./routers/GoogleRoute.js";
import MessageRoute from "./routers/MessageRoute.js";
import PaymentRoute from "./routers/PaymentRoute.js";
import StripeHookRoute from "./routers/StripeHookRoute.js";
import StripeRoute from "./routers/StripeRoute.js";
import FeaturePaymentCrono from "./services/crono/FeaturePaymentCrono.js";
import ReflectionRoute from "./services/reflection/ReflectionRoute.js";
import StripeService from "./services/stripe/StripeService.js";
import StripeServiceMock from "./services/stripe/StripeServiceMock.js";
import { getDBConnectionConfig } from './startup/dbConfig.js';
import { ENV_TYPE } from "./types/env.js";
import { logger } from "./services/logger/index.js";
import { TypeLog } from "@priolo/julian/dist/core/types.js";




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const PORT = process.env.PORT || 3000;

type ConfigParams = {
	noLog?: boolean,
	noHttp?: boolean,
	port?: number,
}

const logTerminal = process.env.LOG_TERMINAL_ENABLE == "true"
const logFile = process.env.LOG_FILE_ENABLE == "true"

function buildNodeConfig(params?: ConfigParams) {

	const { noHttp, port } = params ?? {}

	return [

		<log.conf>{
			class: "log",
			exclude: [types.TypeLog.SYSTEM],
			onParentLog: (logItem) => {
				if (!logFile && !logTerminal) return false
				if (logItem.type != TypeLog.ERROR) {
					// no log interni di init e destroy dei nodi
					if (!!logItem?.payload && ['nc:init', 'nc:destroy', "ns:set-state"].includes(logItem.payload.type)) return false
					// no log su source = /jwt
					if (logItem.source == "/jwt") return false
					// se è un email non mandare anche il payload!
					if (logItem.source == "/email-noreply") logItem.payload = "[HIDDEN EMAIL PAYLOAD]"
					if (logItem.name == "HTTP POST /api/stripe/webhook") logItem.payload = "[HIDDEN STRIPE WEBHOOK PAYLOAD]"
				}
				if (logFile) {
					const msg = `${logItem.source} :: ${logItem.name}`
					if (logItem.type == types.TypeLog.ERROR) {
						logger.error(logItem.payload, msg)
					} else {
						logger.info(logItem.payload, msg)
					}
				}
				return logTerminal
			}
		},

		{
			class: FeaturePaymentCrono,
		},

		{
			class: process.env.NODE_ENV != ENV_TYPE.TEST
				? StripeService
				: StripeServiceMock,
		},

		// {
		// 	class: EmailGoogleService,
		// },
		// {
		// 	class: EmailResendService,
		// },
		{
			class: "email",
			name: "email-noreply",
			account: <IAccount>{
				host: process.env.EMAIL_HOST,
				port: Number(process.env.EMAIL_PORT),
				secure: true,
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASSWORD,
				}
			},
		},
		// {
		// 	class: "email",
		// 	name: "email-info",
		// 	account: <IAccount>{
		// 		host: process.env.EMAIL_HOST,
		// 		port: Number(process.env.EMAIL_PORT),
		// 		secure: true,
		// 		auth: {
		// 			user: process.env.EMAIL_USER,
		// 			pass: process.env.EMAIL_PASSWORD,
		// 		}
		// 	},
		// },

		!noHttp && <http.conf>{
			class: "http",
			disabled: !!noHttp,
			log: { body: true },
			port: port ?? PORT,
			rawPaths: ["/api/stripe/webhook"],
			children: [

				{ class: AuthRoute },
				{ class: AuthEmailRoute },
				{ class: AuthGithubRoute },
				{ class: AuthGoogleRoute },

				{ class: StripeHookRoute },
				{ class: ReflectionRoute },

				<httpStatic.conf>{
					class: "http-static",
					dir: path.join(__dirname, "../client/dist"),
					path: "/app/",
					spaFile: "index.html",
				},

				<httpStatic.conf>{
					class: "http-static",
					dir: path.join(__dirname, "../client/public"),
					path: "/public/",
				},

				<httpStatic.conf>{
					class: "http-static",
					dir: path.join(__dirname, "../landingpage/dist"),
					path: "/land/",
				},

				<httpRouter.conf>{
					name: "routers",
					class: "http-router",
					path: "/api",
					cors: {
						"origin": "*",
						// "allowedHeaders": "*",
						// "credentials": true,
					},
					children: [
						<httpRouter.jwt.conf>{
							class: "http-router/jwt",
							repository: "/typeorm/user",
							jwt: "/jwt",
							noError: true,
							children: [
								{ class: FeatureRoute },
								{ class: AccountRoute },
								{ class: FundingRoute },
								{ class: CommentRoute },
							]
						},
						<httpRouter.jwt.conf>{
							name: "public",
							class: "http-router/jwt",
							repository: "/typeorm/user",
							jwt: "/jwt",
							children: [
								{ class: GithubRoute },
								{ class: GoogleRoute },
								{ class: PaymentRoute },
								{ class: MessageRoute },
								{ class: StripeRoute },
							]
						},
					],
				},

			]
		},

		<typeorm.conf>{
			class: "typeorm",
			options: {
				...getDBConnectionConfig(),
			},
			children: [
				{
					name: "accounts",
					class: "typeorm/repo",
					model: AccountRepo,
				},
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
				{
					name: "messages_content",
					class: "typeorm/repo",
					model: MessageContentRepo,
				},
				{
					name: "messages",
					class: "typeorm/repo",
					model: MessageRepo,
				},

			],
		},

		<jwt.conf>{
			class: "jwt",
			secret: process.env.JWT_SECRET,
		},

		// <email.conf>{
		// 	class: "email",
		// 	account: <email.conf>{
		// 		// https://ethereal.email/login
		// 		host: process.env.EMAIL_SMTP,
		// 		port: process.env.EMAIL_PORT,
		// 		auth: {
		// 			user: process.env.EMAIL_USER,
		// 			pass: process.env.EMAIL_PASSWORD
		// 		}
		// 	},
		// }
	]
}

export default buildNodeConfig 