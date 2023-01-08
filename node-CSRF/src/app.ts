import * as express from "express"
import { Request, Response } from "express"
import { AppDataSource } from "./app-data-source"
import { User } from "./entity/user"
const session = require('express-session')
const cookieParser = require("cookie-parser");
const formidable = require('express-formidable');

// establish database connection
AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

// create and setup express app
const app = express()
app.set('view engine', 'pug')
app.set('views', 'src/views')
app.use(express.json())
app.use(express.static(__dirname + "/assets"));
app.use(formidable());
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));
app.use(cookieParser());


app.get('/', (req: Request, res: Response) => {
  const session = (req as any).session;
  if (session.userid) {
    res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  } else
    res.render('index')
});

app.post("/authenticate", async function (req: Request, res: Response) {
  const fields = (req as any).fields;
  if (!fields.username || !fields.password) {
    res.send('Invalid username or password');
  }
  const results = await AppDataSource.getRepository(User).find({
    select: {
      name: true
    },
    where: {
      name: fields.username,
      password: fields.password
    }
  })
  if (results) {
    const session = (req as any).session;
    session.userid = fields.username;
    console.log(session)
    res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  } else {
    res.send('Invalid username or password');
  }
})

app.get('/logout', (req, res) => {
  (req as any).session.destroy();
  res.redirect('/');
});

// register routes
app.get("/users", async function (req: Request, res: Response) {
  const users = await AppDataSource.getRepository(User).find()
  res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  })
  return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
  const user = await AppDataSource.getRepository(User).create(req.body)
  const results = await AppDataSource.getRepository(User).save(user)
  return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  })
  AppDataSource.getRepository(User).merge(user, req.body)
  const results = await AppDataSource.getRepository(User).save(user)
  return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(User).delete(req.params.id)
  return res.send(results)
})

// start express server
app.listen(3000)