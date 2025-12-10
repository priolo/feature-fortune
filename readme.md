
## STRIPE CLI

aprire una bash sul container Stripe  
`docker run --rm -it --entrypoint /bin/sh stripe/stripe-cli:latest`

autentificazione via browser  
`stripe login`

individuare nel container il file con la api-key:  
`\root\.config\stripe\config.toml`

BE: mettere "test_mode_api_key" in .env  
`STRIPE_API_KEY=sk_test_...`

FE: mettere "test_mode_pub_key" in .env  
`VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`

ATTIVARE CLI WEBHOOK  
con il CLI posso mandare eventi mock ad uno specifico webhook  
in bash nel container stripe:  
`stripe listen --forward-to host.docker.internal:3000/api/stripe/webhook`

restituisce il webhook key  
valorizzare in BE .env:  
`STRIPE_WEBHOOK_SECRET=whsec_...`

manda uno specifico evento Stripe mock  
`stripe trigger payment_intent.created`  
`stripe trigger account.updated`  
`stripe trigger payment_intent.created --add payment_intent:amount=2000 --add`  `payment_intent:currency=eur`



## RENDER


### GITHB
[https://github.com/settings/applications/3174659]

cambiare i paramentri:  

`Homepage URL`
- "local"  
http://localhost:3000/app/
- "remote"  
https://<sito>/app/

`Authorization callback URL`  
- "local"  
http://localhost:3000/api/auth/github/callback  
- "remote"  
https://<sito>/api/auth/github/callback



## GOOGLE CLOUD

[https://console.cloud.google.com/auth/clients/545902107281-qgd4s1enct9mcq4qh3vpccn45uocdk9s.apps.googleusercontent.com?project=feature-fortune]  

su **Authorised JavaScript origins**  
inserire gli URL:  
da "local"  
http://localhost:5173  
da "render"  
https://feature-fortune.onrender.com  

su **Authorised redirect URIs**  
inserire gli URL:  
da "local"  
http://localhost:3000/api/auth/google/callback  
da "render"  
https://feature-fortune.onrender.com/api/auth/google/callback  

#### BE .env
`GOOGLE_CLIENT_ID=<Additional information / Client ID>`
`GOOGLE_CLIENT_SECRET=<Client secrets / Client secret>`

#### FE .env
`VITE_GOOGLE_OAUTH_CLIENT_ID=<Additional information / Client ID>`



## STRIPE

#### API KEYS [BE:STRIPE_API_KEY]
prendere le key test da:
[https://dashboard.stripe.com/acct_1SHgW43sTEVFLjPv/test/apikeys]
#### BE .env
`STRIPE_API_KEY=sk_test_... < Panoramica / Chiave privata >`


#### WEBHOOK [BE:STRIPE_WEBHOOK_SECRET]
vai in:   
[https://dashboard.stripe.com/acct_1SHgW43sTEVFLjPv/test/workbench/webhooks]  
Panoramica / Strumenti per test / Chiave privata
#### BE .env
`STRIPE_API_KEY=sk_test_... < Panoramica / Chiave privata >`  



Sviluppatori (drawer in basso) / Webhook
se devi agguingere un webhook: "Destinazioni eventi"
`https://<sito>/api/stripe/webhook`  
copiare "Chiave privata della firma digitale"  
mettere in .env STRIPE_WEBHOOK_SECRET

#### BE .env
`STRIPE_WEBHOOK_SECRET=whsec_... < Endpoint / Chiave privata della firma digitale >`  

### FE .env
`VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... < Panoramica / Chiave pubblicabile >`