# Node.js TypeScript MySQL Boilerplate API

## Live URLs
- **Live Backend URL:** _TODO: Add Render URL after deployment_
- **Swagger Docs:** _TODO: Add `/api-docs` URL after deployment_

## Setup Instructions

### Local Development
1. Clone the repository
2. Run `npm install`
3. Edit `config.json` with your local MySQL credentials
4. Run `npm run start:dev`

### Environment Variables (Production / Render)
Set these in your Render Web Service dashboard:

| Variable | Description |
|---|---|
| `DB_HOST` | MySQL host from filess.io |
| `DB_PORT` | MySQL port (usually 3306) |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | MySQL database name |
| `DB_SSL` | Set to `true` for SSL connections |
| `JWT_SECRET` | A long random secret string |
| `SMTP_HOST` | Mailtrap SMTP host |
| `SMTP_PORT` | Mailtrap SMTP port |
| `SMTP_USER` | Mailtrap username |
| `SMTP_PASS` | Mailtrap password |
| `EMAIL_FROM` | Sender email address |
| `CORS_ORIGIN` | Frontend URL (e.g. https://your-app.onrender.com) |
