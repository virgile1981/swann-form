import * as express from 'express';
import { FormService } from './form.service';

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
 
  createAPost = (request: express.Request, response: express.Response) => { 
    //console.log(JSON.stringify(request.body.));
    //this.formService.prepareEmail();
    response.send("message recu");
  }
}
