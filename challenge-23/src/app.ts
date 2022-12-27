import { Application } from '../deps.ts';
import colorsRouter from './routes/colors.routes.ts';

const app = new Application();

app.use(colorsRouter.routes());

export default app;
