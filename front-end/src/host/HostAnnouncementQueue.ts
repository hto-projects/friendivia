import * as React from "react";

export const AddAnnouncementContext = React.createContext<any>(null);

export function HostAnnouncementQueue(props) {
  const announcementAudioObjects = props.announcementAudioObjects;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const numAnnouncements = announcementAudioObjects.length;
    if (numAnnouncements > 0 && currentIndex < numAnnouncements) {
      const currentAudio = announcementAudioObjects[currentIndex];
      currentAudio.onended = () => {
        setCurrentIndex(currentIndex+1);
      };

      currentAudio.play();
    }
  }, [currentIndex, setCurrentIndex, announcementAudioObjects]);

  return null;
}
