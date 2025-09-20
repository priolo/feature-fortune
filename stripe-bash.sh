



# apre una bash sul container Stripe
docker run --rm -it --entrypoint /bin/sh stripe/stripe-cli:latest

# autentificazione via browser
stripe login

# permette di mandare gli eventi mock ad uno specifico webhook
stripe listen --forward-to host.docker.internal:3000/api/fundings/webhook
stripe listen --forward-to host.docker.internal:4242/webhook
stripe listen --forward-to localhost:4242/webhook
stripe listen --forward-to localhost:3000/api/fundings/webhook

# manda uno specifico evento Stripe mock
stripe trigger payment_intent.created
stripe trigger payment_intent.created --add payment_intent:amount=2000 --add payment_intent:currency=eur

