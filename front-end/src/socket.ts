import { backEndUrl } from './environment';
import { io } from 'socket.io-client';
export const socket = io(backEndUrl);
