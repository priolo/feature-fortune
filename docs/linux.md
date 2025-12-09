ho acquistato un VPS e sono riuscito ad accedere
è un server linux e vorrei prepararlo per ospitare un web server e un database postgesql
i passaggi che mi hanno consigliato sono questi:


### Fase 0: Preparazione (Prima di collegarti)

1.  **Dominio:** Assicurati di aver comprato un dominio (es. `mioprogetto.com`) e di aver configurato il **DNS** (Record A) in modo che punti all'indirizzo IP della tua nuova VPS.
2.  **SSH:** Per collegarti userai il terminale del tuo computer (o Putty se sei su Windows).

### Fase 1: Primo accesso e aggiornamento

Apri il terminale e collegati (ti chiederà la password che ti ha inviato il provider via mail):
`ssh root@IL_TUO_IP`

Una volta dentro, aggiorniamo tutto il sistema. Copia e incolla questo comando:

```bash
apt update && apt upgrade -y
```

### Fase 2: Sicurezza (Firewall UFW)

Linux ha un firewall integrato chiamato UFW. Lo configureremo per chiudere tutto tranne lo stretto indispensabile.

**ATTENZIONE:** Esegui questi comandi in ordine esatto, altrimenti rischi di chiuderti fuori.

```bash
ufw allow OpenSSH       # Fondamentale: permette di collegarsi via SSH
ufw allow 80/tcp        # Per il sito web (HTTP)
ufw allow 443/tcp       # Per il sito sicuro (HTTPS)
ufw enable              # Attiva il firewall
```
*Premi `y` e invio se ti chiede conferma.*

Ora la tua VPS è blindata: nessuno può accedere al database o ad altre porte dall'esterno.

### Fase 3: Installazione di Node.js

Non useremo la versione "vecchia" predefinita, ma scaricheremo l'ultima versione stabile (LTS).

```bash
# Scarica lo script di installazione per Node 20 (LTS attuale)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Installa Node.js
apt install -y nodejs

# Verifica che funzioni (dovrebbe darti una versione tipo v20.x.x)
node -v
```

### Fase 4: Installazione e Configurazione PostgreSQL

Installiamo il database.

```bash
apt install -y postgresql postgresql-contrib
```

Ora dobbiamo creare il tuo utente e il database. PostgreSQL su Linux usa un utente speciale chiamato `postgres`.

1.  Passiamo all'utente postgres:
    ```bash
    sudo -i -u postgres
    ```
2.  Entriamo nella console del database:
    ```bash
    psql
    ```
3.  **Configurazione DB** (Sostituisci `mypassword` con una password sicura!):
    ```sql
    CREATE DATABASE mioprogetto;
    CREATE USER mioadmin WITH ENCRYPTED PASSWORD '1v4n010r10_di_F0gg14';
    GRANT ALL PRIVILEGES ON DATABASE mioprogetto TO mioadmin;
    \q
    ```
4.  Usciamo dall'utente postgres per tornare root:
    ```bash
    exit
    ```

Ora il tuo DB è pronto. Nella tua app Node, userai `localhost` come host del database.

### Fase 5: Caricare la tua App e PM2 (Process Manager)

Per caricare i file, dato che sei alle prime armi, ti consiglio di usare **FileZilla** sul tuo computer:
*   Host: `sftp://IL_TUO_IP`
*   User: `root`
*   Password: `la_tua_password_vps`

Crea una cartella `/var/www/mioprogetto` e trascinaci dentro i file del tuo server Node (package.json, index.js, ecc., ma **NON** la cartella `node_modules`).

Torniamo al terminale (SSH):

```bash
# Entra nella cartella
cd /var/www/mioprogetto

# Installa le dipendenze
npm install

# Installa PM2 (serve a tenere il sito sempre acceso anche se crasha)
npm install -g pm2

# Avvia il tuo server (supponendo il file principale sia index.js o app.js)
pm2 start index.js --name "mioprogetto"

# Fai in modo che PM2 si riavvii se riavvii la VPS
pm2 startup
# (Copia ed esegui il comando che ti apparirà a schermo)
pm2 save
```

*Nota: Assicurati che il tuo server Node ascolti su una porta locale, ad esempio la 3000.*

### Fase 6: Esporre il sito con Nginx e HTTPS

Node.js non dovrebbe essere esposto direttamente su internet. Useremo **Nginx** come "Receptionist" (Reverse Proxy) che gestisce la sicurezza e il certificato HTTPS.

1.  **Installa Nginx:**
    ```bash
    apt install -y nginx
    ```

2.  **Configura il sito:**
    Dobbiamo creare un file di configurazione. Useremo l'editor `nano` (semplice).
    ```bash
    nano /etc/nginx/sites-available/mioprogetto
    ```

    Incolla dentro questo testo (modifica `mioprogetto.com` e la porta `3000` se diversa):

    ```nginx
    server {
        listen 80;
        server_name mioprogetto.com www.mioprogetto.com;

        location / {
            proxy_pass http://localhost:3000; # La porta della tua app Node
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

    *   Premi `CTRL+O` poi `Invio` per salvare.
    *   Premi `CTRL+X` per uscire.

3.  **Attiva il sito:**
    ```bash
    ln -s /etc/nginx/sites-available/mioprogetto /etc/nginx/sites-enabled/
    rm /etc/nginx/sites-enabled/default  # Rimuovi il sito di default
    nginx -t                             # Test per vedere se è tutto ok
    systemctl restart nginx              # Riavvia Nginx
    ```

4.  **Certificato HTTPS (Lucchetto verde):**
    Installiamo Certbot che fa tutto in automatico.
    ```bash
    apt install -y python3-certbot-nginx
    certbot --nginx -d mioprogetto.com -d www.mioprogetto.com
    ```
    Segui le istruzioni a schermo (inserisci email, accetta condizioni).

### Finito!

Sulla fase 2 pero' vorei poter accedere nche al DB esternamente
ti sembra una procedura corretta?