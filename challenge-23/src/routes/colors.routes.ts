import { Router } from '../../deps.ts';

const router = new Router().get('/color-example', (ctx) => {
  ctx.response.body = 'Hello World!';
});

export default router;
