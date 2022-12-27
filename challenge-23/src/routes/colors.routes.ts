import { Router } from '../../deps.ts';

const router = new Router().get('/', (ctx) => {
  ctx.response.body = 'Prueba API con DENO';
});

export default router;
