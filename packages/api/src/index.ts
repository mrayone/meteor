import express from 'express';
import cors from 'cors';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀️  Back-end started on port 3333!');
});
