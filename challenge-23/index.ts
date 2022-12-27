import app from './src/app.ts';
import { config } from './deps.ts';

const PORT: string = config().PORT || '8080';
await app.listen({ port: PORT });
