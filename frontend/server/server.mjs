// docs from https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#routes
// docs from https://github.com/jeremyben/json-server-auth?tab=readme-ov-file
// auth without middleware, defining by ourselves
// https://gist.github.com/MindaugasBernatavicius/b4aac3c08a47aa6777add84bf8daa366
import pkg from "json-server";
import mockData from "./data.mjs";
import auth from "json-server-auth";
import ret from "./data.mjs";
const { create, router: _router, defaults, bodyParser } = pkg;

const port = 3001;
const server = create();
const router = _router("./server/db.json");
// const router = _router(mockData);
const middlewares = defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.db = router.db;

// https://github.com/typicode/json-server/issues/286#issuecomment-1804597428
// dynamic change db file, similar to CLI option --watch
server.use((req, res, next) => {
  router.db.read();
  next();
});

const rules = auth.rewriter({
  "/api/*": "/$1",
  "/patient/self-reg-form": "/self-reg-form",
  // "/book-slot/:id": "/slots/:id",
  // "/blog/:resource/:id/show": "/:resource/:id",
});
server.use(rules);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  console.log("signup delay 1s");
  setTimeout(() => {
    res.jsonp(req.query);
  }, 1000);
});

// signup delay 1s
server.post("/signUp", (req, res, next) => {
  // console.log("signup delay 1s");
  setTimeout(() => {
    next();
  }, 1000);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    // req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
// more config ref from node_modules/json-server/lib/bin.js
// strict sequence
server.use(auth);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
  console.log("working directory: ", process.cwd());
});
