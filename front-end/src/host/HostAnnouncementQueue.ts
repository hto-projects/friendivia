import * as React from "react";
import { Socket } from "socket.io-client";

interface IHostAnnouncementProps {
  announcementAudioObjects: any;
  socket: Socket;
  gameId: number;
  gameState: string;
}

export const AddAnnouncementContext = React.createContext<any>(null);

export function HostAnnouncementQueue(props: IHostAnnouncementProps) {
  const { announcementAudioObjects, socket, gameId, gameState } = props;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const numAnnouncements = announcementAudioObjects.length;
    if (numAnnouncements > 0 && currentIndex < numAnnouncements) {
      const currentAudio = announcementAudioObjects[currentIndex];
      currentAudio.onended = () => {
        setCurrentIndex(currentIndex+1);
      };


      currentAudio.play().catch(() => {
        if (gameState === 'showing-question') {
          socket.emit('host-start-quiz-timer', gameId);
          announcementAudioObjects.splice(0);
        }
      })
      
    }
  }, [currentIndex, setCurrentIndex, announcementAudioObjects]);

  return null;
}
