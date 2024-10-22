import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { LOG_FORMAT, NODE_ENV, PORT } from './config';
import { Routes } from './interface/shared/routes.interface';
import {connect} from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import 'reflect-metadata';
import { dbConnection } from './databases';
import { HttpError } from 'http-errors';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { logError, ErrorResponse, DataResponse } from './utils/common';
import { logger } from './utils/logger';
// import path from 'path';
// const swaggerDocument = require('../swagger.json');
// import swaggerUi from 'swagger-ui-express';
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public log_format: string;
  nodemon = require('./utils/init_nodemon');
  // redis = require('./utils/init_redis');
  // cloudinary = require('./utils/cloudinary');

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 8000;
    this.log_format = LOG_FORMAT || 'dev';
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.connectToDatabase();
    this.nodemon;
    // this.initializeSwagger();
    // this.initializeHealthCheck();
    // this.setStaticFolder();
    // this.getToken;
    // this.cloudinary;
    // this.redis;
  }
  // setStaticFolder() {
  //   this.app.use('/uploads', express.static('uploads'));
  //   this.app.use(express.static(path.join(__dirname, 'uploads')));
  // }

  private connectToDatabase() {
    // if (this.env == 'local') {
    //   set('debug', true);
    // }
    connect(dbConnection.url, dbConnection.options)
      .then(data => console.log('database connected'))
      .catch(err => {
        console.log(err.message);
        console.log('Database Connection Error');
        logger.error('Database Connection Error');
        process.exit(1);
      });
  }
  public listen() {
    try {
      const server = this.app.listen(this.port, () => {
        if (this.env != 'local') {
          logger.info(`=================================`);
          logger.info(`======= ENV: ${this.env} =======`);
          logger.info(`🚀 App listening on the port ${this.port}`);
          logger.info(`=================================`);
        } else {
          console.log(`======= ENV: ${this.env} =======`);
          console.log(`🚀 App listening on the port ${this.port}`);
        }
      });
      server.on('error', async (error: any) => {
        if (error.code === 'EADDRINUSE') {
          logger.error(error.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public getServer() {
    return this.app;
  }
  // private initializeHealthCheck() {
  //   this.app.use('/health-check', (req: Request, res: Response, next: NextFunction) => {
  //     return DataResponse(req, res, 200, 'health ok');
  //   });
  // }
  private initializeMiddlewares() {
    this.app.use(morgan(this.log_format));
    this.app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(ExpressMongoSanitize());
    this.initializeHelmet();
    // this.app.use(timeout(1200000, {}));
  }

  private initializeRoutes(routes: Routes[]) {
    this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
      // const path = __dirname + '/template/maintanence.html';
      // res.status(200).sendFile(path);
      return DataResponse(req, res, 200, 'Server Is Running');
    });
    routes.forEach(route => {
      this.app.use('/', route.router);
      console.log('route.router=',routes)
    });
  }

  private initializeHelmet() {
    this.app.use(helmet.contentSecurityPolicy());
    this.app.use(helmet.crossOriginEmbedderPolicy());
    this.app.use(helmet.crossOriginOpenerPolicy());
    this.app.use(helmet.crossOriginResourcePolicy());
    this.app.use(helmet.dnsPrefetchControl());
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.originAgentCluster());
    this.app.use(helmet.permittedCrossDomainPolicies());
    this.app.use(helmet.referrerPolicy());
    this.app.use(helmet.xssFilter());
  }
  // private initializeSwagger() {
    // const options = {
    //   swaggerDefinition: {
    //     info: {
    //       title: 'workisy',
    //       version: '1.0.0',
    //       description: 'Example docs',
    //     },
    //   },
    //   apis: ['swagger.yaml'],
    // };

    //(explore----) const specs = swaggerJSDoc(options);
  //   this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // }

  private initializeErrorHandling() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new Error('Not Found');
      if (this.env == 'production') {
        logError(req, 404, error.message.toLowerCase());
      }
      ErrorResponse(res, 404, error.message.toLowerCase());
    });

    this.app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
      if (this.env == 'production') {
        logError(req, error.status || 500, error.message.toLowerCase());
      }
      ErrorResponse(res, error.status || 500, error.message.toLowerCase());
    });
  }
}

export default App;
