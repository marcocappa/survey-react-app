// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);


// Add custom routes before JSON Server router
router.render = (req, res) => {
  if (req.url !== "/questions" && req.url !== "/answers") {
    res.status(404).jsonp({
      error: "RESOURCE_NOT_FOUND"
    })
  } else {
    res.jsonp({
      body: res.locals.data
    })
  }
}

server.use(router);


server.listen(5000, () => {
  console.log('JSON Server is running')
})