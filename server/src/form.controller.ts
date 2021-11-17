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
 
  createAPost = (request: express.Request, response: express.Response) => { 
    this.formService.save(request.body);
  }
}
