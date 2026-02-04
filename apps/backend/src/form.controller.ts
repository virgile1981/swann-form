import EventEmitter from 'events';
import * as express from 'express';
import { FormService } from './services/form.service';

export class FormController {
  public path = '/form';
  public router = express.Router();
  formService: FormService;

  constructor() {
    this.formService = new FormService();
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.post(this.path, this.createAPost);
  }
 
  createAPost = async (request: express.Request, response: express.Response) => { 
    const eventEmitter = new EventEmitter();
    eventEmitter.on('success', () => {
      console.log("reussite d'envoi de l'email")
      response.status(200).send();
    });
    
    eventEmitter.on('error', (error) => {
      console.log("erreur d'envoi de l'email " + error)
      response.status(500).send();;
    });
    this.formService.save(request.body, eventEmitter);
  }
}
