import { createContext } from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    setIsPlaying: (state: boolean) => void;
    togglePlay: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);