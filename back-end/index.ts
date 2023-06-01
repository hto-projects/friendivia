

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import registerPlayerHandlers from './handlers/playerHandler.ts';
import registerHostHandlers from './handlers/hostHandler.ts';

dotenv.config();

const app = express();

const http = createServer(app);
const io = new Server(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

const db = process.env['MONGO_URI'] || '';
const dbSettings = {
	useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "friendpardy-1"
}

// connect to mongodb
mongoose.connect(db, dbSettings)
  .then(() => console.error("MongoDB successfully connected"))
  .catch(err => console.error(err));

const onSocketConnect = socket => {
  registerPlayerHandlers(io, socket);
  registerHostHandlers(io, socket);
}

io.on('connection', onSocketConnect);

http.listen(4000, () => {
  console.log(`Server listening on 4000`);
});

app.get("/up-check", (req: any, res: any) => {
  res.send(req);
  res.status(200).end();
});
