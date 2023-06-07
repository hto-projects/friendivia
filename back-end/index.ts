

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
      origin: process.env['FRONT_END_URL'] || "http://localhost:3001"
  }
});

const db = process.env['MONGO_URI'] || '';
const dbSettings = {
	useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env['DB_NAME'] || "friendpardy-test"
};

mongoose.connect(db, dbSettings)
  .then(() => console.error("MongoDB successfully connected"))
  .catch(err => console.error(err));

const onSocketConnect = socket => {
  registerPlayerHandlers(io, socket);
  registerHostHandlers(io, socket);
}

io.on('connection', onSocketConnect);

http.listen(4001, () => {
  console.log(`Server listening on 4001`);
});

app.get('/up-check', (_req, res: any) => {
  res.status(200).end();
});
