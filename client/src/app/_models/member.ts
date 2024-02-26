import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: string;
    lastActve: string;
    gender: string;
    intro: any;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
  }
  
