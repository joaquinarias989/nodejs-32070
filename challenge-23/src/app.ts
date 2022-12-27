import { Application, viewEngine, ejsEngine, oakAdapter } from '../deps.ts';
import colorsRouter from './routes/colors.routes.ts';

const app = new Application();

app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: './views',
  })
);

app.use(colorsRouter.routes());

export default app;
