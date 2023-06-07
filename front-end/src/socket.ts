declare var process : {
  env: {
    REACT_APP_BACK_END_URL: string
  }
}

import { io } from 'socket.io-client';
const URL = process.env['REACT_APP_BACK_END_URL'] || "localhost:4001";
export const socket = io(URL);
