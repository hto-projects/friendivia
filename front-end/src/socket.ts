declare var process : {
  env: {
    REACT_APP_BACK_END_URL: string
    REACT_APP_ELEVEN_LABS_API_KEY: string
    REACT_APP_USE_ELEVEN_LABS: string
  }
}

import { io } from 'socket.io-client';
export const backEndUrl = process.env['REACT_APP_BACK_END_URL'] || "http://localhost:4001";
export const socket = io(backEndUrl);
