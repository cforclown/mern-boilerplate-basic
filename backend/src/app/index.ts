'use strict';

import express, { Express } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import expressFlash from 'express-flash';
import expressSession from 'express-session';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerConfig from '../swagger/configs';
import { MainRouter } from './routers';
import { Environment } from '../utils';

function App (): Express {
  const app = express();
  app.use(logger('dev'));
  // app.use(logger(':remote-addr :method :url :status :response-time ms - :res[content-length]'));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: false }));
  app.use(
    cors({
      origin: Environment.getClientBaseUrl(),
      credentials: true
    })
  );
  app.use(expressFlash());
  app.use(cookieParser());
  app.use(
    expressSession({
      secret: Environment.getSessionSecret(),
      resave: Environment.getSessionResave(),
      saveUninitialized: Environment.getSessionSaveUninitialized(),
      cookie: {
        secure: Environment.getSessionCookieSecure(),
        maxAge: Environment.getSessionCookieMaxAge()
      }
    })
  );

  // #region ============================ SWAGGER CONFIG =============================
  // reference: https://swagger.io/specification/#infoObject
  const swaggerDocs = swaggerJsDoc(swaggerConfig);
  app.use(`/api/${Environment.getApiVersion()}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  // #endregion -----------------------------------------------------------------------

  app.use('/', MainRouter());

  return app;
}

export default App;
