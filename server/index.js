const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const colors = require('./colors.json');

const app = new Koa();
const router = new Router();

app.use(cors({ origin: 'http://localhost:8081' }));

router.get('/colors', (ctx) => {
  ctx.body = colors;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
