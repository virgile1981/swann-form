import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
//import https from 'https';
import * as bodyParser from 'body-parser';
import { FormController } from './form.controller';



class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers : FormController[], port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, 'static')));
    this.app.use(bodyParser.json({limit:'35mb'}));
  }
 
  private initializeControllers(controllers  : FormController[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
 
  public listen() {
    
    var options = {
      key: fs.readFileSync(path.join(__dirname ,'..','ssl','server.key'),'utf8'),
      cert: fs.readFileSync(path.join(__dirname,'..','ssl','server.cert'),'utf8')
    }
    /* https.createServer(options, this.app).listen(this.port, () => {
      console.log(`App https listening on the port ${this.port}`);
    });*/
    this.app.listen(this.port, () => {
      console.log(`App http listening on the port ${this.port}`);
    });
  }
}
 
export default App;


