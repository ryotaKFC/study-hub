export type Lobby = {
    id: string;
    name: string;
    startTime: string;
    studyMin: number;
    breakMin: number;
    isPrivate: boolean;
    location: {lat:number, lng:number};
    locationName: string;
}

export type LobbyCreationDate = {
    name: string;
    startTime: string;
    studyMin: number;
    breakMin: number;
    isPrivate: boolean;
    location: {lat:number, lng:number};
    locationName: string;
}
