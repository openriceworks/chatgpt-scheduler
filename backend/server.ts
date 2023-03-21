/* server.ts */

import express from "express";
import {Version} from 'shared';

const app: express.Express = express();
const port = 8000;

app.use("/", express.static("../frontend/dist"))

const version : Version = {
version: '1.0.0'
}
app.get("/version", (req: express.Request, res: express.Response) => {
  res.send(version);
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});