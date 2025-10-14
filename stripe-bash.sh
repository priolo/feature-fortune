
# apre una bash sul container Stripe
docker run --rm -it --entrypoint /bin/sh stripe/stripe-cli:latest

# autentificazione via browser
stripe login

# individuare file con la api-key:
\root\.config\stripe\config.toml

# BE: mettere "test_mode_api_key" in .env
# STRIPE_API_KEY=sk_test_...
# FE: mettere "test_mode_pub_key" in .env
# VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...


# permette di mandare gli eventi mock ad uno specifico webhook
stripe listen --forward-to host.docker.internal:3000/api/stripe/webhook

# valorizzare in .env:
# STRIPE_WEBHOOK_SECRET=whsec_...

# manda uno specifico evento Stripe mock
stripe trigger payment_intent.created
stripe trigger account.updated
stripe trigger payment_intent.created --add payment_intent:amount=2000 --add payment_intent:currency=eur

