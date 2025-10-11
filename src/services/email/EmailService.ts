import { ServiceBase } from "@priolo/julian";
import { google } from 'googleapis';



const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URI
);
oAuth2Client.setCredentials({
	access_token: process.env.GOOGLE_ACCESS_TOKEN,
	refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

export enum Actions {
	SEND = "send",
}

export interface Email {
	from: string;
	to: string;
	subject: string;
	html: string;
}


/**
 * invia un email tramite un servizio esterno google 
 */
export type EmailServiceConf = Partial<EmailService['stateDefault']>

class EmailService extends ServiceBase {

	get stateDefault() {
		return {
			...super.stateDefault,
			name: "google-email",
		}
	}
	declare state: typeof this.stateDefault;

	get executablesMap() {
		return {
			...super.executablesMap,
			[Actions.SEND]: async (email: Email) => await this.send(email),
		}
	}

	protected async send(email: Email) {
		console.log( process.env)
		const messageParts = [
			`To: ${email.to}`,
			`Subject: ${email.subject}`,
			'Content-Type: text/html; charset=utf-8',
			'',
			email.html,
		];

		const encodedMessage = Buffer.from(messageParts.join('\n'))
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');

		const res = await gmail.users.messages.send({
			userId: 'me',
			requestBody: { raw: encodedMessage },
		});

	}

}

export default EmailService
