
# apre una bash sul container Stripe
docker run --rm -it --entrypoint /bin/sh stripe/stripe-cli:latest

# autentificazione via browser
stripe login

# file con la api-key:
\root\.config\stripe\config.toml

# mettere in .env
# STRIPE_API_KEY=sk_...

# permette di mandare gli eventi mock ad uno specifico webhook
stripe listen --forward-to host.docker.internal:3000/api/fundings/webhook

# valorizzare in .env:
# STRIPE_WEBHOOK_SECRET=whsec_...

# manda uno specifico evento Stripe mock
stripe trigger payment_intent.created
stripe trigger account.updated
stripe trigger payment_intent.created --add payment_intent:amount=2000 --add payment_intent:currency=eur

