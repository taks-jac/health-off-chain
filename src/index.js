import express from 'express';
import cors from 'cors';
import upload from 'express-fileupload'
import routes from './routes/index.js';
import config from './config/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/openapi.json';


const app = express();
const basePath = '/health-off-chain';

app.use(upload());
app.use(cors());

app.set('env', config.env);

if (config.env === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  return res.status(200).json({
    status: 'ok',
    name: 'ms-health',
    version: config.API_VERSION
  });
});

app.use(basePath, routes);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));


app.listen(config.port, () => {
  console.warn(`Server started on http://localhost:${config.port}${basePath}  ()`);
});

export default app;
