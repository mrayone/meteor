import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/routes';
import 'express-async-errors';
const app = express();

app.use(express.json);
app.use(routes);

app.get('/ping', (request, response) => {
  return response.send('pong');
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀️  Back-end started on port 3333!');
});
