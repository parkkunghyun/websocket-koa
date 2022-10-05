const Koa = require('koa');
//const app = new Koa();
const Pug = require('koa-pug')
const path = require('path')
const route = require('koa-route')

const websockify = require('koa-websocket');
const serve = require('koa-static')
const mount = require('koa-mount');
const app = websockify(new Koa());


new Pug({
  viewPath: path.resolve(__dirname, './views'), // path.resolve는 상대경로 지정할때 사용!
  app: app 
})

app.use(mount('/public',serve('src/public'))) //이 아래 주소에 들어감

app.use(async (ctx) => {
  //await next()
  await ctx.render('main')
});



app.ws.use(
  route.all('/test/:id', (ctx) => {
    ctx.websocket.send("hllo")
    ctx.websocket.on('message', function(message) {
      console.log(message)
    })
  })
)

//app.use(async (ctx)=> {
//    ctx.body = `<${ctx.body}>`
//})

app.listen(5000);