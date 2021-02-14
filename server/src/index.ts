import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import { errorHandler } from './middlewares/errorhandler';
import { incidentRouter } from './routes/incidents';

const app = express();
app.use(json());
app.use(cors());

app.use(incidentRouter);

app.use(errorHandler);

app.listen(4000, () => {
  console.log('Listening on 4000');
});
