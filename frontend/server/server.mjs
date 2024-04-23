// docs from https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#routes
// docs from https://github.com/jeremyben/json-server-auth?tab=readme-ov-file
// auth without middleware, defining by ourselves
// https://gist.github.com/MindaugasBernatavicius/b4aac3c08a47aa6777add84bf8daa366
import pkg from "json-server";
import mockData from "./data.mjs";
import auth from "json-server-auth";
import ret from "./data.mjs";
import fetch from "node-fetch";
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
  "/patient/self-reg": "/self-reg",
  "/admin/approvals": "/self-reg",
  "/admin/approve/:id": "/self-reg/:id",
  "/patient/guest-check/:id": "/guestPatient/:id",
  // "/blog/:resource/:id/show": "/:resource/:id",
});
server.use(rules);

server.use(bodyParser);
server.get("/echo", (req, res) => {
  setTimeout(() => {
    res.jsonp(req.query);
  }, 1000);
});
server.post("/echo", (req, res) => {
  setTimeout(() => {
    res.jsonp(req.body);
  }, 1000);
});

server.post("/sign-up", async (req, res) => {
  req.body.role = "patient";

  const resp = await fetch("http://localhost:".concat(port).concat("/signup"), {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  res.jsonp(await resp.json());

  setTimeout(() => {
    // make this account guest
    const thisUser = router.db
      .get("users")
      .find({ email: req.body.email })
      .value();
    console.log("thisU:", thisUser);

    const invalidPatient = {
      id: thisUser.id,
      patientId: thisUser.id,
      ifPatientValid: "false",
    };
    // router.db.set("guestPatient", invalidPatient);
    // router.db.update(({ posts }) => {
    //   posts.push({ id: 1, value: "abc" });
    // });
    fetch("http://localhost:".concat(port).concat("/guestPatient"), {
      method: "POST",
      body: JSON.stringify(invalidPatient),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.db.update(({ guestPatient }) => {
      guestPatient.push(invalidPatient);
      console.log("guestPatient:", guestPatient);
    });
  }, 1000);
});

// admin approve self reg form
// then update guestPatient
server.patch("/self-reg/:id", (req) => {
  fetch(
    "http://localhost:"
      .concat(port)
      .concat("/guestPatient".concat("/" + req.params.id)),
    {
      method: "PATCH",
      body: JSON.stringify({ ifPatientValid: "true" }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

// Add custom routes before JSON Server router
// Use default router
// more config ref from node_modules/json-server/lib/bin.js
// strict sequence
server.use(auth);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
  console.log("working directory: ", process.cwd());
});
