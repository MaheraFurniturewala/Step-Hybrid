# Step Hybrid

`step hybrid` is a service that makes it possible for students with no internet access to be constantly updated about any change in their classrooms.

## For Replicating the service:

### Cloning step hybrid 

In your local clone, create a `.env` file and add:

```bash
MONGODB_URL = <mongodb url>
CLIENT_ID = <gcp client id>
CLIENT_SECRET = <gcp client secret>
REDIRECT_URI = <project redirect url>
COURSE_ID = <course id>
PROJECT_ID = <gcp project id>
PUBSUB_TOPIC = <gcp pub sub topic>
SUBS = <gcp subscription>
GOOGLE_APPLICATION_CREDENTIALS = `keys.json`
TOKEN_PATH = `token.json`
VONAGE_API_KEY = <vonage api key>
VONAGE_API_SECRET = <vonage api secret>
```

create a `keys.json` file and add your gcp pub sub credentials :

```bash
{
    "type": "service_account",
    "project_id": <>,
    "private_key_id": <>,
    "client_email": <>,
    "client_id": <>,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": <>
```

Run the following commands after entering the root directory:

```bash
npm install
npm start
```
