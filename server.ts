import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';

const app = express();

// Trust proxy headers for secure cookies and correct protocol/redirects in production (Render)
app.set('trust proxy', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
const allowedOrigin = process.env.CORS_ORIGIN;
app.use(cors({
  origin: allowedOrigin
    ? (origin, callback) => {
        if (!origin || origin === allowedOrigin) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
      }
    : (origin, callback) => callback(null, true),
  credentials: true
}));

// api routes
app.use('/accounts', accountsController);

// test route to verify deployments
app.get('/test-deploy', (req, res) => {
  res.send('Deploy success: active code version 2.0');
});

// swagger docs route
app.use('/api-docs', swaggerDocs);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));