import App from './app';
import { FormController } from './form.controller';

const app = new App(
  [
    new FormController(),
  ],
  8081,
);
app.listen();