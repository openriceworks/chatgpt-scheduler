/* server.ts */

import express from "express";
import {Version} from 'shared';
import { createAsk as createAskMethod } from "./chat-gpt";

import * as dotenv from "dotenv";
import { exit } from "process";
dotenv.config({path: '../.env'});

if(process.env.OPENAI_API_KEY == null) {
  // TODO .envファイルから読み込んでいることをわかりやすくする
  console.error('required OPENAI_API_KEY.')
  exit()
}

const askChatGPT = createAskMethod(process.env.OPENAI_API_KEY)

const app: express.Express = express();
const port = 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", express.static("../frontend/dist"))

const version : Version = {
  version: '1.0.0'
}
app.get("/version", (req: express.Request, res: express.Response) => {
  res.send(version);
});

app.post("/api/ask", 
  async (req: express.Request, res: express.Response) => {
  if(req.body.question == null) {
    res.send({answer: 'エラー'})
    return
  }
  const question = `
    JSONフォーマットの日付リストを作成してください。(改行は不要です)
    日付の指定は以下になります。
    ${req.body.question}
  `;
  const answer = await askChatGPT(question);
  res.send({answer: answer ? JSON.parse(answer): []});
  }
)

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});