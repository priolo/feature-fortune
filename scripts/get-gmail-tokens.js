import { google } from 'googleapis';
import http from 'http';
import url from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// scope per inviare email
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

async function main() {
  // genera link di autorizzazione
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // fondamentale per ottenere refresh_token
    scope: SCOPES,
    prompt: 'consent', // forza Google a dare un nuovo refresh_token
  });

  console.log('Apri questo link nel browser per autorizzare:');
  console.log(authUrl);

  // crea server temporaneo per ricevere il codice
  const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/api/auth/google/callback')) {
      const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
      const code = qs.get('code');

      console.log('Ricevuto codice di autorizzazione.');

      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      console.log('\n✅ ACCESS TOKEN:');
      console.log(tokens.access_token);
      console.log('\n🔁 REFRESH TOKEN (salvalo!):');
      console.log(tokens.refresh_token);

      res.end('Autenticazione completata! Puoi chiudere questa finestra.');
      server.close();
    }
  });

  server.listen(3000, () => console.log('Server in ascolto su http://localhost:3000 ...'));
}

main().catch(console.error);
