export type Lobby = {
    id: string;
    name: string;
    startTime: string;
    studyMin: number;
    breakMin: number;
    isPrivate: boolean;
    location: {lat:number, lng:number};
}

export type LobbyCreationDate = {
    name: string;
    startTime: string;
    studyMin: number;
    breakMin: number;
    isPrivate: boolean;
    location: {lat:number, lng:number};
}
